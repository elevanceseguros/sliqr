'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function CallbackProcessor() {
  const supabase     = createClient()
  const router       = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function processar() {
      // Parâmetros que podem vir como query params
      const code       = searchParams.get('code')
      const token_hash = searchParams.get('token_hash')
      const type       = searchParams.get('type')
      const next       = searchParams.get('next') ?? '/criar'
      const error      = searchParams.get('error')

      if (error) {
        router.replace('/login?erro=auth')
        return
      }

      // Recovery com token_hash
      if (type === 'recovery' && token_hash) {
        router.replace(`/nova-senha?token_hash=${token_hash}&type=recovery`)
        return
      }

      // OAuth code exchange
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.replace(next)
          return
        }
      }

      // Implicit flow: token pode estar no hash da URL
      // Aguarda o Supabase processar automaticamente
      await new Promise(r => setTimeout(r, 800))
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        // Verifica se é recovery pelo hash
        const hash   = window.location.hash.substring(1)
        const hParams = new URLSearchParams(hash)
        if (hParams.get('type') === 'recovery') {
          router.replace('/nova-senha')
          return
        }
        router.replace(next)
        return
      }

      router.replace('/login')
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
