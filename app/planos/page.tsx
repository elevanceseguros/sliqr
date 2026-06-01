'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { usePlano } from '@/lib/plano-context'
import { Check, X } from 'lucide-react'

// Todas as features possíveis — usadas para comparação uniforme
const TODAS_FEATURES = [
  'posts_dia',
  'slides',
  'download_zip',
  'legenda',
  'historico',
  'logo',
  'sugestoes',
]

const FEATURE_LABEL: Record<string, string> = {
  posts_dia:   '1 post/dia',
  slides:      'slides',
  download_zip:'Download ZIP',
  legenda:     'Legenda com hashtags',
  historico:   'Histórico de posts',
  logo:        'Logo da empresa',
  sugestoes:   'Sugestões de conteúdo',
}

const PLANOS_DEF = [
  {
    id:'free', nome:'Free', preco:0, precoAnual:0,
    features:{ posts_dia:'1 post/dia', slides:'1 slide', download_zip:true, legenda:true, historico:false, logo:false, sugestoes:false },
    featured:false,
  },
  {
    id:'starter', nome:'Starter', preco:37, precoAnual:28,
    features:{ posts_dia:'1 post/dia', slides:'Até 5 slides', download_zip:true, legenda:true, historico:true, logo:false, sugestoes:false },
    featured:false,
  },
  {
    id:'pro', nome:'Pro', preco:77, precoAnual:58,
    features:{ posts_dia:'2 posts/dia', slides:'Até 10 slides', download_zip:true, legenda:true, historico:true, logo:true, sugestoes:true },
    featured:true,
  },
  {
    id:'ilimitado', nome:'Ilimitado', preco:147, precoAnual:111,
    features:{ posts_dia:'Posts ilimitados', slides:'Até 10 slides', download_zip:true, legenda:true, historico:true, logo:true, sugestoes:true },
    featured:false,
  },
]

