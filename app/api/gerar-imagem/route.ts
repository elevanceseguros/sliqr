import { NextRequest, NextResponse } from 'next/server'

const TEMA_EN: Record<string, string> = {
  'seguro auto': 'car insurance professional agent modern office',
  'seguro carro': 'car protection road safety professional',
  'plano de saude': 'healthcare doctor patient modern clinic bright',
  'plano de saúde': 'healthcare doctor patient modern clinic bright',
  'emagrecimento': 'fitness healthy lifestyle woman man workout',
  'marmita': 'healthy meal prep food nutrition colorful',
  'farmacia': 'pharmacy medicine professional clean',
  'farmácia': 'pharmacy medicine professional clean',
  'remedio': 'medicine healthcare professional clean modern',
  'remédio': 'medicine healthcare professional clean modern',
  'imovel': 'real estate modern house apartment luxury',
  'imóvel': 'real estate modern house apartment luxury',
  'consorcio': 'finance investment planning professional',
  'consórcio': 'finance investment planning professional',
  'moto': 'motorcycle freedom road adventure sunset',
  'academia': 'gym fitness workout equipment modern',
  'dentista': 'dental clinic smile teeth professional',
  'nutrição': 'nutrition healthy food colorful vegetables',
  'seguro vida': 'family protection life insurance happy',
  'financeiro': 'finance money business professional office',
}

function buildPrompt(tema: string, idx: number): string {
  const l = tema.toLowerCase().trim()
  let base = tema + ' professional business'
  for (const [pt, en] of Object.entries(TEMA_EN)) {
    if (l.includes(pt)) { base = en; break }
  }

  // Variações por índice do slide para ter fotos diferentes
  const variações = [
    'wide angle shot, cinematic lighting, modern aesthetic',
    'close up, warm lighting, professional photography',
    'aerial view, dramatic lighting, vibrant colors',
    'side angle, soft bokeh background, professional',
    'documentary style, natural lighting, authentic',
    'studio lighting, clean background, high contrast',
    'golden hour lighting, outdoor setting, lifestyle',
    'overhead shot, minimal composition, modern',
    'candid style, urban environment, dynamic',
    'portrait style, serious professional tone',
  ]

  const variacao = variações[idx % variações.length]

  return `${base}, ${variacao}, photorealistic, high quality, 8k, no text, no watermark, no logo`
}

export async function POST(request: NextRequest) {
  try {
    const { tema, idx = 0 } = await request.json()

    const prompt = buildPrompt(tema, idx)

    const res = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        image_size:           'square_hd',
        num_inference_steps:  4,
        num_images:           1,
        enable_safety_checker: true,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[gerar-imagem] fal.ai error:', err)
      return NextResponse.json({ url: '' }, { status: 200 }) // fallback silencioso
    }

    const data = await res.json()
    const url  = data.images?.[0]?.url ?? ''
    return NextResponse.json({ url })

  } catch (err: any) {
    console.error('[gerar-imagem]', err)
    return NextResponse.json({ url: '' })
  }
}
