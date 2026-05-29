import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript:  true,
})

export const PLANOS = {
  starter: {
    nome:         'Starter',
    priceId:      process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!,
    priceIdAnual: process.env.NEXT_PUBLIC_STRIPE_STARTER_ANUAL_PRICE_ID!,
    preco:        3700,
    precoAnual:   2800, // R$28/mês × 12 = R$333/ano
  },
  pro: {
    nome:         'Pro',
    priceId:      process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
    priceIdAnual: process.env.NEXT_PUBLIC_STRIPE_PRO_ANUAL_PRICE_ID!,
    preco:        7700,
    precoAnual:   5800, // R$58/mês × 12 = R$693/ano
  },
  ilimitado: {
    nome:         'Ilimitado',
    priceId:      process.env.NEXT_PUBLIC_STRIPE_ILIMITADO_PRICE_ID!,
    priceIdAnual: process.env.NEXT_PUBLIC_STRIPE_ILIMITADO_ANUAL_PRICE_ID!,
    preco:        14700,
    precoAnual:   11100, // R$111/mês × 12 = R$1.332/ano
  },
}
