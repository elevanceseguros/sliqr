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

    // 1. Recovery com token_hash nos query params
    if (type === 'recovery' && token_hash) {
      router.replace(`/nova-senha?token_hash=${token_hash}&type=recovery`)
      return
    }

    // 2. Lê o hash da URL imediatamente — disponível antes de qualquer async
    const hash    = window.location.hash.substring(1)
    const hParams = new URLSearchParams(hash)
    const hType   = hParams.get('type')
    const hToken  = hParams.get('access_token')

    if (hType === 'recovery') {
      router.replace('/nova-senha')
      return
    }

    // 3. OAuth code exchange
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        router.replace(error ? '/login' : next)
      })
      return
    }

    // 4. Tem access_token no hash — implicit flow, OAuth Google
    if (hToken) {
      // Supabase já processou automaticamente, vai para destino
      router.replace(next)
      return
    }

    // 5. Nada reconhecido — fallback
    router.replace('/login')
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
