import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const { prompt, slides } = await request.json()
    const titulos = (slides ?? []).map((s: any) => s.titulo).join(', ')

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{
        role: 'user',
        content: `Crie uma legenda para Instagram sobre: "${prompt}".
Os slides abordam: ${titulos}.

Formato exato:
- 3-4 linhas envolventes e diretas
- CTA no final (ex: "Salve para não esquecer! 💾" ou "Me chama no direct! 📩")
- Uma linha em branco
- Exatamente 5 hashtags relevantes separados por espaço

Responda apenas com a legenda, sem explicações.`
      }],
    })

    const legenda = response.content[0].type === 'text' ? response.content[0].text.trim() : ''
    return NextResponse.json({ legenda })
  } catch (err: any) {
    return NextResponse.json({ legenda: '', erro: err.message })
  }
}
