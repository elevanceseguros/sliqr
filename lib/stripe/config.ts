import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript:  true,
})

export const PLANOS = {
  starter: {
    nome:    'Starter',
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!,
    preco:   3700,
  },
  pro: {
    nome:    'Pro',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
    preco:   7700,
  },
  ilimitado: {
    nome:    'Ilimitado',
    priceId: process.env.NEXT_PUBLIC_STRIPE_ILIMITADO_PRICE_ID!,
    preco:   14700,
  },
}
