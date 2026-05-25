import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Usa service role para bypassar RLS no webhook
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body      = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ erro: `Webhook inválido: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {

    case 'checkout.session.completed': {
      const session  = event.data.object as Stripe.CheckoutSession
      const usuarioId = session.metadata?.usuario_id
      const plano     = session.metadata?.plano
      const customerId = session.customer as string

      if (usuarioId && plano) {
        await supabaseAdmin
          .from('perfis')
          .update({ plano, stripe_id: customerId })
          .eq('id', usuarioId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub        = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string

      await supabaseAdmin
        .from('perfis')
        .update({ plano: 'free' })
        .eq('stripe_id', customerId)
      break
    }

    case 'customer.subscription.updated': {
      const sub        = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string
      const status     = sub.status

      if (status === 'past_due' || status === 'unpaid' || status === 'canceled') {
        await supabaseAdmin
          .from('perfis')
          .update({ plano: 'free' })
          .eq('stripe_id', customerId)
      }
      break
    }
  }

  return NextResponse.json({ recebido: true })
}
