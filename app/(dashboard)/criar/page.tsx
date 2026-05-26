'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Zap, Download, ChevronUp, ChevronDown, Loader2, Upload, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react'
import { Tom, TOM_LABELS, Slide } from '@/types'
import { createClient } from '@/lib/supabase/client'
import JSZip from 'jszip'
import { gerarHTML } from '@/lib/slides/gerar-html'

const TONS: Tom[] = ['vender', 'ensinar', 'urgencia', 'inspirar']
const FONTES = [
  { id: 'modern',  label: 'Moderna',  css: 'system-ui, -apple-system, sans-serif',       peso: '800' },
  { id: 'classic', label: 'Clássica', css: 'Georgia, "Times New Roman", serif',           peso: '700' },
  { id: 'bold',    label: 'Bold',     css: '"Arial Black", "Helvetica Neue", sans-serif', peso: '900' },
]

const LAYOUTS = [
  { id: 'titulo-corpo',  label: 'Título + texto',   desc: '1 conceito por slide' },
  { id: 'bullets',       label: 'Bullet points',    desc: 'Lista com ícones' },
  { id: 'pergunta',      label: 'Pergunta/resposta', desc: 'Problema + solução' },
]

const FUNDOS = [
  { id: 'solido',    label: 'Sólido',    desc: 'Cor chapada' },
  { id: 'gradiente', label: 'Gradiente', desc: 'Degradê suave' },
  { id: 'foto-ia',   label: 'Foto IA',   desc: 'Imagem gerada' },
]

interface LogoCfg { url: string; x: number; y: number; size: number }
interface Cfg {
  cor: string
  corSecundaria: string
  fonteId: string
  layoutId: string
  fundoId: string
  logo: LogoCfg
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return { r, g, b }
}

// Escurece uma cor hex
function escurecer(hex: string, fator = 0.5): string {
  const {r,g,b} = hexToRgb(hex)
  return `rgb(${Math.round(r*fator)},${Math.round(g*fator)},${Math.round(b*fator)})`
}

function luminosidade(hex: string): number {
  const {r,g,b} = hexToRgb(hex)
  return (r*0.299 + g*0.587 + b*0.114) / 255
}

function corTexto(bg: string): string {
  return luminosidade(bg) > 0.5 ? '#0D1117' : '#FFFFFF'
}

function carregarImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    if (!src.startsWith('data:')) img.crossOrigin = 'anonymous'
    img.onload  = () => res(img)
    img.onerror = rej
    img.src     = src
  })
}

function quebrar(ctx: CanvasRenderingContext2D, texto: string, maxW: number): string[] {
  const palavras = texto.split(' ')
  const linhas: string[] = []
  let atual = ''
  for (const p of palavras) {
    const t = atual ? `${atual} ${p}` : p
    if (ctx.measureText(t).width > maxW) { if (atual) linhas.push(atual); atual = p }
    else atual = t
  }
  if (atual) linhas.push(atual)
  return linhas
}

