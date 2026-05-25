'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Zap, Download, ChevronUp, ChevronDown, Loader2, Eye } from 'lucide-react'
import { Tom, TOM_LABELS, Slide } from '@/types'
import { createClient } from '@/lib/supabase/client'
import JSZip from 'jszip'

const TONS: Tom[] = ['vender', 'ensinar', 'urgencia', 'inspirar']
const UNSPLASH_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

// Busca foto do Unsplash pelo tema
async function buscarFoto(tema: string): Promise<string> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(tema)}&per_page=1&orientation=squarish`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    )
    const data = await res.json()
    return data.results?.[0]?.urls?.regular ?? ''
  } catch {
    return ''
  }
}

// Renderiza slide em canvas e retorna blob PNG
async function renderizarSlide(slide: Slide, total: number, fotoUrl: string, logoUrl?: string): Promise<Blob> {
  const SIZE = 1080

  const canvas  = document.createElement('canvas')
  canvas.width  = SIZE
  canvas.height = SIZE
  const ctx     = canvas.getContext('2d')!

  // Fundo escuro base
  ctx.fillStyle = '#080B12'
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Foto de fundo
  if (fotoUrl) {
    try {
      const img = await carregarImagem(fotoUrl)
      // Cover fit
      const scale = Math.max(SIZE / img.width, SIZE / img.height)
      const w = img.width * scale
      const h = img.height * scale
      ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h)
    } catch {}
  }

  // Overlay gradiente
  const grad = ctx.createLinearGradient(0, 0, 0, SIZE)
  grad.addColorStop(0, 'rgba(8,11,18,0.75)')
  grad.addColorStop(0.4, 'rgba(8,11,18,0.55)')
  grad.addColorStop(1, 'rgba(8,11,18,0.92)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Linha azul no topo
  ctx.fillStyle = '#2D6FFF'
  ctx.fillRect(0, 0, SIZE, 6)

  const PAD = 80

  // Número do slide
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.font = '500 32px system-ui, sans-serif'
  ctx.fillText(`${String(slide.ordem).padStart(2,'0')} / ${String(total).padStart(2,'0')}`, PAD, PAD + 10)

  // Destaque (só slide 1)
  let cursorY = SIZE * 0.38
  if (slide.ordem === 1 && slide.destaque) {
    ctx.fillStyle = '#2D6FFF'
    ctx.font = 'bold 96px system-ui, sans-serif'
    ctx.fillText(slide.destaque, PAD, cursorY)
    cursorY += 110
  }

  // Título
  ctx.fillStyle = '#F0F4FF'
  const tamanhoTitulo = slide.ordem === 1 ? 72 : 80
  ctx.font = `bold ${tamanhoTitulo}px system-ui, sans-serif`
  const linhasTitulo = quebrarTexto(ctx, slide.titulo, SIZE - PAD * 2)
  for (const linha of linhasTitulo) {
    ctx.fillText(linha, PAD, cursorY)
    cursorY += tamanhoTitulo * 1.2
  }
  cursorY += 20

  // Corpo
  ctx.fillStyle = 'rgba(240,244,255,0.65)'
  ctx.font = '400 44px system-ui, sans-serif'
  const linhasCorpo = slide.corpo.split('\n').filter(Boolean)
  for (const linha of linhasCorpo) {
    const partes = quebrarTexto(ctx, linha, SIZE - PAD * 2)
    for (const parte of partes) {
      ctx.fillText(parte, PAD, cursorY)
      cursorY += 56
    }
  }

  // Logo
  if (logoUrl) {
    try {
      const logo = await carregarImagem(logoUrl)
      const logoH = 60
      const logoW = (logo.width / logo.height) * logoH
      ctx.drawImage(logo, SIZE - PAD - logoW, PAD - 10, logoW, logoH)
    } catch {}
  }

  // Dots de navegação
  const dotY   = SIZE - PAD
  const dotW   = 36
  const dotH   = 10
  const dotGap = 14
  const totalW = total * dotW + (total - 1) * dotGap
  let dotX     = PAD

  for (let i = 0; i < total; i++) {
    ctx.beginPath()
    ctx.roundRect(dotX, dotY, i === slide.ordem - 1 ? dotW * 1.8 : dotW * 0.6, dotH, 5)
    ctx.fillStyle = i === slide.ordem - 1 ? '#2D6FFF' : 'rgba(255,255,255,0.2)'
    ctx.fill()
    dotX += (i === slide.ordem - 1 ? dotW * 1.8 : dotW * 0.6) + dotGap
  }

  return new Promise(resolve => canvas.toBlob(b => resolve(b!), 'image/png'))
}

function quebrarTexto(ctx: CanvasRenderingContext2D, texto: string, maxW: number): string[] {
  const palavras = texto.split(' ')
  const linhas: string[] = []
  let atual = ''
  for (const palavra of palavras) {
    const teste = atual ? `${atual} ${palavra}` : palavra
    if (ctx.measureText(teste).width > maxW) {
      if (atual) linhas.push(atual)
      atual = palavra
    } else {
      atual = teste
    }
  }
  if (atual) linhas.push(atual)
  return linhas
}

function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Componente de preview de um slide
function SlidePreview({ slide, total, fotoUrl }: { slide: Slide; total: number; fotoUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    renderizarSlide(slide, total, fotoUrl).then(blob => {
      const url = URL.createObjectURL(blob)
      const img = new Image()
      img.onload = () => {
        const ctx = canvas.getContext('2d')!
        canvas.width  = 320
        canvas.height = 320
        ctx.drawImage(img, 0, 0, 320, 320)
        URL.revokeObjectURL(url)
      }
      img.src = url
    })
  }, [slide, total, fotoUrl])

  return <canvas ref={canvasRef} width={320} height={320} style={{ width:'100%', height:'auto', borderRadius:'8px', display:'block' }} />
}

export default function CriarPage() {
  const supabase = createClient()
  const [tema, setTema]           = useState('')
  const [tom, setTom]             = useState<Tom>('vender')
  const [qtd, setQtd]             = useState(5)
  const [slides, setSlides]       = useState<Slide[]>([])
  const [carrosselId, setCarrosselId] = useState('')
  const [gerando, setGerando]     = useState(false)
  const [erro, setErro]           = useState('')
  const [baixando, setBaixando]   = useState(false)
  const [editando, setEditando]   = useState<string | null>(null)
  const [session, setSession]     = useState<any>(null)
  const [fotoUrl, setFotoUrl]     = useState('')
  const [buscandoFoto, setBuscandoFoto] = useState(false)
  const [slideAtivo, setSlideAtivo]     = useState(0)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])

  async function gerar() {
    if (!tema.trim()) { setErro('Digite o tema do post.'); return }
    setErro('')
    setGerando(true)
    setSlides([])
    setFotoUrl('')
    setSlideAtivo(0)

    // Busca foto em paralelo
    setBuscandoFoto(true)
    buscarFoto(tema).then(url => { setFotoUrl(url); setBuscandoFoto(false) })

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
      if (!res.ok) { setErro(data.erro ?? 'Erro ao gerar.'); return }
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
    setSlideAtivo(alvo)
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
      const blob = await zip.generateAsync({ type: 'blob' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url; a.download = `sliqr_${tema.slice(0,20).replace(/\s/g,'_')}.zip`
      a.click(); URL.revokeObjectURL(url)
    } finally {
      setBaixando(false)
    }
  }

  const slideAtivoObj = slides[slideAtivo]

  return (
    <div style={{ padding:'2.5rem', maxWidth:'1100px' }}>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Criar post</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Digite o tema e escolha como quer soar. O post sai pronto.</p>
      </div>

      {/* Form */}
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

      {/* Preview + Editor */}
      {slides.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'380px 1fr', gap:'24px', alignItems:'start' }}>

          {/* Preview visual */}
          <div style={{ position:'sticky', top:'24px' }}>
            <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
                <span style={{ fontSize:'0.75rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.06em' }}>
                  PREVIEW {String(slideAtivo + 1).padStart(2,'0')}/{String(slides.length).padStart(2,'0')}
                </span>
                {buscandoFoto && <span style={{ fontSize:'0.7rem', color:'#4A5568' }}>buscando foto...</span>}
              </div>

              {slideAtivoObj && (
                <SlidePreview slide={slideAtivoObj} total={slides.length} fotoUrl={fotoUrl} />
              )}

              {/* Navegação de slides */}
              <div style={{ display:'flex', gap:'6px', marginTop:'12px', justifyContent:'center', flexWrap:'wrap' }}>
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setSlideAtivo(i)}
                    style={{ width: i === slideAtivo ? '28px' : '10px', height:'10px', borderRadius:'5px', border:'none', background: i === slideAtivo ? '#2D6FFF' : 'rgba(255,255,255,0.15)', cursor:'pointer', padding:0, transition:'all 0.2s' }} />
                ))}
              </div>

              {/* Botões de download */}
              <div style={{ display:'flex', gap:'8px', marginTop:'16px' }}>
                <button onClick={() => slideAtivoObj && baixarUm(slideAtivoObj)}
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

          {/* Lista de slides para edição */}
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' }}>
              <h2 style={{ fontSize:'1rem', fontWeight:600, letterSpacing:'-0.02em' }}>{slides.length} slide{slides.length > 1 ? 's' : ''} — clique para editar</h2>
            </div>

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
