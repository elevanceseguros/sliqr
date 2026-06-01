'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

function NovaSenhaForm() {
  const supabase     = createClient()
  const router       = useRouter()
  const searchParams = useSearchParams()
  const token_hash   = searchParams.get('token_hash')
  const type         = searchParams.get('type')

  const [senha, setSenha]       = useState('')
  const [confirma, setConfirma] = useState('')
  const [erro, setErro]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [pronto, setPronto]     = useState(false)
  const [sucesso, setSucesso]   = useState(false)

  useEffect(() => {
    async function verificar() {
      if (token_hash && type === 'recovery') {
        // Verifica o token no cliente — funciona mesmo sem cookies
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'recovery',
        })
        if (error) {
          setErro('Link inválido ou expirado. Solicite um novo.')
        }
      }
      setPronto(true)
    }
    verificar()
  }, [token_hash])

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (senha !== confirma) {
      setErro('As senhas não coincidem.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: senha })

    if (error) {
      setErro('Erro ao atualizar senha. Solicite um novo link.')
      setLoading(false)
      return
    }

    setSucesso(true)
    setTimeout(() => router.push('/criar'), 2000)
  }

  if (!pronto) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#080B12' }}>
      <div style={{ width:'32px', height:'32px', border:'3px solid rgba(45,111,255,0.15)', borderTopColor:'#2D6FFF', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

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
            {sucesso ? 'Senha atualizada!' : 'Nova senha'}
          </h1>
          <p style={{ color:'#8B95A8', fontSize:'0.875rem' }}>
            {sucesso ? 'Redirecionando...' : 'Escolha uma nova senha para sua conta.'}
          </p>
        </div>

        <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'2rem' }}>
          {sucesso ? (
            <div style={{ textAlign:'center' }}>
              <div style={{ width:'48px', height:'48px', background:'rgba(5,150,105,0.1)', border:'1px solid rgba(5,150,105,0.3)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p style={{ color:'#8B95A8', fontSize:'0.875rem' }}>Sua senha foi atualizada com sucesso.</p>
            </div>
          ) : erro && !senha ? (
            <div style={{ textAlign:'center' }}>
              <p style={{ color:'#FC8181', fontSize:'0.875rem', marginBottom:'1.5rem' }}>{erro}</p>
              <a href="/recuperar-senha" style={{ display:'block', background:'#2D6FFF', color:'#fff', textDecoration:'none', borderRadius:'8px', padding:'0.8rem', textAlign:'center', fontWeight:600, fontSize:'0.875rem' }}>
                Solicitar novo link
              </a>
            </div>
          ) : (
            <form onSubmit={salvar} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', color:'#8B95A8', marginBottom:'6px', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.06em', textTransform:'uppercase' as const }}>Nova senha</label>
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required minLength={6}
                  placeholder="mínimo 6 caracteres"
                  style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'0.7rem 1rem', color:'#F0F4FF', fontSize:'0.9rem', fontFamily:'Sora, sans-serif', outline:'none', boxSizing:'border-box' as const }} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.78rem', color:'#8B95A8', marginBottom:'6px', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.06em', textTransform:'uppercase' as const }}>Confirmar senha</label>
                <input type="password" value={confirma} onChange={e => setConfirma(e.target.value)} required
                  placeholder="repita a senha"
                  style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'0.7rem 1rem', color:'#F0F4FF', fontSize:'0.9rem', fontFamily:'Sora, sans-serif', outline:'none', boxSizing:'border-box' as const }} />
              </div>
              {erro && <p style={{ color:'#FC8181', fontSize:'0.82rem', margin:0 }}>{erro}</p>}
              <button type="submit" disabled={loading}
                style={{ background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'8px', padding:'0.8rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.875rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function NovaSenhaPage() {
  return <Suspense><NovaSenhaForm /></Suspense>
}
