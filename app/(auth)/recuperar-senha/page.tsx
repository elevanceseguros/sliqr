'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RecuperarSenhaPage() {
  const supabase = createClient()
  const [email, setEmail]     = useState('')
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro]       = useState('')
  const [loading, setLoading] = useState(false)

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    // URL deve estar na whitelist do Supabase (Authentication > URL Configuration > Redirect URLs)
    const redirectTo = `${window.location.origin}/auth/callback`
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (error) {
      setErro('Erro ao enviar email. Tente novamente.')
      setLoading(false)
      return
    }

    setEnviado(true)
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#080B12', padding:'1rem' }}>
      <div style={{ width:'100%', maxWidth:'420px' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'0.5rem' }}>
            <div style={{ width:'32px', height:'32px', background:'#2D6FFF', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
            </div>
            <span style={{ fontSize:'1.5rem', fontWeight:800, letterSpacing:'-0.04em' }}>Sliqr</span>
          </div>
          <h1 style={{ fontSize:'1.3rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.3rem' }}>
            {enviado ? 'Email enviado!' : 'Recuperar senha'}
          </h1>
          <p style={{ color:'#8B95A8', fontSize:'0.875rem' }}>
            {enviado
              ? 'Verifique sua caixa de entrada e siga as instruções.'
              : 'Digite seu email e enviaremos um link para redefinir sua senha.'}
          </p>
        </div>

        <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'2rem' }}>
          {enviado ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ width:'48px', height:'48px', background:'rgba(5,150,105,0.1)', border:'1px solid rgba(5,150,105,0.3)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p style={{ color:'#8B95A8', fontSize:'0.875rem', lineHeight:1.65, marginBottom:'1.5rem' }}>
                Se o email <strong style={{ color:'#F0F4FF' }}>{email}</strong> estiver cadastrado, você receberá as instruções em breve.
              </p>
              <Link href="/login" style={{ display:'block', background:'#2D6FFF', color:'#fff', textDecoration:'none', borderRadius:'8px', padding:'0.8rem', textAlign:'center', fontWeight:600, fontSize:'0.875rem' }}>
                Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={enviar} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', color:'#8B95A8', marginBottom:'6px', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.06em', textTransform:'uppercase' as const }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'0.7rem 1rem', color:'#F0F4FF', fontSize:'0.9rem', fontFamily:'Sora, sans-serif', outline:'none', boxSizing:'border-box' as const }}
                />
              </div>
              {erro && <p style={{ color:'#FC8181', fontSize:'0.82rem', margin:0 }}>{erro}</p>}
              <button type="submit" disabled={loading}
                style={{ background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'8px', padding:'0.8rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.875rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Enviando...' : 'Enviar link de recuperação'}
              </button>
            </form>
          )}
        </div>

        {!enviado && (
          <p style={{ textAlign:'center', marginTop:'1.5rem', color:'#4A5568', fontSize:'0.85rem' }}>
            Lembrou a senha?{' '}
            <Link href="/login" style={{ color:'#2D6FFF', textDecoration:'none', fontWeight:500 }}>Entrar</Link>
          </p>
        )}
      </div>
    </div>
  )
}