async function renderSlide(
  slide: any, total: number, _fotoUrl: string, cfg: Cfg, preview = false
): Promise<Blob> {
  const SIZE  = preview ? 680 : 1080
  const S     = SIZE / 1080
  const fonte = FONTES.find(f => f.id === cfg.fonteId) ?? FONTES[0]
  const cor   = cfg.cor

  // Cor do texto — branco se fundo escuro, preto se fundo claro
  const lum = (hex: string) => {
    const r=parseInt(hex.slice(1,3)||'0',16)
    const g=parseInt(hex.slice(3,5)||'0',16)
    const b=parseInt(hex.slice(5,7)||'0',16)
    return (r*0.299+g*0.587+b*0.114)/255
  }
  const isDark  = lum(cor) < 0.55
  const txtMain = isDark ? '#FFFFFF' : '#111111'
  const txtSub  = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.60)'
  const escuro  = (f=0.45) => {
    const r=parseInt(cor.slice(1,3),16),g=parseInt(cor.slice(3,5),16),b=parseInt(cor.slice(5,7),16)
    return `rgb(${Math.round(r*f)},${Math.round(g*f)},${Math.round(b*f)})`
  }

  const cv  = document.createElement('canvas')
  cv.width  = cv.height = SIZE
  const ctx = cv.getContext('2d')!

  // ── FUNDO ──
  if (cfg.fundoId === 'gradiente') {
    const g = ctx.createLinearGradient(0, 0, SIZE, SIZE)
    g.addColorStop(0, cor); g.addColorStop(1, escuro(0.5))
    ctx.fillStyle = g
  } else {
    ctx.fillStyle = cor
  }
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Losango decorativo canto inferior direito (estilo Gemini)
  ctx.save()
  ctx.translate(SIZE - 36*S, SIZE - 36*S)
  ctx.rotate(Math.PI / 4)
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)'
  ctx.fillRect(-18*S, -18*S, 36*S, 36*S)
  ctx.restore()

  const PAD  = 72*S
  const LRG  = SIZE - PAD * 2
  const MEIO = SIZE / 2

  const tipo = slide.tipo ?? 'lista'

  // ── LOGO NO RODAPÉ (centralizada) ──
  const rodapeY = SIZE - 120*S
  if (cfg.logo.url) {
    try {
      const logo = await carregarImg(cfg.logo.url)
      const lH   = 70*S
      const lW   = (logo.width / logo.height) * lH
      ctx.drawImage(logo, MEIO - lW/2, rodapeY + 10*S, lW, lH)
    } catch {}
  } else {
    // Nome do app como fallback
    ctx.font      = `700 ${22*S}px ${fonte.css}`
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'
    ctx.textAlign = 'center'
    ctx.fillText('Sliqr', MEIO, rodapeY + 50*S)
    ctx.textAlign = 'left'
  }

  // Linha divisória rodapé
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.10)'
  ctx.fillRect(PAD, rodapeY - 8*S, LRG, 1.5*S)

  // ── TIPO: CAPA ──────────────────────────────────────────
  if (tipo === 'capa') {
    // Título enorme, centralizado verticalmente
    const fsTit = 108*S
    ctx.font      = `${fonte.peso} ${fsTit}px ${fonte.css}`
    ctx.fillStyle = txtMain
    ctx.textAlign = 'left'

    // Quebrar título e calcular altura total
    const linhas  = quebrar(ctx, slide.titulo, LRG)
    const altTotal = linhas.length * fsTit * 1.15
    let curY = (rodapeY - altTotal) / 2 + fsTit * 0.85

    for (const l of linhas) {
      ctx.fillText(l, PAD, curY); curY += fsTit * 1.15
    }

    // Subtítulo
    if (slide.subtitulo || slide.corpo) {
      const sub = slide.subtitulo || slide.corpo
      ctx.font      = `400 ${40*S}px ${fonte.css}`
      ctx.fillStyle = txtSub
      for (const l of quebrar(ctx, sub, LRG)) {
        ctx.fillText(l, PAD, curY + 20*S); curY += 52*S
      }
    }
  }

  // ── TIPO: ICONES ─────────────────────────────────────────
  else if (tipo === 'icones') {
    // Título no topo
    const fsTit = 96*S
    ctx.font      = `${fonte.peso} ${fsTit}px ${fonte.css}`
    ctx.fillStyle = txtMain
    ctx.textAlign = 'left'
    const linhasTit = quebrar(ctx, slide.titulo, LRG)
    let curY = PAD + fsTit
    for (const l of linhasTit) { ctx.fillText(l, PAD, curY); curY += fsTit * 1.15 }

    // Ícones centralizados
    const itens = slide.itens ?? []
    const qtd   = itens.length
    const colW  = LRG / qtd
    const iconY = curY + 80*S

    for (let i = 0; i < qtd; i++) {
      const cx = PAD + colW * i + colW / 2

      // Círculo de fundo do ícone
      ctx.beginPath(); ctx.arc(cx, iconY, 80*S, 0, Math.PI*2)
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'
      ctx.fill()

      // Emoji do ícone
      ctx.font      = `${88*S}px serif`
      ctx.textAlign = 'center'
      ctx.fillText(itens[i].icone ?? '●', cx, iconY + 30*S)

      // Label abaixo
      ctx.font      = `600 ${36*S}px ${fonte.css}`
      ctx.fillStyle = txtSub
      ctx.textAlign = 'center'
      const labelLinhas = quebrar(ctx, itens[i].label ?? '', colW - 20*S)
      let ly = iconY + 110*S
      for (const ll of labelLinhas) { ctx.fillText(ll, cx, ly); ly += 44*S }
    }
    ctx.textAlign = 'left'
  }

  // ── TIPO: CTA ────────────────────────────────────────────
  else if (tipo === 'cta') {
    const fsTit = 108*S
    ctx.font      = `${fonte.peso} ${fsTit}px ${fonte.css}`
    ctx.fillStyle = txtMain
    ctx.textAlign = 'left'
    const linhas  = quebrar(ctx, slide.titulo, LRG)
    const altTotal = linhas.length * fsTit * 1.15
    let curY = (rodapeY - altTotal - 140*S) / 2 + fsTit * 0.85

    for (const l of linhas) { ctx.fillText(l, PAD, curY); curY += fsTit * 1.15 }

    // Botão CTA
    const botaoTxt = slide.destaque || slide.botao || 'SAIBA MAIS'
    const fsBotao  = 36*S
    ctx.font       = `700 ${fsBotao}px ${fonte.css}`
    const btw      = ctx.measureText(botaoTxt).width
    const btPad    = 36*S
    const btH      = 72*S
    const btW      = btw + btPad * 2
    const btX      = PAD
    const btY      = curY + 40*S

    // Fundo do botão — cor mais escura
    ctx.fillStyle = escuro(0.55)
    ctx.beginPath(); ctx.roundRect(btX, btY, btW, btH, btH/2); ctx.fill()

    // Texto do botão
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'left'
    ctx.fillText(botaoTxt, btX + btPad, btY + btH*0.65)
    ctx.textAlign = 'left'
  }

  // ── TIPO: LISTA (padrão) ─────────────────────────────────
  else {
    const fsTit = 88*S
    ctx.font      = `${fonte.peso} ${fsTit}px ${fonte.css}`
    ctx.fillStyle = txtMain
    ctx.textAlign = 'left'
    const linhasTit = quebrar(ctx, slide.titulo, LRG)
    let curY = PAD + fsTit * 0.9
    for (const l of linhasTit) { ctx.fillText(l, PAD, curY); curY += fsTit * 1.18 }
    curY += 24*S

    // Linha divisória
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)'
    ctx.fillRect(PAD, curY, LRG * 0.35, 2.5*S)
    curY += 36*S

    // Corpo
    const fsCorpo = 42*S
    ctx.font      = `400 ${fsCorpo}px ${fonte.css}`
    ctx.fillStyle = txtSub
    const linhasCorpo = (slide.corpo || '').split('\n').filter(Boolean)
    for (const linha of linhasCorpo) {
      for (const parte of quebrar(ctx, linha, LRG)) {
        ctx.fillText(parte, PAD, curY); curY += fsCorpo * 1.6
      }
    }
  }

  return new Promise(r => cv.toBlob(b => r(b!), 'image/png', 0.95))
}


