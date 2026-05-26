import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { html, logoUrl, logoX, logoY, logoW } = await request.json()
    if (!html) return NextResponse.json({ erro: 'HTML obrigatório' }, { status: 400 })

    const userId = process.env.HCTI_USER_ID
    const apiKey = process.env.HCTI_API_KEY
    if (!userId || !apiKey) return NextResponse.json({ erro: 'HCTI não configurado' }, { status: 500 })

    // Se tem logo, injeta no HTML antes de renderizar
    let htmlFinal = html
    if (logoUrl) {
      const lW  = logoW ?? 160
      const lH  = 70
      const lX  = Math.round((logoX ?? 0.5) * 1080 - lW / 2)
      const lY  = Math.round((logoY ?? 0.90) * 1080 - lH / 2)
      const logoTag = `<img src="${logoUrl}" style="position:absolute;left:${lX}px;top:${lY}px;width:${lW}px;height:${lH}px;object-fit:contain;z-index:10;" />`
      htmlFinal = html.replace('</div>\n</body>', `  ${logoTag}\n</div>\n</body>`)
    }

    const res = await fetch('https://hcti.io/v1/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64'),
      },
      body: JSON.stringify({
        html:             htmlFinal,
        viewport_width:  1080,
        viewport_height: 1080,
        ms_delay:        800,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ erro: `hcti ${res.status}: ${err.slice(0,100)}` }, { status: 500 })
    }

    const data   = await res.json()
    const imgUrl = data.url ?? ''
    if (!imgUrl) return NextResponse.json({ erro: 'hcti sem URL' }, { status: 500 })

    // Baixa e converte para base64
    const imgRes = await fetch(imgUrl)
    const buffer = await imgRes.arrayBuffer()
    const b64    = Buffer.from(buffer).toString('base64')
    const ct     = imgRes.headers.get('content-type') ?? 'image/png'

    return NextResponse.json({ url: `data:${ct};base64,${b64}` })

  } catch (err: any) {
    console.error('[screenshot]', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
