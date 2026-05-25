import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const { accessToken, refreshToken, empresa } = await request.json()

    if (!accessToken) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })

    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })

    const prompt = `Você é um estrategista de conteúdo para Instagram especializado em pequenos negócios brasileiros.

Empresa: ${empresa.nome}
Segmento: ${empresa.segmento}
O que vende: ${empresa.produtos || empresa.descricao}
Público-alvo: ${empresa.publico || 'público geral'}
Objetivo: ${empresa.objetivo || 'vender mais'}
${empresa.instagram ? `Instagram: @${empresa.instagram}` : ''}

Gere 8 sugestões de temas para carrosséis do Instagram para esta empresa.
Cada sugestão deve ser específica para o negócio real — não genérica.
Pense em temas que gerem engajamento E vendas ao mesmo tempo.
Varie os formatos: educativo, bastidores, comparação, lista, dúvidas frequentes, prova social.

Responda APENAS com JSON puro, sem markdown:
[
  {"tema":"tema do post","descricao":"o que abordar em 1 frase","tom":"vender"},
  ...
]

Valores válidos para tom: "vender", "ensinar", "urgencia", "inspirar"`

    const response = await anthropic.messages.create({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages:   [{ role: 'user', content: prompt }],
    })

    const texto   = response.content[0].type === 'text' ? response.content[0].text : ''
    const limpo   = texto.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
    const match   = limpo.match(/\[[\s\S]*\]/)
    const jsonStr = match ? match[0] : limpo

    let sugestoes: any[]
    try { sugestoes = JSON.parse(jsonStr) }
    catch { return NextResponse.json({ erro: 'Erro ao gerar sugestões' }, { status: 500 }) }

    // Salva no banco
    await supabase.from('sugestoes').delete().eq('usuario_id', user.id).eq('usado', false)
    await supabase.from('sugestoes').insert(
      sugestoes.map(s => ({ usuario_id: user.id, tema: s.tema, descricao: s.descricao, tom: s.tom ?? 'vender' }))
    )

    return NextResponse.json({ sugestoes })

  } catch (err: any) {
    console.error('[/api/sugestoes]', err)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.nextUrl.searchParams.get('token')
    if (!accessToken) return NextResponse.json({ sugestoes: [] })

    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user) return NextResponse.json({ sugestoes: [] })

    const { data } = await supabase
      .from('sugestoes')
      .select('*')
      .eq('usuario_id', user.id)
      .eq('usado', false)
      .order('criado_em', { ascending: false })
      .limit(8)

    return NextResponse.json({ sugestoes: data ?? [] })
  } catch {
    return NextResponse.json({ sugestoes: [] })
  }
}
