'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function CheckoutRedirect() {
  const searchParams = useSearchParams()
  const plano        = searchParams.get('plano')
  const periodo      = searchParams.get('periodo') ?? 'mensal'
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!plano) { window.location.href = '/criar'; return }

    async function redirecionar() {
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
      } catch (e: any) {
        setErro('Erro de conexão. Tente novamente.')
      }
    }

    redirecionar()
  }, [plano, periodo])

  if (erro) return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#080B12', gap:'1rem' }}>
      <p style={{ color:'#FC8181', fontSize:'0.9rem' }}>{erro}</p>
      <a href="/criar" style={{ color:'#2D6FFF', fontSize:'0.85rem' }}>Voltar para o início</a>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#080B12', gap:'1.5rem' }}>
      <div style={{ width:'40px', height:'40px', border:'3px solid rgba(45,111,255,0.2)', borderTop:'3px solid #2D6FFF', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <p style={{ color:'#8B95A8', fontSize:'0.875rem' }}>Preparando seu pagamento...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function CheckoutRedirectPage() {
  return <Suspense><CheckoutRedirect /></Suspense>
}
