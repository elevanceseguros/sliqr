'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Zap, Download, Loader2, Upload, Wand2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { gerarHTML, SlideCfg } from '@/lib/slides/gerar-html'
import JSZip from 'jszip'

const CORES = ['#2D6FFF','#7C3AED','#059669','#DC2626','#D97706','#DB2777','#0891B2','#111827','#1E4D1E','#7DC242']
const FONTES = [
  { id:'inter',      label:'Inter',       css:'"Inter",sans-serif' },
  { id:'montserrat', label:'Montserrat',  css:'"Montserrat",sans-serif' },
  { id:'playfair',   label:'Playfair',    css:'"Playfair Display",serif' },
]
const QTD_OPTS = [3,4,5,6,7,8]

function CriarInner() {
  const supabase     = createClient()
  const searchParams = useSearchParams()
  const [session, setSession]     = useState<any>(null)
  const [prompt, setPrompt]       = useState('')
  const [qtd, setQtd]             = useState(5)
  const [cor, setCor]             = useState('#2D6FFF')
  const [fonte, setFonte]         = useState('inter')
  const [gerando, setGerando]     = useState(false)
  const [progresso, setProgresso] = useState(0)  // 0-100
  const [etapa, setEtapa]         = useState('')
  const [slides, setSlides]       = useState<any[]>([])
  const [imgs, setImgs]           = useState<string[]>([])
  const [slideAtivo, setSlideAtivo] = useState(0)
  const [baixando, setBaixando]   = useState(false)
  const [legenda, setLegenda]     = useState('')
  const [mostrarLegenda, setMostrarLegenda] = useState(false)
  const [erro, setErro]           = useState('')
  const [cfg, setCfg] = useState<SlideCfg>({
    cor: '#2D6FFF', fonte: 'inter',
    logoUrl: '', logoX: 0.5, logoY: 0.90, logoW: 160,
  })

  const logoRef     = useRef<HTMLInputElement>(null)
  const previewRef  = useRef<HTMLDivElement>(null)
  const dragging    = useRef(false)
  const resizing    = useRef(false)
  const dragStart   = useRef({ x: 0, y: 0, lx: 0, ly: 0 })
  const resizeStart = useRef({ x: 0, w: 0 })

  useEffect(() => { supabase.auth.getSession().then(({data})=>setSession(data.session)) },[])
  useEffect(() => {
    const t = searchParams.get('tema')
    if (t) setPrompt(t)
  },[searchParams])

  // Sincroniza cor e fonte no cfg
  useEffect(() => { setCfg(p=>({...p, cor, fonte})) },[cor, fonte])

  function lerB64(file: File): Promise<string> {
    return new Promise((r,j)=>{ const fr=new FileReader(); fr.onload=()=>r(fr.result as string); fr.onerror=j; fr.readAsDataURL(file) })
  }

  async function gerarScreenshot(html: string): Promise<string> {
    const res  = await fetch('/api/screenshot', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({html}) })
    const data = await res.json()
    if (data.erro) throw new Error(data.erro)
    return data.url
  }

  async function gerar() {
    if (!prompt.trim()) { setErro('Descreva o que você quer criar.'); return }
    setErro(''); setGerando(true); setSlides([]); setImgs([]); setLegenda(''); setMostrarLegenda(false); setSlideAtivo(0)
    setProgresso(5); setEtapa('Criando o conteúdo com IA...')

    try {
      // 1. Gerar slides
      const res  = await fetch('/api/gerar', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ tema: prompt, tom: 'vender', qtdSlides: qtd, accessToken: session?.access_token, refreshToken: session?.refresh_token })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.erro ?? 'Erro ao gerar conteúdo')
      const slidesGerados = data.slides
      setSlides(slidesGerados)
      setProgresso(20); setEtapa('Gerando imagens...')

      // 2. Gerar screenshots um a um
      const imagens: string[] = []
      for (let i = 0; i < slidesGerados.length; i++) {
        const html = gerarHTML(slidesGerados[i], slidesGerados.length, i, cfg)
        const img  = await gerarScreenshot(html)
        imagens.push(img)
        const pct = 20 + Math.round(((i+1)/slidesGerados.length) * 65)
        setProgresso(pct)
        setEtapa(`Gerando slide ${i+1} de ${slidesGerados.length}...`)
        setImgs([...imagens])
      }

      // 3. Gerar legenda
      setProgresso(90); setEtapa('Criando legenda e hashtags...')
      const resL = await fetch('/api/legenda', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ prompt, slides: slidesGerados, accessToken: session?.access_token })
      })
      const dataL = await resL.json()
      setLegenda(dataL.legenda ?? '')

      setProgresso(100); setEtapa('Pronto!')
      setTimeout(()=>{ setGerando(false); setProgresso(0) }, 600)

    } catch(e:any) {
      setErro(e.message); setGerando(false); setProgresso(0)
    }
  }

  // Regenerar slides quando cfg muda (logo muda)
  async function regenerarComCfg(novaCfg: SlideCfg) {
    if (!slides.length) return
    const imagens: string[] = []
    for (let i = 0; i < slides.length; i++) {
      const html = gerarHTML(slides[i], slides.length, i, novaCfg)
      const img  = await gerarScreenshot(html)
      imagens.push(img)
    }
    setImgs(imagens)
  }

  // Logo drag & resize
  function onLogoMouseDown(e: React.MouseEvent, tipo: 'drag'|'resize') {
    e.preventDefault(); e.stopPropagation()
    if (tipo === 'drag') {
      dragging.current = true
      dragStart.current = { x: e.clientX, y: e.clientY, lx: cfg.logoX??0.5, ly: cfg.logoY??0.90 }
    } else {
      resizing.current = true
      resizeStart.current = { x: e.clientX, w: cfg.logoW??160 }
    }
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!previewRef.current) return
    const rect = previewRef.current.getBoundingClientRect()
    if (dragging.current) {
      const dx = (e.clientX - dragStart.current.x) / rect.width
      const dy = (e.clientY - dragStart.current.y) / rect.height
      setCfg(p=>({...p, logoX: Math.max(0.05, Math.min(0.95, dragStart.current.lx+dx)), logoY: Math.max(0.05, Math.min(0.97, dragStart.current.ly+dy))}))
    }
    if (resizing.current) {
      const dx = e.clientX - resizeStart.current.x
      const scale = 1080 / rect.width
      setCfg(p=>({...p, logoW: Math.max(60, Math.min(400, resizeStart.current.w + dx*scale))}))
    }
  }

  function onMouseUp() { dragging.current = false; resizing.current = false }

  async function aplicarLogo() {
    if (!slides.length || !cfg.logoUrl) return
    await regenerarComCfg(cfg)
  }

  async function baixarTudo() {
    setBaixando(true)
    try {
      const zip = new JSZip()
      for (let i=0; i<imgs.length; i++) {
        const b64 = imgs[i].split(',')[1]
        zip.file(`slide_${String(i+1).padStart(2,'0')}.png`, b64, {base64:true})
      }
      const blob = await zip.generateAsync({type:'blob'})
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a'); a.href=url; a.download=`sliqr_post.zip`; a.click()
      URL.revokeObjectURL(url)
    } finally { setBaixando(false) }
  }

  async function baixarUm() {
    const img = imgs[slideAtivo]; if (!img) return
    const a = document.createElement('a'); a.href=img; a.download=`slide_${String(slideAtivo+1).padStart(2,'0')}.png`; a.click()
  }

  const imgAtiva = imgs[slideAtivo]

  return (
    <div style={{padding:'clamp(1rem,4vw,2.5rem)', maxWidth:'1000px', width:'100%', boxSizing:'border-box'}}>

      {/* Header */}
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.3rem'}}>Criar post</h1>
        <p style={{color:'#8B95A8', fontSize:'0.9rem'}}>Descreva o que você quer e a IA cria o carrossel.</p>
      </div>

      {/* Formulário */}
      <div style={{background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'20px', padding:'clamp(1rem,3vw,2rem)', marginBottom:'1.5rem'}}>

        {/* Prompt */}
        <div style={{marginBottom:'1.5rem'}}>
          <label style={{display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'8px', letterSpacing:'0.05em', textTransform:'uppercase'}}>
            O que você quer criar?
          </label>
          <textarea
            value={prompt}
            onChange={e=>setPrompt(e.target.value)}
            placeholder="Ex: 5 benefícios do seguro de vida para MEI&#10;Ex: Por que fazer manipulados na Pharmapenha&#10;Ex: Como escolher o plano de saúde ideal"
            rows={3}
            style={{width:'100%', background:'#080B12', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', padding:'1rem', color:'#F0F4FF', fontSize:'0.95rem', outline:'none', resize:'vertical', lineHeight:1.6, boxSizing:'border-box', fontFamily:'inherit'}}
          />
        </div>

        {/* Qtd slides */}
        <div style={{marginBottom:'1.5rem'}}>
          <label style={{display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'10px', letterSpacing:'0.05em', textTransform:'uppercase'}}>
            Quantos slides?
          </label>
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
            {QTD_OPTS.map(n=>(
              <button key={n} onClick={()=>setQtd(n)}
                style={{width:'52px', height:'52px', borderRadius:'12px', border: qtd===n?`2px solid ${cor}`:'1px solid rgba(255,255,255,0.1)', background: qtd===n?`${cor}20`:'transparent', color: qtd===n?cor:'#8B95A8', fontSize:'1.1rem', fontWeight:700, cursor:'pointer', transition:'all 0.15s'}}>
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Cor */}
        <div style={{marginBottom:'1.5rem'}}>
          <label style={{display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'10px', letterSpacing:'0.05em', textTransform:'uppercase'}}>
            Cor principal
          </label>
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'center'}}>
            {CORES.map(c=>(
              <button key={c} onClick={()=>setCor(c)}
                style={{width:'32px', height:'32px', borderRadius:'50%', background:c, border: cor===c?'3px solid #fff':'3px solid transparent', cursor:'pointer', transition:'transform 0.15s', transform:cor===c?'scale(1.2)':'scale(1)', flexShrink:0}}/>
            ))}
            <input type="color" value={cor} onChange={e=>setCor(e.target.value)}
              style={{width:'32px', height:'32px', borderRadius:'50%', border:'2px solid rgba(255,255,255,0.2)', cursor:'pointer', padding:0, background:'transparent', flexShrink:0}}/>
          </div>
        </div>

        {/* Fonte */}
        <div style={{marginBottom:'1.5rem'}}>
          <label style={{display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'10px', letterSpacing:'0.05em', textTransform:'uppercase'}}>
            Fonte
          </label>
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
            {FONTES.map(f=>(
              <button key={f.id} onClick={()=>setFonte(f.id)}
                style={{padding:'10px 20px', borderRadius:'10px', border: fonte===f.id?`1px solid ${cor}`:'1px solid rgba(255,255,255,0.1)', background: fonte===f.id?`${cor}18`:'transparent', color: fonte===f.id?cor:'#8B95A8', fontSize:'0.9rem', fontFamily:f.css, fontWeight:fonte===f.id?700:400, cursor:'pointer'}}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div style={{marginBottom:'1.5rem'}}>
          <label style={{display:'block', fontSize:'0.75rem', color:'#8B95A8', fontWeight:600, marginBottom:'10px', letterSpacing:'0.05em', textTransform:'uppercase'}}>
            Logo (opcional)
          </label>
          <input ref={logoRef} type="file" accept="image/*" style={{display:'none'}}
            onChange={async e=>{
              const f=e.target.files?.[0]; if(!f) return
              const b=await lerB64(f)
              setCfg(p=>({...p, logoUrl:b}))
            }}/>
          <button onClick={()=>logoRef.current?.click()}
            style={{display:'flex', alignItems:'center', gap:'8px', background: cfg.logoUrl?`${cor}18`:'#111827', border: cfg.logoUrl?`1px solid ${cor}55`:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'10px 18px', color: cfg.logoUrl?cor:'#8B95A8', fontSize:'0.85rem', cursor:'pointer', fontFamily:'inherit'}}>
            <Upload size={14}/> {cfg.logoUrl ? 'Logo carregada ✓  (troque se quiser)' : 'Fazer upload da logo'}
          </button>
          {cfg.logoUrl && (
            <div style={{marginTop:'10px', display:'flex', alignItems:'center', gap:'12px'}}>
              <span style={{fontSize:'0.75rem', color:'#4A5568'}}>Tamanho:</span>
              <input type="range" min={60} max={400} value={cfg.logoW??160}
                onChange={e=>setCfg(p=>({...p, logoW:Number(e.target.value)}))}
                style={{flex:1, maxWidth:'200px', accentColor:cor}}/>
              <span style={{fontSize:'0.75rem', color:'#4A5568', minWidth:'40px'}}>{cfg.logoW??160}px</span>
              <button onClick={()=>setCfg(p=>({...p,logoUrl:''}))}
                style={{background:'transparent', border:'none', color:'#4A5568', fontSize:'0.75rem', cursor:'pointer'}}>
                Remover
              </button>
            </div>
          )}
        </div>

        {erro && <p style={{color:'#FC8181', fontSize:'0.85rem', marginBottom:'1rem'}}>{erro}</p>}

        <button onClick={gerar} disabled={gerando}
          style={{display:'flex', alignItems:'center', gap:'8px', background:cor, color:'#fff', border:'none', borderRadius:'12px', padding:'0.9rem 2rem', fontWeight:700, fontSize:'1rem', cursor:gerando?'not-allowed':'pointer', opacity:gerando?0.7:1, boxShadow:`0 8px 24px ${cor}44`, fontFamily:'inherit'}}>
          {gerando ? <><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Gerando...</> : <><Zap size={16}/> Criar carrossel</>}
        </button>
      </div>

      {/* Barra de progresso */}
      {gerando && progresso > 0 && (
        <div style={{background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.5rem', marginBottom:'1.5rem'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
            <span style={{fontSize:'0.85rem', color:'#8B95A8'}}>{etapa}</span>
            <span style={{fontSize:'0.85rem', fontWeight:700, color:cor}}>{progresso}%</span>
          </div>
          <div style={{background:'rgba(255,255,255,0.07)', borderRadius:'999px', height:'8px', overflow:'hidden'}}>
            <div style={{height:'100%', width:`${progresso}%`, background:`linear-gradient(90deg,${cor},${cor}cc)`, borderRadius:'999px', transition:'width 0.4s ease'}}/>
          </div>
          {imgs.length > 0 && (
            <p style={{fontSize:'0.78rem', color:'#4A5568', marginTop:'8px'}}>{imgs.length} de {qtd} slides gerados</p>
          )}
        </div>
      )}

      {/* Preview + resultado */}
      {imgs.length > 0 && !gerando && (
        <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>

          {/* Preview do slide ativo */}
          <div style={{background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem'}}>

            {/* Preview com logo draggable */}
            <div
              ref={previewRef}
              style={{position:'relative', cursor: cfg.logoUrl ? 'default' : 'default', userSelect:'none'}}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}>

              {imgAtiva && <img src={imgAtiva} style={{width:'100%', height:'auto', borderRadius:'12px', display:'block'}}/>}

              {/* Overlay da logo arrastável */}
              {cfg.logoUrl && imgs.length > 0 && (
                <div
                  style={{
                    position:'absolute',
                    left:`${(cfg.logoX??0.5)*100}%`,
                    top:`${(cfg.logoY??0.9)*100}%`,
                    transform:'translate(-50%,-50%)',
                    cursor:'move',
                    border:`2px dashed ${cor}`,
                    borderRadius:'8px',
                    padding:'4px',
                    background:'rgba(0,0,0,0.3)',
                  }}
                  onMouseDown={e=>onLogoMouseDown(e,'drag')}>
                  <img src={cfg.logoUrl} style={{display:'block', width:`${(cfg.logoW??160) * (previewRef.current?.getBoundingClientRect().width ?? 400) / 1080}px`, height:'auto', objectFit:'contain', pointerEvents:'none'}}/>
                  {/* Handle de resize */}
                  <div
                    style={{position:'absolute', bottom:'-6px', right:'-6px', width:'14px', height:'14px', background:cor, borderRadius:'50%', cursor:'se-resize'}}
                    onMouseDown={e=>onLogoMouseDown(e,'resize')}/>
                </div>
              )}
            </div>

            {cfg.logoUrl && slides.length > 0 && (
              <button onClick={aplicarLogo}
                style={{width:'100%', marginTop:'10px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', background:`${cor}18`, border:`1px solid ${cor}55`, borderRadius:'8px', padding:'10px', color:cor, fontSize:'0.82rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit'}}>
                <Wand2 size={14}/> Aplicar posição da logo em todos os slides
              </button>
            )}

            {/* Dots */}
            <div style={{display:'flex', gap:'7px', marginTop:'12px', justifyContent:'center'}}>
              {imgs.map((_,i)=>(
                <button key={i} onClick={()=>setSlideAtivo(i)}
                  style={{width:i===slideAtivo?'24px':'8px', height:'8px', borderRadius:'4px', border:'none', background:i===slideAtivo?cor:'rgba(255,255,255,0.15)', cursor:'pointer', padding:0, transition:'all 0.2s'}}/>
              ))}
            </div>

            {/* Botões download */}
            <div style={{display:'flex', gap:'8px', marginTop:'12px'}}>
              <button onClick={baixarUm}
                style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:'#111827', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.7rem', color:'#8B95A8', fontSize:'0.82rem', fontWeight:500, cursor:'pointer', fontFamily:'inherit'}}>
                <Download size={14}/> Este slide
              </button>
              <button onClick={baixarTudo} disabled={baixando}
                style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', background:cor, border:'none', borderRadius:'10px', padding:'0.7rem', color:'#fff', fontSize:'0.82rem', fontWeight:700, cursor:'pointer', opacity:baixando?0.7:1, fontFamily:'inherit'}}>
                {baixando?<Loader2 size={14} style={{animation:'spin 1s linear infinite'}}/>:<Download size={14}/>}
                {baixando?'Gerando ZIP...':'Baixar todos (ZIP)'}
              </button>
            </div>
          </div>

          {/* Legenda */}
          {legenda && (
            <div style={{background:'#0D1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'16px', padding:'1.25rem'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
                <span style={{fontSize:'0.85rem', fontWeight:600}}>Legenda + hashtags</span>
                <button onClick={()=>{navigator.clipboard.writeText(legenda)}}
                  style={{background:`${cor}18`, border:`1px solid ${cor}55`, borderRadius:'8px', padding:'6px 14px', color:cor, fontSize:'0.78rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit'}}>
                  Copiar
                </button>
              </div>
              <pre style={{color:'#8B95A8', fontSize:'0.85rem', lineHeight:1.7, margin:0, whiteSpace:'pre-wrap', fontFamily:'inherit'}}>{legenda}</pre>
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
    <Suspense fallback={<div style={{padding:'2.5rem', color:'#4A5568'}}>carregando...</div>}>
      <CriarInner/>
    </Suspense>
  )
}
