'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { usePlano } from '@/lib/plano-context'
import { LIMITES } from '@/lib/plano-limites'
import { CreditCard, ArrowUpRight, Calendar, Zap, Image, Clock, Lightbulb } from 'lucide-react'
import Link from 'next/link'

export default function GerenciarPage() {
  const { plano, postsHoje, maxPosts } = usePlano()
  const [assinatura, setAssinatura]    = useState<any>(null)
  const [portalLoading, setPortalLoading] = useState(false)
  const supabase = createClient()
  const router   = useRouter()
  const limites  = LIMITES[plano] ?? LIMITES.free

  useEffect(() => {
    if (plano === 'free') { router.replace('/planos'); return }
    async function buscar() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const res = await fetch('/api/stripe/assinatura', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      })
      if (res.ok) setAssinatura(await res.json())
    }
    buscar()
  }, [plano])

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

  const nomeFormatado = plano.charAt(0).toUpperCase() + plano.slice(1)
  const proximaCobranca = assinatura?.periodo_fim
    ? new Date(assinatura.periodo_fim * 1000).toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' })
    : null
  const tipoCobranca = assinatura?.tipo === 'year' ? 'Anual' : 'Mensal'

  const recursos = [
    { icon:<Zap size={14}/>,        label:`${maxPosts < 999 ? maxPosts : '∞'} post${maxPosts > 1 ? 's' : ''} por dia`,      ativo:true },
    { icon:<Zap size={14}/>,        label:`Até ${limites.maxSlides} slide${limites.maxSlides > 1 ? 's' : ''} por post`,      ativo:true },
    { icon:<Clock size={14}/>,      label:'Histórico de posts',   ativo:limites.temHistorico },
    { icon:<Image size={14}/>,      label:'Logo da empresa',      ativo:limites.temLogo },
    { icon:<Lightbulb size={14}/>,  label:'Sugestões de conteúdo',ativo:limites.temSugestoes },
  ]

  return (
    <div style={{ padding:'clamp(1rem,4vw,2.5rem)', maxWidth:'600px', width:'100%', boxSizing:'border-box' as const }}>
      <div style={{ marginBottom:'2rem' }}>
        <button onClick={() => router.back()} style={{ background:'transparent', border:'none', color:'#4A5568', fontSize:'0.82rem', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', marginBottom:'1rem', padding:0, fontFamily:'inherit' }}>
          ← Voltar
        </button>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Minha assinatura</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Detalhes e gerenciamento do seu plano.</p>
      </div>

      {/* Card principal */}
      <div style={{ background:'linear-gradient(135deg,#0D1829,#0A1422)', border:'1px solid rgba(45,111,255,0.25)', borderRadius:'20px', padding:'1.75rem', marginBottom:'1.25rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem', flexWrap:'wrap' as const, gap:'1rem' }}>
          <div>
            <div style={{ fontSize:'0.65rem', color:'#4A5568', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:'4px' }}>Plano ativo</div>
            <div style={{ fontSize:'2rem', fontWeight:700, letterSpacing:'-0.04em' }}>{nomeFormatado}</div>
          </div>
          <div style={{ background:'rgba(45,111,255,0.1)', border:'1px solid rgba(45,111,255,0.2)', borderRadius:'10px', padding:'6px 14px', fontSize:'0.75rem', fontWeight:600, color:'#6B9FFF' }}>
            {tipoCobranca}
          </div>
        </div>

        {/* Datas */}
        {proximaCobranca && (
          <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'0.75rem 1rem', background:'rgba(255,255,255,0.04)', borderRadius:'10px', marginBottom:'1.5rem' }}>
            <Calendar size={14} color="#4A5568"/>
            <div>
              <div style={{ fontSize:'0.68rem', color:'#4A5568', marginBottom:'1px' }}>Próxima cobrança</div>
              <div style={{ fontSize:'0.875rem', fontWeight:600 }}>{proximaCobranca}</div>
            </div>
          </div>
        )}

        {/* Uso hoje */}
        <div style={{ marginBottom:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
            <span style={{ fontSize:'0.78rem', color:'#8B95A8' }}>Posts hoje</span>
            <span style={{ fontSize:'0.78rem', fontWeight:700, color: postsHoje >= maxPosts && maxPosts < 999 ? '#FC8181' : '#F0F4FF' }}>
              {postsHoje} / {maxPosts < 999 ? maxPosts : '∞'}
            </span>
          </div>
          {maxPosts < 999 && (
            <div style={{ height:'4px', background:'rgba(255,255,255,0.06)', borderRadius:'2px', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${Math.min(100, (postsHoje/maxPosts)*100)}%`, background: postsHoje >= maxPosts ? '#FC8181' : '#2D6FFF', borderRadius:'2px', transition:'width 0.3s' }}/>
            </div>
          )}
        </div>

        {/* Recursos inclusos */}
        <div style={{ marginBottom:'1.5rem' }}>
          <div style={{ fontSize:'0.65rem', color:'#4A5568', fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.08em', textTransform:'uppercase' as const, marginBottom:'10px' }}>Recursos inclusos</div>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:'8px' }}>
            {recursos.map((r, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'0.82rem', color: r.ativo ? '#8B95A8' : '#2D3748' }}>
                <span style={{ color: r.ativo ? '#2D6FFF' : '#4A5568', opacity: r.ativo ? 1 : 0.4 }}>{r.icon}</span>
                <span style={{ opacity: r.ativo ? 1 : 0.4 }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Botões */}
        <div style={{ display:'flex', flexDirection:'column' as const, gap:'8px' }}>
          <button onClick={abrirPortal} disabled={portalLoading}
            style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.75rem', color:'#F0F4FF', fontSize:'0.85rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            <CreditCard size={14}/>
            {portalLoading ? 'Abrindo portal...' : 'Alterar forma de pagamento / Cancelar'}
          </button>
          <Link href="/planos"
            style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#2D6FFF', borderRadius:'10px', padding:'0.75rem', color:'#fff', fontSize:'0.85rem', fontWeight:600, textDecoration:'none', boxSizing:'border-box' as const, boxShadow:'0 4px 16px rgba(45,111,255,0.3)' }}>
            <ArrowUpRight size={14}/>
            Fazer upgrade de plano
          </Link>
        </div>
      </div>

      <p style={{ fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono,monospace', textAlign:'center' as const }}>
        // Pagamento gerenciado com segurança via Stripe
      </p>
    </div>
  )
}
