import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let html = body?.html

    if (!html || typeof html !== 'string') {
      return NextResponse.json({ erro: 'HTML obrigatório' }, { status: 400 })
    }

    // Injeta logo no HTML se fornecida (só para download final)
    if (body.logoUrl) {
      const lW  = Math.min(body.logoW ?? 160, 300)
      const lH  = 64
      const lX  = Math.round((body.logoX ?? 0.5) * 1080 - lW / 2)
      const lY  = Math.round((body.logoY ?? 0.92) * 1080 - lH / 2)
      const tag = `<img src="${body.logoUrl}" style="position:absolute;left:${lX}px;top:${lY}px;width:${lW}px;height:${lH}px;object-fit:contain;z-index:10;" />`
      html = html.replace(/<\/div>\s*<\/body>/, `  ${tag}\n</div>\n</body>`)
    }

    const screenshotApiToken = process.env.SCREENSHOTAPI_TOKEN
    if (!screenshotApiToken) {
      console.error('[screenshot] SCREENSHOTAPI_TOKEN não configurada')
      return NextResponse.json({ erro: 'Serviço de screenshot não configurado' }, { status: 500 })
    }

    // ── Upload HTML temporário para Supabase Storage ──────────────────────
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.html`
    const filePath = `slides/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('html-temp')
      .upload(filePath, Buffer.from(html, 'utf-8'), {
        contentType: 'text/html',
        upsert: false,
      })

    if (uploadError) {
      console.error('[screenshot] Supabase upload erro:', uploadError.message)
      return NextResponse.json({ erro: 'Falha ao preparar screenshot' }, { status: 500 })
    }

    // URL pública do arquivo
    const { data: publicUrlData } = supabase.storage
      .from('html-temp')
      .getPublicUrl(filePath)

    const publicUrl = publicUrlData.publicUrl
    console.log(`[screenshot] HTML publicado: ${publicUrl}`)

    // ── ScreenshotAPI.net via URL pública ─────────────────────────────────
    let imagemBase64: string | null = null

    try {
      const params = new URLSearchParams({
        token:          screenshotApiToken,
        url:            publicUrl,
        output:         'image',
        file_type:      'png',
        width:          '1080',
        height:         '1080',
        full_page:      'false',
        wait_for_event: 'networkidle',
        delay:          '1500',
        fresh:          'true',
      })

      const imgRes = await fetch(
        `https://shot.screenshotapi.net/v3/screenshot?${params.toString()}`,
        { method: 'GET' }
      )

      if (imgRes.ok) {
        const ct = imgRes.headers.get('content-type') ?? ''
        if (ct.includes('image')) {
          const buffer = await imgRes.arrayBuffer()
          imagemBase64 = Buffer.from(buffer).toString('base64')
          console.log('[screenshot] ScreenshotAPI.net ✓')
        } else {
          const errText = await imgRes.text()
          console.error('[screenshot] ScreenshotAPI.net não-imagem:', imgRes.status, errText.slice(0, 300))
        }
      } else {
        const errText = await imgRes.text()
        console.error('[screenshot] ScreenshotAPI.net erro HTTP:', imgRes.status, errText.slice(0, 300))
      }
    } catch (e: any) {
      console.error('[screenshot] ScreenshotAPI.net exception:', e.message)
    }

    // ── Limpa arquivo temporário do storage (fire-and-forget) ─────────────
    supabase.storage
      .from('html-temp')
      .remove([filePath])
      .then(() => console.log(`[screenshot] HTML temporário removido: ${filePath}`))
      .catch((e: any) => console.warn('[screenshot] Falha ao remover HTML temp:', e.message))

    if (!imagemBase64) {
      return NextResponse.json({ erro: 'Nenhum serviço de screenshot disponível' }, { status: 500 })
    }

    return NextResponse.json({ url: `data:image/png;base64,${imagemBase64}` })

  } catch (err: any) {
    console.error('[screenshot] erro geral:', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
