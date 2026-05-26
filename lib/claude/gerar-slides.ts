import Anthropic from '@anthropic-ai/sdk'
import { Slide, Tom } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const TOM_INSTRUCOES: Record<Tom, string> = {
  vender:   'Persuasivo. Foco em benefícios concretos e CTA claro.',
  ensinar:  'Educativo. Explique de forma simples e prática.',
  urgencia: 'Urgente. Use dados, prazos e consequências reais.',
  inspirar: 'Motivacional. Conecte emocionalmente com o leitor.',
}

function limparJSON(texto: string): string {
  let s = texto.trim()
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  const match = s.match(/\[[\s\S]*\]/)
  return match ? match[0] : s
}

export async function gerarSlides(tema: string, tom: Tom, qtdSlides: number): Promise<Slide[]> {
  const prompt = `Você é especialista em conteúdo para carrossel do Instagram. Crie ${qtdSlides} slide(s) sobre: "${tema}".
Tom: ${TOM_INSTRUCOES[tom]}

ESTRUTURA DE CADA SLIDE:
- "destaque": SÓ no slide 1. Tag curta tipo "Sabia disso?", "Atenção MEI", "Leia isso"
- "titulo": Título principal. Máximo 8 palavras. Impactante.
- "corpo": Conteúdo do slide. MÍNIMO 3 linhas, MÁXIMO 5 linhas. Cada linha separada por \\n.
  Para layout de lista: cada linha = um item completo (ex: "✅ Consultas e exames cobertos")
  Para layout normal: frases curtas que explicam o título
- "emoji": Um emoji que representa o slide (ex: "🏥", "💰", "✅", "⚠️")

REGRAS:
- Slide 1: apresenta o tema com gancho forte
- Slides do meio: cada um aborda UM benefício/ponto específico com detalhes reais
- Último slide: CTA direto (ex: "Fale comigo agora", "Link na bio")
- Use emojis nas linhas do corpo quando fizer sentido
- Corpo NUNCA pode ter menos de 3 linhas

EXEMPLO CORPO BOM (5 linhas):
"✅ Consultas médicas inclusas\\n✅ Exames laboratoriais cobertos\\n✅ Internação com acompanhante\\n✅ Rede credenciada em todo Brasil\\n✅ Carência reduzida para MEI"

EXEMPLO CORPO RUIM (curto demais):
"Proteção completa\\nSem complicações"

Responda SOMENTE com JSON:
[{"ordem":1,"titulo":"...","corpo":"linha1\\nlinha2\\nlinha3","destaque":"tag curta","emoji":"🏥"},{"ordem":2,"titulo":"...","corpo":"linha1\\nlinha2\\nlinha3\\nlinha4","emoji":"💰"}]`

  const response = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages:   [{ role: 'user', content: prompt }],
  })

  const texto   = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonStr = limparJSON(texto)

  let dados: any[]
  try { dados = JSON.parse(jsonStr) }
  catch {
    console.error('[gerar-slides] parse error:', texto.slice(0, 200))
    throw new Error('Erro ao processar resposta da IA. Tente novamente.')
  }

  return dados.map(s => ({ ...s, id: Math.random().toString(36).slice(2) }))
}
