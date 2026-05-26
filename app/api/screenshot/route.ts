import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const maxDuration = 30

function signQuery(queryString: string, secretKey: string) {
  return crypto
    .createHmac('sha256', secretKey)
    .update(queryString)
    .digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { html, logoUrl, logoX, logoY, logoW } = await request.json()

    if (!html) {
      return NextResponse.json({ erro: 'HTML obrigatório' }, { status: 400 })
    }

    const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY
    const secretKey = process.env.SCREENSHOTONE_SECRET_KEY

    if (!accessKey || !secretKey) {
      return NextResponse.json(
        { erro: 'ScreenshotOne não configurado' },
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

      htmlFinal = htmlFinal.replace('</div>\n</body>', `${logoTag}</div>\n</body>`)
    }

    const params = new URLSearchParams({
      access_key: accessKey,
      html: htmlFinal,
      format: 'png',
      response_type: 'image',
      viewport_width: '1080',
      viewport_height: '1080',
      device_scale_factor: '2',
      wait_until: 'networkidle2',
      delay: '1',
      cache: 'false',
      block_ads: 'true',
      block_cookie_banners: 'true',
      omit_background: 'false',
    })

    const queryString = params.toString()
    const signature = signQuery(queryString, secretKey)

    const screenshotUrl = `https://api.screenshotone.com/take?${queryString}&signature=${signature}`

    const imgRes = await fetch(screenshotUrl)

    if (!imgRes.ok) {
      const err = await imgRes.text()
      return NextResponse.json(
        { erro: `ScreenshotOne ${imgRes.status}: ${err.slice(0, 300)}` },
        { status: 500 }
      )
    }

    const buffer = await imgRes.arrayBuffer()
    const b64 = Buffer.from(buffer).toString('base64')
    const ct = imgRes.headers.get('content-type') ?? 'image/png'

    return NextResponse.json({
      url: `data:${ct};base64,${b64}`,
    })
  } catch (err: any) {
    console.error('[screenshot]', err)
    return NextResponse.json(
      { erro: err?.message ?? 'Erro ao gerar screenshot' },
      { status: 500 }
    )
  }
}
