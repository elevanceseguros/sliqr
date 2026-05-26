import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

type TipoVisual =
  | 'capa'
  | 'carro'
  | 'chave'
  | 'escudo'
  | 'familia'
  | 'saude'
  | 'empresa'
  | 'casa'
  | 'produto'
  | 'abstrato'

function normalizarTema(v: any) {
  return String(v ?? '').trim().slice(0, 280)
}

function detectarVisual(tema: string, slideIndex: number): TipoVisual {
  const t = tema.toLowerCase()

  if (
    t.includes('proteção veicular') ||
    t.includes('seguro auto') ||
    t.includes('carro') ||
    t.includes('veículo') ||
    t.includes('veiculo') ||
    t.includes('moto')
  ) {
    const ciclo: TipoVisual[] = ['carro', 'escudo', 'chave', 'carro', 'familia']
    return ciclo[slideIndex % ciclo.length]
  }

  if (
    t.includes('plano de saúde') ||
    t.includes('plano de saude') ||
    t.includes('saúde') ||
    t.includes('saude') ||
    t.includes('convênio') ||
    t.includes('convenio')
  ) {
    const ciclo: TipoVisual[] = ['saude', 'familia', 'escudo', 'empresa', 'saude']
    return ciclo[slideIndex % ciclo.length]
  }

  if (
    t.includes('seguro residencial') ||
    t.includes('casa') ||
    t.includes('apartamento') ||
    t.includes('imóvel') ||
    t.includes('imovel')
  ) {
    const ciclo: TipoVisual[] = ['casa', 'escudo', 'familia', 'chave', 'casa']
    return ciclo[slideIndex % ciclo.length]
  }

  if (
    t.includes('seguro empresarial') ||
    t.includes('empresa') ||
    t.includes('mei') ||
    t.includes('pme') ||
    t.includes('negócio') ||
    t.includes('negocio')
  ) {
    const ciclo: TipoVisual[] = ['empresa', 'escudo', 'chave', 'empresa', 'abstrato']
    return ciclo[slideIndex % ciclo.length]
  }

  if (
    t.includes('farmácia') ||
    t.includes('farmacia') ||
    t.includes('manipulado') ||
    t.includes('suplemento') ||
    t.includes('vitamina') ||
    t.includes('dermocosmético') ||
    t.includes('dermocosmetico')
  ) {
    const ciclo: TipoVisual[] = ['produto', 'saude', 'escudo', 'produto', 'abstrato']
    return ciclo[slideIndex % ciclo.length]
  }

  return slideIndex === 0 ? 'capa' : 'abstrato'
}

function promptVisual({
  tema,
  titulo,
  tipo,
  cor,
}: {
  tema: string
  titulo: string
  tipo: TipoVisual
  cor: string
}) {
  const base = `
Premium commercial advertising visual asset for a social media carousel.
Dark elegant background, cinematic lighting, modern Brazilian marketing campaign style.
Main brand color: ${cor}.
No text, no letters, no words, no logo, no watermark.
Isolated object composition, clean edges, high contrast, professional studio lighting.
The image must work as a supporting visual element inside a graphic design layout.
`.trim()

  const contexto = `Theme: ${tema}. Slide idea: ${titulo}.`

  const map: Record<TipoVisual, string> = {
    capa: 'Abstract premium 3D marketing visual, glowing shield, elegant dynamic shapes, depth, dark blue background.',
    carro: 'Modern car front view, premium realistic 3D render, dramatic light, protection feeling, dark blue studio background.',
    chave: 'Premium modern car key, floating, realistic 3D render, metallic details, elegant light reflections.',
    escudo: 'Premium 3D shield icon, protection concept, glossy material, subtle glow, realistic render.',
    familia: 'Warm but professional scene of a family near a car, protective feeling, realistic advertising photography, elegant and safe atmosphere.',
    saude: 'Premium healthcare visual, medical protection concept, subtle cross symbol, stethoscope, clean and modern, realistic 3D render.',
    empresa: 'Premium business protection visual, modern office building or business team silhouette, elegant corporate lighting.',
    casa: 'Premium modern house with protection shield, realistic 3D render, elegant lighting, safe home concept.',
    produto: 'Premium pharmaceutical or cosmetic product packshot, clean laboratory feel, elegant 3D render, no readable text.',
    abstrato: 'Premium abstract 3D composition, shield, glow, depth, elegant shapes, modern SaaS design feel.',
  }

  return `${base}\n${contexto}\nVisual: ${map[tipo]}`
}

function extrairImagem(data: any): string | null {
  if (data?.images?.[0]?.url) return data.images[0].url
  if (data?.image?.url) return data.image.url
  if (data?.url) return data.url
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const tema = normalizarTema(body?.tema)
    const titulo = normalizarTema(body?.titulo)
    const cor = String(body?.cor ?? '#0f172a')
    const slideIndex = Number.isFinite(Number(body?.slideIndex)) ? Number(body.slideIndex) : 0
    const forcar = Boolean(body?.forcar)

    if (!tema && !titulo) {
      return NextResponse.json(
        { erro: 'Tema ou título obrigatório' },
        { status: 400 }
      )
    }

    const key = process.env.FAL_API_KEY || process.env.FAL_KEY

    if (!key) {
      return NextResponse.json(
        { erro: 'FAL_API_KEY ou FAL_KEY não configurada no Vercel' },
        { status: 500 }
      )
    }

    const tipo = forcar
      ? detectarVisual(`${tema} ${titulo}`, slideIndex)
      : detectarVisual(tema, slideIndex)

    const prompt = promptVisual({
      tema,
      titulo,
      tipo,
      cor,
    })

    const falRes = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        Authorization: `Key ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        image_size: 'square_hd',
        num_images: 1,
        num_inference_steps: 4,
        enable_safety_checker: true,
        output_format: 'png',
      }),
    })

    if (!falRes.ok) {
      const err = await falRes.text()

      return NextResponse.json(
        {
          erro: `fal.ai ${falRes.status}: ${err.slice(0, 1000)}`,
        },
        { status: 500 }
      )
    }

    const data = await falRes.json()
    const imageUrl = extrairImagem(data)

    if (!imageUrl) {
      return NextResponse.json(
        {
          erro: 'fal.ai não retornou URL da imagem',
          raw: data,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      url: imageUrl,
      tipo,
      prompt,
    })
  } catch (err: any) {
    console.error('[imagem-ia]', err)

    return NextResponse.json(
      {
        erro: err?.message ?? 'Erro ao gerar imagem IA',
      },
      { status: 500 }
    )
  }
}
