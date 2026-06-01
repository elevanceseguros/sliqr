'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ProcessarAuth() {
  const supabase = createClient()
  const router   = useRouter()

  useEffect(() => {
    async function processar() {
      // Lê o hash da URL — ex: #access_token=...&type=recovery
      const hash   = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const type   = params.get('type')

      // Aguarda o Supabase processar a sessão do hash automaticamente
      const { data: { session } } = await supabase.auth.getSession()

      if (type === 'recovery' || params.get('access_token')) {
        // É um recovery — vai para nova senha
        router.replace('/nova-senha')
        return
      }

      if (session) {
        // Sessão ativa — vai para o app
        router.replace('/criar')
        return
      }

      // Fallback
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
