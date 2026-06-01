import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAnonClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe/config'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    }

    const token = authHeader.slice(7)
    const supabase = createAnonClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })

    const supabaseAdmin = createAnonClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data: perfil } = await supabaseAdmin
      .from('perfis')
      .select('stripe_id')
      .eq('id', user.id)
      .single()

    if (!perfil?.stripe_id) {
      return NextResponse.json({ erro: 'Sem assinatura ativa' }, { status: 400 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer:   perfil.stripe_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/planos`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
