import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { html, logoUrl, logoX, logoY, logoW } = await request.json()

    if (!html) {
      return NextResponse.json({ erro: 'HTML obrigatório' }, { status: 400 })
    }

    const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY

    if (!accessKey) {
      return NextResponse.json(
        { erro: 'SCREENSHOTONE_ACCESS_KEY não configurado' },
        { status: 500 }
      )
    }

    let htmlFinal = html

    if (logoUrl) {
      const lW = logoW ?? 190
      const lH = 82
      const lX = Math.round((logoX ?? 0.5) * 1080 - lW / 2)
      const lY = Math.round((logoY ?? 0.9) * 1080 - lH / 2)

      const logoTag = `
        <img
          src="${logoUrl}"
          style="
            position:absolute;
            left:${lX}px;
            top:${lY}px;
            width:${lW}px;
            height:${lH}px;
            object-fit:contain;
            z-index:999;
          "
        />
      `

      htmlFinal = htmlFinal.includes('</body>')
        ? htmlFinal.replace('</body>', `${logoTag}</body>`)
        : `${htmlFinal}${logoTag}`
    }

    const imgRes = await fetch('https://api.screenshotone.com/take', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': accessKey,
      },
      body: JSON.stringify({
        html: htmlFinal,
        format: 'png',
        viewport_width: 1080,
        viewport_height: 1080,
        device_scale_factor: 2,
        wait_until: 'networkidle2',
        delay: 1,
        cache: false,
        block_ads: true,
        block_cookie_banners: true,
        omit_background: false,
      }),
    })

    if (!imgRes.ok) {
      const err = await imgRes.text()

      return NextResponse.json(
        {
          erro: `ScreenshotOne ${imgRes.status}: ${err.slice(0, 700)}`,
        },
        { status: 500 }
      )
    }

    const buffer = await imgRes.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const contentType = imgRes.headers.get('content-type') ?? 'image/png'

    return NextResponse.json({
      url: `data:${contentType};base64,${base64}`,
    })
  } catch (err: any) {
    console.error('[screenshot]', err)

    return NextResponse.json(
      {
        erro: err?.message ?? 'Erro ao gerar screenshot',
      },
      { status: 500 }
    )
  }
}
