# Sliqr — Setup do Projeto

## Pré-requisitos
- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- Conta no [Stripe](https://stripe.com)
- Conta na [Anthropic](https://console.anthropic.com)
- Conta na [Vercel](https://vercel.com)

---

## 1. Clonar e instalar

```bash
git clone https://github.com/SEU_USUARIO/sliqr.git
cd sliqr
npm install
```

---

## 2. Supabase

1. Crie um projeto em supabase.com
2. Vá em **SQL Editor** e execute o conteúdo de `supabase-schema.sql`
3. Vá em **Authentication → Providers** e ative **Google**
   - Crie credenciais OAuth em console.cloud.google.com
   - Cole Client ID e Secret no Supabase
4. Copie as chaves em **Project Settings → API**

---

## 3. Stripe

1. Crie conta em stripe.com
2. Crie 3 produtos (Starter R$37, Pro R$77, Ilimitado R$147)
   - Cada produto com cobrança recorrente mensal
3. Copie os Price IDs de cada produto
4. Configure o Webhook apontando para `https://seudominio.com/api/stripe/webhook`
   - Eventos: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`

---

## 4. Variáveis de ambiente

```bash
cp .env.local.example .env.local
# Preencha todas as variáveis
```

---

## 5. Rodar local

```bash
npm run dev
# http://localhost:3000
```

Para testar webhooks do Stripe localmente:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 6. Deploy na Vercel

1. Push para o GitHub
2. Importe o repositório na Vercel
3. Configure as variáveis de ambiente no painel da Vercel
4. Deploy automático a cada push na main

---

## Estrutura de pastas

```
app/
  (auth)/login        → tela de login
  (auth)/cadastro     → tela de cadastro
  (dashboard)/criar   → gerador principal
  (dashboard)/editor  → editor de slides
  api/gerar           → chamada ao Claude
  api/slides/render   → renderização PNG
  api/stripe/         → checkout e webhook
lib/
  claude/             → prompt e geração
  supabase/           → clientes browser e server
  stripe/             → config e helpers
types/                → interfaces TypeScript
```
