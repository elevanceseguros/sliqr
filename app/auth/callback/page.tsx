'use client'
import { useEffect, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

function CallbackProcessor() {
  const supabase     = createClient()
  const router       = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code       = searchParams.get('code')
    const token_hash = searchParams.get('token_hash')
    const type       = searchParams.get('type')
    const next       = searchParams.get('next') ?? '/criar'

    // Recovery com token_hash nos query params
    if (type === 'recovery' && token_hash) {
      router.replace(`/nova-senha?token_hash=${token_hash}&type=recovery`)
      return
    }

    // OAuth code exchange
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (!error) router.replace(next)
        else router.replace('/login')
      })
      return
    }

    // Implicit flow: aguarda onAuthStateChange que dispara quando
    // o Supabase processa o hash #access_token automaticamente
    const timeout = setTimeout(() => {
      // Timeout de segurança — se não processou em 3s, vai para login
      router.replace('/login')
    }, 3000)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      clearTimeout(timeout)
      subscription.unsubscribe()

      if (event === 'PASSWORD_RECOVERY') {
        router.replace('/nova-senha')
        return
      }

      if (session) {
        router.replace(next)
        return
      }

      router.replace('/login')
    })

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#080B12' }}>
      <div style={{ position:'relative', width:'40px', height:'40px' }}>
        <div style={{ position:'absolute', inset:0, border:'3px solid rgba(45,111,255,0.15)', borderRadius:'50%' }}/>
        <div style={{ position:'absolute', inset:0, border:'3px solid transparent', borderTopColor:'#2D6FFF', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export default function CallbackPage() {
  return <Suspense><CallbackProcessor /></Suspense>
}
