'use client'

import { useState, useEffect, useRef } from 'react'
import { Zap, Download, ChevronUp, ChevronDown, Loader2, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react'
import { Tom, TOM_LABELS, Slide } from '@/types'
import { createClient } from '@/lib/supabase/client'
import JSZip from 'jszip'

const TONS: Tom[] = ['vender', 'ensinar', 'urgencia', 'inspirar']

const FONTES = [
  { id: 'modern',   label: 'Moderna',   css: 'system-ui, -apple-system, sans-serif',        peso: '800' },
  { id: 'classic',  label: 'Clássica',  css: 'Georgia, "Times New Roman", serif',            peso: '700' },
  { id: 'bold',     label: 'Bold',      css: '"Arial Black", "Helvetica Neue", sans-serif',   peso: '900' },
]

const TEMA_EN: Record<string, string> = {
  'seguro auto': 'car road safety insurance', 'seguro carro': 'car road protection',
  'plano de saude': 'healthcare doctor hospital', 'plano de saúde': 'healthcare doctor hospital',
  'emagrecimento': 'fitness healthy body weight loss', 'marmita': 'healthy meal food preparation',
  'farmacia': 'pharmacy medicine pills', 'farmácia': 'pharmacy medicine pills',
  'remedio': 'medicine healthcare clinic', 'remédio': 'medicine healthcare clinic',
  'imovel': 'real estate house building', 'imóvel': 'real estate house building',
  'consorcio': 'investment finance planning', 'consórcio': 'investment finance planning',
  'moto': 'motorcycle road freedom', 'academia': 'gym workout fitness training',
  'dentista': 'dental smile teeth clinic', 'nutrição': 'nutrition healthy food',
  'seguro vida': 'family life protection insurance', 'financeiro': 'finance money business',
}

function temaParaEN(tema: string): string {
  const l = tema.toLowerCase().trim()
  for (const [pt, en] of Object.entries(TEMA_EN)) {
    if (l.includes(pt)) return en
  }
  return tema + ' professional'
}

async function buscarNovaFoto(tema: string, excluir: string[] = []): Promise<string> {
  try {
    const query = temaParaEN(tema)
    const page  = Math.floor(Math.random() * 5) + 1
    const res   = await fetch(`/api/foto?tema=${encodeURIComponent(query)}&qtd=10&page=${page}`)
    const data  = await res.json()
    const urls: string[] = data.urls ?? []
    const nova = urls.find(u => u && !excluir.includes(u))
    return nova ?? urls[0] ?? ''
  } catch { return '' }
}

async function buscarFotos(tema: string, qtd: number): Promise<string[]> {
  try {
    const query = temaParaEN(tema)
    const res   = await fetch(`/api/foto?tema=${encodeURIComponent(query)}&qtd=${qtd * 2}`)
    const data  = await res.json()
    const urls: string[] = data.urls ?? []
    // Retorna fotos únicas — uma por slide
    const unicas: string[] = []
    for (let i = 0; i < qtd; i++) {
      unicas.push(urls[i] ?? urls[0] ?? '')
    }
    return unicas
  } catch { return [] }
}

function carregarImagem(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => res(img)
    img.onerror = rej
    img.src = src
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

interface Config {
  cor:     string
  fonteId: string
  logoUrl: string
}

async function renderizarSlide(
  slide: Slide, total: number, fotoUrl: string, cfg: Config, isPreview = false
): Promise<Blob> {
  const SIZE  = isPreview ? 680 : 1080
  const S     = SIZE / 1080
  const fonte = FONTES.find(f => f.id === cfg.fonteId) ?? FONTES[0]
  const cor   = cfg.cor

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = SIZE
  const ctx = canvas.getContext('2d')!

  // Fundo
  ctx.fillStyle = '#080B12'
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Foto
  if (fotoUrl) {
    try {
      const src = fotoUrl.startsWith('data:') ? fotoUrl : `/api/proxy-img?src=${encodeURIComponent(fotoUrl)}`
      const img = await carregarImagem(src)
      const sc  = Math.max(SIZE / img.width, SIZE / img.height)
      const w = img.width * sc, h = img.height * sc
      ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h)
    } catch {}
  }

  // Overlay
  const grad = ctx.createLinearGradient(0, 0, 0, SIZE)
  grad.addColorStop(0,    'rgba(4,6,14,0.84)')
  grad.addColorStop(0.42, 'rgba(4,6,14,0.50)')
  grad.addColorStop(1,    'rgba(4,6,14,0.95)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Linha topo
  ctx.fillStyle = cor
  ctx.fillRect(0, 0, SIZE, 7 * S)

  // Barra lateral
  ctx.fillStyle = cor
  ctx.globalAlpha = 0.55
  ctx.fillRect(0, 0, 5 * S, SIZE)
  ctx.globalAlpha = 1

  const PAD = 88 * S
  const LRG = SIZE - PAD * 2
  let cursorY = SIZE * 0.27

  // DESTAQUE (slide 1)
  if (slide.ordem === 1 && slide.destaque) {
    ctx.font      = `${fonte.peso} ${86 * S}px ${fonte.css}`
    const linhasD = quebrarTexto(ctx, slide.destaque, LRG)
    // Fundo semitransparente
    ctx.fillStyle  = cor
    ctx.globalAlpha = 0.14
    const alturaBloco = linhasD.length * 98 * S
    ctx.beginPath()
    ctx.roundRect(PAD - 14 * S, cursorY - 72 * S, LRG + 28 * S, alturaBloco + 16 * S, 10 * S)
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.fillStyle = cor
    for (const l of linhasD) { ctx.fillText(l, PAD, cursorY); cursorY += 98 * S }
    cursorY += 16 * S
  }

  // TÍTULO
  const fsTit = (slide.ordem === 1 ? 62 : 72) * S
  ctx.font      = `${fonte.peso} ${fsTit}px ${fonte.css}`
  ctx.fillStyle = '#FFFFFF'
  const lT = quebrarTexto(ctx, slide.titulo, LRG)
  for (const l of lT) { ctx.fillText(l, PAD, cursorY); cursorY += fsTit * 1.28 }
  cursorY += 18 * S

  // Linha decorativa
  ctx.fillStyle   = cor
  ctx.globalAlpha = 0.5
  ctx.fillRect(PAD, cursorY - 12 * S, 56 * S, 3 * S)
  ctx.globalAlpha = 1
  cursorY += 16 * S

  // CORPO
  ctx.font      = `400 ${38 * S}px ${fonte.css}`
  ctx.fillStyle = 'rgba(205,215,255,0.82)'
  for (const linha of slide.corpo.split('\n').filter(Boolean)) {
    for (const parte of quebrarTexto(ctx, linha, LRG)) {
      ctx.fillText(parte, PAD, cursorY)
      cursorY += 50 * S
    }
    cursorY += 4 * S
  }

  // LOGO
  if (cfg.logoUrl) {
    try {
      const logo = await carregarImagem(cfg.logoUrl)
      const lH   = 52 * S
      const lW   = (logo.width / logo.height) * lH
      ctx.drawImage(logo, SIZE - PAD - lW, 28 * S, lW, lH)
    } catch {}
  }

  // Numeração discreta
  ctx.font      = `500 ${22 * S}px ${fonte.css}`
  ctx.fillStyle = 'rgba(255,255,255,0.22)'
  ctx.textAlign = 'right'
  ctx.fillText(`${slide.ordem}/${total}`, SIZE - PAD + 18 * S, 56 * S)
  ctx.textAlign = 'left'

  // DOTS
  const dotY = SIZE - 48 * S
  const dotH = 7 * S
  const gap  = 10 * S
  let dotX   = PAD
  for (let i = 0; i < total; i++) {
    const ativo = i === slide.ordem - 1
    const dotW  = ativo ? 30 * S : 7 * S
    ctx.beginPath()
    ctx.roundRect(dotX, dotY, dotW, dotH, dotH / 2)
    ctx.fillStyle = ativo ? cor : 'rgba(255,255,255,0.18)'
    ctx.fill()
    dotX += dotW + gap
  }

  return new Promise(r => canvas.toBlob(b => r(b!), 'image/png', 0.95))
}

function SlideCanvas({ slide, total, fotoUrl, cfg }: { slide: Slide; total: number; fotoUrl: string; cfg: Config }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current || !slide) return
    renderizarSlide(slide, total, fotoUrl, cfg, true).then(blob => {
      const url = URL.createObjectURL(blob)
      const img = new Image()
      img.onload = () => {
        const c = ref.current!; c.width = c.height = 340
        c.getContext('2d')!.drawImage(img, 0, 0, 340, 340)
        URL.revokeObjectURL(url)
      }
      img.src = url
    })
  }, [slide, total, fotoUrl, cfg])
  return <canvas ref={ref} width={340} height={340} style={{ width:'100%', height:'auto', borderRadius:'12px', display:'block' }} />
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
  const [fotos, setFotos]       = useState<string[]>([])
  const [slideAtivo, setSlideAtivo] = useState(0)
  const [trocando, setTrocando] = useState(false)
  const [cfg, setCfg] = useState<Config>({ cor: '#2D6FFF', fonteId: 'modern', logoUrl: '' })

  const fotoInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])

  function lerArquivoBase64(file: File): Promise<string> {
    return new Promise((res, rej) => {
      const r = new FileReader()
      r.onload = () => res(r.result as string)
      r.onerror = rej
      r.readAsDataURL(file)
    })
  }

  async function uploadFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    const b64 = await lerArquivoBase64(file)
    setFotos(prev => { const n = [...prev]; n[slideAtivo] = b64; return n })
  }

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    const b64 = await lerArquivoBase64(file)
    setCfg(prev => ({ ...prev, logoUrl: b64 }))
  }

  async function gerar() {
    if (!tema.trim()) { setErro('Digite o tema do post.'); return }
    setErro(''); setGerando(true); setSlides([]); setFotos([]); setSlideAtivo(0)
    buscarFotos(tema, qtd).then(setFotos)
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

  async function trocarFoto() {
    setTrocando(true)
    const atual  = fotos[slideAtivo] ?? ''
    const nova   = await buscarNovaFoto(tema, fotos)
    setFotos(prev => { const n = [...prev]; n[slideAtivo] = nova || atual; return n })
    setTrocando(false)
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
    const blob = await renderizarSlide(slide, slides.length, fotos[slide.ordem - 1] ?? '', cfg)
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `slide_${String(slide.ordem).padStart(2,'0')}.png`; a.click()
    URL.revokeObjectURL(url)
  }

  async function baixarTudo() {
    setBaixando(true)
    try {
      const zip = new JSZip()
      for (const slide of slides) {
        const blob = await renderizarSlide(slide, slides.length, fotos[slide.ordem - 1] ?? '', cfg)
        zip.file(`slide_${String(slide.ordem).padStart(2,'0')}.png`, blob)
      }
      const blob = await zip.generateAsync({ type:'blob' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url; a.download = `sliqr_${tema.slice(0,20).replace(/\s/g,'_')}.zip`; a.click()
      URL.revokeObjectURL(url)
    } finally { setBaixando(false) }
  }

  const cor = cfg.cor

  return (
    <div style={{ padding:'2.5rem', maxWidth:'1100px' }}>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Criar post</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Configure o visual, digite o tema e crie. O post sai pronto.</p>
      </div>

      <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'2rem', marginBottom:'1.5rem' }}>

        {/* CONFIGURAÇÃO VISUAL */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1.5rem', marginBottom:'1.75rem', paddingBottom:'1.75rem', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>

          {/* Cor */}
          <div>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'10px' }}>Cor principal</label>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'center' }}>
              {['#2D6FFF','#00C896','#FF4D4D','#A855F7','#F59E0B','#EC4899','#14B8A6'].map(c => (
                <button key={c} onClick={() => setCfg(p => ({ ...p, cor: c }))}
                  style={{ width:'28px', height:'28px', borderRadius:'50%', background: c, border: cor === c ? `3px solid #fff` : '3px solid transparent', cursor:'pointer', transition:'transform 0.15s', transform: cor === c ? 'scale(1.2)' : 'scale(1)' }} />
              ))}
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input type="color" value={cor} onChange={e => setCfg(p => ({ ...p, cor: e.target.value }))}
                  style={{ width:'28px', height:'28px', borderRadius:'50%', border:'none', cursor:'pointer', padding:0, background:'transparent' }} />
                <span style={{ fontSize:'0.65rem', color:'#4A5568', marginLeft:'4px' }}>custom</span>
              </div>
            </div>
          </div>

          {/* Fonte */}
          <div>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'10px' }}>Fonte</label>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {FONTES.map(f => (
                <button key={f.id} onClick={() => setCfg(p => ({ ...p, fonteId: f.id }))}
                  style={{ padding:'6px 14px', borderRadius:'8px', border: cfg.fonteId === f.id ? `1px solid ${cor}` : '1px solid rgba(255,255,255,0.1)', background: cfg.fonteId === f.id ? `${cor}18` : 'transparent', color: cfg.fonteId === f.id ? cor : '#8B95A8', fontSize:'0.82rem', fontFamily: FONTES.find(x => x.id === f.id)?.css, fontWeight: cfg.fonteId === f.id ? '700' : '400', cursor:'pointer' }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'10px' }}>Logo (opcional)</label>
            <input ref={logoInputRef} type="file" accept="image/*" onChange={uploadLogo} style={{ display:'none' }} />
            <button onClick={() => logoInputRef.current?.click()}
              style={{ display:'flex', alignItems:'center', gap:'8px', background: cfg.logoUrl ? `${cor}18` : '#111827', border: cfg.logoUrl ? `1px solid ${cor}55` : '1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'8px 14px', color: cfg.logoUrl ? cor : '#8B95A8', fontSize:'0.8rem', cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
              <Upload size={13}/> {cfg.logoUrl ? 'Logo carregada ✓' : 'Fazer upload da logo'}
            </button>
            {cfg.logoUrl && (
              <button onClick={() => setCfg(p => ({ ...p, logoUrl: '' }))}
                style={{ marginTop:'6px', background:'transparent', border:'none', color:'#4A5568', fontSize:'0.72rem', cursor:'pointer' }}>
                Remover logo
              </button>
            )}
          </div>
        </div>

        {/* TEMA + TOM */}
        <div style={{ marginBottom:'1.25rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Tema do post</label>
          <input value={tema} onChange={e => setTema(e.target.value)} onKeyDown={e => e.key === 'Enter' && gerar()}
            placeholder="Ex: seguro auto, plano de saúde para MEI, marmita saudável..."
            style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem 1rem', color:'#F0F4FF', fontSize:'0.95rem', fontFamily:'Sora, sans-serif', outline:'none' }} />
        </div>

        <div style={{ marginBottom:'1.25rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Como você quer soar?</label>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {TONS.map(t => (
              <button key={t} onClick={() => setTom(t)}
                style={{ padding:'7px 16px', borderRadius:'100px', border: tom === t ? `1px solid ${cor}88` : '1px solid rgba(255,255,255,0.07)', background: tom === t ? `${cor}18` : 'transparent', color: tom === t ? cor : '#8B95A8', fontSize:'0.85rem', fontWeight:500, cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
                {TOM_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>
            Quantos slides? <span style={{ color: cor }}>{qtd}</span>
          </label>
          <input type="range" min={1} max={10} value={qtd} onChange={e => setQtd(Number(e.target.value))} style={{ width:'100%', accentColor: cor }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', color:'#4A5568', marginTop:'4px' }}><span>1</span><span>10</span></div>
        </div>

        {erro && <p style={{ color:'#FC8181', fontSize:'0.85rem', marginBottom:'1rem' }}>{erro}</p>}

        <button onClick={gerar} disabled={gerando}
          style={{ display:'flex', alignItems:'center', gap:'8px', background: cor, color:'#fff', border:'none', borderRadius:'10px', padding:'0.85rem 2rem', fontFamily:'Sora, sans-serif', fontWeight:600, fontSize:'0.95rem', cursor: gerando ? 'not-allowed' : 'pointer', opacity: gerando ? 0.7 : 1, boxShadow:`0 8px 24px ${cor}44` }}>
          {gerando ? <><Loader2 size={16} style={{ animation:'spin 1s linear infinite' }}/> Gerando slides...</> : <><Zap size={16}/> Criar slides</>}
        </button>
      </div>

      {slides.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'360px 1fr', gap:'24px', alignItems:'start' }}>

          {/* Preview */}
          <div style={{ position:'sticky', top:'24px' }}>
            <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem' }}>
              {slides[slideAtivo] && (
                <SlideCanvas slide={slides[slideAtivo]} total={slides.length} fotoUrl={fotos[slideAtivo] ?? ''} cfg={cfg} />
              )}

              {/* Ações de foto */}
              <div style={{ display:'flex', gap:'8px', marginTop:'10px' }}>
                <button onClick={trocarFoto} disabled={trocando}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'7px', color:'#8B95A8', fontSize:'0.75rem', cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
                  {trocando ? <Loader2 size={12} style={{ animation:'spin 1s linear infinite' }}/> : <RefreshCw size={12}/>}
                  Nova foto
                </button>
                <input ref={fotoInputRef} type="file" accept="image/*" onChange={uploadFoto} style={{ display:'none' }} />
                <button onClick={() => fotoInputRef.current?.click()}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'7px', color:'#8B95A8', fontSize:'0.75rem', cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
                  <ImageIcon size={12}/> Upload foto
                </button>
              </div>

              {/* Dots */}
              <div style={{ display:'flex', gap:'7px', marginTop:'12px', justifyContent:'center' }}>
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setSlideAtivo(i)}
                    style={{ width: i === slideAtivo ? '22px' : '7px', height:'7px', borderRadius:'4px', border:'none', background: i === slideAtivo ? cor : 'rgba(255,255,255,0.15)', cursor:'pointer', padding:0, transition:'all 0.2s' }} />
                ))}
              </div>

              <div style={{ display:'flex', gap:'8px', marginTop:'12px' }}>
                <button onClick={() => slides[slideAtivo] && baixarUm(slides[slideAtivo])}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'0.6rem', color:'#8B95A8', fontSize:'0.78rem', fontWeight:500, cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
                  <Download size={13}/> Este slide
                </button>
                <button onClick={baixarTudo} disabled={baixando}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background: cor, border:'none', borderRadius:'8px', padding:'0.6rem', color:'#fff', fontSize:'0.78rem', fontWeight:600, cursor:'pointer', fontFamily:'Sora, sans-serif', opacity: baixando ? 0.7 : 1 }}>
                  {baixando ? <Loader2 size={13} style={{ animation:'spin 1s linear infinite' }}/> : <Download size={13}/>}
                  {baixando ? 'Gerando...' : 'Baixar ZIP'}
                </button>
              </div>
            </div>
          </div>

          {/* Lista */}
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <h2 style={{ fontSize:'1rem', fontWeight:600, letterSpacing:'-0.02em', marginBottom:'4px' }}>
              {slides.length} slide{slides.length > 1 ? 's' : ''} — clique para editar
            </h2>
            {slides.map((slide, idx) => (
              <div key={slide.id} onClick={() => setSlideAtivo(idx)}
                style={{ background: slideAtivo === idx ? '#111827' : '#0D1117', border: slideAtivo === idx ? `1px solid ${cor}55` : '1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'1.25rem', cursor:'pointer', transition:'all 0.2s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem' }}>
                  <div style={{ flex:1 }}>
                    <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.62rem', color:'#4A5568', letterSpacing:'0.1em' }}>SLIDE {String(slide.ordem).padStart(2,'0')}</span>
                    {editando === slide.id ? (
                      <>
                        <input value={slide.titulo} onChange={e => editarSlide(slide.id, 'titulo', e.target.value)} onClick={e => e.stopPropagation()}
                          style={{ display:'block', width:'100%', background:'#080B12', border:`1px solid ${cor}55`, borderRadius:'6px', padding:'6px 10px', color:'#F0F4FF', fontSize:'0.95rem', fontWeight:600, fontFamily:'Sora, sans-serif', outline:'none', marginTop:'6px', marginBottom:'8px' }} />
                        <textarea value={slide.corpo} onChange={e => editarSlide(slide.id, 'corpo', e.target.value)} onClick={e => e.stopPropagation()} rows={3}
                          style={{ display:'block', width:'100%', background:'#080B12', border:`1px solid ${cor}55`, borderRadius:'6px', padding:'6px 10px', color:'#8B95A8', fontSize:'0.85rem', fontFamily:'Sora, sans-serif', outline:'none', resize:'vertical', lineHeight:1.6 }} />
                      </>
                    ) : (
                      <>
                        <p style={{ fontSize:'0.95rem', fontWeight:600, margin:'4px 0 6px', lineHeight:1.3 }}>{slide.titulo}</p>
                        <p style={{ color:'#8B95A8', fontSize:'0.85rem', lineHeight:1.6, margin:0, whiteSpace:'pre-line' }}>{slide.corpo}</p>
                      </>
                    )}
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'5px', flexShrink:0 }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => moverSlide(idx, 'up')} disabled={idx === 0} style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'5px', cursor:'pointer', color: idx === 0 ? '#4A5568' : '#8B95A8', display:'flex' }}><ChevronUp size={13}/></button>
                    <button onClick={() => moverSlide(idx, 'down')} disabled={idx === slides.length - 1} style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'5px', cursor:'pointer', color: idx === slides.length - 1 ? '#4A5568' : '#8B95A8', display:'flex' }}><ChevronDown size={13}/></button>
                    <button onClick={() => setEditando(editando === slide.id ? null : slide.id)} style={{ background: editando === slide.id ? `${cor}22` : '#111827', border: editando === slide.id ? `1px solid ${cor}55` : '1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'5px', cursor:'pointer', color: editando === slide.id ? cor : '#8B95A8', display:'flex' }}>
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
