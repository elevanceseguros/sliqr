'use client'

import { useState, useEffect } from 'react'
import { Zap, Download, ChevronUp, ChevronDown, Loader2 } from 'lucide-react'
import { Tom, TOM_LABELS, Slide } from '@/types'
import { createClient } from '@/lib/supabase/client'
import JSZip from 'jszip'

const TONS: Tom[] = ['vender', 'ensinar', 'urgencia', 'inspirar']

export default function CriarPage() {
  const supabase = createClient()
  const [tema, setTema]         = useState('')
  const [tom, setTom]           = useState<Tom>('vender')
  const [qtd, setQtd]           = useState(5)
  const [slides, setSlides]     = useState<Slide[]>([])
  const [carrosselId, setCarrosselId] = useState('')
  const [gerando, setGerando]   = useState(false)
  const [erro, setErro]         = useState('')
  const [baixando, setBaixando] = useState(false)
  const [editando, setEditando] = useState<string | null>(null)
  const [session, setSession]   = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])

  async function gerar() {
    if (!tema.trim()) { setErro('Digite o tema do post.'); return }
    setErro('')
    setGerando(true)
    setSlides([])
    try {
      const res = await fetch('/api/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tema, tom, qtdSlides: qtd,
          accessToken:  session?.access_token,
          refreshToken: session?.refresh_token,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.erro ?? 'Erro ao gerar. Tente novamente.'); return }
      setSlides(data.slides)
      setCarrosselId(data.carrossel_id)
    } finally {
      setGerando(false)
    }
  }

  function editarSlide(id: string, campo: 'titulo' | 'corpo', valor: string) {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, [campo]: valor } : s))
  }

  function moverSlide(idx: number, dir: 'up' | 'down') {
    const nova = [...slides]
    const alvo = dir === 'up' ? idx - 1 : idx + 1
    if (alvo < 0 || alvo >= nova.length) return
    ;[nova[idx], nova[alvo]] = [nova[alvo], nova[idx]]
    nova.forEach((s, i) => { s.ordem = i + 1 })
    setSlides(nova)
  }

  function urlSlide(slide: Slide) {
    const p = new URLSearchParams({
      titulo: slide.titulo,
      corpo:  slide.corpo,
      ordem:  String(slide.ordem),
      total:  String(slides.length),
      ...(slide.destaque ? { destaque: slide.destaque } : {}),
    })
    return `/api/slides/${carrosselId}/render?${p.toString()}`
  }

  async function baixarTudo() {
    setBaixando(true)
    try {
      const zip = new JSZip()
      for (const slide of slides) {
        const res  = await fetch(urlSlide(slide))
        const blob = await res.blob()
        zip.file(`slide_${String(slide.ordem).padStart(2,'0')}.png`, blob)
      }
      const blob = await zip.generateAsync({ type: 'blob' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url; a.download = `sliqr_${tema.slice(0,20).replace(/\s/g,'_')}.zip`
      a.click(); URL.revokeObjectURL(url)
    } finally {
      setBaixando(false)
    }
  }

  async function baixarSlide(slide: Slide) {
    const res  = await fetch(urlSlide(slide))
    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `slide_${String(slide.ordem).padStart(2,'0')}.png`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding:'2.5rem', maxWidth:'900px' }}>
      <div style={{ marginBottom:'2.5rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Criar post</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Digite o tema e escolha como quer soar. O post sai pronto.</p>
      </div>

      <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'2rem', marginBottom:'2rem' }}>
        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Tema do post</label>
          <input value={tema} onChange={e => setTema(e.target.value)} onKeyDown={e => e.key === 'Enter' && gerar()}
            placeholder="Ex: plano de saúde para MEI, seguro auto para Uber..."
            style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem 1rem', color:'#F0F4FF', fontSize:'0.95rem', fontFamily:'Sora, sans-serif', outline:'none' }} />
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Como você quer soar?</label>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {TONS.map(t => (
              <button key={t} onClick={() => setTom(t)}
                style={{ padding:'8px 18px', borderRadius:'100px', border: tom === t ? '1px solid rgba(45,111,255,0.5)' : '1px solid rgba(255,255,255,0.07)', background: tom === t ? 'rgba(45,111,255,0.12)' : 'transparent', color: tom === t ? '#6B9FFF' : '#8B95A8', fontSize:'0.85rem', fontWeight:500, cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
                {TOM_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>
            Quantos slides? <span style={{ color:'#2D6FFF' }}>{qtd}</span>
          </label>
          <input type="range" min={1} max={10} value={qtd} onChange={e => setQtd(Number(e.target.value))} style={{ width:'100%', accentColor:'#2D6FFF' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', color:'#4A5568', marginTop:'4px' }}>
            <span>1</span><span>10</span>
          </div>
        </div>

        {erro && <p style={{ color:'#FC8181', fontSize:'0.85rem', marginBottom:'1rem' }}>{erro}</p>}

        <button onClick={gerar} disabled={gerando}
          style={{ display:'flex', alignItems:'center', gap:'8px', background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'10px', padding:'0.85rem 2rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.95rem', cursor: gerando ? 'not-allowed' : 'pointer', opacity: gerando ? 0.7 : 1, boxShadow:'0 8px 24px rgba(45,111,255,0.3)' }}>
          {gerando ? <><Loader2 size={16} style={{ animation:'spin 1s linear infinite' }}/> Gerando seus slides...</> : <><Zap size={16}/> Criar slides</>}
        </button>
      </div>

      {slides.length > 0 && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
            <h2 style={{ fontSize:'1.1rem', fontWeight:600, letterSpacing:'-0.02em' }}>{slides.length} slide{slides.length > 1 ? 's' : ''} gerado{slides.length > 1 ? 's' : ''}</h2>
            <button onClick={baixarTudo} disabled={baixando}
              style={{ display:'flex', alignItems:'center', gap:'8px', background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'8px', padding:'0.65rem 1.25rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.85rem', cursor:'pointer', opacity: baixando ? 0.7 : 1 }}>
              {baixando ? <Loader2 size={14} style={{ animation:'spin 1s linear infinite' }}/> : <Download size={14}/>}
              {baixando ? 'Preparando...' : 'Baixar tudo (.zip)'}
            </button>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {slides.map((slide, idx) => (
              <div key={slide.id} style={{ background:'#0D1117', border: editando === slide.id ? '1px solid rgba(45,111,255,0.4)' : '1px solid rgba(255,255,255,0.07)', borderRadius:'14px', padding:'1.5rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem' }}>
                  <div style={{ flex:1 }}>
                    <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.65rem', color:'#4A5568', letterSpacing:'0.1em' }}>SLIDE {String(slide.ordem).padStart(2,'0')}</span>
                    {editando === slide.id ? (
                      <input value={slide.titulo} onChange={e => editarSlide(slide.id, 'titulo', e.target.value)}
                        style={{ display:'block', width:'100%', background:'#080B12', border:'1px solid rgba(45,111,255,0.3)', borderRadius:'6px', padding:'6px 10px', color:'#F0F4FF', fontSize:'1rem', fontWeight:600, fontFamily:'Sora, sans-serif', outline:'none', marginTop:'6px', marginBottom:'8px' }} />
                    ) : (
                      <p style={{ fontSize:'1rem', fontWeight:600, letterSpacing:'-0.02em', margin:'6px 0 8px', lineHeight:1.3 }}>{slide.titulo}</p>
                    )}
                    {editando === slide.id ? (
                      <textarea value={slide.corpo} onChange={e => editarSlide(slide.id, 'corpo', e.target.value)} rows={3}
                        style={{ display:'block', width:'100%', background:'#080B12', border:'1px solid rgba(45,111,255,0.3)', borderRadius:'6px', padding:'6px 10px', color:'#8B95A8', fontSize:'0.875rem', fontFamily:'Sora, sans-serif', outline:'none', resize:'vertical', lineHeight:1.6 }} />
                    ) : (
                      <p style={{ color:'#8B95A8', fontSize:'0.875rem', lineHeight:1.65, margin:0, whiteSpace:'pre-line' }}>{slide.corpo}</p>
                    )}
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'6px', flexShrink:0 }}>
                    <button onClick={() => moverSlide(idx, 'up')} disabled={idx === 0}
                      style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'6px', cursor:'pointer', color: idx === 0 ? '#4A5568' : '#8B95A8', display:'flex' }}>
                      <ChevronUp size={14}/>
                    </button>
                    <button onClick={() => moverSlide(idx, 'down')} disabled={idx === slides.length - 1}
                      style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'6px', cursor:'pointer', color: idx === slides.length - 1 ? '#4A5568' : '#8B95A8', display:'flex' }}>
                      <ChevronDown size={14}/>
                    </button>
                    <button onClick={() => setEditando(editando === slide.id ? null : slide.id)}
                      style={{ background: editando === slide.id ? 'rgba(45,111,255,0.15)' : '#111827', border: editando === slide.id ? '1px solid rgba(45,111,255,0.4)' : '1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'6px', cursor:'pointer', color: editando === slide.id ? '#6B9FFF' : '#8B95A8', display:'flex' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button onClick={() => baixarSlide(slide)}
                      style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'6px', cursor:'pointer', color:'#8B95A8', display:'flex' }}>
                      <Download size={14}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:'1.5rem', display:'flex', justifyContent:'flex-end' }}>
            <button onClick={baixarTudo} disabled={baixando}
              style={{ display:'flex', alignItems:'center', gap:'8px', background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'10px', padding:'0.85rem 2rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.95rem', cursor:'pointer', boxShadow:'0 8px 24px rgba(45,111,255,0.3)' }}>
              <Download size={16}/> {baixando ? 'Preparando ZIP...' : 'Baixar todos os slides'}
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
