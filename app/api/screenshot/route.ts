import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json()
    if (!html) return NextResponse.json({ erro: 'HTML obrigatório' }, { status: 400 })

    const userId = process.env.HCTI_USER_ID
    const apiKey = process.env.HCTI_API_KEY
    if (!userId || !apiKey) return NextResponse.json({ erro: 'HCTI não configurado' }, { status: 500 })

    const res = await fetch('https://hcti.io/v1/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64'),
      },
      body: JSON.stringify({
        html,
        viewport_width:  1080,
        viewport_height: 1080,
        device_scale_factor: 1,
        ms_delay: 500, // aguarda fontes Google carregarem
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[screenshot] hcti erro:', res.status, err.slice(0,200))
      return NextResponse.json({ erro: `hcti ${res.status}: ${err.slice(0,100)}` }, { status: 500 })
    }

    const data = await res.json()
    const imgUrl = data.url ?? ''
    if (!imgUrl) return NextResponse.json({ erro: 'hcti sem URL' }, { status: 500 })

    // Baixa a imagem e converte para base64 para evitar CORS no frontend
    const imgRes = await fetch(imgUrl)
    const buffer = await imgRes.arrayBuffer()
    const b64    = Buffer.from(buffer).toString('base64')
    const ct     = imgRes.headers.get('content-type') ?? 'image/png'

    console.log('[screenshot] ok, url:', imgUrl.slice(0,60))
    return NextResponse.json({ url: `data:${ct};base64,${b64}` })

  } catch (err: any) {
    console.error('[screenshot] erro:', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