function SlideCanvas({ slide, total, fotoUrl, cfg, onLogoMove }: {
  slide: Slide; total: number; fotoUrl: string; cfg: Cfg
  onLogoMove?: (x: number, y: number) => void
}) {
  const ref  = useRef<HTMLCanvasElement>(null)
  const drag = useRef(false)
  const busy = useRef(false)

  useEffect(() => {
    if (!ref.current || !slide || busy.current) return
    busy.current = true
    const canvas = ref.current
    renderSlide(slide, total, fotoUrl, cfg, true)
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const img = new Image()
        img.onload = () => {
          if (canvas) { canvas.width = canvas.height = 340; canvas.getContext('2d')!.drawImage(img,0,0,340,340) }
          URL.revokeObjectURL(url); busy.current = false
        }
        img.onerror = () => { busy.current = false }
        img.src = url
      })
      .catch(() => { busy.current = false })
  }, [slide, total, fotoUrl, cfg])

  return (
    <canvas ref={ref} width={340} height={340}
      style={{ width:'100%', height:'auto', borderRadius:'12px', display:'block', cursor: cfg.logo.url && onLogoMove ? 'crosshair' : 'default' }}
      onMouseDown={() => { if (cfg.logo.url) drag.current = true }}
      onMouseMove={e => {
        if (!drag.current || !onLogoMove || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        onLogoMove((e.clientX-r.left)*(1080/r.width), (e.clientY-r.top)*(1080/r.height))
      }}
      onMouseUp={() => { drag.current = false }}
      onMouseLeave={() => { drag.current = false }}
    />
  )
}

