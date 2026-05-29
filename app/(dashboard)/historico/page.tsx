'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Clock, Zap, FileText, X, Copy, Check } from 'lucide-react'

const TOM_LABELS: Record<string, string> = {
  vender:'Quero vender', ensinar:'Quero ensinar',
  urgencia:'Criar urgência', inspirar:'Inspirar pessoas',
}

interface Carrossel {
  id: string
  tema: string
  tom: string
  slides: any[]
  legenda?: string
  cfg?: { cor?: string; fonte?: string; estilo?: string }
  criado_em: string
}

interface ModalProps {
  item: Carrossel
  onClose: () => void
}

function ModalDetalhes({ item, onClose }: ModalProps) {
  const [copiado, setCopiado] = useState(false)
  const cor = item.cfg?.cor ?? '#2D6FFF'
  const qtd = Array.isArray(item.slides) ? item.slides.length : 0

  function copiar() {
    if (!item.legenda) return
    navigator.clipboard.writeText(item.legenda)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:1000, display:'flex', alignItems:'flex-end', justifyContent:'center', padding:'0' }}
      onClick={onClose}
    >
      <div
        style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'20px 20px 0 0', padding:'1.5rem', width:'100%', maxWidth:'600px', maxHeight:'80vh', overflowY:'auto', boxSizing:'border-box' as const }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div style={{ width:'40px', height:'4px', background:'rgba(255,255,255,0.15)', borderRadius:'2px', margin:'0 auto 1.25rem' }} />

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'12px', marginBottom:'1.25rem' }}>
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontWeight:700, fontSize:'1rem', marginBottom:'6px', lineHeight:1.3 }}>{item.tema}</p>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const }}>
              <span style={{ fontSize:'0.72rem', color:'#4A5568' }}>{qtd} slide{qtd !== 1 ? 's' : ''}</span>
              <span style={{ fontSize:'0.72rem', color:'#4A5568' }}>
                {new Date(item.criado_em).toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' })}
              </span>
              {item.cfg?.cor && (
                <span style={{ display:'inline-flex', alignItems:'center', gap:'5px', fontSize:'0.72rem', color:'#4A5568' }}>
                  <span style={{ width:'10px', height:'10px', borderRadius:'50%', background:item.cfg.cor, display:'inline-block' }} />
                  {item.cfg.cor.toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.07)', border:'none', borderRadius:'8px', padding:'6px', cursor:'pointer', color:'#8B95A8', display:'flex' }}>
            <X size={16} />
          </button>
        </div>

        {/* Slides resumo */}
        {qtd > 0 && (
          <div style={{ marginBottom:'1.25rem' }}>
            <p style={{ fontSize:'0.72rem', color:'#4A5568', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:'10px' }}>Slides</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              {item.slides.map((s: any, i: number) => (
                <div key={i} style={{ display:'flex', gap:'10px', alignItems:'baseline' }}>
                  <span style={{ fontSize:'0.7rem', color:'#4A5568', minWidth:'18px', fontFamily:'JetBrains Mono, monospace' }}>{i+1}.</span>
                  <span style={{ fontSize:'0.82rem', color:'#C0C8D8' }}>{s.titulo ?? s.tipo}</span>
                  <span style={{ fontSize:'0.7rem', color:'#4A5568', background:'#111827', borderRadius:'4px', padding:'1px 6px' }}>{s.tipo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legenda */}
        {item.legenda ? (
          <div style={{ marginBottom:'1.25rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
              <p style={{ fontSize:'0.72rem', color:'#4A5568', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>Legenda + hashtags</p>
              <button
                onClick={copiar}
                style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:copiado ? '#059669' : `${cor}18`, border:`1px solid ${copiado ? '#059669' : cor+'55'}`, borderRadius:'8px', padding:'5px 12px', color:copiado ? '#fff' : cor, fontSize:'0.75rem', fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}
              >
                {copiado ? <Check size={12}/> : <Copy size={12}/>}
                {copiado ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <pre style={{ color:'#8B95A8', fontSize:'0.82rem', lineHeight:1.7, margin:0, whiteSpace:'pre-wrap', background:'#080B12', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px', padding:'1rem', fontFamily:'inherit' }}>
              {item.legenda}
            </pre>
          </div>
        ) : (
          <div style={{ background:'#080B12', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'10px', padding:'1rem', marginBottom:'1.25rem', textAlign:'center' as const }}>
            <FileText size={20} style={{ color:'#4A5568', marginBottom:'6px' }} />
            <p style={{ color:'#4A5568', fontSize:'0.8rem' }}>Legenda não disponível para posts antigos.</p>
          </div>
        )}

        {/* Ações */}
        <Link
          href={`/criar?tema=${encodeURIComponent(item.tema)}`}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:cor, color:'#fff', padding:'0.85rem', borderRadius:'12px', textDecoration:'none', fontWeight:700, fontSize:'0.9rem', boxShadow:`0 6px 20px ${cor}44` }}
        >
          <Zap size={15}/> Recriar este post
        </Link>
      </div>
    </div>
  )
}

export default function HistoricoPage() {
  const supabase = createClient()
  const [carrosseis, setCarrosseis] = useState<Carrossel[]>([])
  const [pronto, setPronto] = useState(false)
  const [modalItem, setModalItem] = useState<Carrossel | null>(null)

  useEffect(() => {
    async function buscar() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const { data } = await supabase
        .from('carrosseis')
        .select('id, tema, tom, slides, legenda, cfg, criado_em')
        .eq('usuario_id', session.user.id)
        .order('criado_em', { ascending: false })
        .limit(50)
      setCarrosseis(data ?? [])
      setPronto(true)
    }
    buscar()
  }, [])

  if (!pronto) return (
    <div style={{ padding:'clamp(1rem,4vw,2.5rem)', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', fontSize:'0.8rem' }}>carregando...</div>
  )

  return (
    <div style={{ padding:'clamp(1rem,4vw,2.5rem)', maxWidth:'800px', width:'100%', boxSizing:'border-box' as const }}>
      <div style={{ marginBottom:'2.5rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Histórico</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Todos os posts que você criou.</p>
      </div>

      {!carrosseis.length ? (
        <div style={{ textAlign:'center', padding:'4rem', background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px' }}>
          <Clock size={32} style={{ color:'#4A5568', marginBottom:'1rem' }} />
          <p style={{ color:'#4A5568', marginBottom:'1.5rem' }}>Nenhum post criado ainda.</p>
          <Link href="/criar" style={{ background:'#2D6FFF', color:'#fff', padding:'0.7rem 1.5rem', borderRadius:'8px', textDecoration:'none', fontWeight:600, fontSize:'0.875rem', display:'inline-flex', alignItems:'center', gap:'6px' }}>
            <Zap size={14}/> Criar primeiro post
          </Link>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {carrosseis.map(c => {
            const qtd  = Array.isArray(c.slides) ? c.slides.length : 0
            const cor  = c.cfg?.cor ?? '#2D6FFF'
            const data = new Date(c.criado_em).toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' })
            return (
              <div
                key={c.id}
                onClick={() => setModalItem(c)}
                style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'1rem', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem', flexWrap:'wrap' as const, cursor:'pointer' }}
              >
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontWeight:600, fontSize:'0.9rem', marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.tema}</p>
                  <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, alignItems:'center' }}>
                    <span style={{ fontSize:'0.72rem', color:'#4A5568' }}>{qtd} slide{qtd !== 1 ? 's' : ''}</span>
                    <span style={{ fontSize:'0.72rem', color:'#4A5568' }}>{data}</span>
                    {c.cfg?.cor && <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:c.cfg.cor, display:'inline-block', flexShrink:0 }} />}
                    {c.legenda && <span style={{ fontSize:'0.65rem', color:'#4A5568', background:'#111827', borderRadius:'4px', padding:'1px 6px' }}>legenda</span>}
                  </div>
                </div>
                <div style={{ display:'flex', gap:'8px', alignItems:'center', flexShrink:0 }}>
                  <span style={{ fontSize:'0.75rem', color:'#4A5568' }}>Ver detalhes →</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modalItem && <ModalDetalhes item={modalItem} onClose={() => setModalItem(null)} />}
    </div>
  )
}
