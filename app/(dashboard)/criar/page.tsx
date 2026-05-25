'use client'

import { useState, useEffect, useRef } from 'react'
import { Zap, Download, ChevronUp, ChevronDown, Loader2 } from 'lucide-react'
import { Tom, TOM_LABELS, Slide } from '@/types'
import { createClient } from '@/lib/supabase/client'
import JSZip from 'jszip'

const TONS: Tom[] = ['vender', 'ensinar', 'urgencia', 'inspirar']

async function buscarFoto(tema: string): Promise<string> {
  try {
    const res  = await fetch(`/api/foto?tema=${encodeURIComponent(tema)}`)
    const data = await res.json()
    return data.url ?? ''
  } catch { return '' }
}

function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img   = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => resolve(img)
    img.onerror = reject
    img.src     = src
  })
}

function quebrarTexto(ctx: CanvasRenderingContext2D, texto: string, maxW: number): string[] {
  const palavras = texto.split(' ')
  const linhas: string[] = []
  let atual = ''
  for (const p of palavras) {
    const teste = atual ? `${atual} ${p}` : p
    if (ctx.measureText(teste).width > maxW) { if (atual) linhas.push(atual); atual = p }
    else atual = teste
  }
  if (atual) linhas.push(atual)
  return linhas
}

async function renderizarSlide(slide: Slide, total: number, fotoUrl: string): Promise<Blob> {
  const SIZE = 1080
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = SIZE
  const ctx = canvas.getContext('2d')!

  // Fundo
  ctx.fillStyle = '#080B12'
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Foto de fundo via proxy
  if (fotoUrl) {
    try {
      const proxied = `/api/proxy-img?src=${encodeURIComponent(fotoUrl)}`
      const img     = await carregarImagem(proxied)
      const scale   = Math.max(SIZE / img.width, SIZE / img.height)
      const w = img.width * scale, h = img.height * scale
      ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h)
    } catch {}
  }

  // Overlay gradiente forte
  const grad = ctx.createLinearGradient(0, 0, 0, SIZE)
  grad.addColorStop(0,   'rgba(5,8,15,0.80)')
  grad.addColorStop(0.5, 'rgba(5,8,15,0.55)')
  grad.addColorStop(1,   'rgba(5,8,15,0.92)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Linha azul topo
  ctx.fillStyle = '#2D6FFF'
  ctx.fillRect(0, 0, SIZE, 7)

  const PAD = 90

  // Conteúdo — posição vertical centrada
  let cursorY = SIZE * 0.32

  // Destaque (slide 1)
  if (slide.ordem === 1 && slide.destaque) {
    ctx.font      = 'bold 100px system-ui, sans-serif'
    ctx.fillStyle = '#2D6FFF'
    const linhas  = quebrarTexto(ctx, slide.destaque, SIZE - PAD * 2)
    for (const l of linhas) { ctx.fillText(l, PAD, cursorY); cursorY += 115 }
    cursorY += 10
  }

  // Título
  const fsTitulo = slide.ordem === 1 ? 68 : 78
  ctx.font       = `bold ${fsTitulo}px system-ui, sans-serif`
  ctx.fillStyle  = '#F0F4FF'
  const linhasTitulo = quebrarTexto(ctx, slide.titulo, SIZE - PAD * 2)
  for (const l of linhasTitulo) { ctx.fillText(l, PAD, cursorY); cursorY += fsTitulo * 1.25 }
  cursorY += 24

  // Corpo
  ctx.font      = '400 42px system-ui, sans-serif'
  ctx.fillStyle = 'rgba(220,228,255,0.72)'
  const linhasCorpo = slide.corpo.split('\n').filter(Boolean)
  for (const linha of linhasCorpo) {
    const partes = quebrarTexto(ctx, linha, SIZE - PAD * 2)
    for (const parte of partes) { ctx.fillText(parte, PAD, cursorY); cursorY += 54 }
  }

  // Dots minimalistas em baixo
  const dotY   = SIZE - 64
  const dotR   = 5
  const dotGap = 18
  const totalW = total * dotR * 2 + (total - 1) * dotGap
  let dotX     = PAD

  for (let i = 0; i < total; i++) {
    ctx.beginPath()
    if (i === slide.ordem - 1) {
      // Dot ativo — pílula
      ctx.roundRect(dotX - 8, dotY - dotR, dotR * 2 + 16, dotR * 2, dotR)
      ctx.fillStyle = '#2D6FFF'
    } else {
      ctx.arc(dotX + dotR, dotY, dotR, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.22)'
    }
    ctx.fill()
    dotX += dotR * 2 + dotGap + (i === slide.ordem - 1 ? 16 : 0)
  }

  return new Promise(r => canvas.toBlob(b => r(b!), 'image/png'))
}

