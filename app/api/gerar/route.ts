import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { gerarSlides } from '@/lib/claude/gerar-slides'
import { LIMITES_PLANO, Tom, Plano } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    // Busca perfil e verifica limites
    const { data: perfil } = await supabase
      .from('perfis')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!perfil) {
      return NextResponse.json({ erro: 'Perfil não encontrado' }, { status: 404 })
    }

    const plano = perfil.plano as Plano
    const limites = LIMITES_PLANO[plano]

    // Verifica limite diário
    const hoje = new Date().toISOString().split('T')[0]
    const ultimoReset = perfil.ultimo_reset?.split('T')[0]

    // Reseta contador se for novo dia
    if (ultimoReset !== hoje) {
      await supabase
        .from('perfis')
        .update({ posts_hoje: 0, ultimo_reset: new Date().toISOString() })
        .eq('id', user.id)
      perfil.posts_hoje = 0
    }

    if (limites.postsPerDay !== -1 && perfil.posts_hoje >= limites.postsPerDay) {
      return NextResponse.json({
        erro: `Você atingiu o limite de ${limites.postsPerDay} post(s) por dia do plano ${plano}. Faça upgrade para continuar.`,
        limite: true,
      }, { status: 429 })
    }

    const body = await request.json()
    const { tema, tom, qtdSlides } = body as { tema: string; tom: Tom; qtdSlides: number }

    if (!tema || !tom) {
      return NextResponse.json({ erro: 'Tema e tom são obrigatórios' }, { status: 400 })
    }

    // Respeita limite de slides do plano
    const slidesPermitidos = Math.min(qtdSlides, limites.slidesPerPost)

    // Gera slides com Claude
    const slides = await gerarSlides(tema, tom, slidesPermitidos)

    // Salva carrossel no banco
    const { data: carrossel, error } = await supabase
      .from('carrosseis')
      .insert({
        usuario_id: user.id,
        tema,
        tom,
        slides,
        status: 'pronto',
      })
      .select()
      .single()

    if (error) throw error

    // Incrementa contador diário
    await supabase
      .from('perfis')
      .update({ posts_hoje: perfil.posts_hoje + 1 })
      .eq('id', user.id)

    return NextResponse.json({ carrossel_id: carrossel.id, slides })

  } catch (err: any) {
    console.error('[/api/gerar]', err)
    return NextResponse.json(
      { erro: err.message ?? 'Erro interno. Tente novamente.' },
      { status: 500 }
    )
  }
}
