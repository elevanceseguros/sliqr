import { NextRequest, NextResponse } from 'next/server'

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

    const cfToken     = process.env.CLOUDFLARE_API_TOKEN
    const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID

    if (!cfToken || !cfAccountId) {
      console.error('[screenshot] Cloudflare env vars não configuradas')
      return NextResponse.json({ erro: 'Serviço de screenshot não configurado' }, { status: 500 })
    }

    // ── Cloudflare Browser Rendering ──────────────────────────────────────
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/browser-rendering/screenshot`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cfToken}`,
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            html,
            viewport: { width: 1080, height: 1080 },
            screenshotOptions: {
              type:     'png',
              clip:     { x: 0, y: 0, width: 1080, height: 1080 },
              fullPage: false,
            },
            gotoOptions: { waitUntil: 'networkidle2' },
          }),
        }
      )

      if (res.ok) {
        const ct = res.headers.get('content-type') ?? ''
        if (ct.includes('image')) {
          const buffer = await res.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          console.log('[screenshot] Cloudflare Browser Rendering ✓')
          return NextResponse.json({ url: `data:image/png;base64,${base64}` })
        }
        const errText = await res.text()
        console.error('[screenshot] Cloudflare resposta não-imagem:', res.status, errText.slice(0, 300))
      } else {
        const errText = await res.text()
        console.error('[screenshot] Cloudflare erro HTTP:', res.status, errText.slice(0, 300))
        // Propaga 429 para o frontend fazer retry com backoff
        if (res.status === 429) {
          return NextResponse.json({ erro: 'Rate limit' }, { status: 429 })
        }
      }
    } catch (e: any) {
      console.error('[screenshot] Cloudflare exception:', e.message)
    }

    return NextResponse.json({ erro: 'Nenhum serviço de screenshot disponível' }, { status: 500 })

  } catch (err: any) {
    console.error('[screenshot] erro geral:', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
