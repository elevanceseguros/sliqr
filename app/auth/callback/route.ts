import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code       = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type       = searchParams.get('type')
  const next       = searchParams.get('next') ?? '/criar'
  const error      = searchParams.get('error')

  if (error) {
    console.error('[auth/callback] erro:', error)
    return NextResponse.redirect(`${origin}/login?erro=auth`)
  }

  const cookieStore = cookies()
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

  // OAuth code exchange
  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`)
    }
    console.error('[auth/callback] exchangeCodeForSession error:', exchangeError)
  }

  return NextResponse.redirect(`${origin}/login?erro=auth`)
}
