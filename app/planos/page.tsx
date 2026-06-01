'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { usePlano } from '@/lib/plano-context'
import { LIMITES } from '@/lib/plano-limites'
import { CreditCard, ArrowUpRight, CheckCircle2, Lock } from 'lucide-react'

const PLANOS_DEF = [
  { id:'free',      nome:'Free',      preco:0,   precoAnual:0,   features:['1 post/dia','1 slide','Download ZIP','Legenda'] },
  { id:'starter',   nome:'Starter',   preco:37,  precoAnual:28,  features:['1 post/dia','Até 5 slides','Download ZIP','Legenda','Histórico'] },
  { id:'pro',       nome:'Pro',       preco:77,  precoAnual:58,  features:['2 posts/dia','Até 10 slides','Download ZIP','Legenda','Histórico','Logo','Sugestões'], featured:true },
  { id:'ilimitado', nome:'Ilimitado', preco:147, precoAnual:111, features:['Posts ilimitados','Até 10 slides','Download ZIP','Legenda','Histórico','Logo','Sugestões'] },
]

export default function PlanosPage() {
  const { plano: planoAtual, postsHoje, maxPosts } = usePlano()
  const [anual, setAnual]           = useState(true)
  const [loading, setLoading]       = useState('')
  const [portalLoading, setPortalLoading] = useState(false)
  const [assinatura, setAssinatura] = useState<any>(null)
  const supabase = createClient()
  const router   = useRouter()

  useEffect(() => {
    async function buscarAssinatura() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const res  = await fetch(`/api/stripe/assinatura`, {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setAssinatura(data)
      }
    }
    if (planoAtual !== 'free') buscarAssinatura()
  }, [planoAtual])

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

  async function assinar(planoId: string) {
    if (planoId === 'free' || planoId === planoAtual) return
    setLoading(planoId)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push(`/login?plano=${planoId}&periodo=${anual ? 'anual' : 'mensal'}`); return }
    router.push(`/checkout-redirect?plano=${planoId}&periodo=${anual ? 'anual' : 'mensal'}`)
  }

  const temAssinatura = planoAtual !== 'free'
  const limAtual      = LIMITES[planoAtual] ?? LIMITES.free

  return (
    <div style={{ padding:'clamp(1rem,4vw,2.5rem)', maxWidth:'860px', width:'100%', boxSizing:'border-box' as const }}>

      {/* Header */}
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>
          {temAssinatura ? 'Meu plano' : 'Planos'}
        </h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>
          {temAssinatura ? 'Gerencie sua assinatura e veja os detalhes do seu plano.' : 'Comece grátis e faça upgrade quando quiser.'}
        </p>
      </div>

      {/* Card do plano atual — só para assinantes */}
      {temAssinatura && (
        <div style={{ background:'linear-gradient(135deg,#0D1829,#0A1422)', border:'1px solid rgba(45,111,255,0.3)', borderRadius:'20px', padding:'1.5rem', marginBottom:'2rem', display:'flex', flexWrap:'wrap' as const, gap:'1.5rem', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:'0.68rem', color:'#4A5568', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:'6px' }}>Plano ativo</div>
            <div style={{ fontSize:'1.5rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'4px' }}>
              {planoAtual.charAt(0).toUpperCase() + planoAtual.slice(1)}
            </div>
            {assinatura?.periodo_fim && (
              <div style={{ fontSize:'0.8rem', color:'#8B95A8' }}>
                Próxima cobrança: <strong style={{ color:'#F0F4FF' }}>{new Date(assinatura.periodo_fim * 1000).toLocaleDateString('pt-BR')}</strong>
              </div>
            )}
            {assinatura?.tipo && (
              <div style={{ fontSize:'0.75rem', color:'#4A5568', marginTop:'2px' }}>
                Cobrança {assinatura.tipo === 'year' ? 'anual' : 'mensal'}
              </div>
            )}
          </div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const }}>
            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:'12px', padding:'0.75rem 1rem', textAlign:'center' as const, minWidth:'80px' }}>
              <div style={{ fontSize:'1.25rem', fontWeight:700, color: postsHoje >= maxPosts ? '#FC8181' : '#F0F4FF' }}>{postsHoje}/{maxPosts < 999 ? maxPosts : '∞'}</div>
              <div style={{ fontSize:'0.65rem', color:'#4A5568', marginTop:'2px' }}>Posts hoje</div>
            </div>
            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:'12px', padding:'0.75rem 1rem', textAlign:'center' as const, minWidth:'80px' }}>
              <div style={{ fontSize:'1.25rem', fontWeight:700 }}>{limAtual.maxSlides}</div>
              <div style={{ fontSize:'0.65rem', color:'#4A5568', marginTop:'2px' }}>Slides/post</div>
            </div>
          </div>
          <button
            onClick={abrirPortal}
            disabled={portalLoading}
            style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.65rem 1.25rem', color:'#F0F4FF', fontSize:'0.82rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            <CreditCard size={14}/>
            {portalLoading ? 'Aguarde...' : 'Cancelar / Alterar pagamento'}
          </button>
        </div>
      )}

      {/* Toggle */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:'2rem' }}>
        <div style={{ display:'inline-flex', alignItems:'center', background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'100px', padding:'4px' }}>
          <button onClick={() => setAnual(false)}
            style={{ padding:'0.4rem 1.2rem', borderRadius:'100px', border:'none', cursor:'pointer', fontSize:'0.8rem', fontWeight:600, background: !anual ? '#1A2845' : 'transparent', color: !anual ? '#F0F4FF' : '#4A5568', boxShadow: !anual ? '0 0 0 1px rgba(45,111,255,0.3)' : 'none', fontFamily:'inherit' }}>
            Mensal
          </button>
          <button onClick={() => setAnual(true)}
            style={{ padding:'0.4rem 1.2rem', borderRadius:'100px', border:'none', cursor:'pointer', fontSize:'0.8rem', fontWeight:600, background: anual ? '#1A2845' : 'transparent', color: anual ? '#F0F4FF' : '#4A5568', boxShadow: anual ? '0 0 0 1px rgba(45,111,255,0.3)' : 'none', display:'flex', alignItems:'center', gap:'6px', fontFamily:'inherit' }}>
            Anual
            <span style={{ background: anual ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)', border:`1px solid ${anual ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)'}`, color: anual ? '#34D399' : '#4A5568', fontSize:'0.62rem', fontWeight:700, padding:'1px 6px', borderRadius:'100px' }}>−25%</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:'12px' }}>
        {PLANOS_DEF.map(p => {
          const atual    = p.id === planoAtual
          const inferior = PLANOS_DEF.findIndex(x => x.id === p.id) < PLANOS_DEF.findIndex(x => x.id === planoAtual)
          const preco    = anual ? p.precoAnual : p.preco

          return (
            <div key={p.id} style={{ background: p.featured ? 'linear-gradient(145deg,#0D1829,#0A1422)' : '#0D1117', border: atual ? '1px solid rgba(52,211,153,0.5)' : p.featured ? '1px solid rgba(45,111,255,0.3)' : '1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem', position:'relative' as const }}>

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' as const, color:'#8B95A8' }}>{p.nome}</div>
                {atual && <div style={{ background:'rgba(52,211,153,0.12)', border:'1px solid rgba(52,211,153,0.35)', color:'#34D399', fontSize:'0.58rem', fontWeight:700, padding:'2px 7px', borderRadius:'100px' }}>Atual</div>}
                {!atual && (p as any).featured && !inferior && <div style={{ background:'rgba(45,111,255,0.12)', border:'1px solid rgba(45,111,255,0.3)', color:'#6B9FFF', fontSize:'0.58rem', fontWeight:700, padding:'2px 7px', borderRadius:'100px' }}>Popular</div>}
              </div>

              {p.preco === 0 ? (
                <div style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.04em', marginBottom:'0.75rem' }}>R$0</div>
              ) : anual ? (
                <div style={{ marginBottom:'0.75rem' }}>
                  <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                    <span style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.04em' }}>R${preco}</span>
                    <span style={{ fontSize:'0.72rem', color:'#4A5568' }}>/mês</span>
                    <span style={{ fontSize:'0.7rem', color:'#4A5568', textDecoration:'line-through' }}>R${p.preco}</span>
                  </div>
                  <div style={{ fontSize:'0.7rem', color:'#34D399' }}>R${preco * 12}/ano</div>
                </div>
              ) : (
                <div style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.04em', marginBottom:'0.75rem' }}>R${p.preco}<span style={{ fontSize:'0.72rem', color:'#4A5568', fontWeight:400 }}>/mês</span></div>
              )}

              <ul style={{ listStyle:'none', margin:'0 0 1rem', padding:0, display:'flex', flexDirection:'column', gap:'5px' }}>
                {p.features.map(f => (
                  <li key={f} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'0.78rem', color:'#8B95A8' }}>
                    <CheckCircle2 size={11} color="#2D6FFF" style={{ flexShrink:0 }}/>
                    {f}
                  </li>
                ))}
              </ul>

              {atual ? (
                <div style={{ padding:'0.6rem', borderRadius:'8px', textAlign:'center' as const, fontSize:'0.78rem', fontWeight:600, background:'rgba(52,211,153,0.08)', color:'#34D399', border:'1px solid rgba(52,211,153,0.2)' }}>Plano atual ✓</div>
              ) : inferior ? (
                <div style={{ padding:'0.6rem', borderRadius:'8px', textAlign:'center' as const, fontSize:'0.78rem', color:'#4A5568', border:'1px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}>
                  <Lock size={11}/> Downgrade pelo portal
                </div>
              ) : p.preco === 0 ? (
                <div style={{ padding:'0.6rem', borderRadius:'8px', textAlign:'center' as const, fontSize:'0.78rem', color:'#4A5568', border:'1px solid rgba(255,255,255,0.05)' }}>Free</div>
              ) : (
                <button onClick={() => assinar(p.id)} disabled={loading === p.id}
                  style={{ width:'100%', padding:'0.6rem', borderRadius:'8px', textAlign:'center' as const, fontWeight:600, fontSize:'0.78rem', cursor:'pointer', background: (p as any).featured ? '#2D6FFF' : 'transparent', color: (p as any).featured ? '#fff' : '#8B95A8', border: (p as any).featured ? 'none' : '1px solid rgba(255,255,255,0.1)', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px', boxShadow:(p as any).featured ? '0 6px 20px rgba(45,111,255,0.25)' : 'none' }}>
                  {loading === p.id ? 'Aguarde...' : `Fazer upgrade`}
                  {loading !== p.id && <ArrowUpRight size={12}/>}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono,monospace' }}>
        // Pagamento seguro via Stripe · Cancele quando quiser pelo portal acima
      </p>
    </div>
  )
}
