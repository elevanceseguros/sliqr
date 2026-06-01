import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe/config'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data: perfil } = await supabaseAdmin
      .from('perfis')
      .select('stripe_id')
      .eq('id', user.id)
      .single()

    if (!perfil?.stripe_id) return NextResponse.json({})

    const subs = await stripe.subscriptions.list({
      customer: perfil.stripe_id,
      status:   'active',
      limit:    1,
    })

    if (!subs.data.length) return NextResponse.json({})

    const sub = subs.data[0]
    // Busca metadados do checkout para pegar o plano
    const sessions = await stripe.checkout.sessions.list({
      customer:      perfil.stripe_id,
      limit:         5,
    })
    const plano_meta = sessions.data
      .find(s => s.metadata?.plano)?.metadata?.plano ?? ''

    return NextResponse.json({
      periodo_fim: sub.current_period_end,
      tipo:        sub.items.data[0]?.plan?.interval ?? 'month',
      status:      sub.status,
      plano_meta,
    })
  } catch (err: any) {
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
