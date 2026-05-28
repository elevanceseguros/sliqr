import { SlideCfg } from '@/lib/slides/gerar-html'
'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Zap, Download, Loader2, Upload, Image as ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import JSZip from 'jszip'

const CORES = ['#2D6FFF','#7C3AED','#059669','#DC2626','#D97706','#DB2777','#0891B2','#111827','#1E4D1E','#7DC242']
const FONTES = [
  { id:'inter', label:'Inter', css:'"Inter",sans-serif' },
  { id:'montserrat', label:'Montserrat', css:'"Montserrat",sans-serif' },
  { id:'playfair', label:'Playfair', css:'"Playfair Display",serif' },
]
const QTD_OPTS = [1,2,3,4,5,6,7,8,9,10]

function deveUsarImagemIA(i: number, total: number) {
  return true // Todos os slides recebem imagem de composição
}

function CriarInner() {
  const supabase = createClient()
  const searchParams = useSearchParams()

  const [session, setSession] = useState<any>(null)
  const [prompt, setPrompt] = useState('')
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [qtd, setQtd] = useState(5)
  const [cor, setCor] = useState('#2D6FFF')
  const [fonte, setFonte] = useState('inter')
  const [usarIA, setUsarIA] = useState(true)

  const [gerando, setGerando] = useState(false)
  const [progresso, setProgresso] = useState(0)
  const [etapa, setEtapa] = useState('')
  const [slides, setSlides] = useState<any[]>([])
  const [imgs, setImgs] = useState<string[]>([])
  const [imagensIA, setImagensIA] = useState<Record<number, string>>({})
  const [slideAtivo, setSlideAtivo] = useState(0)
  const [baixando, setBaixando] = useState(false)
  const [baixandoPct, setBaixandoPct] = useState(0)
  const [legenda, setLegenda] = useState('')
  const [erro, setErro] = useState('')

  const [cfg, setCfg] = useState<SlideCfg>({
    cor: '#2D6FFF',
    fonte: 'inter',
    estilo: 'modern',
    logoUrl: '',
    logoX: 0.5,
    logoY: 0.91,
    logoW: 210,
  })

  const logoRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const resizing = useRef(false)
  const dragStart = useRef({ x: 0, y: 0, lx: 0, ly: 0 })
  const resizeStart = useRef({ x: 0, w: 0 })

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])

  useEffect(() => {
    const t = searchParams.get('tema')
    if (t) setPrompt(t)
  }, [searchParams])

  useEffect(() => {
    setCfg(p => ({ ...p, cor, fonte }))
  }, [cor, fonte])

  function lerB64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = () => resolve(fr.result as string)
      fr.onerror = reject
      fr.readAsDataURL(file)
    })
  }

  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  async function imagemFinalComLogo(baseSrc: string): Promise<string> {
    if (!cfg.logoUrl) return baseSrc

    const base = await loadImage(baseSrc)
    const logo = await loadImage(cfg.logoUrl)

    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1080

    const ctx = canvas.getContext('2d')
    if (!ctx) return baseSrc

    ctx.drawImage(base, 0, 0, 1080, 1080)

    const logoW = cfg.logoW ?? 210
    const ratio = logo.height / logo.width
    const logoH = logoW * ratio
    const x = (cfg.logoX ?? 0.5) * 1080 - logoW / 2
    const y = (cfg.logoY ?? 0.91) * 1080 - logoH / 2

    ctx.drawImage(logo, x, y, logoW, logoH)

    return canvas.toDataURL('image/png')
  }

  async function gerarScreenshot(payload: object): Promise<string> {
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms))
    const maxTentativas = 5

    for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
      const res = await fetch('/api/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      // Rate limit — espera e tenta de novo com backoff exponencial
      if (!res.ok && res.status === 429 && tentativa < maxTentativas) {
        const espera = tentativa * 5000 // 5s, 10s, 15s, 20s
        console.warn(`[screenshot] Rate limit, aguardando ${espera}ms (tentativa ${tentativa}/${maxTentativas})`)
        await delay(espera)
        continue
      }

      if (data.erro) throw new Error(data.erro)
      return data.url
    }

    throw new Error('Nenhum serviço de screenshot disponível')
  }

  async function gerarImagemIA(slide: any, i: number): Promise<string | null> {
    try {
      const res = await fetch('/api/imagem-ia', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          tema: prompt,
          nomeEmpresa: nomeEmpresa || undefined,
          titulo: slide?.titulo ?? '',
          tipo: slide?.tipo ?? 'topico',
          slideIndex: i,
          cor,
        }),
      })

      const data = await res.json()
      if (!res.ok || data.erro) return null

      return data.url ?? null
    } catch {
      return null
    }
  }

  async function gerar() {
    if (!prompt.trim()) {
      setErro('Descreva o que você quer criar.')
      return
    }

    setErro('')
    setGerando(true)
    setSlides([])
    setImgs([])
    setImagensIA({})
    setLegenda('')
    setSlideAtivo(0)
    setProgresso(5)
    setEtapa('Criando o conteúdo com IA...')

    try {
      const res = await fetch('/api/gerar', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          tema: prompt,
          nomeEmpresa: nomeEmpresa || undefined,
          tom: 'vender',
          qtdSlides: qtd,
          accessToken: session?.access_token,
          refreshToken: session?.refresh_token,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.erro ?? 'Erro ao gerar conteúdo')

      const slidesGerados = Array.isArray(data.slides) ? data.slides.slice(0, qtd) : []
      setSlides(slidesGerados)

      const imagensIAtemp: Record<number, string> = {}

      if (usarIA) {
        setEtapa('Criando imagens de apoio com IA...')
        setProgresso(18)

        const indices = slidesGerados
          .map((_: any, i: number) => i)
          .filter((i: number) => deveUsarImagemIA(i, slidesGerados.length))

        // Lotes de 3 em paralelo (balanceia velocidade e estabilidade para até 10 slides)
        const resultados: (string | null)[] = new Array(indices.length).fill(null)
        for (let start = 0; start < indices.length; start += 2) {
          const lote = indices.slice(start, start + 2)
          const urls = await Promise.all(lote.map((i: number) => gerarImagemIA(slidesGerados[i], i)))
          lote.forEach((i: number, k: number) => { resultados[start + k] = urls[k] })
        }

        // Retry único para as que falharam
        for (let k = 0; k < indices.length; k++) {
          if (!resultados[k]) {
            resultados[k] = await gerarImagemIA(slidesGerados[indices[k]], indices[k])
          }
        }

        indices.forEach((i: number, k: number) => {
          const url = resultados[k]
          if (url) {
            imagensIAtemp[i] = url
          }
        })
        setImagensIA({ ...imagensIAtemp })
        setProgresso(45)
      }

      setProgresso(48)
      setEtapa('Renderizando os posts...')

      const imagens: string[] = []

      for (let i = 0; i < slidesGerados.length; i++) {
        // HTML gerado no servidor — não no browser
        const slidePayload = {
          slide: slidesGerados[i],
          total: slidesGerados.length,
          idx: i,
          cfg: {
            cor: cfg.cor,
            fonte: cfg.fonte,
            estilo: cfg.estilo,
          },
          fotoUrl: imagensIAtemp[i] ?? null,
          logoUrl: cfg.logoUrl ?? null,
          logoX: cfg.logoX,
          logoY: cfg.logoY,
          logoW: cfg.logoW,
        }

        // Delay mínimo entre slides
        if (i > 0) await new Promise(r => setTimeout(r, 500))

        const img = await gerarScreenshot(slidePayload)
        imagens.push(img)
        setImgs([...imagens])

        const pct = 48 + Math.round(((i + 1) / slidesGerados.length) * 38)
        setProgresso(pct)
        setEtapa(`Renderizando slide ${i + 1} de ${slidesGerados.length}...`)
      }

      setProgresso(90)
      setEtapa('Criando legenda e hashtags...')

      const resL = await fetch('/api/legenda', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          prompt,
          slides: slidesGerados,
          accessToken: session?.access_token,
        }),
      })

      const dataL = await resL.json()
      setLegenda(dataL.legenda ?? '')

      // Salvar no histórico
      try {
        const { data: { session: sess } } = await supabase.auth.getSession()
        if (sess) {
          await supabase.from('carrosseis').insert({
            usuario_id: sess.user.id,
            tema: prompt,
            tom: 'geral',
            slides: slidesGerados,
          })
        }
      } catch (e) {
        console.warn('Erro ao salvar histórico:', e)
      }

      setProgresso(100)
      setEtapa('Pronto!')

      setTimeout(() => {
        setGerando(false)
        setProgresso(0)
      }, 600)
    } catch (e: any) {
      setErro(e.message)
      setGerando(false)
      setProgresso(0)
    }
  }

  function onLogoMouseDown(e: React.MouseEvent, tipo: 'drag'|'resize') {
    e.preventDefault()
    e.stopPropagation()

    if (tipo === 'drag') {
      dragging.current = true
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        lx: cfg.logoX ?? 0.5,
        ly: cfg.logoY ?? 0.91,
      }
    } else {
      resizing.current = true
      resizeStart.current = {
        x: e.clientX,
        w: cfg.logoW ?? 210,
      }
    }
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!previewRef.current) return

    const rect = previewRef.current.getBoundingClientRect()

    if (dragging.current) {
      const dx = (e.clientX - dragStart.current.x) / rect.width
      const dy = (e.clientY - dragStart.current.y) / rect.height

      setCfg(p => ({
        ...p,
        logoX: Math.max(0.05, Math.min(0.95, dragStart.current.lx + dx)),
        logoY: Math.max(0.05, Math.min(0.97, dragStart.current.ly + dy)),
      }))
    }

    if (resizing.current) {
      const dx = e.clientX - resizeStart.current.x
      const scale = 1080 / rect.width

      setCfg(p => ({
        ...p,
        logoW: Math.max(60, Math.min(480, resizeStart.current.w + dx * scale)),
      }))
    }
  }

  function onMouseUp() {
    dragging.current = false
    resizing.current = false
  }

  async function baixarUm() {
    const img = imgs[slideAtivo]
    if (!img) return

    const final = await imagemFinalComLogo(img)

    const a = document.createElement('a')
    a.href = final
    a.download = `slide_${String(slideAtivo + 1).padStart(2, '0')}.png`
    a.click()
  }

  async function baixarTudo() {
    if (!imgs.length) return

    setBaixando(true)
    setBaixandoPct(1)

    try {
      const zip = new JSZip()

      for (let i = 0; i < imgs.length; i++) {
        setBaixandoPct(Math.round((i / imgs.length) * 80))

        const final = await imagemFinalComLogo(imgs[i])
        const b64 = final.split(',')[1]

        zip.file(`slide_${String(i + 1).padStart(2, '0')}.png`, b64, { base64: true })
      }

      setBaixandoPct(85)

      const blob = await zip.generateAsync(
        { type:'blob' },
        metadata => {
          setBaixandoPct(85 + Math.round(metadata.percent * 0.15))
        }
      )

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      a.download = 'sliqr_post.zip'
      a.click()

      URL.revokeObjectURL(url)
      setBaixandoPct(100)
    } finally {
      setTimeout(() => {
        setBaixando(false)
        setBaixandoPct(0)
      }, 500)
    }
  }

  const imgAtiva = imgs[slideAtivo]

  return (
    <div style={{ padding:'clamp(1rem,4vw,2.5rem)', maxWidth:'1000px', width:'100%', boxSizing:'border-box' }}>
      <div style={{ marginBottom:'2rem' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.3rem' }}>Criar post</h1>
        <p style={{ color:'#8B95A8', fontSize:'0.9rem' }}>Descreva o que você quer e a IA cria o carrossel.</p>
      </div>

      <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'clamp(1rem,3vw,2rem)', marginBottom:'1.5rem' }}>
        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'8px', letterSpacing:'0.05em', textTransform:'uppercase' }}>
            O que você quer criar?
          </label>

          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Ex: 5 benefícios da proteção veicular&#10;Ex: Por que fazer manipulados na Pharmapenha&#10;Ex: Como escolher o plano de saúde ideal"
            rows={3}
            style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'1rem', color:'#F0F4FF', fontSize:'0.95rem', outline:'none', resize:'vertical', lineHeight:1.6, boxSizing:'border-box', fontFamily:'inherit' }}
          />
        </div>

        {/* Nome da empresa ou produto */}
        <div style={{ marginBottom:'1.25rem' }}>
          <label style={{ display:'block', fontSize:'0.7rem', color:'#4A5568', fontWeight:600, marginBottom:'8px', letterSpacing:'0.08em', textTransform:'uppercase' }}>Nome da empresa ou produto (opcional)</label>
          <input
            value={nomeEmpresa}
            onChange={e => setNomeEmpresa(e.target.value)}
            placeholder="Ex: Bendito Hortelã, Elevance Seguros, Dr. Carlos..."
            style={{ width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'0.8rem 1rem', color:'#F0F4FF', fontSize:'0.9rem', outline:'none', boxSizing:'border-box' as const, fontFamily:'inherit' }}
          />
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'10px', letterSpacing:'0.05em', textTransform:'uppercase' }}>
            Quantos slides?
          </label>

          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {QTD_OPTS.map(n => (
              <button
                key={n}
                onClick={() => setQtd(n)}
                style={{ width:'52px', height:'52px', borderRadius:'12px', border:qtd===n ? `2px solid ${cor}` : '1px solid rgba(255,255,255,0.1)', background:qtd===n ? `${cor}20` : 'transparent', color:qtd===n ? cor : '#8B95A8', fontSize:'1.1rem', fontWeight:700, cursor:'pointer' }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'10px', letterSpacing:'0.05em', textTransform:'uppercase' }}>
            Cor principal
          </label>

          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'center' }}>
            {CORES.map(c => (
              <button
                key={c}
                onClick={() => setCor(c)}
                style={{ width:'32px', height:'32px', borderRadius:'50%', background:c, border:cor===c ? '3px solid #fff' : '3px solid transparent', cursor:'pointer', transform:cor===c ? 'scale(1.2)' : 'scale(1)', flexShrink:0 }}
              />
            ))}

            <label style={{ position:'relative', width:'32px', height:'32px', borderRadius:'50%', background:'conic-gradient(red,yellow,lime,cyan,blue,magenta,red)', border:!CORES.includes(cor) ? '3px solid #fff' : '2px solid rgba(255,255,255,0.2)', cursor:'pointer', flexShrink:0, transform:!CORES.includes(cor) ? 'scale(1.2)' : 'scale(1)', display:'block', overflow:'hidden' }} title="Cor personalizada">
              <input
                type="color"
                value={cor}
                onChange={e => setCor(e.target.value)}
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0, cursor:'pointer', padding:0, border:'none' }}
              />
            </label>
          </div>
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'10px', letterSpacing:'0.05em', textTransform:'uppercase' }}>
            Fonte
          </label>

          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {FONTES.map(f => (
              <button
                key={f.id}
                onClick={() => setFonte(f.id)}
                style={{ padding:'10px 20px', borderRadius:'10px', border:fonte===f.id ? `1px solid ${cor}` : '1px solid rgba(255,255,255,0.1)', background:fonte===f.id ? `${cor}18` : 'transparent', color:fonte===f.id ? cor : '#8B95A8', fontSize:'0.9rem', fontFamily:f.css, fontWeight:fonte===f.id ? 700 : 400, cursor:'pointer' }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <button
            onClick={() => setUsarIA(v => !v)}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', width:'100%', maxWidth:'390px', background:usarIA ? `${cor}18` : '#111827', border:usarIA ? `1px solid ${cor}55` : '1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'12px 14px', color:usarIA ? cor : '#8B95A8', fontSize:'0.86rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}
          >
            <span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <ImageIcon size={16}/> Usar imagens IA automáticas
            </span>
            <span>{usarIA ? 'Ativo' : 'Desligado'}</span>
          </button>

          <p style={{ color:'#4A5568', fontSize:'0.75rem', marginTop:'8px' }}>
            Quando ativo, o Sliqr gera imagens de apoio em alguns slides estratégicos.
          </p>
        </div>

        <div style={{ marginBottom:'1.5rem' }}>
          <label style={{ display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'10px', letterSpacing:'0.05em', textTransform:'uppercase' }}>
            Logo opcional
          </label>

          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            style={{ display:'none' }}
            onChange={async e => {
              const f = e.target.files?.[0]
              if (!f) return
              const b = await lerB64(f)
              setCfg(p => ({ ...p, logoUrl:b }))
            }}
          />

          <button
            onClick={() => logoRef.current?.click()}
            style={{ display:'flex', alignItems:'center', gap:'8px', background:cfg.logoUrl ? `${cor}18` : '#111827', border:cfg.logoUrl ? `1px solid ${cor}55` : '1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'10px 18px', color:cfg.logoUrl ? cor : '#8B95A8', fontSize:'0.85rem', cursor:'pointer', fontFamily:'inherit' }}
          >
            <Upload size={14}/> {cfg.logoUrl ? 'Logo carregada ✓' : 'Fazer upload da logo'}
          </button>

          {cfg.logoUrl && (
            <div style={{ marginTop:'10px', display:'flex', alignItems:'center', gap:'12px' }}>
              <span style={{ fontSize:'0.75rem', color:'#4A5568' }}>Tamanho:</span>

              <input
                type="range"
                min={60}
                max={480}
                value={cfg.logoW ?? 210}
                onChange={e => setCfg(p => ({ ...p, logoW:Number(e.target.value) }))}
                style={{ flex:1, maxWidth:'220px', accentColor:cor }}
              />

              <span style={{ fontSize:'0.75rem', color:'#4A5568', minWidth:'46px' }}>{cfg.logoW ?? 210}px</span>

              <button
                onClick={() => setCfg(p => ({ ...p, logoUrl:'' }))}
                style={{ background:'transparent', border:'none', color:'#4A5568', fontSize:'0.75rem', cursor:'pointer' }}
              >
                Remover
              </button>
            </div>
          )}
        </div>

        {erro && <p style={{ color:'#FC8181', fontSize:'0.85rem', marginBottom:'1rem' }}>{erro}</p>}

        <button
          onClick={gerar}
          disabled={gerando}
          style={{ display:'flex', alignItems:'center', gap:'8px', background:cor, color:'#fff', border:'none', borderRadius:'12px', padding:'0.9rem 2rem', fontWeight:700, fontSize:'1rem', cursor:gerando ? 'not-allowed' : 'pointer', opacity:gerando ? 0.7 : 1, boxShadow:`0 8px 24px ${cor}44`, fontFamily:'inherit' }}
        >
          {gerando ? <><Loader2 size={16} style={{ animation:'spin 1s linear infinite' }}/> Gerando...</> : <><Zap size={16}/> Criar carrossel</>}
        </button>
      </div>

      {gerando && progresso > 0 && (
        <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.5rem', marginBottom:'1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
            <span style={{ fontSize:'0.85rem', color:'#8B95A8' }}>{etapa}</span>
            <span style={{ fontSize:'0.85rem', fontWeight:700, color:cor }}>{progresso}%</span>
          </div>

          <div style={{ background:'rgba(255,255,255,0.07)', borderRadius:'999px', height:'8px', overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${progresso}%`, background:`linear-gradient(90deg,${cor},${cor}cc)`, borderRadius:'999px', transition:'width 0.4s ease' }}/>
          </div>

          {imgs.length > 0 && (
            <p style={{ fontSize:'0.78rem', color:'#4A5568', marginTop:'8px' }}>{imgs.length} de {qtd} slides renderizados</p>
          )}
        </div>
      )}

      {imgs.length > 0 && !gerando && (
        <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
          <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem' }}>
            <div
              ref={previewRef}
              style={{ position:'relative', userSelect:'none' }}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchMove={e => {
                const t = e.touches[0]
                const rect = previewRef.current?.getBoundingClientRect()
                if (!rect) return
                if (dragging.current) {
                  const dx = (t.clientX - dragStart.current.x) / rect.width
                  const dy = (t.clientY - dragStart.current.y) / rect.height
                  setCfg(p => ({...p, logoX:Math.max(0.05,Math.min(0.95,dragStart.current.lx+dx)), logoY:Math.max(0.05,Math.min(0.97,dragStart.current.ly+dy))}))
                }
                if (resizing.current) {
                  const dx = t.clientX - resizeStart.current.x
                  const scale = 1080 / rect.width
                  setCfg(p => ({...p, logoW:Math.max(60,Math.min(400,resizeStart.current.w+dx*scale))}))
                }
              }}
              onTouchEnd={() => { dragging.current = false; resizing.current = false }}
            >
              {imgAtiva && (
                <img src={imgAtiva} style={{ width:'100%', height:'auto', borderRadius:'12px', display:'block' }} />
              )}

              {cfg.logoUrl && (
                <div
                  style={{ position:'absolute', left:`${(cfg.logoX ?? 0.5) * 100}%`, top:`${(cfg.logoY ?? 0.91) * 100}%`, transform:'translate(-50%,-50%)', cursor:'move', border:`2px dashed ${cor}88`, borderRadius:'8px', padding:'3px', backdropFilter:'blur(2px)' }}
                  onMouseDown={e => onLogoMouseDown(e, 'drag')}
                  onTouchStart={e => { e.preventDefault(); const t=e.touches[0]; dragging.current=true; dragStart.current={x:t.clientX,y:t.clientY,lx:cfg.logoX??0.5,ly:cfg.logoY??0.91} }}
                >
                  <img
                    src={cfg.logoUrl}
                    style={{ display:'block', width:`${(cfg.logoW ?? 210) * (previewRef.current?.getBoundingClientRect().width ?? 380) / 1080}px`, height:'auto', objectFit:'contain', pointerEvents:'none', opacity:0.95 }}
                  />

                  <div
                    style={{ position:'absolute', bottom:'-7px', right:'-7px', width:'22px', height:'22px', background:cor, borderRadius:'50%', cursor:'se-resize', border:'2px solid #fff', touchAction:'none' }}
                    onMouseDown={e => onLogoMouseDown(e, 'resize')}
                    onTouchStart={e => { e.preventDefault(); const t=e.touches[0]; resizing.current=true; resizeStart.current={x:t.clientX,w:cfg.logoW??210} }}
                  />
                </div>
              )}
            </div>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', marginTop:'12px' }}>
              <button onClick={() => setSlideAtivo(p => Math.max(0, p - 1))} disabled={slideAtivo === 0} style={{ width:'32px', height:'32px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.06)', color:slideAtivo===0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)', cursor:slideAtivo===0 ? 'not-allowed' : 'pointer' }}>‹</button>

              <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
                {imgs.map((_, i) => (
                  <button key={i} onClick={() => setSlideAtivo(i)} style={{ width:i===slideAtivo ? '22px' : '7px', height:'7px', borderRadius:'4px', border:'none', background:i===slideAtivo ? cor : 'rgba(255,255,255,0.2)', cursor:'pointer', padding:0, transition:'all 0.2s' }} />
                ))}
              </div>

              <button onClick={() => setSlideAtivo(p => Math.min(imgs.length - 1, p + 1))} disabled={slideAtivo === imgs.length - 1} style={{ width:'32px', height:'32px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.06)', color:slideAtivo===imgs.length-1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)', cursor:slideAtivo===imgs.length-1 ? 'not-allowed' : 'pointer' }}>›</button>
            </div>

            {baixando && (
              <div style={{ marginTop:'12px', background:'rgba(255,255,255,0.06)', borderRadius:'999px', height:'8px', overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${baixandoPct}%`, background:cor, transition:'width .2s ease' }} />
              </div>
            )}

            <div style={{ display:'flex', gap:'8px', marginTop:'12px' }}>
              <button onClick={baixarUm} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.7rem', color:'#8B95A8', fontSize:'0.82rem', fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>
                <Download size={14}/> Este slide
              </button>

              <button onClick={baixarTudo} disabled={baixando} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:cor, border:'none', borderRadius:'10px', padding:'0.7rem', color:'#fff', fontSize:'0.82rem', fontWeight:700, cursor:baixando ? 'not-allowed' : 'pointer', opacity:baixando ? 0.75 : 1, fontFamily:'inherit' }}>
                {baixando ? <Loader2 size={14} style={{ animation:'spin 1s linear infinite' }}/> : <Download size={14}/>}
                {baixando ? `Preparando ZIP... ${baixandoPct}%` : 'Baixar todos (ZIP)'}
              </button>
            </div>
          </div>

          {legenda && (
            <div style={{ background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
                <span style={{ fontSize:'0.85rem', fontWeight:600 }}>Legenda + hashtags</span>

                <button onClick={() => navigator.clipboard.writeText(legenda)} style={{ background:`${cor}18`, border:`1px solid ${cor}55`, borderRadius:'8px', padding:'6px 14px', color:cor, fontSize:'0.78rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                  Copiar
                </button>
              </div>

              <pre style={{ color:'#8B95A8', fontSize:'0.85rem', lineHeight:1.7, margin:0, whiteSpace:'pre-wrap', fontFamily:'inherit' }}>{legenda}</pre>
            </div>
          )}
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
