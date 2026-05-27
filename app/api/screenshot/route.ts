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

    // ── ScreenshotAPI.net ──────────────────────────────────────────────────
    const screenshotApiToken = process.env.SCREENSHOTAPI_TOKEN

    if (screenshotApiToken) {
      const params = new URLSearchParams({
        token:           screenshotApiToken,
        output:          'image',
        file_type:       'png',
        width:           '1080',
        height:          '1080',
        full_page:       'false',
        wait_for_event:  'networkidle',
        delay:           '1500',        // 1.5s para fontes Google carregarem
        fresh:           'true',
        custom_html:     html,          // HTML direto, sem precisar de URL
      })

      const imgRes = await fetch(
        `https://shot.screenshotapi.net/v3/screenshot?${params.toString()}`,
        { method: 'GET' }
      )

      if (imgRes.ok) {
        const ct = imgRes.headers.get('content-type') ?? ''
        if (ct.includes('image')) {
          const buffer = await imgRes.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          console.log('[screenshot] ScreenshotAPI.net ok')
          return NextResponse.json({ url: `data:image/png;base64,${base64}` })
        }
        const errText = await imgRes.text()
        console.error('[screenshot] ScreenshotAPI.net não-imagem:', imgRes.status, errText.slice(0, 200))
      } else {
        const errText = await imgRes.text()
        console.error('[screenshot] ScreenshotAPI.net erro:', imgRes.status, errText.slice(0, 200))
      }
    }

    // ── Fallback: ScreenshotOne ────────────────────────────────────────────
    const screenshotOneKey = process.env.SCREENSHOTONE_ACCESS_KEY

    if (screenshotOneKey) {
      const params = new URLSearchParams({
        access_key:          screenshotOneKey,
        format:              'png',
        viewport_width:      '1080',
        viewport_height:     '1080',
        device_scale_factor: '1',
        full_page:           'false',
        wait_until:          'networkidle2',
        delay:               '2',
        timeout:             '25',
        cache:               'false',
        block_ads:           'true',
      })

      const imgRes = await fetch(
        `https://api.screenshotone.com/take?${params.toString()}`,
        { method: 'POST', headers: { 'Content-Type': 'text/html' }, body: html }
      )

      if (imgRes.ok) {
        const ct = imgRes.headers.get('content-type') ?? ''
        if (ct.includes('image')) {
          const buffer = await imgRes.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          console.log('[screenshot] ScreenshotOne ok (fallback)')
          return NextResponse.json({ url: `data:image/png;base64,${base64}` })
        }
        const errText = await imgRes.text()
        console.error('[screenshot] ScreenshotOne não-imagem:', imgRes.status, errText.slice(0, 200))
      } else {
        const errText = await imgRes.text()
        console.error('[screenshot] ScreenshotOne erro:', imgRes.status, errText.slice(0, 200))
      }
    }

    // ── Fallback final: hcti ───────────────────────────────────────────────
    const hctiUser = process.env.HCTI_USER_ID
    const hctiKey  = process.env.HCTI_API_KEY

    if (hctiUser && hctiKey) {
      const res = await fetch('https://hcti.io/v1/image', {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + Buffer.from(`${hctiUser}:${hctiKey}`).toString('base64'),
        },
        body: JSON.stringify({ html, viewport_width: 1080, viewport_height: 1080, ms_delay: 800 }),
      })

      if (res.ok) {
        const data   = await res.json()
        const imgUrl = data.url ?? ''
        if (imgUrl) {
          const imgRes2  = await fetch(imgUrl)
          const buffer2  = await imgRes2.arrayBuffer()
          const base64_2 = Buffer.from(buffer2).toString('base64')
          console.log('[screenshot] hcti ok (fallback final)')
          return NextResponse.json({ url: `data:image/png;base64,${base64_2}` })
        }
      }
      const err = await res.text().catch(() => '')
      console.error('[screenshot] hcti erro:', res.status, err.slice(0, 100))
    }

    return NextResponse.json({ erro: 'Nenhum serviço de screenshot disponível' }, { status: 500 })

  } catch (err: any) {
    console.error('[screenshot] erro geral:', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
