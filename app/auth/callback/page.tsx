'use client'
import { useEffect, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

function CallbackProcessor() {
  const supabase     = createClient()
  const router       = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function processar() {
      const code       = searchParams.get('code')
      const token_hash = searchParams.get('token_hash')
      const type       = searchParams.get('type')
      const next       = searchParams.get('next') ?? '/criar'

      // 1. Recovery com token_hash nos query params
      if (type === 'recovery' && token_hash) {
        router.replace(`/nova-senha?token_hash=${token_hash}&type=recovery`)
        return
      }

      // 2. OAuth code exchange
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        router.replace(error ? '/login' : next)
        return
      }

      // 3. Implicit flow — lê o hash DA URL imediatamente
      const hash    = window.location.hash.substring(1)
      const hParams = new URLSearchParams(hash)
      const hType   = hParams.get('type')

      // Se o hash já tem type=recovery, vai direto para nova-senha
      if (hType === 'recovery') {
        router.replace('/nova-senha')
        return
      }

      // 4. Aguarda sessão ser processada pelo Supabase (implicit flow)
      // Primeiro tenta getSession que pode já ter a sessão do hash
      await new Promise(r => setTimeout(r, 300))
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        router.replace(next)
        return
      }

      // 5. Último recurso: ouve o evento
      const timeout = setTimeout(() => router.replace('/login'), 3000)

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        clearTimeout(timeout)
        subscription.unsubscribe()
        if (event === 'PASSWORD_RECOVERY') { router.replace('/nova-senha'); return }
        if (session) { router.replace(next); return }
        router.replace('/login')
      })

      return () => { clearTimeout(timeout); subscription.unsubscribe() }
    }

    processar()
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
