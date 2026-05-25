import Anthropic from '@anthropic-ai/sdk'
import { Slide, Tom } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const TOM_INSTRUCOES: Record<Tom, string> = {
  vender:   'Linguagem persuasiva, focada em benefícios e conversão. Objetivo: fazer o leitor querer comprar ou contratar.',
  ensinar:  'Linguagem educativa e clara. Explique como se estivesse ensinando alguém que não conhece o assunto.',
  urgencia: 'Senso de urgência real. Use dados, prazos e consequências de não agir. Direto e impactante.',
  inspirar: 'Tom motivacional e humano. Conecte emocionalmente. Deixe o leitor esperançoso.',
}

export async function gerarSlides(tema: string, tom: Tom, qtdSlides: number): Promise<Slide[]> {
  const prompt = `Crie um carrossel de ${qtdSlides} slide(s) para Instagram sobre: "${tema}".

Estilo: ${TOM_INSTRUCOES[tom]}

Regras:
- Slide 1: título curto e impactante (máximo 8 palavras) para parar o scroll
- Cada slide tem uma ideia única
- Corpo: máximo 3 linhas curtas
- Último slide: convite à ação direto
- Linguagem simples, do dia a dia

RETORNE APENAS O JSON ABAIXO, SEM NENHUM TEXTO ANTES OU DEPOIS, SEM MARKDOWN:

[{"ordem":1,"titulo":"titulo aqui","corpo":"linha 1\nlinha 2","destaque":"frase curta"},{"ordem":2,"titulo":"titulo","corpo":"linha 1\nlinha 2"}]

O campo "destaque" existe APENAS no slide 1. Nos outros slides NÃO inclua "destaque".`

  const response = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages:   [{ role: 'user', content: prompt }],
  })

  const texto = response.content[0].type === 'text' ? response.content[0].text.trim() : ''

  // Tenta extrair JSON mesmo se vier com texto ao redor
  let jsonStr = texto
  const match = texto.match(/\[[\s\S]*\]/)
  if (match) jsonStr = match[0]

  let dados: Omit<Slide, 'id'>[]
  try {
    dados = JSON.parse(jsonStr)
  } catch {
    console.error('[gerar-slides] parse error, resposta:', texto.slice(0, 300))
    throw new Error('Erro ao processar resposta da IA. Tente novamente.')
  }

  return dados.map(s => ({ ...s, id: Math.random().toString(36).slice(2) }))
}
