'use client'
import { Suspense } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

function CadastroForm() {
  const supabase     = createClient()
  const searchParams = useSearchParams()
  const planoParam   = searchParams.get('plano')
  const periodoParam = searchParams.get('periodo') ?? 'mensal'

  const [email, setEmail]     = useState('')
  const [senha, setSenha]     = useState('')
  const [nome, setNome]       = useState('')
  const [erro, setErro]       = useState('')
  const [loading, setLoading] = useState(false)

  // Destino após login: se tem plano, vai para /checkout-redirect, senão /criar
  function destino() {
    if (planoParam) return `/checkout-redirect?plano=${planoParam}&periodo=${periodoParam}`
    return '/criar'
  }

  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/auth/callback?next=' + encodeURIComponent(destino()) },
    })
  }

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { full_name: nome } },
    })

    if (signUpError) {
      setErro(signUpError.message)
      setLoading(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: senha })

    if (signInError) {
      setErro('Conta criada! Entre com seu email e senha.')
      setLoading(false)
      return
    }

    window.location.href = destino()
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#080B12', padding:'1rem' }}>
      <div style={{ width:'100%', maxWidth:'420px' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'0.5rem' }}>
            <div style={{ width:'32px', height:'32px', background:'#2D6FFF', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
            </div>
            <span style={{ fontWeight:800, fontSize:'1.4rem', letterSpacing:'-0.04em' }}>Sliqr</span>
          </div>
          <h1 style={{ fontSize:'1.5rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.3rem' }}>
            Criar sua conta
          </h1>
          <p style={{ color:'#8B95A8', fontSize:'0.875rem' }}>
            {planoParam ? 'Após o cadastro você será redirecionado para o pagamento.' : 'Comece grátis, sem cartão de crédito.'}
          </p>
        </div>

        {planoParam && (
          <div style={{ background:'#0D1117', border:'1px solid rgba(45,111,255,0.2)', borderRadius:'12px', padding:'0.75rem 1rem', marginBottom:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:'0.68rem', color:'#4A5568', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'2px' }}>Plano selecionado</div>
              <div style={{ fontSize:'0.88rem', fontWeight:700, color:'#F0F4FF' }}>
                {planoParam.charAt(0).toUpperCase() + planoParam.slice(1)}
                <span style={{ fontWeight:400, color:'#4A5568', marginLeft:'6px', fontSize:'0.78rem' }}>{periodoParam === 'anual' ? '· anual' : '· mensal'}</span>
              </div>
            </div>
            {periodoParam === 'anual' && (
              <span style={{ background:'rgba(52,211,153,0.1)', border:'1px solid rgba(52,211,153,0.3)', color:'#34D399', fontSize:'0.65rem', fontWeight:700, padding:'2px 8px', borderRadius:'100px' }}>−25%</span>
            )}
          </div>
        )}

        <button
          onClick={loginGoogle}
          style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', background:'#0D1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.75rem', color:'#F0F4FF', fontSize:'0.875rem', fontWeight:500, cursor:'pointer', marginBottom:'1.25rem' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar com Google
        </button>

        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'1.25rem' }}>
          <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.07)' }}/>
          <span style={{ fontSize:'0.75rem', color:'#4A5568' }}>ou</span>
          <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.07)' }}/>
        </div>

        <form onSubmit={cadastrar} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <input type="text" placeholder="Seu nome" value={nome} onChange={e => setNome(e.target.value)} required
            style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.75rem 1rem', color:'#F0F4FF', fontSize:'0.875rem', outline:'none', width:'100%' }} />
          <input type="email" placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} required
            style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.75rem 1rem', color:'#F0F4FF', fontSize:'0.875rem', outline:'none', width:'100%' }} />
          <input type="password" placeholder="Crie uma senha" value={senha} onChange={e => setSenha(e.target.value)} required
            style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.75rem 1rem', color:'#F0F4FF', fontSize:'0.875rem', outline:'none', width:'100%' }} />
          {erro && <p style={{ color:'#FC8181', fontSize:'0.8rem' }}>{erro}</p>}
          <button type="submit" disabled={loading}
            style={{ background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'10px', padding:'0.85rem', fontWeight:600, fontSize:'0.9rem', cursor:'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Criando conta...' : planoParam ? 'Criar conta →' : 'Criar conta grátis'}
          </button>
        </form>

        <p style={{ textAlign:'center', marginTop:'1.25rem', fontSize:'0.8rem', color:'#4A5568' }}>
          Já tem conta?{' '}
          <Link href={`/login${planoParam ? `?plano=${planoParam}&periodo=${periodoParam}` : ''}`} style={{ color:'#2D6FFF', textDecoration:'none' }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function CadastroPage() {
  return <Suspense><CadastroForm /></Suspense>
}
