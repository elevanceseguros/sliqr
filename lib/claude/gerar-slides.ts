import Anthropic from '@anthropic-ai/sdk'
import { Slide, Tom } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const TOM_INSTRUCOES: Record<Tom, string> = {
  vender:   'Linguagem persuasiva, focada em benefícios e conversão. Objetivo: fazer o leitor querer comprar ou contratar.',
  ensinar:  'Linguagem educativa e clara. Explique como se estivesse ensinando alguém que não conhece o assunto.',
  urgencia: 'Senso de urgência real. Use dados, prazos e consequências de não agir. Direto e impactante.',
  inspirar: 'Tom motivacional e humano. Conecte emocionalmente. Deixe o leitor esperançoso.',
}

function limparJSON(texto: string): string {
  let s = texto.trim()
  // Remove blocos markdown ```json ... ``` ou ``` ... ```
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  // Extrai o array JSON
  const match = s.match(/\[[\s\S]*\]/)
  if (match) return match[0]
  return s
}

export async function gerarSlides(tema: string, tom: Tom, qtdSlides: number): Promise<Slide[]> {
  const prompt = `Você é um especialista em conteúdo para Instagram. Crie ${qtdSlides} slide(s) sobre: "${tema}".

Estilo: ${TOM_INSTRUCOES[tom]}

Regras:
- Slide 1: título curto e impactante (máximo 8 palavras) + campo "destaque" com 2-4 palavras de gancho
- Demais slides: apenas "ordem", "titulo", "corpo" — SEM o campo "destaque"
- Corpo: máximo 3 linhas curtas separadas por \\n
- Último slide: convite à ação direto
- Linguagem simples e direta

Responda SOMENTE com o JSON puro, sem explicações:
[{"ordem":1,"titulo":"...","corpo":"linha1\\nlinha2","destaque":"frase curta"},{"ordem":2,"titulo":"...","corpo":"linha1\\nlinha2"}]`

  const response = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages:   [{ role: 'user', content: prompt }],
  })

  const texto = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonStr = limparJSON(texto)

  let dados: Omit<Slide, 'id'>[]
  try {
    dados = JSON.parse(jsonStr)
  } catch {
    console.error('[gerar-slides] parse error. Raw:', texto.slice(0, 400))
    throw new Error('Erro ao processar resposta da IA. Tente novamente.')
  }

  return dados.map(s => ({ ...s, id: Math.random().toString(36).slice(2) }))
}
