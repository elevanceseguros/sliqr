import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { gerarSlides } from '@/lib/claude/gerar-slides'
import { LIMITES } from '@/lib/plano-limites'

const MAX_POSTS_FREE = 1

export async function POST(request: NextRequest) {
  try {
    const { tema, tom, qtdSlides, nomeEmpresa, accessToken } = await request.json()
    if (!tema) return NextResponse.json({ erro: 'Tema obrigatório' }, { status: 400 })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    if (accessToken) {
      const { data: { user } } = await supabase.auth.getUser(accessToken)

      if (user) {
        // Buscar perfil atual
        const { data: perfil } = await supabase
          .from('perfis')
          .select('plano, posts_hoje')
          .eq('id', user.id)
          .single()

        const plano      = perfil?.plano ?? 'free'
        const postsHoje  = perfil?.posts_hoje ?? 0
        const limites    = LIMITES[plano] ?? LIMITES.free
        const maxPosts   = limites.maxPosts

        // Enforcement: bloquear se atingiu o limite
        if (maxPosts < 999 && postsHoje >= maxPosts) {
          return NextResponse.json(
            { erro: `Limite de ${maxPosts} post${maxPosts > 1 ? 's' : ''} por dia atingido. Faça upgrade para continuar.` },
            { status: 429 }
          )
        }

        // Limitar qtdSlides ao máximo do plano
        const qtdFinal = Math.min(qtdSlides ?? 5, limites.maxSlides)

        // Incrementar posts_hoje
        await supabase
          .from('perfis')
          .update({ posts_hoje: postsHoje + 1 })
          .eq('id', user.id)

        const slides = await gerarSlides(tema, qtdFinal, nomeEmpresa)
        return NextResponse.json({ slides })
      }
    }

    // Sem auth: gera normalmente (usuário não logado — limitado pelo front)
    const slides = await gerarSlides(tema, qtdSlides ?? 5, nomeEmpresa)
    return NextResponse.json({ slides })

  } catch (err: any) {
    console.error('[/api/gerar]', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
