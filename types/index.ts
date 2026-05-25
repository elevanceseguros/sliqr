// ── Planos ──────────────────────────────────────────────
export type Plano = 'free' | 'starter' | 'pro' | 'ilimitado'

export const LIMITES_PLANO: Record<Plano, { postsPerDay: number; slidesPerPost: number; watermark: boolean; editor: boolean; logo: boolean }> = {
  free:      { postsPerDay: 1,  slidesPerPost: 1,  watermark: true,  editor: false, logo: false },
  starter:   { postsPerDay: 1,  slidesPerPost: 5,  watermark: false, editor: true,  logo: false },
  pro:       { postsPerDay: 2,  slidesPerPost: 10, watermark: false, editor: true,  logo: true  },
  ilimitado: { postsPerDay: -1, slidesPerPost: 10, watermark: false, editor: true,  logo: true  },
}

export const PRECOS_STRIPE: Record<Exclude<Plano, 'free'>, string> = {
  starter:   process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID  ?? '',
  pro:       process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID      ?? '',
  ilimitado: process.env.NEXT_PUBLIC_STRIPE_ILIMITADO_PRICE_ID ?? '',
}

// ── Tom de voz ───────────────────────────────────────────
export type Tom = 'vender' | 'ensinar' | 'urgencia' | 'inspirar'

export const TOM_LABELS: Record<Tom, string> = {
  vender:   'Quero vender',
  ensinar:  'Quero ensinar',
  urgencia: 'Criar urgência',
  inspirar: 'Inspirar pessoas',
}

// ── Slide ────────────────────────────────────────────────
export interface Slide {
  id:        string
  ordem:     number
  titulo:    string
  corpo:     string
  destaque?: string   // frase curta em tamanho grande (slide de abertura)
}

// ── Carrossel ────────────────────────────────────────────
export interface Carrossel {
  id:          string
  usuario_id:  string
  tema:        string
  tom:         Tom
  slides:      Slide[]
  criado_em:   string
  status:      'gerando' | 'pronto' | 'erro'
}

// ── Usuário (perfil estendido) ───────────────────────────
export interface Perfil {
  id:            string
  email:         string
  nome?:         string
  plano:         Plano
  logo_url?:     string
  cor_marca?:    string
  stripe_id?:    string
  posts_hoje:    number
  ultimo_reset:  string   // ISO date
}

// ── Resposta da API de geração ───────────────────────────
export interface RespostaGerar {
  carrossel_id: string
  slides:       Slide[]
  erro?:        string
}
