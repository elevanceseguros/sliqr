import Anthropic from '@anthropic-ai/sdk'
import { Slide, Tom } from '@/types'
import { v4 as uuid } from 'crypto'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const TOM_INSTRUCOES: Record<Tom, string> = {
  vender:   'Escreva com linguagem persuasiva, focada em benefícios e conversão. O objetivo é fazer o leitor querer comprar ou contratar.',
  ensinar:  'Escreva de forma educativa e clara. Explique como se estivesse ensinando alguém que não conhece o assunto.',
  urgencia: 'Crie senso de urgência real. Use dados, prazos e consequências de não agir. Seja direto e impactante.',
  inspirar: 'Escreva de forma motivacional e humana. Conecte emocionalmente, use histórias curtas e deixe o leitor esperançoso.',
}

export async function gerarSlides(
  tema: string,
  tom: Tom,
  qtdSlides: number
): Promise<Slide[]> {

  const prompt = `Você é um especialista em criação de conteúdo para Instagram.
Crie um carrossel de ${qtdSlides} slide(s) sobre o tema: "${tema}".

Estilo de comunicação: ${TOM_INSTRUCOES[tom]}

REGRAS IMPORTANTES:
- O slide 1 DEVE ter um título curto e impactante (máximo 8 palavras) que faça a pessoa parar de rolar o feed. Pense nisso como o gancho principal.
- Cada slide deve ter uma ideia única e clara — não repita informações.
- O corpo de cada slide deve ter no máximo 3 linhas curtas. Sem parágrafos longos.
- O último slide deve ter um convite à ação claro e direto (ex: "Me chama no WhatsApp", "Salva esse post", "Clica no link da bio").
- Use linguagem simples, do dia a dia. Nada muito técnico.
- Adapte o vocabulário para o nicho do tema informado.

Responda APENAS com um JSON válido, sem explicações, sem markdown, sem blocos de código.
Formato exato:
[
  {
    "ordem": 1,
    "titulo": "título curto e impactante",
    "corpo": "texto do slide\\nsegunda linha se necessário\\nterceira linha se necessário",
    "destaque": "frase curta em destaque visual (apenas no slide 1, máximo 5 palavras)"
  }
]

O campo "destaque" só existe no slide 1. Nos demais slides não inclua esse campo.`

  const response = await client.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages:   [{ role: 'user', content: prompt }],
  })

  const texto = response.content[0].type === 'text' ? response.content[0].text : ''

  let dados: Omit<Slide, 'id'>[]
  try {
    dados = JSON.parse(texto)
  } catch {
    throw new Error('Erro ao processar resposta da IA. Tente novamente.')
  }

  return dados.map(s => ({ ...s, id: Math.random().toString(36).slice(2) }))
}
