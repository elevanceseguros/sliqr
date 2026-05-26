import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function limparJSON(texto: string): string {
  let s = texto.trim()
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  const match = s.match(/\[[\s\S]*\]/)
  return match ? match[0] : s
}

const ICONES_DISPONIVEIS = 'shield, heart, star, check-circle, zap, trending-up, users, clock, dollar-sign, award, lock, phone, target, bar-chart, briefcase, home, leaf, book, mail, info, stethoscope, piggy-bank, hospital, map, tag, activity'

export async function gerarSlides(prompt: string, qtdSlides: number) {
  const instrucao = `Você cria carrosséis para Instagram de profissionais brasileiros (corretores, contadores, advogados, nutricionistas, farmacêuticos, etc).

Pedido: "${prompt}"
Crie ${qtdSlides} slides.

TIPOS:
- "capa": SEMPRE o primeiro slide. Título impactante em maiúsculas + subtítulo curto.
- "icones": Título em maiúsculas + 2 ou 3 itens com ícone SVG e label curta. Use para comparações, destaques visuais.
- "lista": Título em maiúsculas + 3 a 5 itens de texto (sem ícone de item, só texto).
- "cta": SEMPRE o último slide. Título de ação em maiúsculas + subtítulo de apoio curto.

REGRAS:
- Todos os títulos em MAIÚSCULAS
- Textos curtos e diretos
- Para "icones", o campo "itens" é um array de objetos: [{"icone": "nome_icone", "label": "texto curto"}]
- Para "lista", o campo "itens" é um array de strings: ["item 1", "item 2"]
- Ícones disponíveis: ${ICONES_DISPONIVEIS}
- Escolha o ícone mais adequado ao contexto

JSON puro sem markdown:
[
  {"tipo":"capa","titulo":"TÍTULO EM MAIÚSCULAS","subtitulo":"Subtítulo curto e direto"},
  {"tipo":"icones","titulo":"CONFIRA OS DIFERENCIAIS","itens":[{"icone":"shield","label":"Proteção total"},{"icone":"dollar-sign","label":"Melhor preço"}]},
  {"tipo":"lista","titulo":"O QUE ESTÁ INCLUSO","itens":["Consultas médicas","Exames laboratoriais","Internação coberta"]},
  {"tipo":"cta","titulo":"FALE COMIGO AGORA","subtitulo":"Orçamento gratuito e sem compromisso"}
]`

  const response = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages:   [{ role: 'user', content: instrucao }],
  })

  const texto   = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonStr = limparJSON(texto)

  let dados: any[]
  try { dados = JSON.parse(jsonStr) }
  catch {
    console.error('[gerar-slides] parse error:', texto.slice(0, 300))
    throw new Error('Erro ao processar resposta da IA. Tente novamente.')
  }

  return dados.map((s, i) => ({ ...s, id: Math.random().toString(36).slice(2), ordem: i + 1 }))
}

export async function gerarLegenda(prompt: string, slides: any[]): Promise<string> {
  const titulos = slides.map(s => s.titulo).join(', ')
  const response = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{
      role: 'user',
      content: `Crie uma legenda para Instagram sobre: "${prompt}".
Slides: ${titulos}.

Formato:
- 3-4 linhas envolventes
- CTA no final (ex: "Me chame no direct! 📩" ou "Salve para não esquecer! 💾")
- Linha em branco
- Exatamente 5 hashtags

Só a legenda, sem explicações.`
    }],
  })
  return response.content[0].type === 'text' ? response.content[0].text.trim() : ''
}
