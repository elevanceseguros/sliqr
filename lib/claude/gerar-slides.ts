import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function limparJSON(texto: string): string {
  let s = texto.trim()
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  const match = s.match(/\[[\s\S]*\]/)
  return match ? match[0] : s
}

export async function gerarSlides(prompt: string, qtdSlides: number) {
  const instrucao = `Você cria carrosséis educativos para Instagram de profissionais (corretores, contadores, advogados, nutricionistas, etc).

O usuário pediu: "${prompt}"
Crie ${qtdSlides} slides.

TIPOS disponíveis:
- "capa": slide 1 sempre. Título impactante + subtítulo curto.
- "topico": um ponto por slide. Título + corpo com 2-4 linhas + icon_nome (nome de ícone para representar visualmente).
- "lista": título + até 5 itens com ícone de check. Use para "N razões", "N dicas", etc.
- "cta": último slide sempre. Título de ação + subtítulo de apoio.

ICON_NOME deve ser um destes (escolha o mais adequado):
shield, heart, star, check-circle, zap, trending-up, users, clock, dollar-sign, award,
lock, globe, phone, mail, alert-circle, info, target, bar-chart, briefcase, home,
leaf, sun, moon, camera, book, graduation-cap, handshake, piggy-bank, stethoscope, scale

REGRAS:
- Títulos curtos e impactantes (máx 6 palavras)
- Corpo: frases diretas, linguagem simples
- Último slide: título = chamada para ação (ex: "Fale Comigo Agora")
- Tom profissional mas humano
- Para listas: itens no campo "itens" (array de strings, máx 5)

JSON puro, sem markdown:
[
  {"tipo":"capa","titulo":"TÍTULO EM MAIÚSCULAS","subtitulo":"Subtítulo explicativo curto"},
  {"tipo":"topico","titulo":"TÍTULO DO TÓPICO","corpo":"Explicação em 2-3 linhas diretas.","icon_nome":"shield"},
  {"tipo":"lista","titulo":"O QUE ESTÁ INCLUSO","itens":["Item um","Item dois","Item três"],"icon_nome":"check-circle"},
  {"tipo":"cta","titulo":"FALE COMIGO AGORA","subtitulo":"Resposta rápida e sem compromisso"}
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
Os slides abordam: ${titulos}.

Formato:
- 3-4 linhas envolventes
- CTA no final (ex: "Salve para não esquecer! 💾")
- Linha em branco
- Exatamente 5 hashtags relevantes

Responda apenas com a legenda pronta, sem explicações.`
    }],
  })

  return response.content[0].type === 'text' ? response.content[0].text.trim() : ''
}
