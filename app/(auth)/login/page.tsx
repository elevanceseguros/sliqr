'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const supabase = createClient()
  const router   = useRouter()
  const [email, setEmail]       = useState('')
  const [senha, setSenha]       = useState('')
  const [erro, setErro]         = useState('')
  const [carregando, setCarregando] = useState(false)

  async function loginGoogle() {
    setCarregando(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      },
    })
  }

  async function loginEmail(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      if (error.message.includes('Email not confirmed')) {
        setErro('Confirme seu email antes de entrar. Verifique sua caixa de entrada.')
      } else {
        setErro('Email ou senha incorretos.')
      }
      setCarregando(false)
      return
    }
    if (data.session) {
      window.location.href = '/criar'
    }
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
          <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Entre na sua conta</p>
        </div>

        <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'2rem' }}>
          <button onClick={loginGoogle} disabled={carregando}
            style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', background:'#111827', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.8rem', color:'#F0F4FF', fontSize:'0.9rem', fontWeight:500, cursor:'pointer', fontFamily:'Sora, sans-serif', marginBottom:'1.5rem' }}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
            Continuar com Google
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
            <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.07)' }}/>
            <span style={{ color:'#4A5568', fontSize:'0.75rem', fontFamily:'JetBrains Mono, monospace' }}>ou</span>
            <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.07)' }}/>
          </div>

          <form onSubmit={loginEmail} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <div>
              <label style={{ display:'block', fontSize:'0.78rem', color:'#8B95A8', marginBottom:'6px', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.06em', textTransform:'uppercase' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'0.7rem 1rem', color:'#F0F4FF', fontSize:'0.9rem', fontFamily:'Sora, sans-serif', outline:'none' }}
                placeholder="seu@email.com" />
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.78rem', color:'#8B95A8', marginBottom:'6px', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.06em', textTransform:'uppercase' }}>Senha</label>
              <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required
                style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'0.7rem 1rem', color:'#F0F4FF', fontSize:'0.9rem', fontFamily:'Sora, sans-serif', outline:'none' }}
                placeholder="••••••••" />
            </div>
            {erro && <p style={{ color:'#FC8181', fontSize:'0.82rem', margin:0 }}>{erro}</p>}
            <button type="submit" disabled={carregando}
              style={{ background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'8px', padding:'0.8rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.9rem', cursor: carregando ? 'not-allowed' : 'pointer', opacity: carregando ? 0.7 : 1 }}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p style={{ textAlign:'center', marginTop:'1.5rem', color:'#4A5568', fontSize:'0.85rem' }}>
          Não tem conta?{' '}
          <Link href="/cadastro" style={{ color:'#2D6FFF', textDecoration:'none', fontWeight:500 }}>Criar grátis</Link>
        </p>
      </div>
    </div>
  )
}