function CriarInner() {
  const supabase     = createClient()
  const searchParams = useSearchParams()
  const [tema, setTema]         = useState('')
  const [tom, setTom]           = useState<Tom>('vender')
  const [qtd, setQtd]           = useState(5)
  const [slides, setSlides]     = useState<Slide[]>([])
  const [gerando, setGerando]   = useState(false)
  const [gerandoFotos, setGerandoFotos] = useState(false)
  const [erro, setErro]         = useState('')
  const [baixando, setBaixando] = useState(false)
  const [editando, setEditando] = useState<string | null>(null)
  const [session, setSession]   = useState<any>(null)
  const [fotos, setFotos]       = useState<string[]>([])
  const [slideAtivo, setSlideAtivo] = useState(0)
  const [slidesImg, setSlidesImg] = useState<string[]>([])
  const [trocando, setTrocando] = useState(false)
  const [cfg, setCfg] = useState<Cfg>({
    cor: '#2D6FFF', corSecundaria: '#00D4FF',
    fonteId: 'modern', layoutId: 'titulo-corpo', fundoId: 'gradiente',
    logo: { url: '', x: 870, y: 30, size: 80 }
  })

  const fotoRef = useRef<HTMLInputElement>(null)
  const logoRef = useRef<HTMLInputElement>(null)

  useEffect(() => { supabase.auth.getSession().then(({ data }) => setSession(data.session)) }, [])

  useEffect(() => {
    const t = searchParams.get('tema'); const m = searchParams.get('tom') as Tom | null
    if (t) setTema(t)
    if (m && ['vender','ensinar','urgencia','inspirar'].includes(m)) setTom(m)
  }, [searchParams])

  function lerB64(file: File): Promise<string> {
    return new Promise((r,j) => { const f = new FileReader(); f.onload = () => r(f.result as string); f.onerror = j; f.readAsDataURL(file) })
  }

  async function gerarSlidesHTML(slidesData: any[]): Promise<string[]> {
    const imgs: string[] = []
    for (const slide of slidesData) {
      try {
        const logoUrl = cfg.logo.url || undefined
        const html = gerarHTML(slide, slidesData.length, { cor: cfg.cor, fonteId: cfg.fonteId, logoUrl })
        const res  = await fetch('/api/screenshot', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html })
        })
        const data = await res.json()
        imgs.push(data.url ?? '')
      } catch (e: any) {
        console.error('[gerarSlides]', e.message)
        imgs.push('')
      }
    }
    return imgs
  }

  async function gerar() {
    if (!tema.trim()) { setErro('Digite o tema.'); return }
    setErro(''); setGerando(true); setSlides([]); setSlidesImg([]); setSlideAtivo(0)
    try {
      const res  = await fetch('/api/gerar', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ tema, tom, qtdSlides: qtd, accessToken: session?.access_token, refreshToken: session?.refresh_token })
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.erro ?? 'Erro ao gerar.'); return }
      setSlides(data.slides)
      setGerando(false)

      // Gera imagens via Puppeteer
      setGerandoFotos(true)
      const imgs = await gerarSlidesHTML(data.slides)
      setSlidesImg(imgs)
      setGerandoFotos(false)
    } catch(e: any) { setErro(e.message); setGerando(false); setGerandoFotos(false) }
  }

  async function trocarFoto() {
    if (!slides[slideAtivo]) return
    setTrocando(true)
    try {
      const html = gerarHTML(slides[slideAtivo] as any, slides.length, { cor: cfg.cor, fonteId: cfg.fonteId, logoUrl: cfg.logo.url || undefined })
      const res  = await fetch('/api/screenshot', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ html }) })
      const data = await res.json()
      if (data.url) setSlidesImg(p => { const n=[...p]; n[slideAtivo]=data.url; return n })
    } finally { setTrocando(false) }
  }

  function editarSlide(id: string, campo: 'titulo'|'corpo', v: string) {
    setSlides(p => p.map(s => s.id === id ? { ...s, [campo]: v } : s))
  }

  function moverSlide(idx: number, dir: 'up'|'down') {
    const n=[...slides]; const a=dir==='up'?idx-1:idx+1
    if (a<0||a>=n.length) return
    ;[n[idx],n[a]]=[n[a],n[idx]]; n.forEach((s,i)=>{s.ordem=i+1})
    setSlides(n); setSlideAtivo(a)
  }

  async function baixarUm(slide: Slide) {
    const img = slidesImg[slide.ordem-1]
    if (!img) return
    const a = document.createElement('a')
    a.href=img; a.download=`slide_${String(slide.ordem).padStart(2,'0')}.png`; a.click()
  }

  async function baixarTudo() {
    setBaixando(true)
    try {
      const zip = new JSZip()
      for (const s of slides) {
        const img = slidesImg[s.ordem-1]
        if (!img) continue
        const base64 = img.split(',')[1]
        zip.file(`slide_${String(s.ordem).padStart(2,'0')}.png`, base64, { base64: true })
      }
      const blob = await zip.generateAsync({type:'blob'}); const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href=url; a.download=`sliqr_${tema.slice(0,20).replace(/\s/g,'_')}.zip`; a.click(); URL.revokeObjectURL(url)
    } finally { setBaixando(false) }
  }

  const cor = cfg.cor
  const imgAtiva = slidesImg[slideAtivo] ?? ''

  const CORES_PRESET = ['#2D6FFF','#7C3AED','#059669','#DC2626','#D97706','#DB2777','#0891B2','#111827']

  return (
    <div style={{ padding:'clamp(1rem,4vw,2.5rem)', maxWidth:'1100px', width:'100%', boxSizing:'border-box' }}>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Criar post</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Configure o estilo, digite o tema e crie.</p>
      </div>

      <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'clamp(1rem,3vw,2rem)', marginBottom:'1.5rem' }}>

        {/* ESTILO VISUAL */}
        <div style={{ marginBottom:'1.75rem', paddingBottom:'1.75rem', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'1.25rem' }}>Estilo visual</p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'1.25rem' }}>

            {/* Cor */}
            <div>
              <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', marginBottom:'8px', fontWeight:500 }}>Cor principal</label>
              <div style={{ display:'flex', gap:'7px', flexWrap:'wrap', alignItems:'center', marginBottom:'8px' }}>
                {CORES_PRESET.map(c => (
                  <button key={c} onClick={() => setCfg(p => ({...p, cor:c}))}
                    style={{ width:'28px', height:'28px', borderRadius:'50%', background:c, border: cor===c?'3px solid #fff':'3px solid transparent', cursor:'pointer', transition:'transform 0.15s', transform:cor===c?'scale(1.15)':'scale(1)', flexShrink:0 }}/>
                ))}
                <input type="color" value={cor} onChange={e => setCfg(p=>({...p,cor:e.target.value}))}
                  title="Cor personalizada"
                  style={{ width:'28px', height:'28px', borderRadius:'50%', border:'2px solid rgba(255,255,255,0.2)', cursor:'pointer', padding:0, background:'transparent', flexShrink:0 }}/>
              </div>
            </div>

            {/* Fundo */}
            <div>
              <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', marginBottom:'8px', fontWeight:500 }}>Tipo de fundo</label>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                {FUNDOS.map(f => (
                  <button key={f.id} onClick={() => setCfg(p=>({...p, fundoId:f.id}))}
                    style={{ padding:'6px 12px', borderRadius:'8px', border: cfg.fundoId===f.id?`1px solid ${cor}`:'1px solid rgba(255,255,255,0.1)', background: cfg.fundoId===f.id?`${cor}18`:'transparent', color: cfg.fundoId===f.id?cor:'#8B95A8', fontSize:'0.78rem', fontWeight:500, cursor:'pointer' }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div>
              <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', marginBottom:'8px', fontWeight:500 }}>Layout do conteúdo</label>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                {LAYOUTS.map(l => (
                  <button key={l.id} onClick={() => setCfg(p=>({...p, layoutId:l.id}))}
                    style={{ padding:'6px 12px', borderRadius:'8px', border: cfg.layoutId===l.id?`1px solid ${cor}`:'1px solid rgba(255,255,255,0.1)', background: cfg.layoutId===l.id?`${cor}18`:'transparent', color: cfg.layoutId===l.id?cor:'#8B95A8', fontSize:'0.78rem', fontWeight:500, cursor:'pointer' }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fonte */}
            <div>
              <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', marginBottom:'8px', fontWeight:500 }}>Fonte</label>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                {FONTES.map(f => (
                  <button key={f.id} onClick={() => setCfg(p=>({...p, fonteId:f.id}))}
                    style={{ padding:'6px 12px', borderRadius:'8px', border: cfg.fonteId===f.id?`1px solid ${cor}`:'1px solid rgba(255,255,255,0.1)', background: cfg.fonteId===f.id?`${cor}18`:'transparent', color: cfg.fonteId===f.id?cor:'#8B95A8', fontSize:'0.78rem', fontFamily:f.css, fontWeight:cfg.fonteId===f.id?700:400, cursor:'pointer' }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Logo */}
            <div>
              <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', marginBottom:'8px', fontWeight:500 }}>Logo (opcional)</label>
              <input ref={logoRef} type="file" accept="image/*" style={{ display:'none' }}
                onChange={async e => { const f=e.target.files?.[0]; if(!f) return; const b=await lerB64(f); setCfg(p=>({...p,logo:{...p.logo,url:b}})) }}/>
              <button onClick={() => logoRef.current?.click()}
                style={{ display:'flex', alignItems:'center', gap:'8px', background: cfg.logo.url?`${cor}18`:'#111827', border: cfg.logo.url?`1px solid ${cor}55`:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'8px 12px', color: cfg.logo.url?cor:'#8B95A8', fontSize:'0.78rem', cursor:'pointer', marginBottom:'6px' }}>
                <Upload size={13}/> {cfg.logo.url ? 'Logo ✓' : 'Upload logo'}
              </button>
              {cfg.logo.url && (
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <span style={{ fontSize:'0.7rem', color:'#4A5568' }}>Tam.</span>
                  <input type="range" min={40} max={300} value={cfg.logo.size}
                    onChange={e => setCfg(p=>({...p,logo:{...p.logo,size:Number(e.target.value)}}))}
                    style={{ flex:1, accentColor:cor }}/>
                  <button onClick={() => setCfg(p=>({...p,logo:{...p.logo,url:''}}))}
                    style={{ background:'transparent', border:'none', color:'#4A5568', fontSize:'0.7rem', cursor:'pointer' }}>✕</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TEMA + TOM */}
        <div style={{ marginBottom:'1.25rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Tema do post</label>
          <input value={tema} onChange={e => setTema(e.target.value)} onKeyDown={e => e.key==='Enter'&&gerar()}
            placeholder="Ex: seguro auto, marmita saudável, plano de saúde MEI..."
            style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem 1rem', color:'#F0F4FF', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }}/>
        </div>

        <div style={{ marginBottom:'1.25rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>Tom</label>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {TONS.map(t => (
              <button key={t} onClick={() => setTom(t)}
                style={{ padding:'7px 14px', borderRadius:'100px', border: tom===t?`1px solid ${cor}88`:'1px solid rgba(255,255,255,0.07)', background: tom===t?`${cor}18`:'transparent', color: tom===t?cor:'#8B95A8', fontSize:'0.85rem', fontWeight:500, cursor:'pointer' }}>
                {TOM_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.72rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px' }}>
            Slides: <span style={{ color:cor }}>{qtd}</span>
          </label>
          <input type="range" min={1} max={10} value={qtd} onChange={e => setQtd(Number(e.target.value))} style={{ width:'100%', accentColor:cor }}/>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', color:'#4A5568', marginTop:'4px' }}><span>1</span><span>10</span></div>
        </div>

        {erro && <p style={{ color:'#FC8181', fontSize:'0.85rem', marginBottom:'1rem' }}>{erro}</p>}

        <button onClick={gerar} disabled={gerando||gerandoFotos}
          style={{ display:'flex', alignItems:'center', gap:'8px', background:cor, color:'#fff', border:'none', borderRadius:'10px', padding:'0.85rem 2rem', fontWeight:600, fontSize:'0.95rem', cursor:(gerando||gerandoFotos)?'not-allowed':'pointer', opacity:(gerando||gerandoFotos)?0.7:1, boxShadow:`0 8px 24px ${cor}44` }}>
          {gerando ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Gerando texto...</>
           : gerandoFotos ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Gerando imagens...</>
           : <><Zap size={16}/> Criar slides</>}
        </button>
      </div>

      {slides.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', alignItems:'start' }}>

          {/* Preview */}
          <div style={{ position:'sticky', top:'16px' }}>
            <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem' }}>
              {gerandoFotos ? (
                <div style={{ aspectRatio:'1', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#080B12', borderRadius:'12px' }}>
                  <Loader2 size={24} style={{ color:cor, animation:'spin 1s linear infinite', marginBottom:'10px' }}/>
                  <p style={{ color:'#8B95A8', fontSize:'0.82rem', margin:0 }}>Gerando imagens...</p>
                </div>
              ) : (
                imgAtiva && (
                <img src={imgAtiva} style={{ width:'100%', height:'auto', borderRadius:'12px', display:'block' }} />
              )}
              {!gerandoFotos && !imgAtiva && slides[slideAtivo] && (
                <div style={{ aspectRatio:'1', background:'#111827', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <p style={{ color:'#4A5568', fontSize:'0.8rem' }}>Gerando...</p>
                </div>                )
              )}

              {/* Ações de foto — só se fundo = foto-ia */}
              {cfg.fundoId === 'foto-ia' && (
                <div style={{ display:'flex', gap:'8px', marginTop:'10px' }}>
                  <button onClick={trocarFoto} disabled={trocando}
                    style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'7px', color:'#8B95A8', fontSize:'0.75rem', cursor:'pointer' }}>
                    {trocando ? <Loader2 size={12} style={{animation:'spin 1s linear infinite'}}/> : <Sparkles size={12}/>}
                    Nova IA
                  </button>
                  <input ref={fotoRef} type="file" accept="image/*" style={{ display:'none' }}
                    onChange={async e => { const f=e.target.files?.[0]; if(!f) return; const b=await lerB64(f); setFotos(p=>{const n=[...p];n[slideAtivo]=b;return n}) }}/>
                  <button onClick={() => fotoRef.current?.click()}
                    style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'8px', padding:'7px', color:'#8B95A8', fontSize:'0.75rem', cursor:'pointer' }}>
                    <ImageIcon size={12}/> Minha foto
                  </button>
                </div>
              )}

              {/* Dots */}
              <div style={{ display:'flex', gap:'7px', marginTop:'12px', justifyContent:'center', flexWrap:'wrap' }}>
                {slides.map((_,i) => (
                  <button key={i} onClick={() => setSlideAtivo(i)}
                    style={{ width:i===slideAtivo?'22px':'7px', height:'7px', borderRadius:'4px', border:'none', background:i===slideAtivo?cor:'rgba(255,255,255,0.15)', cursor:'pointer', padding:0, transition:'all 0.2s' }}/>
                ))}
              </div>

              <div style={{ display:'flex', gap:'8px', marginTop:'12px' }}>
                <button onClick={() => slides[slideAtivo] && baixarUm(slides[slideAtivo])}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', padding:'0.6rem', color:'#8B95A8', fontSize:'0.78rem', fontWeight:500, cursor:'pointer' }}>
                  <Download size={13}/> Este slide
                </button>
                <button onClick={baixarTudo} disabled={baixando}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:cor, border:'none', borderRadius:'8px', padding:'0.6rem', color:'#fff', fontSize:'0.78rem', fontWeight:600, cursor:'pointer', opacity:baixando?0.7:1 }}>
                  {baixando?<Loader2 size={13} style={{animation:'spin 1s linear infinite'}}/>:<Download size={13}/>}
                  {baixando?'Gerando...':'Baixar ZIP'}
                </button>
              </div>
            </div>
          </div>

          {/* Lista slides */}
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <h2 style={{ fontSize:'1rem', fontWeight:600, letterSpacing:'-0.02em', marginBottom:'4px' }}>
              {slides.length} slide{slides.length>1?'s':''} — toque no lápis para editar
            </h2>
            {slides.map((slide, idx) => (
              <div key={slide.id} onClick={() => setSlideAtivo(idx)}
                style={{ background:slideAtivo===idx?'#111827':'#0D1117', border:slideAtivo===idx?`1px solid ${cor}55`:'1px solid rgba(255,255,255,0.07)', borderRadius:'12px', padding:'1.25rem', cursor:'pointer', transition:'all 0.2s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'0.75rem' }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.62rem', color:'#4A5568', letterSpacing:'0.1em' }}>
                      SLIDE {String(slide.ordem).padStart(2,'0')}
                    </span>
                    {editando === slide.id ? (
                      <>
                        <input value={slide.titulo} onChange={e=>editarSlide(slide.id,'titulo',e.target.value)} onClick={e=>e.stopPropagation()}
                          style={{ display:'block', width:'100%', background:'#080B12', border:`1px solid ${cor}55`, borderRadius:'6px', padding:'6px 10px', color:'#F0F4FF', fontSize:'0.95rem', fontWeight:600, outline:'none', marginTop:'6px', marginBottom:'8px', boxSizing:'border-box' }}/>
                        <textarea value={slide.corpo} onChange={e=>editarSlide(slide.id,'corpo',e.target.value)} onClick={e=>e.stopPropagation()} rows={3}
                          style={{ display:'block', width:'100%', background:'#080B12', border:`1px solid ${cor}55`, borderRadius:'6px', padding:'6px 10px', color:'#8B95A8', fontSize:'0.85rem', outline:'none', resize:'vertical', lineHeight:1.6, boxSizing:'border-box' }}/>
                      </>
                    ) : (
                      <>
                        <p style={{ fontSize:'0.95rem', fontWeight:600, margin:'4px 0 6px', lineHeight:1.3 }}>{slide.titulo}</p>
                        <p style={{ color:'#8B95A8', fontSize:'0.85rem', lineHeight:1.6, margin:0, whiteSpace:'pre-line' }}>{slide.corpo}</p>
                      </>
                    )}
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'5px', flexShrink:0 }} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>moverSlide(idx,'up')} disabled={idx===0}
                      style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'6px', cursor:'pointer', color:idx===0?'#4A5568':'#8B95A8', display:'flex' }}>
                      <ChevronUp size={13}/>
                    </button>
                    <button onClick={()=>moverSlide(idx,'down')} disabled={idx===slides.length-1}
                      style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'6px', cursor:'pointer', color:idx===slides.length-1?'#4A5568':'#8B95A8', display:'flex' }}>
                      <ChevronDown size={13}/>
                    </button>
                    <button onClick={()=>setEditando(editando===slide.id?null:slide.id)}
                      style={{ background:editando===slide.id?`${cor}22`:'#111827', border:editando===slide.id?`1px solid ${cor}55`:'1px solid rgba(255,255,255,0.07)', borderRadius:'6px', padding:'6px', cursor:'pointer', color:editando===slide.id?cor:'#8B95A8', display:'flex' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export default function CriarPage() {
  return (
    <Suspense fallback={<div style={{ padding:'2.5rem', color:'#4A5568' }}>carregando...</div>}>
      <CriarInner/>
    </Suspense>
  )
}
