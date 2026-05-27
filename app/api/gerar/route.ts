import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { gerarSlides } from '@/lib/claude/gerar-slides'

export async function POST(request: NextRequest) {
  try {
    const { tema, tom, qtdSlides, nomeEmpresa, accessToken, refreshToken } = await request.json()
    if (!tema) return NextResponse.json({ erro: 'Tema obrigatório' }, { status: 400 })

    // Auth opcional
    if (accessToken) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      const { data: { user } } = await supabase.auth.getUser(accessToken)
      if (user) {
        // Atualiza posts_hoje
        await supabase.from('perfis')
          .update({ posts_hoje: 1 })
          .eq('id', user.id)
      }
    }

    const slides = await gerarSlides(tema, qtdSlides ?? 5, nomeEmpresa)
    return NextResponse.json({ slides })

  } catch (err: any) {
    console.error('[/api/gerar]', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
