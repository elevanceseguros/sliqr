import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 45

const claudeClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Claude gera o prompt visual ideal para qualquer tema
async function gerarPromptVisual(tema: string, tipo: string): Promise<string> {
  const res = await claudeClient.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    messages: [{
      role: 'user',
      content: `Você cria prompts de imagem para posts profissionais do Instagram.

Tema do post: "${tema}"
Tipo de slide: ${tipo} (capa=slide de abertura, cta=chamada para ação, outros=slide de conteúdo)

Crie um prompt de imagem fotográfica profissional para ser usado como FUNDO ou ELEMENTO VISUAL LATERAL do post.

REGRAS OBRIGATÓRIAS:
- A imagem deve representar o TEMA visualmente, não o texto
- OBRIGATÓRIO: ZERO texto, ZERO letras, ZERO palavras, ZERO números na imagem
- Apenas elementos visuais puros: objetos, natureza, ambiente, texturas, luz
- Estilo fotográfico profissional, bokeh, iluminação suave
- NUNCA documentos, papéis com texto, telas, placas
- Para capa: objeto central impactante em fundo limpo
- Para cta: luz dourada, ambiente acolhedor, profundidade de campo
- Para outros slides: textura ou objeto sutil lateral

Responda APENAS com o prompt em inglês. Máximo 20 palavras. Inclua sempre: "no text, no words, no letters, no documents".`
    }]
  })
  const prompt = res.content[0].type === 'text' ? res.content[0].text.trim() : ''
  // Garantir sem texto na imagem
  return prompt + ', no text, no words, no letters, no watermark, photorealistic'
}

export async function POST(request: NextRequest) {
  try {
    const { tema, tipo } = await request.json()
    const falKey = process.env.FAL_API_KEY

    if (!falKey) return NextResponse.json({ url: '' })

    // Gerar prompt visual inteligente via Claude
    const prompt = await gerarPromptVisual(tema ?? 'negócios', tipo ?? 'topico')
    console.log('[imagem-ia] prompt:', prompt.slice(0, 80))

    const res = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${falKey}`,
        'Content-Type': 'application/json',
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
      console.error('[imagem-ia] fal erro:', res.status)
      return NextResponse.json({ url: '' })
    }

    const data = await res.json()
    const url  = data.images?.[0]?.url ?? ''
    return NextResponse.json({ url })

  } catch (err: any) {
    console.error('[imagem-ia] erro:', err.message)
    return NextResponse.json({ url: '' })
  }
}
