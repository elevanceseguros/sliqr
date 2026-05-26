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
  const prompt = `Você cria carrosséis para Instagram no estilo educativo/informativo.
Tema: "${tema}" | Tom: ${TOM_INSTRUCOES[tom]} | Slides: ${qtdSlides}

TIPOS DE SLIDE (use variedade):
- tipo "capa": slide 1. Título grande em maiúsculas + subtítulo curto. SEM itens.
- tipo "icones": título + 2 a 3 itens com ícone e label curta (ex: "🏥 Hospitais" / "💊 Medicamentos")  
- tipo "lista": título + 3 a 5 linhas de texto corrido (pode usar ✅ no início)
- tipo "cta": último slide. Título grande (ex: "FALE COMIGO AGORA") + botão (ex: "CLIQUE NO LINK DA BIO")

REGRAS:
- Título SEMPRE em maiúsculas
- Textos curtos e diretos
- Slide capa: subtítulo em minúsculas, frase de impacto
- Slide CTA: campo "botao" com texto do botão

Responda SOMENTE com JSON:
[
  {"ordem":1,"tipo":"capa","titulo":"SEU PLANO DE SAÚDE AINDA VALE A PENA?","subtitulo":"O mercado muda. Sua saúde merece o melhor."},
  {"ordem":2,"tipo":"icones","titulo":"CONFIRA A REDE E O REEMBOLSO","itens":[{"icone":"🏥","label":"Hospitais & Médicos"},{"icone":"💰","label":"Valor de volta"}]},
  {"ordem":3,"tipo":"lista","titulo":"O QUE TODO PLANO PRECISA TER","corpo":"✅ Consultas e exames cobertos\\n✅ Rede credenciada ampla\\n✅ Internação com acompanhante\\n✅ Carência reduzida"},
  {"ordem":4,"tipo":"cta","titulo":"SOLICITE SUA ANÁLISE GRATUITA","botao":"CLIQUE NO LINK DA BIO"}
]`

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

  // Normaliza para compatibilidade com tipo Slide
  return dados.map(s => ({
    ...s,
    id:     Math.random().toString(36).slice(2),
    titulo: s.titulo ?? '',
    corpo:  s.subtitulo ?? (s.corpo ?? '') ,
    destaque: s.botao ?? '',
  }))
}
