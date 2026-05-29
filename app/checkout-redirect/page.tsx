'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function CheckoutRedirect() {
  const supabase     = createClient()
  const searchParams = useSearchParams()
  const plano        = searchParams.get('plano')
  const periodo      = searchParams.get('periodo') ?? 'mensal'
  const [erro, setErro]     = useState('')
  const [status, setStatus] = useState('Aguardando sessão...')

  useEffect(() => {
    if (!plano) { window.location.href = '/criar'; return }

    async function tentarCheckout() {
      setStatus('Preparando seu pagamento...')
      try {
        const res  = await fetch('/api/stripe/checkout', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ plano, periodo }),
        })
        const data = await res.json()
        if (data.url) {
          window.location.href = data.url
        } else {
          setErro(data.erro ?? 'Erro ao iniciar pagamento.')
        }
      } catch {
        setErro('Erro de conexão. Tente novamente.')
      }
    }

    // Espera sessão estar disponível antes de chamar o checkout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        subscription.unsubscribe()
        tentarCheckout()
      }
    })

    // Também tenta imediatamente caso sessão já exista
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        subscription.unsubscribe()
        tentarCheckout()
      }
    })

    return () => subscription.unsubscribe()
  }, [plano, periodo])

  if (erro) return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#080B12', gap:'1rem' }}>
      <div style={{ width:'44px', height:'44px', background:'rgba(252,129,129,0.1)', border:'1px solid rgba(252,129,129,0.3)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'0.5rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FC8181" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <p style={{ color:'#FC8181', fontSize:'0.9rem', textAlign:'center', maxWidth:'320px' }}>{erro}</p>
      <a href="/criar" style={{ color:'#2D6FFF', fontSize:'0.85rem', textDecoration:'none' }}>Voltar para o início</a>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#080B12', gap:'1.5rem' }}>
      <div style={{ position:'relative', width:'48px', height:'48px' }}>
        <div style={{ position:'absolute', inset:0, border:'3px solid rgba(45,111,255,0.15)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', inset:0, border:'3px solid transparent', borderTopColor:'#2D6FFF', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      </div>
      <div style={{ textAlign:'center' }}>
        <p style={{ color:'#F0F4FF', fontSize:'0.95rem', fontWeight:500, marginBottom:'0.3rem' }}>{status}</p>
        <p style={{ color:'#4A5568', fontSize:'0.78rem', fontFamily:'JetBrains Mono, monospace' }}>não feche esta janela</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function CheckoutRedirectPage() {
  return <Suspense><CheckoutRedirect /></Suspense>
}