function SlidePreview({ slide, total, fotoUrl, ativo }: { slide: Slide; total: number; fotoUrl: string; ativo: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    renderizarSlide(slide, total, fotoUrl).then(blob => {
      const url = URL.createObjectURL(blob)
      const img = new Image()
      img.onload = () => {
        const c = canvasRef.current!
        c.width = c.height = 340
        c.getContext('2d')!.drawImage(img, 0, 0, 340, 340)
        URL.revokeObjectURL(url)
      }
      img.src = url
    })
  }, [slide, total, fotoUrl])

  return (
    <canvas ref={canvasRef} width={340} height={340}
      style={{ width:'100%', height:'auto', borderRadius:'10px', display:'block' }} />
  )
}

export default function CriarPage() {
  const supabase = createClient()
  const [tema, setTema]         = useState('')
  const [tom, setTom]           = useState<Tom>('vender')
  const [qtd, setQtd]           = useState(5)
  const [slides, setSlides]     = useState<Slide[]>([])
  const [gerando, setGerando]   = useState(false)
  const [erro, setErro]         = useState('')
  const [baixando, setBaixando] = useState(false)
  const [editando, setEditando] = useState<string | null>(null)
  const [session, setSession]   = useState<any>(null)
  const [fotoUrl, setFotoUrl]   = useState('')
  const [slideAtivo, setSlideAtivo] = useState(0)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])

  async function gerar() {
    if (!tema.trim()) { setErro('Digite o tema do post.'); return }
    setErro(''); setGerando(true); setSlides([]); setFotoUrl(''); setSlideAtivo(0)
    buscarFoto(tema).then(setFotoUrl)
    try {
      const res  = await fetch('/api/gerar', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ tema, tom, qtdSlides: qtd, accessToken: session?.access_token, refreshToken: session?.refresh_token }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.erro ?? 'Erro ao gerar.'); return }
      setSlides(data.slides)
    } finally { setGerando(false) }
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
    setSlides(nova); setSlideAtivo(alvo)
  }

  async function baixarUm(slide: Slide) {
    const blob = await renderizarSlide(slide, slides.length, fotoUrl)
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `slide_${String(slide.ordem).padStart(2,'0')}.png`
    a.click(); URL.revokeObjectURL(url)
  }

  async function baixarTudo() {
    setBaixando(true)
    try {
      const zip = new JSZip()
      for (const slide of slides) {
        const blob = await renderizarSlide(slide, slides.length, fotoUrl)
        zip.file(`slide_${String(slide.ordem).padStart(2,'0')}.png`, blob)
      }
      const blob = await zip.generateAsync({ type:'blob' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url; a.download = `sliqr_${tema.slice(0,20).replace(/\s/g,'_')}.zip`
      a.click(); URL.revokeObjectURL(url)
    } finally { setBaixando(false) }
  }

  return (
    <div style={{ padding:'2.5rem', maxWidth:'1100px' }}>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Criar post</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Digite o tema e escolha como quer soar. O post sai pronto.</p>
      </div>

      <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'2rem', marginBottom:'2rem' }}>
        <div style={{ marginBottom:'1.25rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Tema do post</label>
          <input value={tema} onChange={e => setTema(e.target.value)} onKeyDown={e => e.key === 'Enter' && gerar()}
            placeholder="Ex: seguro auto, plano de saúde para MEI, emagrecimento..."
            style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem 1rem', color:'#F0F4FF', fontSize:'0.95rem', fontFamily:'Sora, sans-serif', outline:'none' }} />
        </div>

        <div style={{ marginBottom:'1.25rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Como você quer soar?</label>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {TONS.map(t => (
              <button key={t} onClick={() => setTom(t)}
                style={{ padding:'7px 16px', borderRadius:'100px', border: tom === t ? '1px solid rgba(45,111,255,0.5)' : '1px solid rgba(255,255,255,0.07)', background: tom === t ? 'rgba(45,111,255,0.12)' : 'transparent', color: tom === t ? '#6B9FFF' : '#8B95A8', fontSize:'0.85rem', fontWeight:500, cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
                {TOM_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:'1.25rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>
            Quantos slides? <span style={{ color:'#2D6FFF' }}>{qtd}</span>
          </label>
          <input type="range" min={1} max={10} value={qtd} onChange={e => setQtd(Number(e.target.value))} style={{ width:'100%', accentColor:'#2D6FFF' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', color:'#4A5568', marginTop:'4px' }}><span>1</span><span>10</span></div>
        </div>

        {erro && <p style={{ color:'#FC8181', fontSize:'0.85rem', marginBottom:'1rem' }}>{erro}</p>}

        <button onClick={gerar} disabled={gerando}
          style={{ display:'flex', alignItems:'center', gap:'8px', background:'#2D6FFF', color:'#fff', border:'none', borderRadius:'10px', padding:'0.85rem 2rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.95rem', cursor: gerando ? 'not-allowed' : 'pointer', opacity: gerando ? 0.7 : 1, boxShadow:'0 8px 24px rgba(45,111,255,0.3)' }}>
          {gerando ? <><Loader2 size={16} style={{ animation:'spin 1s linear infinite' }}/> Gerando slides...</> : <><Zap size={16}/> Criar slides</>}
        </button>
      </div>

      {slides.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'360px 1fr', gap:'24px', alignItems:'start' }}>

          {/* Preview */}
          <div style={{ position:'sticky', top:'24px' }}>
            <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem' }}>
              {slides[slideAtivo] && (
                <SlidePreview slide={slides[slideAtivo]} total={slides.length} fotoUrl={fotoUrl} ativo />
              )}

              {/* Dots de navegação */}
              <div style={{ display:'flex', gap:'8px', marginTop:'14px', justifyContent:'center' }}>
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setSlideAtivo(i)}
                    style={{ width: i === slideAtivo ? '24px' : '8px', height:'8px', borderRadius:'4px', border:'none', background: i === slideAtivo ? '#2D6FFF' : 'rgba(255,255,255,0.15)', cursor:'pointer', padding:0, transition:'all 0.2s' }} />
                ))}
              </div>

              <div style={{ display:'flex', gap:'8px', marginTop:'14px' }}>
                <button onClick={() => baixarUm(slides[slideAtivo])}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'0.6rem', color:'#8B95A8', fontSize:'0.78rem', fontWeight:500, cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
                  <Download size={13}/> Este slide
                </button>
                <button onClick={baixarTudo} disabled={baixando}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#2D6FFF', border:'none', borderRadius:'8px', padding:'0.6rem', color:'#fff', fontSize:'0.78rem', fontWeight:600, cursor:'pointer', fontFamily:'Sora, sans-serif', opacity: baixando ? 0.7 : 1 }}>
                  {baixando ? <Loader2 size={13} style={{ animation:'spin 1s linear infinite' }}/> : <Download size={13}/>}
                  {baixando ? 'Gerando...' : 'Baixar ZIP'}
                </button>
              </div>
            </div>
          </div>

          {/* Lista edição */}
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <h2 style={{ fontSize:'1rem', fontWeight:600, letterSpacing:'-0.02em', marginBottom:'4px' }}>
              {slides.length} slide{slides.length > 1 ? 's' : ''} — clique para editar
            </h2>

            {slides.map((slide, idx) => (
              <div key={slide.id} onClick={() => setSlideAtivo(idx)}
                style={{ background: slideAtivo === idx ? '#111827' : '#0D1117', border: slideAtivo === idx ? '1px solid rgba(45,111,255,0.4)' : '1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'1.25rem', cursor:'pointer', transition:'all 0.2s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem' }}>
                  <div style={{ flex:1 }}>
                    <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.62rem', color:'#4A5568', letterSpacing:'0.1em' }}>SLIDE {String(slide.ordem).padStart(2,'0')}</span>

                    {editando === slide.id ? (
                      <input value={slide.titulo} onChange={e => editarSlide(slide.id, 'titulo', e.target.value)}
                        onClick={e => e.stopPropagation()}
                        style={{ display:'block', width:'100%', background:'#080B12', border:'1px solid rgba(45,111,255,0.3)', borderRadius:'6px', padding:'6px 10px', color:'#F0F4FF', fontSize:'0.95rem', fontWeight:600, fontFamily:'Sora, sans-serif', outline:'none', marginTop:'6px', marginBottom:'8px' }} />
                    ) : (
                      <p style={{ fontSize:'0.95rem', fontWeight:600, margin:'4px 0 6px', lineHeight:1.3 }}>{slide.titulo}</p>
                    )}

                    {editando === slide.id ? (
                      <textarea value={slide.corpo} onChange={e => editarSlide(slide.id, 'corpo', e.target.value)}
                        onClick={e => e.stopPropagation()} rows={3}
                        style={{ display:'block', width:'100%', background:'#080B12', border:'1px solid rgba(45,111,255,0.3)', borderRadius:'6px', padding:'6px 10px', color:'#8B95A8', fontSize:'0.85rem', fontFamily:'Sora, sans-serif', outline:'none', resize:'vertical', lineHeight:1.6 }} />
                    ) : (
                      <p style={{ color:'#8B95A8', fontSize:'0.85rem', lineHeight:1.6, margin:0, whiteSpace:'pre-line' }}>{slide.corpo}</p>
                    )}
                  </div>

                  <div style={{ display:'flex', flexDirection:'column', gap:'5px', flexShrink:0 }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => moverSlide(idx, 'up')} disabled={idx === 0}
                      style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'5px', cursor:'pointer', color: idx === 0 ? '#4A5568' : '#8B95A8', display:'flex' }}>
                      <ChevronUp size={13}/>
                    </button>
                    <button onClick={() => moverSlide(idx, 'down')} disabled={idx === slides.length - 1}
                      style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'5px', cursor:'pointer', color: idx === slides.length - 1 ? '#4A5568' : '#8B95A8', display:'flex' }}>
                      <ChevronDown size={13}/>
                    </button>
                    <button onClick={() => setEditando(editando === slide.id ? null : slide.id)}
                      style={{ background: editando === slide.id ? 'rgba(45,111,255,0.15)' : '#111827', border: editando === slide.id ? '1px solid rgba(45,111,255,0.4)' : '1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'5px', cursor:'pointer', color: editando === slide.id ? '#6B9FFF' : '#8B95A8', display:'flex' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
