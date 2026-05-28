'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Clock, Zap } from 'lucide-react'

const TOM_LABELS: Record<string, string> = {
  vender:'Quero vender', ensinar:'Quero ensinar',
  urgencia:'Criar urgência', inspirar:'Inspirar pessoas',
}

export default function HistoricoPage() {
  const supabase = createClient()
  const [carrosseis, setCarrosseis] = useState<any[]>([])
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    async function buscar() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const { data } = await supabase
        .from('carrosseis')
        .select('id, tema, tom, slides, criado_em')
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
            const data = new Date(c.criado_em).toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' })
            return (
              <div key={c.id} style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'1.25rem 1.5rem', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem', flexWrap:'wrap' as const }}>
                <div>
                  <p style={{ fontWeight:600, fontSize:'0.95rem', marginBottom:'4px' }}>{c.tema}</p>
                  <div style={{ display:'flex', gap:'12px' }}>
                    <span style={{ fontSize:'0.75rem', color:'#4A5568' }}>{TOM_LABELS[c.tom] ?? c.tom}</span>
                    <span style={{ fontSize:'0.75rem', color:'#4A5568' }}>{qtd} slide{qtd !== 1 ? 's' : ''}</span>
                    <span style={{ fontSize:'0.75rem', color:'#4A5568' }}>{data}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
