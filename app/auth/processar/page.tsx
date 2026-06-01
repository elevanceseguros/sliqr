'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ProcessarAuth() {
  const supabase = createClient()
  const router   = useRouter()

  useEffect(() => {
    async function processar() {
      // Aguarda um tick para garantir que o Supabase processou o hash
      await new Promise(r => setTimeout(r, 500))

      // Tenta pegar sessão — o Supabase client processa o hash automaticamente
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        router.replace('/criar')
        return
      }

      // Sem sessão — fallback
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
