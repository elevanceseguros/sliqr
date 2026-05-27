import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 45

function buildPrompt(tema: string, tipo: string): string {
  const t = tema.toLowerCase()

  // Prompts específicos por nicho — sem texto, sem letras, só objeto visual
  if (t.match(/seguro\s?auto|carro|veicular|proteção\s?veicular|guincho/))
    return 'luxury car key on dark polished marble surface, soft studio bokeh lighting, no text, no words, no letters, photorealistic commercial product photography, 8k'

  if (t.match(/seguro\s?de\s?vida|vida|família|proteção\s?familiar/))
    return 'silhouette of happy family at golden sunset beach, warm cinematic light, no text, no words, photorealistic, emotional'

  if (t.match(/plano\s?de\s?saúde|saúde|médico|hospital|clínica|steto/))
    return 'elegant stethoscope on clean white marble surface, soft shadows, minimal medical photography, no text, no words, photorealistic'

  if (t.match(/farmácia|manipulado|composto|colágeno|suplemento|vitamina|goma/))
    return 'premium glass dropper bottles with botanical herbs on marble surface, soft natural light, luxury health photography, no text, no letters, photorealistic'

  if (t.match(/imóvel|imobiliária|apartamento|casa|aluguel|compra/))
    return 'modern luxury apartment living room, floor-to-ceiling windows, minimalist furniture, soft afternoon sunlight, no text, architectural photography, photorealistic'

  if (t.match(/financ|invest|dinheiro|renda|lucro|consórcio|banco/))
    return 'gold coins and abstract financial elements on dark elegant surface, macro photography, luxury, no text, no numbers, no words, commercial photography'

  if (t.match(/nutri|alimentação|dieta|emagrecimento/))
    return 'vibrant colorful healthy food flat lay, fresh fruits and vegetables on white surface, no text, no words, food photography, photorealistic'

  if (t.match(/advocacia|advogado|direito|jurídico/))
    return 'wooden gavel and law books on dark mahogany desk, dramatic side lighting, no text, no words, professional legal photography'

  if (t.match(/contabilidade|contador|empresa|negócio|empreendedor/))
    return 'modern workspace with laptop and minimal desk accessories, clean professional atmosphere, soft diffused light, no text, no words, corporate photography'

  if (t.match(/marmita|delivery|restaurante|comida/))
    return 'gourmet meal prep containers with colorful healthy food, overhead flat lay, soft natural light, no text, food photography, photorealistic'

  if (tipo === 'cta')
    return `abstract premium bokeh background with warm golden light circles, elegant, luxury feel, no text, no words, no letters, cinematic`

  // Genérico
  return `premium visual composition for business post about "${tema.slice(0,40)}", elegant shapes, professional studio lighting, no text, no words, no letters, no watermark, photorealistic commercial photography`
}

export async function POST(request: NextRequest) {
  try {
    const { tema, tipo } = await request.json()
    const falKey = process.env.FAL_API_KEY

    if (!falKey) {
      return NextResponse.json({ url: '' })
    }

    // Só gera para capa e cta — outros slides ficam com fundo sólido/gradiente
    if (tipo && !['capa', 'cta'].includes(tipo)) {
      return NextResponse.json({ url: '' })
    }

    const tipoReal = tipo ?? 'capa'
    // CTA usa prompt diferente da capa para variar a imagem
    const promptBase = buildPrompt(tema ?? '', tipoReal)
    const prompt = tipoReal === 'cta'
      ? promptBase + ', different angle, warm tones, golden hour'
      : promptBase

    const res = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method:  'POST',
      headers: {
        'Authorization': `Key ${falKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        prompt,
        image_size:            'square_hd',
        num_inference_steps:   4,
        num_images:            1,
        enable_safety_checker: false,
        seed:                  Math.floor(Math.random() * 99999999),
      }),
    })

    if (!res.ok) {
      console.error('[imagem-ia] fal.ai erro:', res.status, await res.text().catch(()=>''))
      return NextResponse.json({ url: '' })
    }

    const data = await res.json()
    const url  = data.images?.[0]?.url ?? ''
    console.log('[imagem-ia] ok tipo:', tipo, 'url:', url.slice(0,60))
    return NextResponse.json({ url })

  } catch (err: any) {
    console.error('[imagem-ia] erro:', err.message)
    return NextResponse.json({ url: '' }) // Falha silenciosa — carrossel continua
  }
}
