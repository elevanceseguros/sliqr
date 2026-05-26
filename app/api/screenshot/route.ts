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
      // Injeta antes do </div></body>
      html = html.replace(/<\/div>\s*<\/body>/, `  ${tag}\n</div>\n</body>`)
    }

    // Tenta ScreenshotOne primeiro
    const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY

    if (accessKey) {
      const imgRes = await fetch('https://api.screenshotone.com/take', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Key': accessKey },
        body: JSON.stringify({
          html,
          format:               'png',
          viewport_width:       1080,
          viewport_height:      1080,
          device_scale_factor:  1,
          full_page:            false,
          wait_until:           ['load', 'networkidle2'],
          delay:                1,
          timeout:              30,
          cache:                false,
          block_ads:            true,
          block_cookie_banners: true,
          omit_background:      false,
        }),
      })

      if (imgRes.ok) {
        const contentType = imgRes.headers.get('content-type') ?? 'image/png'
        if (contentType.includes('image')) {
          const buffer = await imgRes.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          return NextResponse.json({ url: `data:${contentType};base64,${base64}` })
        }
      }
      console.error('[screenshot] ScreenshotOne falhou, tentando hcti...')
    }

    // Fallback: htmlcsstoimage
    const hctiUser = process.env.HCTI_USER_ID
    const hctiKey  = process.env.HCTI_API_KEY

    if (!hctiUser || !hctiKey) {
      return NextResponse.json({ erro: 'Nenhum serviço de screenshot configurado' }, { status: 500 })
    }

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
      return NextResponse.json({ erro: `hcti ${res.status}: ${err.slice(0,100)}` }, { status: 500 })
    }

    const data   = await res.json()
    const imgUrl = data.url ?? ''
    if (!imgUrl) return NextResponse.json({ erro: 'hcti sem URL' }, { status: 500 })

    const imgRes2  = await fetch(imgUrl)
    const buffer2  = await imgRes2.arrayBuffer()
    const base64_2 = Buffer.from(buffer2).toString('base64')
    const ct       = imgRes2.headers.get('content-type') ?? 'image/png'

    return NextResponse.json({ url: `data:${ct};base64,${base64_2}` })

  } catch (err: any) {
    console.error('[screenshot]', err)
    return NextResponse.json({ erro: err?.message ?? 'Erro ao gerar screenshot' }, { status: 500 })
  }
}
