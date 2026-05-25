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
  const vars = [
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
  return `${base}, ${vars[idx % vars.length]}, photorealistic, high quality, 8k, no text, no watermark, no logo`
}

export async function POST(request: NextRequest) {
  const key = process.env.FAL_API_KEY
  if (!key) {
    console.error('[gerar-imagem] FAL_API_KEY não configurada')
    return NextResponse.json({ url: '', erro: 'FAL_API_KEY não configurada' })
  }

  try {
    const { tema, idx = 0 } = await request.json()
    const prompt = buildPrompt(tema, idx)

    console.log('[gerar-imagem] gerando para tema:', tema, 'idx:', idx)

    const res = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        image_size:            'square_hd',
        num_inference_steps:   4,
        num_images:            1,
        enable_safety_checker: false,
      }),
    })

    const texto = await res.text()
    console.log('[gerar-imagem] status:', res.status, 'body:', texto.slice(0, 200))

    if (!res.ok) {
      return NextResponse.json({ url: '', erro: `fal.ai ${res.status}: ${texto.slice(0,100)}` })
    }

    const data = JSON.parse(texto)
    const url  = data.images?.[0]?.url ?? ''
    console.log('[gerar-imagem] url gerada:', url.slice(0, 80))
    return NextResponse.json({ url })

  } catch (err: any) {
    console.error('[gerar-imagem] erro:', err.message)
    return NextResponse.json({ url: '', erro: err.message })
  }
}
