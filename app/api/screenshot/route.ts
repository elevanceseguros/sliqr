import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json()

    if (!html || typeof html !== 'string') {
      return NextResponse.json(
        { erro: 'HTML obrigatório' },
        { status: 400 }
      )
    }

    const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY

    if (!accessKey) {
      return NextResponse.json(
        { erro: 'SCREENSHOTONE_ACCESS_KEY não configurado' },
        { status: 500 }
      )
    }

    const imgRes = await fetch('https://api.screenshotone.com/take', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': accessKey,
      },
      body: JSON.stringify({
        html,
        format: 'png',

        viewport_width: 1080,
        viewport_height: 1080,
        device_scale_factor: 2,
        full_page: false,

        wait_until: ['load', 'networkidle2'],
        delay: 1,
        timeout: 30,

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
          erro: `ScreenshotOne ${imgRes.status}: ${err.slice(0, 1000)}`,
        },
        { status: 500 }
      )
    }

    const contentType = imgRes.headers.get('content-type') ?? 'image/png'

    if (!contentType.includes('image')) {
      const text = await imgRes.text()

      return NextResponse.json(
        {
          erro: `ScreenshotOne retornou ${contentType}: ${text.slice(0, 1000)}`,
        },
        { status: 500 }
      )
    }

    const buffer = await imgRes.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

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
