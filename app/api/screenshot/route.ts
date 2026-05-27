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

    const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY
    const hctiUser  = process.env.HCTI_USER_ID
    const hctiKey   = process.env.HCTI_API_KEY

    // ── ScreenshotOne ──────────────────────────────────────────────────────
    if (accessKey) {
      // ScreenshotOne API: parâmetros via query string para GET com html via POST body
      // Ref: https://screenshotone.com/docs/options/
      const params = new URLSearchParams({
        access_key:          accessKey,
        format:              'png',
        viewport_width:      '1080',
        viewport_height:     '1080',
        device_scale_factor: '1',
        full_page:           'false',
        wait_until:          'networkidle2',  // string, não array
        delay:               '2',             // 2 segundos para fontes carregarem
        timeout:             '25',
        cache:               'false',
        block_ads:           'true',
      })

      const imgRes = await fetch(`https://api.screenshotone.com/take?${params.toString()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/html' },
        body: html,
      })

      if (imgRes.ok) {
        const contentType = imgRes.headers.get('content-type') ?? ''
        if (contentType.includes('image')) {
          const buffer = await imgRes.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          console.log('[screenshot] ScreenshotOne ok')
          return NextResponse.json({ url: `data:image/png;base64,${base64}` })
        } else {
          // Logar o erro real do ScreenshotOne
          const errText = await imgRes.text()
          console.error('[screenshot] ScreenshotOne retornou não-imagem:', imgRes.status, errText.slice(0, 200))
        }
      } else {
        const errText = await imgRes.text()
        console.error('[screenshot] ScreenshotOne erro:', imgRes.status, errText.slice(0, 200))
      }
    }

    // ── Fallback: hcti (só se tiver créditos) ─────────────────────────────
    if (hctiUser && hctiKey) {
      const res = await fetch('https://hcti.io/v1/image', {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + Buffer.from(`${hctiUser}:${hctiKey}`).toString('base64'),
        },
        body: JSON.stringify({ html, viewport_width: 1080, viewport_height: 1080, ms_delay: 800 }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('[screenshot] hcti erro:', res.status, err.slice(0, 100))
        return NextResponse.json({ erro: `Screenshot falhou. hcti: ${res.status}` }, { status: 500 })
      }

      const data   = await res.json()
      const imgUrl = data.url ?? ''
      if (!imgUrl) return NextResponse.json({ erro: 'hcti sem URL' }, { status: 500 })

      const imgRes2  = await fetch(imgUrl)
      const buffer2  = await imgRes2.arrayBuffer()
      const base64_2 = Buffer.from(buffer2).toString('base64')
      console.log('[screenshot] hcti ok (fallback)')
      return NextResponse.json({ url: `data:image/png;base64,${base64_2}` })
    }

    return NextResponse.json({ erro: 'Nenhum serviço de screenshot configurado' }, { status: 500 })

  } catch (err: any) {
    console.error('[screenshot] erro:', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
