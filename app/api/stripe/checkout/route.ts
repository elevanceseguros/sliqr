import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createAnonClient } from '@supabase/supabase-js'
import { stripe, PLANOS } from '@/lib/stripe/config'

export async function POST(request: NextRequest) {
  try {
    let user = null

    // 1. Tenta autenticar via Bearer token (vindo do checkout-redirect)
    const authHeader = request.headers.get('Authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7)
      const supabaseAnon = createAnonClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabaseAnon.auth.getUser(token)
      user = data.user
    }

    // 2. Fallback: tenta via cookie de sessão
    if (!user) {
      const supabase = createServerClient()
      const { data } = await supabase.auth.getUser()
      user = data.user
    }

    if (!user) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    const { plano, periodo } = await request.json() as {
      plano:   keyof typeof PLANOS
      periodo: 'mensal' | 'anual'
    }

    const config = PLANOS[plano]
    if (!config) {
      return NextResponse.json({ erro: 'Plano inválido' }, { status: 400 })
    }

    const priceId = periodo === 'anual' ? config.priceIdAnual : config.priceId

    // Buscar stripe_id do perfil
    const supabaseAdmin = createAnonClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data: perfil } = await supabaseAdmin
      .from('perfis')
      .select('stripe_id')
      .eq('id', user.id)
      .single()

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!

    const session = await stripe.checkout.sessions.create({
      customer:             perfil?.stripe_id ?? undefined,
      customer_email:       perfil?.stripe_id ? undefined : user.email!,
      mode:                 'subscription',
      payment_method_types: ['card'],
      line_items:           [{ price: priceId, quantity: 1 }],
      success_url:          `${appUrl}/criar?upgrade=sucesso`,
      cancel_url:           `${appUrl}/criar?upgrade=cancelado`,
      metadata:             { usuario_id: user.id, plano, periodo },
      locale:               'pt-BR',
    })

    return NextResponse.json({ url: session.url })

  } catch (err: any) {
    console.error('[/api/stripe/checkout]', err)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
