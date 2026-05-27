import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function limparJSON(texto: string): string {
  let s = texto.trim()
  s = s.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/i,'').trim()
  const m = s.match(/\[[\s\S]*\]/)
  return m ? m[0] : s
}

const ICONES = 'shield,heart,star,check-circle,zap,trending-up,users,clock,dollar-sign,award,lock,phone,target,bar-chart,briefcase,home,leaf,book,mail,info,stethoscope,piggy-bank,activity,map-pin'

export async function gerarSlides(prompt: string, qtdSlides: number, nomeEmpresa?: string) {
  const n = Math.max(3, Math.min(10, qtdSlides))
  const empresa = nomeEmpresa ? `\nNOME DA EMPRESA/PRODUTO: "${nomeEmpresa}" — use esse nome no conteúdo quando fizer sentido.` : ''

  const instrucao = `Você é um copywriter especialista em conteúdo para Instagram de pequenos negócios brasileiros.
${empresa}

PEDIDO DO CLIENTE: "${prompt}"
Crie exatamente ${n} slides de carrossel para Instagram.

TIPOS DE SLIDE:
- "capa": OBRIGATÓRIO como slide 1. Título gancho + subtítulo que explique o contexto.
- "icones": Título + 3 itens com ícone. Cada item deve ter sentido REAL no contexto do pedido. Ícones DIFERENTES entre si.
- "topico": Título impactante + corpo explicativo com dado concreto (número, comparação, fato).
- "lista": Título + 3 a 5 itens numerados. Cada item direto e útil.
- "cta": OBRIGATÓRIO como último slide. Chamada para ação clara com o nome da empresa se fornecido.

REGRAS DE CONTEÚDO:
- Cada slide deve ter conteúdo ESPECÍFICO ao pedido — não genérico
- Titulos: MAIÚSCULAS, máximo 5 palavras, impactantes
- Corpo/subtítulo: frase direta com dado real ou benefício concreto
- Itens de lista/ícones: máximo 5 palavras cada, sem vírgulas
- Se o pedido mencionar empresa/produto, use o nome nos slides relevantes
- Para comparativos: o slide "icones" deve mostrar LADOS DO COMPARATIVO (ex: restaurante vs marmita)
- Para benefícios: liste benefícios REAIS e ESPECÍFICOS
- CTA: mencione o nome da empresa e uma ação concreta (ex: "Peça sua marmita Hortelã hoje")

ÍCONES disponíveis: ${ICONES}
Nunca use o mesmo ícone duas vezes no mesmo slide de ícones.

JSON puro sem markdown:
[
  {"tipo":"capa","titulo":"TÍTULO GANCHO","subtitulo":"Contexto direto e relevante"},
  {"tipo":"icones","titulo":"COMPARATIVO REAL","itens":[{"icone":"dollar-sign","label":"Restaurante R$60"},{"icone":"trending-up","label":"Delivery R$45"},{"icone":"leaf","label":"Marmita R$25"}]},
  {"tipo":"topico","titulo":"O CUSTO REAL","corpo":"Comer fora 20 dias por mês: R$ 1.200. Marmita Hortelã: R$ 500. Economia de R$ 700.","icon_nome":"bar-chart"},
  {"tipo":"lista","titulo":"VANTAGENS DA MARMITA","itens":["Sem fila nem espera","Você escolhe os ingredientes","Entrega no trabalho"],"icon_nome":"check-circle"},
  {"tipo":"cta","titulo":"EXPERIMENTE HOJE","subtitulo":"Peça sua marmita Hortelã e economize desde amanhã"}
]`

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages: [{ role: 'user', content: instrucao }],
  })

  const texto   = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonStr = limparJSON(texto)

  let dados: any[]
  try { dados = JSON.parse(jsonStr) }
  catch {
    console.error('[gerar-slides] parse error:', texto.slice(0,300))
    throw new Error('Erro ao processar resposta da IA. Tente novamente.')
  }

  return dados.map((s,i) => ({...s, id: Math.random().toString(36).slice(2), ordem: i+1}))
}

export async function gerarLegenda(prompt: string, slides: any[], nomeEmpresa?: string): Promise<string> {
  const empresa = nomeEmpresa ? ` para ${nomeEmpresa}` : ''
  const titulos = slides.map(s => s.titulo).join(' · ')

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{
      role: 'user',
      content: `Crie uma legenda para Instagram${empresa} sobre: "${prompt}".
Slides: ${titulos}.

Formato:
- 3 linhas envolventes e específicas ao tema
- Mencione a empresa${nomeEmpresa ? ` (${nomeEmpresa})` : ''} se relevante
- CTA direto no final (ex: "Pede a sua! 🍱" ou "Me chama no direct! 📩")
- Linha em branco
- 5 hashtags relevantes ao nicho

Apenas a legenda, sem explicações.`
    }],
  })
  return response.content[0].type === 'text' ? response.content[0].text.trim() : ''
}
