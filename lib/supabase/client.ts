import { createBrowserClient } from '@supabase/ssr'

// Storage customizado que usa cookies em vez de localStorage
// Necessário para que o PKCE code verifier seja acessível pelo servidor no callback
function cookieStorage() {
  return {
    getItem(key: string): string | null {
      if (typeof document === 'undefined') return null
      const match = document.cookie.match(new RegExp('(^| )' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]+)'))
      return match ? decodeURIComponent(match[2]) : null
    },
    setItem(key: string, value: string): void {
      if (typeof document === 'undefined') return
      document.cookie = `${key}=${encodeURIComponent(value)};path=/;max-age=3600;samesite=lax${location.protocol === 'https:' ? ';secure' : ''}`
    },
    removeItem(key: string): void {
      if (typeof document === 'undefined') return
      document.cookie = `${key}=;path=/;max-age=0`
    },
  }
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        storage: cookieStorage(),
      },
    }
  )
}