export default function PlanosPage() {
  const { plano: planoAtual } = usePlano()
  const [anual, setAnual]     = useState(true)
  const [loading, setLoading] = useState('')
  const supabase = createClient()
  const router   = useRouter()

  async function assinar(planoId: string) {
    if (planoId === 'free' || planoId === planoAtual) return
    setLoading(planoId)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { router.push(`/login?plano=${planoId}&periodo=${anual ? 'anual' : 'mensal'}`); return }
    router.push(`/checkout-redirect?plano=${planoId}&periodo=${anual ? 'anual' : 'mensal'}`)
  }

  return (
    <div style={{ padding:'clamp(1rem,4vw,2.5rem)', maxWidth:'960px', width:'100%', boxSizing:'border-box' as const }}>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Planos</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Escolha o plano ideal para o seu negócio.</p>
      </div>

      {/* Toggle */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:'2rem' }}>
        <div style={{ display:'inline-flex', alignItems:'center', background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'100px', padding:'4px' }}>
          <button onClick={() => setAnual(false)} style={{ padding:'0.4rem 1.2rem', borderRadius:'100px', border:'none', cursor:'pointer', fontSize:'0.8rem', fontWeight:600, background: !anual ? '#1A2845' : 'transparent', color: !anual ? '#F0F4FF' : '#4A5568', boxShadow: !anual ? '0 0 0 1px rgba(45,111,255,0.3)' : 'none', fontFamily:'inherit' }}>Mensal</button>
          <button onClick={() => setAnual(true)} style={{ padding:'0.4rem 1.2rem', borderRadius:'100px', border:'none', cursor:'pointer', fontSize:'0.8rem', fontWeight:600, background: anual ? '#1A2845' : 'transparent', color: anual ? '#F0F4FF' : '#4A5568', boxShadow: anual ? '0 0 0 1px rgba(45,111,255,0.3)' : 'none', display:'flex', alignItems:'center', gap:'6px', fontFamily:'inherit' }}>
            Anual <span style={{ background: anual ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)', border:`1px solid ${anual ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)'}`, color: anual ? '#34D399' : '#4A5568', fontSize:'0.62rem', fontWeight:700, padding:'1px 6px', borderRadius:'100px' }}>−25%</span>
          </button>
        </div>
      </div>

      {/* Grid 4 colunas desktop, 2 mobile */}
      <style>{`
        .planos-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 768px) { .planos-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .planos-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="planos-grid">
        {PLANOS_DEF.map(p => {
          const atual  = p.id === planoAtual
          const preco  = anual && p.preco > 0 ? p.precoAnual : p.preco

          return (
            <div key={p.id} style={{
              background: p.featured ? 'linear-gradient(145deg,#0D1829,#0A1422)' : '#0D1117',
              border: atual ? '1px solid rgba(52,211,153,0.5)' : p.featured ? '1px solid rgba(45,111,255,0.35)' : '1px solid rgba(255,255,255,0.07)',
              borderRadius:'16px', padding:'1.25rem',
              display:'flex', flexDirection:'column' as const,
              boxShadow: p.featured ? '0 8px 32px rgba(45,111,255,0.12)' : 'none',
            }}>
              {/* Header */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' as const, color:'#8B95A8' }}>{p.nome}</span>
                {atual && <span style={{ background:'rgba(52,211,153,0.12)', border:'1px solid rgba(52,211,153,0.35)', color:'#34D399', fontSize:'0.58rem', fontWeight:700, padding:'2px 6px', borderRadius:'100px' }}>Atual</span>}
                {!atual && p.featured && <span style={{ background:'rgba(45,111,255,0.12)', border:'1px solid rgba(45,111,255,0.3)', color:'#6B9FFF', fontSize:'0.58rem', fontWeight:700, padding:'2px 6px', borderRadius:'100px' }}>Popular</span>}
              </div>

              {/* Preço */}
              <div style={{ marginBottom:'1rem' }}>
                {p.preco === 0 ? (
                  <div style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.04em' }}>R$0</div>
                ) : (
                  <>
                    <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                      <span style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.04em' }}>R${preco}</span>
                      <span style={{ fontSize:'0.7rem', color:'#4A5568' }}>/mês</span>
                      {anual && <span style={{ fontSize:'0.68rem', color:'#4A5568', textDecoration:'line-through' }}>R${p.preco}</span>}
                    </div>
                    {anual && <div style={{ fontSize:'0.68rem', color:'#34D399', marginTop:'2px' }}>R${preco * 12}/ano · anual</div>}
                    {!anual && <div style={{ fontSize:'0.68rem', color:'#4A5568', marginTop:'2px' }}>por mês</div>}
                  </>
                )}
              </div>

              {/* Divisor */}
              <div style={{ height:'1px', background:'rgba(255,255,255,0.07)', marginBottom:'0.75rem' }}/>

              {/* Features — todas com check ou X */}
              <ul style={{ listStyle:'none', padding:0, margin:'0 0 1rem', display:'flex', flexDirection:'column' as const, gap:'6px', flex:1 }}>
                {TODAS_FEATURES.map(fKey => {
                  const val     = (p.features as any)[fKey]
                  const ativo   = val !== false
                  const label   = typeof val === 'string' ? val : FEATURE_LABEL[fKey]
                  return (
                    <li key={fKey} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'0.78rem', color: ativo ? '#8B95A8' : '#2D3748', textDecoration: ativo ? 'none' : 'line-through' as const }}>
                      {ativo
                        ? <Check size={11} color="#2D6FFF" style={{ flexShrink:0 }}/>
                        : <X size={11} color="#FC4444" style={{ flexShrink:0, opacity:0.6 }}/>
                      }
                      {label}
                    </li>
                  )
                })}
              </ul>

              {/* CTA */}
              {atual ? (
                <div style={{ padding:'0.6rem', borderRadius:'8px', textAlign:'center' as const, fontSize:'0.78rem', fontWeight:600, background:'rgba(52,211,153,0.08)', color:'#34D399', border:'1px solid rgba(52,211,153,0.2)' }}>Plano atual ✓</div>
              ) : p.preco === 0 ? (
                <div style={{ padding:'0.6rem', borderRadius:'8px', textAlign:'center' as const, fontSize:'0.75rem', color:'#4A5568', border:'1px solid rgba(255,255,255,0.05)' }}>Free</div>
              ) : (
                <button onClick={() => assinar(p.id)} disabled={loading === p.id}
                  style={{ width:'100%', padding:'0.6rem', borderRadius:'8px', textAlign:'center' as const, fontWeight:600, fontSize:'0.78rem', cursor:'pointer', background: p.featured ? '#2D6FFF' : 'transparent', color: p.featured ? '#fff' : '#8B95A8', border: p.featured ? 'none' : '1px solid rgba(255,255,255,0.1)', fontFamily:'inherit', boxShadow: p.featured ? '0 4px 16px rgba(45,111,255,0.25)' : 'none' }}>
                  {loading === p.id ? 'Aguarde...' : 'Fazer upgrade'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono,monospace' }}>
        // Pagamento seguro via Stripe · Cancele quando quiser
      </p>
    </div>
  )
}
