import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

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

    console.log('[screenshot] HTML size:', html.length, 'chars')
    // Log focado nos spans de item para debug do truncamento
    const spanMatch = html.match(/line-height:1\.3;width:[^"]+/)
    const flexMatch = html.match(/line-height:1\.3;flex:[^"]+/)
    console.log('[screenshot] span width:', spanMatch?.[0] ?? 'NAO ENCONTRADO')
    console.log('[screenshot] span flex:', flexMatch?.[0] ?? 'NAO ENCONTRADO')
    const workerUrl    = process.env.CLOUDFLARE_WORKER_URL
    const workerSecret = process.env.CLOUDFLARE_WORKER_SECRET

    if (!workerUrl || !workerSecret) {
      console.error('[screenshot] CLOUDFLARE_WORKER_URL ou CLOUDFLARE_WORKER_SECRET não configuradas')
      return NextResponse.json({ erro: 'Serviço de screenshot não configurado' }, { status: 500 })
    }

    // ── Cloudflare Worker (Browser Rendering) ─────────────────────────────
    try {
      const res = await fetch(workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${workerSecret}`,
        },
        body: JSON.stringify({ html }),
      })

      if (res.ok) {
        const data = await res.json() as any
        if (data.url) {
          console.log('[screenshot] Cloudflare Worker ✓')
          return NextResponse.json({ url: data.url })
        }
        console.error('[screenshot] Worker sem url na resposta:', JSON.stringify(data).slice(0, 200))
      } else {
        const errText = await res.text()
        console.error('[screenshot] Worker erro HTTP:', res.status, errText.slice(0, 300))
        if (res.status === 429) {
          return NextResponse.json({ erro: 'Rate limit' }, { status: 429 })
        }
      }
    } catch (e: any) {
      console.error('[screenshot] Worker exception:', e.message)
    }

    return NextResponse.json({ erro: 'Nenhum serviço de screenshot disponível' }, { status: 500 })

  } catch (err: any) {
    console.error('[screenshot] erro geral:', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
