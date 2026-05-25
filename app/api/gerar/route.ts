import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { gerarSlides } from '@/lib/claude/gerar-slides'
import { LIMITES_PLANO, Tom, Plano } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tema, tom, qtdSlides, accessToken, refreshToken } = body as {
      tema: string; tom: Tom; qtdSlides: number
      accessToken?: string; refreshToken?: string
    }

    if (!accessToken) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    // Usa service role para buscar usuário pelo token
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Valida o token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken)

    if (userError || !user) {
      return NextResponse.json({ erro: 'Token inválido' }, { status: 401 })
    }

    const { data: perfil } = await supabaseAdmin
      .from('perfis')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!perfil) {
      return NextResponse.json({ erro: 'Perfil não encontrado' }, { status: 404 })
    }

    const plano   = (perfil.plano ?? 'free') as Plano
    const limites = LIMITES_PLANO[plano]

    const hoje        = new Date().toISOString().split('T')[0]
    const ultimoReset = perfil.ultimo_reset?.split('T')[0]
    let postsHoje     = perfil.posts_hoje ?? 0

    if (ultimoReset !== hoje) {
      await supabaseAdmin.from('perfis').update({ posts_hoje: 0, ultimo_reset: new Date().toISOString() }).eq('id', user.id)
      postsHoje = 0
    }

    if (limites.postsPerDay !== -1 && postsHoje >= limites.postsPerDay) {
      return NextResponse.json({
        erro: `Limite de ${limites.postsPerDay} post(s) por dia atingido. Faça upgrade para continuar.`,
        limite: true,
      }, { status: 429 })
    }

    if (!tema || !tom) {
      return NextResponse.json({ erro: 'Tema e tom são obrigatórios' }, { status: 400 })
    }

    const slidesPermitidos = Math.min(qtdSlides, limites.slidesPerPost)
    const slides = await gerarSlides(tema, tom, slidesPermitidos)

    const { data: carrossel, error } = await supabaseAdmin
      .from('carrosseis')
      .insert({ usuario_id: user.id, tema, tom, slides, status: 'pronto' })
      .select()
      .single()

    if (error) throw error

    await supabaseAdmin.from('perfis').update({ posts_hoje: postsHoje + 1 }).eq('id', user.id)

    return NextResponse.json({ carrossel_id: carrossel.id, slides })

  } catch (err: any) {
    console.error('[/api/gerar]', err)
    return NextResponse.json({ erro: err.message ?? 'Erro interno.' }, { status: 500 })
  }
}
