import Anthropic from '@anthropic-ai/sdk'
import { Slide, Tom } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const TOM_INSTRUCOES: Record<Tom, string> = {
  vender:   'Persuasivo e direto. Foco em benefício claro. CTA no último slide.',
  ensinar:  'Educativo e simples. Ensine um conceito por slide.',
  urgencia: 'Urgente e impactante. Use dados e consequências reais.',
  inspirar: 'Motivacional e humano. Conecte emocionalmente.',
}

function limparJSON(texto: string): string {
  let s = texto.trim()
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  const match = s.match(/\[[\s\S]*\]/)
  return match ? match[0] : s
}

export async function gerarSlides(tema: string, tom: Tom, qtdSlides: number): Promise<Slide[]> {
  const prompt = `Crie ${qtdSlides} slide(s) de carrossel Instagram sobre: "${tema}".
Tom: ${TOM_INSTRUCOES[tom]}

REGRAS CRÍTICAS DE FORMATO:
- "destaque": APENAS no slide 1. Máximo 3 palavras. Ex: "Saiba agora", "Atenção aqui", "Isso muda tudo"
- "titulo": Máximo 6 palavras. Direto e impactante.
- "corpo": Máximo 2 linhas curtas separadas por \\n. Cada linha máximo 5 palavras. SEM emojis. SEM pontuação excessiva.
- Último slide: CTA curto. Ex: título "Fale com a gente" + corpo "Link na bio\\nResposta em minutos"

EXEMPLOS DE CORPO BOM:
"Cobre roubo e colisão\\nSem burocracia"
"Consultas e exames\\nTudo incluído"

EXEMPLOS DE CORPO RUIM (muito longo):
"Consultas, exames e internações cobertos. Acesso a melhor rede de hospitais e clínicas."

Responda SOMENTE com JSON puro:
[{"ordem":1,"titulo":"...","corpo":"linha1\\nlinha2","destaque":"2 palavras"},{"ordem":2,"titulo":"...","corpo":"linha1\\nlinha2"}]`

  const response = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    messages:   [{ role: 'user', content: prompt }],
  })

  const texto   = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonStr = limparJSON(texto)

  let dados: Omit<Slide, 'id'>[]
  try { dados = JSON.parse(jsonStr) }
  catch {
    console.error('[gerar-slides] parse error:', texto.slice(0, 200))
    throw new Error('Erro ao processar resposta da IA. Tente novamente.')
  }

  return dados.map(s => ({ ...s, id: Math.random().toString(36).slice(2) }))
}
