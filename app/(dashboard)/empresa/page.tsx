'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Building2, CheckCircle, Loader2 } from 'lucide-react'

const SEGMENTOS = [
  'Alimentação & Delivery', 'Saúde & Bem-estar', 'Beleza & Estética',
  'Seguros & Finanças', 'Moda & Vestuário', 'Educação & Cursos',
  'Imóveis', 'Tecnologia', 'Pet', 'Varejo', 'Serviços', 'Outro',
]

const OBJETIVOS = [
  { id: 'vender',    label: 'Vender mais',         desc: 'Converter seguidores em clientes' },
  { id: 'ensinar',   label: 'Construir autoridade', desc: 'Se tornar referência no nicho' },
  { id: 'inspirar',  label: 'Aumentar engajamento', desc: 'Criar comunidade ativa' },
  { id: 'urgencia',  label: 'Gerar leads',          desc: 'Captar potenciais clientes' },
]

export default function EmpresaPage() {
  const supabase = createClient()
  const router   = useRouter()
  const [session, setSession]   = useState<any>(null)
  const [salvando, setSalvando] = useState(false)
  const [salvo, setSalvo]       = useState(false)
  const [form, setForm] = useState({
    nome: '', segmento: '', descricao: '', produtos: '',
    publico: '', objetivo: 'vender', instagram: '',
  })

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session)
      if (!data.session) return
      const res  = await fetch(`/api/empresa?token=${data.session.access_token}`)
      const data2 = await res.json()
      if (data2.empresa) setForm({ ...form, ...data2.empresa })
    })
  }, [])

  async function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome || !form.segmento) return
    setSalvando(true)
    try {
      await fetch('/api/empresa', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, accessToken: session?.access_token }),
      })
      setSalvo(true)
      setTimeout(() => router.push('/criar'), 1200)
    } finally { setSalvando(false) }
  }

  const cor = '#2D6FFF'

  return (
    <div style={{ padding:'2.5rem', maxWidth:'680px' }}>
      <div style={{ marginBottom:'2rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'0.5rem' }}>
          <Building2 size={20} style={{ color: cor }} />
          <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em' }}>Sua empresa</h1>
        </div>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>
          Quanto mais você nos contar, melhores serão as sugestões de conteúdo.
        </p>
      </div>

      <form onSubmit={salvar}>
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

          {/* Nome */}
          <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>
              Nome da empresa *
            </label>
            <input value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))} required
              placeholder="Ex: Bendito Hortelã, Elevance Seguros..."
              style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem 1rem', color:'#F0F4FF', fontSize:'0.95rem', fontFamily:'Sora, sans-serif', outline:'none' }} />
          </div>

          {/* Segmento */}
          <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'12px' }}>
              Segmento *
            </label>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {SEGMENTOS.map(s => (
                <button key={s} type="button" onClick={() => setForm(p => ({ ...p, segmento: s }))}
                  style={{ padding:'7px 14px', borderRadius:'100px', border: form.segmento===s ? `1px solid ${cor}` : '1px solid rgba(255,255,255,0.1)', background: form.segmento===s ? `${cor}18` : 'transparent', color: form.segmento===s ? cor : '#8B95A8', fontSize:'0.82rem', cursor:'pointer', fontFamily:'Sora, sans-serif', transition:'all 0.15s' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* O que vende */}
          <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>
              O que você vende?
            </label>
            <p style={{ fontSize:'0.78rem', color:'#4A5568', marginBottom:'10px' }}>
              Seja específico. "Marmitas fitness, açaí, polpa detox" é melhor que "alimentação saudável".
            </p>
            <textarea value={form.produtos} onChange={e => setForm(p => ({ ...p, produtos: e.target.value }))} rows={3}
              placeholder="Ex: Marmitas fitness e convencionais, açaí em tigela, polpa detox, sucos naturais..."
              style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem 1rem', color:'#F0F4FF', fontSize:'0.9rem', fontFamily:'Sora, sans-serif', outline:'none', resize:'vertical', lineHeight:1.6 }} />
          </div>

          {/* Público */}
          <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>
              Quem é seu cliente?
            </label>
            <input value={form.publico} onChange={e => setForm(p => ({ ...p, publico: e.target.value }))}
              placeholder="Ex: Mulheres 25-40 anos que querem se alimentar bem sem abrir mão do sabor"
              style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem 1rem', color:'#F0F4FF', fontSize:'0.9rem', fontFamily:'Sora, sans-serif', outline:'none' }} />
          </div>

          {/* Objetivo */}
          <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'12px' }}>
              Objetivo principal no Instagram
            </label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
              {OBJETIVOS.map(o => (
                <button key={o.id} type="button" onClick={() => setForm(p => ({ ...p, objetivo: o.id }))}
                  style={{ padding:'1rem', borderRadius:'12px', border: form.objetivo===o.id ? `1px solid ${cor}` : '1px solid rgba(255,255,255,0.07)', background: form.objetivo===o.id ? `${cor}18` : '#111827', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
                  <p style={{ fontSize:'0.875rem', fontWeight:600, color: form.objetivo===o.id ? cor : '#F0F4FF', margin:'0 0 4px' }}>{o.label}</p>
                  <p style={{ fontSize:'0.75rem', color:'#4A5568', margin:0 }}>{o.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Instagram */}
          <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>
              @ do Instagram (opcional)
            </label>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#4A5568', fontSize:'0.9rem' }}>@</span>
              <input value={form.instagram} onChange={e => setForm(p => ({ ...p, instagram: e.target.value.replace('@','') }))}
                placeholder="suaempresa"
                style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem 1rem 0.85rem 2rem', color:'#F0F4FF', fontSize:'0.9rem', fontFamily:'Sora, sans-serif', outline:'none' }} />
            </div>
          </div>

          <button type="submit" disabled={salvando || !form.nome || !form.segmento}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background: cor, color:'#fff', border:'none', borderRadius:'12px', padding:'1rem 2rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'1rem', cursor: (!form.nome||!form.segmento||salvando) ? 'not-allowed' : 'pointer', opacity: (!form.nome||!form.segmento) ? 0.5 : 1, boxShadow:`0 8px 24px ${cor}44`, transition:'all 0.2s' }}>
            {salvo ? <><CheckCircle size={18}/> Salvo! Redirecionando...</>
             : salvando ? <><Loader2 size={18} style={{ animation:'spin 1s linear infinite' }}/> Salvando...</>
             : 'Salvar e gerar sugestões →'}
          </button>
        </div>
      </form>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
