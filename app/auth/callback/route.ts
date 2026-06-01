import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  // Log para diagnóstico
  console.log('[callback] URL:', request.url)
  console.log('[callback] params:', Object.fromEntries(searchParams.entries()))
  const code       = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type       = searchParams.get('type')
  const error      = searchParams.get('error')

  if (error) {
    console.error('[auth/callback] erro:', error)
    return NextResponse.redirect(`${origin}/login?erro=auth`)
  }

  const cookieStore = cookies()

  // Destino após login
  const afterLoginCookie = cookieStore.get('sliqr_after_login')?.value
  const next = afterLoginCookie ? decodeURIComponent(afterLoginCookie) : '/criar'

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(toSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
            )
          } catch {}
        },
      },
    }
  )

  // Recovery: redireciona direto para /nova-senha passando token na URL
  // A página client-side processa o token sem depender de cookies
  if (type === 'recovery' && token_hash) {
    return NextResponse.redirect(`${origin}/nova-senha?token_hash=${token_hash}&type=recovery`)
  }

  // Email confirmation via token_hash
  if (token_hash && type) {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'email' | 'recovery' | 'invite' | 'email_change',
    })
    if (!verifyError) {
      return NextResponse.redirect(`${origin}/criar`)
    }
    console.error('[auth/callback] verifyOtp error:', verifyError)
  }

  // OAuth PKCE code exchange (email login)
  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (!exchangeError) {
      const response = NextResponse.redirect(`${origin}${next}`)
      response.cookies.delete('sliqr_after_login')
      // Evita que o callback fique no histórico do browser
      response.headers.set('Cache-Control', 'no-store')
      return response
    }
    console.error('[auth/callback] exchangeCodeForSession error:', exchangeError)
  }

  // Implicit flow: token vem no hash — redireciona para página que processa no client
  // O Supabase detecta automaticamente o hash e seta a sessão
  const response = NextResponse.redirect(`${origin}${next}`)
  response.cookies.delete('sliqr_after_login')
  response.headers.set('Cache-Control', 'no-store')
  return response
}
