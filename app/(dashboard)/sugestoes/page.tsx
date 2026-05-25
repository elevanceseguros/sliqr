'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Lightbulb, Loader2, RefreshCw, Zap, Building2, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const TOM_LABELS: Record<string, string> = {
  vender:'Vender', ensinar:'Ensinar', urgencia:'Urgência', inspirar:'Inspirar'
}
const TOM_CORES: Record<string, string> = {
  vender:'#2D6FFF', ensinar:'#00C896', urgencia:'#FF4D4D', inspirar:'#A855F7'
}

export default function SugestoesPage() {
  const supabase = createClient()
  const router   = useRouter()
  const [session, setSession]       = useState<any>(null)
  const [empresa, setEmpresa]       = useState<any>(null)
  const [sugestoes, setSugestoes]   = useState<any[]>([])
  const [gerando, setGerando]       = useState(false)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      setSession(session)

      // Busca empresa
      const resE = await fetch(`/api/empresa?token=${session.access_token}`)
      const dataE = await resE.json()
      setEmpresa(dataE.empresa)

      // Busca sugestões existentes
      const resS = await fetch(`/api/sugestoes?token=${session.access_token}`)
      const dataS = await resS.json()
      setSugestoes(dataS.sugestoes ?? [])

      setCarregando(false)
    }
    carregar()
  }, [])

  async function gerarSugestoes() {
    if (!empresa) return
    setGerando(true)
    try {
      const res  = await fetch('/api/sugestoes', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: session.access_token, empresa }),
      })
      const data = await res.json()
      if (data.sugestoes) setSugestoes(data.sugestoes)
    } finally { setGerando(false) }
  }

  function usarSugestao(s: any) {
    // Passa tema e tom para a página criar via query params
    router.push(`/criar?tema=${encodeURIComponent(s.tema)}&tom=${s.tom}`)
  }

  if (carregando) return (
    <div style={{ padding:'2.5rem', display:'flex', alignItems:'center', gap:'8px', color:'#4A5568' }}>
      <Loader2 size={16} style={{ animation:'spin 1s linear infinite' }}/> Carregando...
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  // Sem empresa cadastrada
  if (!empresa) return (
    <div style={{ padding:'2.5rem', maxWidth:'600px' }}>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Sugestões</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Conteúdo estratégico criado especificamente para o seu negócio.</p>
      </div>
      <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'3rem', textAlign:'center' }}>
        <Building2 size={40} style={{ color:'#4A5568', marginBottom:'1rem' }} />
        <h2 style={{ fontSize:'1.2rem', fontWeight:600, marginBottom:'0.5rem' }}>Primeiro, conte sobre sua empresa</h2>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem', marginBottom:'2rem', lineHeight:1.7 }}>
          Para gerar sugestões relevantes, preciso entender o que você vende e para quem.
        </p>
        <Link href="/empresa"
          style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#2D6FFF', color:'#fff', textDecoration:'none', borderRadius:'10px', padding:'0.85rem 2rem', fontWeight:600, fontSize:'0.95rem', boxShadow:'0 8px 24px rgba(45,111,255,0.3)' }}>
          Cadastrar minha empresa <ChevronRight size={16}/>
        </Link>
      </div>
    </div>
  )

  return (
    <div style={{ padding:'clamp(1rem, 4vw, 2.5rem)', maxWidth:'800px' }}>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2rem' }}>
        <div>
          <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Sugestões para {empresa.nome}</h1>
          <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Clique em qualquer sugestão para criar o carrossel com 1 clique.</p>
        </div>
        <button onClick={gerarSugestoes} disabled={gerando}
          style={{ display:'flex', alignItems:'center', gap:'8px', background:'#111827', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.7rem 1.25rem', color:'#8B95A8', fontSize:'0.85rem', fontWeight:500, cursor: gerando?'not-allowed':'pointer', fontFamily:'Sora, sans-serif', opacity: gerando?0.7:1 }}>
          {gerando ? <Loader2 size={14} style={{ animation:'spin 1s linear infinite' }}/> : <RefreshCw size={14}/>}
          {gerando ? 'Gerando...' : 'Novas sugestões'}
        </button>
      </div>

      {sugestoes.length === 0 && !gerando && (
        <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'3rem', textAlign:'center' }}>
          <Lightbulb size={36} style={{ color:'#4A5568', marginBottom:'1rem' }} />
          <h2 style={{ fontSize:'1.1rem', fontWeight:600, marginBottom:'0.5rem' }}>Nenhuma sugestão ainda</h2>
          <p style={{ color:'#8B95A8', fontSize:'0.875rem', marginBottom:'1.5rem' }}>
            Gere sugestões personalizadas para {empresa.nome}
          </p>
          <button onClick={gerarSugestoes}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'10px', padding:'0.85rem 2rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.95rem', cursor:'pointer', boxShadow:'0 8px 24px rgba(45,111,255,0.3)' }}>
            <Lightbulb size={16}/> Gerar sugestões agora
          </button>
        </div>
      )}

      {gerando && (
        <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'3rem', textAlign:'center' }}>
          <Loader2 size={32} style={{ color:'#2D6FFF', animation:'spin 1s linear infinite', marginBottom:'1rem' }} />
          <p style={{ color:'#8B95A8' }}>Analisando {empresa.nome} e criando sugestões estratégicas...</p>
        </div>
      )}

      {sugestoes.length > 0 && !gerando && (
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {sugestoes.map((s, i) => (
            <div key={s.id ?? i}
              style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'14px', padding:'1.25rem 1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem', transition:'all 0.2s', cursor:'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1px solid rgba(45,111,255,0.3)`; (e.currentTarget as HTMLElement).style.background = '#111827' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.background = '#0D1117' }}
              onClick={() => usarSugestao(s)}>

              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                  <span style={{ fontSize:'0.68rem', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.08em', textTransform:'uppercase', color: TOM_CORES[s.tom] ?? '#2D6FFF', background: `${TOM_CORES[s.tom] ?? '#2D6FFF'}18`, padding:'2px 8px', borderRadius:'100px' }}>
                    {TOM_LABELS[s.tom] ?? s.tom}
                  </span>
                </div>
                <p style={{ fontSize:'0.98rem', fontWeight:600, margin:'0 0 4px', lineHeight:1.3 }}>{s.tema}</p>
                {s.descricao && (
                  <p style={{ fontSize:'0.82rem', color:'#8B95A8', margin:0, lineHeight:1.5 }}>{s.descricao}</p>
                )}
              </div>

              <button onClick={e => { e.stopPropagation(); usarSugestao(s) }}
                style={{ display:'flex', alignItems:'center', gap:'6px', background:'#2D6FFF', border:'none', borderRadius:'8px', padding:'8px 16px', color:'#fff', fontSize:'0.8rem', fontWeight:600, cursor:'pointer', fontFamily:'Sora, sans-serif', whiteSpace:'nowrap', flexShrink:0 }}>
                <Zap size={13}/> Criar agora
              </button>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
