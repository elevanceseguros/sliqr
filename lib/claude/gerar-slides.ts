import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function limparJSON(texto: string): string {
  let s = texto.trim()
  s = s.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/i,'').trim()
  const m = s.match(/\[[\s\S]*\]/)
  return m ? m[0] : s
}

const ICONES = 'shield,heart,star,check-circle,zap,trending-up,users,clock,dollar-sign,award,lock,phone,target,bar-chart,briefcase,home,leaf,book,mail,info,stethoscope,piggy-bank,activity,map-pin'

export async function gerarSlides(prompt: string, qtdSlides: number) {
  const n = Math.max(3, Math.min(10, qtdSlides))

  const instrucao = `Você cria carrosséis educativos para Instagram de profissionais brasileiros.

Pedido: "${prompt}"
Crie exatamente ${n} slides.

TIPOS:
- "capa": slide 1 sempre. Título impactante + subtítulo curto.
- "icones": título + 2 ou 3 itens. CADA item DEVE ter um ícone DIFERENTE dos outros.
- "topico": título + corpo curto (máximo 2 frases).
- "lista": título + itens. Cada item MÁXIMO 4 palavras, sem vírgulas, sem parênteses.
- "cta": slide final sempre. Título de ação + subtítulo.

REGRAS CRÍTICAS:
- Títulos SEMPRE em MAIÚSCULAS, máximo 6 palavras
- Subtítulos e corpo: frase curta, máximo 10 palavras
- Itens de lista: MÁXIMO 4 palavras cada, direto ao ponto
- Labels de ícone (campo "label"): MÁXIMO 3 palavras
- Em slides de ícones: cada item DEVE ter um ícone diferente, escolha do contexto
- Ícones disponíveis: ${ICONES}
- NUNCA use o mesmo ícone duas vezes no mesmo slide

JSON puro sem markdown:
[
  {"tipo":"capa","titulo":"TÍTULO EM MAIÚSCULAS","subtitulo":"Subtítulo curto","icon_nome":"shield"},
  {"tipo":"icones","titulo":"OS 3 PILARES","itens":[{"icone":"shield","label":"Cobertura total"},{"icone":"dollar-sign","label":"Preço justo"},{"icone":"users","label":"Rede ampla"}],"icon_nome":"zap"},
  {"tipo":"lista","titulo":"PASSOS ESSENCIAIS","itens":["Avalie suas necessidades","Compare planos disponíveis","Verifique a rede","Analise carências"],"icon_nome":"check-circle"},
  {"tipo":"cta","titulo":"FALE COMIGO","subtitulo":"Análise gratuita e rápida","icon_nome":"phone"}
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

export async function gerarLegenda(prompt: string, slides: any[]): Promise<string> {
  const titulos = slides.map(s => s.titulo).join(' · ')
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{
      role: 'user',
      content: `Crie uma legenda para Instagram sobre: "${prompt}".
Slides: ${titulos}.

Formato:
- 3 linhas envolventes em português
- CTA no final (ex: "Me chama no direct! 📩")
- Linha em branco
- 5 hashtags relevantes

Apenas a legenda, sem explicações.`
    }],
  })
  return response.content[0].type === 'text' ? response.content[0].text.trim() : ''
}
