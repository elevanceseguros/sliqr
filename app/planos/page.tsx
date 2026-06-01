'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { usePlano } from '@/lib/plano-context'

const PLANOS_DEF = [
  {
    id: 'free', nome:'Free', preco:0, features:[
      '1 post por dia','1 slide por post','Download ZIP','Legenda com hashtags',
    ], off:['Sem logo própria','Histórico de posts'], featured:false
  },
  {
    id: 'starter', nome:'Starter', preco:37, features:[
      '1 post por dia','Até 5 slides','Download ZIP','Legenda com hashtags',
      'Histórico de posts',
    ], off:['Sem logo própria'], featured:false
  },
  {
    id: 'pro', nome:'Pro', preco:77, features:[
      '2 posts por dia','Até 10 slides','Download ZIP','Legenda com hashtags',
      'Histórico de posts','Logo da sua empresa','Sugestões de conteúdo',
    ], off:[], featured:true
  },
  {
    id: 'ilimitado', nome:'Ilimitado', preco:147, features:[
      'Posts sem limite','Até 10 slides','Download ZIP','Legenda com hashtags',
      'Histórico de posts','Logo da sua empresa','Sugestões de conteúdo',
    ], off:[], featured:false
  },
]

const DESC = 0.25

export default function PlanosPage() {
  const { plano: planoAtual } = usePlano()
  const [anual, setAnual]     = useState(true)
  const [loading, setLoading]   = useState('')
  const [portalLoading, setPortalLoading] = useState(false)

  async function abrirPortal() {
    setPortalLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    const res  = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${session.access_token}` },
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    setPortalLoading(false)
  }
  const supabase              = createClient()
  const router                = useRouter()

  function precoMes(base: number) {
    return anual ? Math.round(base * (1 - DESC)) : base
  }
  function precoAnual(base: number) {
    return Math.round(base * (1 - DESC)) * 12
  }

  async function assinar(planoId: string) {
    if (planoId === 'free') return
    setLoading(planoId)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push(`/login?plano=${planoId}&periodo=${anual ? 'anual' : 'mensal'}`); return }
    router.push(`/checkout-redirect?plano=${planoId}&periodo=${anual ? 'anual' : 'mensal'}`)
  }

  return (
    <div style={{ padding:'clamp(1rem,4vw,2.5rem)', maxWidth:'900px', width:'100%', boxSizing:'border-box' as const }}>
      <div style={{ marginBottom:'2.5rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Planos</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>
          {planoAtual !== 'free' && planoAtual !== 'ilimitado'
            ? `Você está no plano ${planoAtual.charAt(0).toUpperCase() + planoAtual.slice(1)}. Faça upgrade quando quiser.`
            : planoAtual === 'ilimitado' ? 'Você está no plano Ilimitado. 🎉'
            : 'Comece grátis e faça upgrade quando quiser.'}
        </p>
      </div>

      {/* Toggle */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:'2.5rem' }}>
        <div style={{ display:'inline-flex', alignItems:'center', background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'100px', padding:'4px' }}>
          <button onClick={() => setAnual(false)}
            style={{ padding:'0.45rem 1.4rem', borderRadius:'100px', border:'none', cursor:'pointer', fontSize:'0.82rem', fontWeight:600, transition:'all 0.2s', background: !anual ? '#1A2845' : 'transparent', color: !anual ? '#F0F4FF' : '#4A5568', boxShadow: !anual ? '0 0 0 1px rgba(45,111,255,0.3)' : 'none' }}>
            Mensal
          </button>
          <button onClick={() => setAnual(true)}
            style={{ padding:'0.45rem 1.4rem', borderRadius:'100px', border:'none', cursor:'pointer', fontSize:'0.82rem', fontWeight:600, transition:'all 0.2s', background: anual ? '#1A2845' : 'transparent', color: anual ? '#F0F4FF' : '#4A5568', boxShadow: anual ? '0 0 0 1px rgba(45,111,255,0.3)' : 'none', display:'flex', alignItems:'center', gap:'8px' }}>
            Anual
            <span style={{ background: anual ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)', border:`1px solid ${anual ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)'}`, color: anual ? '#34D399' : '#4A5568', fontSize:'0.65rem', fontWeight:700, padding:'1px 7px', borderRadius:'100px', transition:'all 0.2s' }}>
              −25%
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'12px', alignItems:'start' }}>
        {PLANOS_DEF.map(p => {
          const atual = p.id === planoAtual
          return (
            <div key={p.id} style={{ background: p.featured ? 'linear-gradient(145deg,#0D1829,#0A1422)' : '#0D1117', border: atual ? `1px solid rgba(52,211,153,0.5)` : p.featured ? '1px solid rgba(45,111,255,0.4)' : '1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'1.5rem', position:'relative', boxShadow: p.featured ? '0 0 0 1px rgba(45,111,255,0.1),0 20px 50px rgba(45,111,255,0.08)' : 'none' }}>

              {/* Header */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' as const, color:'#8B95A8' }}>{p.nome}</div>
                {atual && <div style={{ background:'rgba(52,211,153,0.12)', border:'1px solid rgba(52,211,153,0.35)', color:'#34D399', fontSize:'0.6rem', fontWeight:700, padding:'2px 8px', borderRadius:'100px', letterSpacing:'0.04em' }}>Atual</div>}
                {!atual && p.featured && <div style={{ background:'linear-gradient(90deg,rgba(45,111,255,0.2),rgba(0,212,255,0.12))', border:'1px solid rgba(45,111,255,0.35)', color:'#6B9FFF', fontSize:'0.6rem', fontWeight:700, padding:'2px 8px', borderRadius:'100px' }}>Popular</div>}
                {!atual && anual && p.preco > 0 && !p.featured && <div style={{ background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.2)', color:'#34D399', fontSize:'0.6rem', fontWeight:700, padding:'2px 8px', borderRadius:'100px' }}>−25%</div>}
              </div>

              {/* Preço */}
              {p.preco === 0 ? (
                <>
                  <div style={{ fontSize:'2.2rem', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1, marginBottom:'0.25rem' }}>R$0</div>
                  <div style={{ fontSize:'0.75rem', color:'#4A5568', marginBottom:'1.25rem' }}>para sempre</div>
                </>
              ) : anual ? (
                <>
                  <div style={{ display:'flex', alignItems:'baseline', gap:'5px', marginBottom:'3px' }}>
                    <div style={{ fontSize:'2.2rem', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1 }}>R${precoMes(p.preco)}</div>
                    <div style={{ fontSize:'0.75rem', color:'#4A5568' }}>/mês</div>
                    <div style={{ fontSize:'0.72rem', color:'#4A5568', textDecoration:'line-through' }}>R${p.preco}</div>
                  </div>
                  <div style={{ fontSize:'0.72rem', color:'#34D399', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'4px' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    R${precoAnual(p.preco)}/ano · cobrado anualmente
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize:'2.2rem', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1, marginBottom:'0.25rem' }}>R${p.preco}</div>
                  <div style={{ fontSize:'0.75rem', color:'#4A5568', marginBottom:'1.25rem' }}>/mês</div>
                </>
              )}

              <div style={{ height:'1px', background:'rgba(255,255,255,0.07)', marginBottom:'1.25rem' }}/>

              {/* Features */}
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'8px', marginBottom:'1.5rem' }}>
                {p.features.map(f => (
                  <li key={f} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'0.8rem', color:'#8B95A8', fontWeight:300 }}>
                    <span style={{ width:'14px', height:'14px', borderRadius:'3px', background:'rgba(45,111,255,0.12)', border:'1px solid rgba(45,111,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#2D6FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
                {p.off.map(f => (
                  <li key={f} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'0.8rem', color:'#4A5568', fontWeight:300, opacity:0.5 }}>
                    <span style={{ width:'14px', height:'14px', borderRadius:'3px', background:'#111827', border:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {atual ? (
                <div style={{ display:'block', width:'100%', padding:'0.65rem', borderRadius:'8px', textAlign:'center' as const, fontSize:'0.82rem', fontWeight:600, background:'rgba(52,211,153,0.08)', color:'#34D399', border:'1px solid rgba(52,211,153,0.25)' }}>
                  Plano atual ✓
                </div>
              ) : p.preco === 0 ? (
                <div style={{ display:'block', width:'100%', padding:'0.65rem', borderRadius:'8px', textAlign:'center' as const, fontSize:'0.82rem', color:'#4A5568', border:'1px solid rgba(255,255,255,0.07)' }}>
                  Free
                </div>
              ) : (
                <button
                  onClick={() => assinar(p.id)}
                  disabled={loading === p.id}
                  style={{ display:'block', width:'100%', padding:'0.65rem', borderRadius:'8px', textAlign:'center' as const, fontWeight:600, fontSize:'0.82rem', cursor: loading === p.id ? 'wait' : 'pointer', background: p.featured ? '#2D6FFF' : 'transparent', color: p.featured ? '#fff' : '#8B95A8', border: p.featured ? 'none' : '1px solid rgba(255,255,255,0.1)', opacity: loading === p.id ? 0.7 : 1, fontFamily:'inherit', boxShadow: p.featured ? '0 6px 20px rgba(45,111,255,0.3)' : 'none' }}
                >
                  {loading === p.id ? 'Aguarde...' : `Assinar ${p.nome}${anual ? ' Anual' : ''}`}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {planoAtual !== 'free' && (
        <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
          <button
            onClick={abrirPortal}
            disabled={portalLoading}
            style={{ background:'transparent', border:'none', color:'#4A5568', fontSize:'0.8rem', cursor:'pointer', textDecoration:'underline' }}>
            {portalLoading ? 'Aguarde...' : 'Gerenciar ou cancelar assinatura'}
          </button>
        </div>
      )}
      <p style={{ textAlign:'center', marginTop:'1rem', fontSize:'0.78rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace' }}>
        // Pagamento seguro via Stripe · Cancele quando quiser
      </p>
    </div>
  )
}
