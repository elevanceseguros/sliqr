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

    const browserlessToken = process.env.BROWSERLESS_TOKEN
    if (!browserlessToken) {
      console.error('[screenshot] BROWSERLESS_TOKEN não configurada')
      return NextResponse.json({ erro: 'Serviço de screenshot não configurado' }, { status: 500 })
    }

    // ── Browserless — POST com HTML no body (sem limite de tamanho) ────────
    try {
      const res = await fetch(
        `https://production-sfo.browserless.io/screenshot?token=${browserlessToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          body: JSON.stringify({
            html,
            options: {
              type: 'png',
              fullPage: false,
              clip: { x: 0, y: 0, width: 1080, height: 1080 },
            },
            setViewport: {
              width: 1080,
              height: 1080,
              deviceScaleFactor: 1,
            },
            gotoOptions: {
              waitUntil: 'networkidle2',
            },
          }),
        }
      )

      if (res.ok) {
        const ct = res.headers.get('content-type') ?? ''
        if (ct.includes('image')) {
          const buffer = await res.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          console.log('[screenshot] Browserless ✓')
          return NextResponse.json({ url: `data:image/png;base64,${base64}` })
        }
        const errText = await res.text()
        console.error('[screenshot] Browserless resposta não-imagem:', res.status, errText.slice(0, 300))
      } else {
        const errText = await res.text()
        console.error('[screenshot] Browserless erro HTTP:', res.status, errText.slice(0, 300))
      }
    } catch (e: any) {
      console.error('[screenshot] Browserless exception:', e.message)
    }

    return NextResponse.json({ erro: 'Nenhum serviço de screenshot disponível' }, { status: 500 })

  } catch (err: any) {
    console.error('[screenshot] erro geral:', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
