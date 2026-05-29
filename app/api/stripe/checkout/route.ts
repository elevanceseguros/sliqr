import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, PLANOS } from '@/lib/stripe/config'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

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

    const { data: perfil } = await supabase
      .from('perfis')
      .select('stripe_id, email')
      .eq('id', user.id)
      .single()

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!

    const session = await stripe.checkout.sessions.create({
      customer:             perfil?.stripe_id ?? undefined,
      customer_email:       perfil?.stripe_id ? undefined : user.email,
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
