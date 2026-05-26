'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Zap, Download, ChevronUp, ChevronDown, Loader2, RefreshCw, Upload, Image as ImageIcon, Sparkles } from 'lucide-react'
import { Tom, TOM_LABELS, Slide } from '@/types'
import { createClient } from '@/lib/supabase/client'
import JSZip from 'jszip'

const TONS: Tom[] = ['vender', 'ensinar', 'urgencia', 'inspirar']
const FONTES = [
  { id: 'modern',  label: 'Moderna',  css: 'system-ui, -apple-system, sans-serif',       peso: '800' },
  { id: 'classic', label: 'Clássica', css: 'Georgia, "Times New Roman", serif',           peso: '700' },
  { id: 'bold',    label: 'Bold',     css: '"Arial Black", "Helvetica Neue", sans-serif', peso: '900' },
]

interface LogoCfg { url: string; x: number; y: number; size: number }
interface Cfg { cor: string; fonteId: string; logo: LogoCfg }

function carregarImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    // crossOrigin só para URLs externas, não para base64
    if (!src.startsWith('data:')) img.crossOrigin = 'anonymous'
    img.onload = () => res(img)
    img.onerror = (e) => { console.error('[carregarImg] erro:', src.slice(0,50), e); rej(e) }
    img.src = src
  })
}

function quebrar(ctx: CanvasRenderingContext2D, texto: string, maxW: number): string[] {
  const palavras = texto.split(' '); const linhas: string[] = []; let atual = ''
  for (const p of palavras) {
    const t = atual ? `${atual} ${p}` : p
    if (ctx.measureText(t).width > maxW) { if (atual) linhas.push(atual); atual = p } else atual = t
  }
  if (atual) linhas.push(atual); return linhas
}

async function renderSlide(slide: Slide, total: number, fotoUrl: string, cfg: Cfg, preview = false): Promise<Blob> {
  const SIZE = preview ? 680 : 1080
  const S    = SIZE / 1080
  const fonte = FONTES.find(f => f.id === cfg.fonteId) ?? FONTES[0]
  const cor   = cfg.cor
  const cv    = document.createElement('canvas')
  cv.width = cv.height = SIZE
  const ctx = cv.getContext('2d')!

  // Fundo
  ctx.fillStyle = '#060810'
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Foto de fundo
  if (fotoUrl) {
    try {
      const src = fotoUrl.startsWith('data:') ? fotoUrl : `/api/proxy-img?src=${encodeURIComponent(fotoUrl)}`
      const img = await carregarImg(src)
      const sc  = Math.max(SIZE / img.width, SIZE / img.height)
      ctx.drawImage(img, (SIZE - img.width * sc) / 2, (SIZE - img.height * sc) / 2, img.width * sc, img.height * sc)
    } catch {}
  }

  // Overlay em 3 camadas para profundidade
  // Camada 1: gradiente geral
  const g1 = ctx.createLinearGradient(0, 0, 0, SIZE)
  g1.addColorStop(0,    'rgba(4,6,16,0.72)')
  g1.addColorStop(0.35, 'rgba(4,6,16,0.35)')
  g1.addColorStop(0.65, 'rgba(4,6,16,0.45)')
  g1.addColorStop(1,    'rgba(4,6,16,0.90)')
  ctx.fillStyle = g1; ctx.fillRect(0, 0, SIZE, SIZE)

  // Camada 2: vinheta lateral esquerda (onde fica o texto)
  const g2 = ctx.createLinearGradient(0, 0, SIZE * 0.7, 0)
  g2.addColorStop(0,   'rgba(4,6,16,0.55)')
  g2.addColorStop(1,   'rgba(4,6,16,0)')
  ctx.fillStyle = g2; ctx.fillRect(0, 0, SIZE, SIZE)

  // Linha colorida topo
  ctx.fillStyle = cor
  ctx.fillRect(0, 0, SIZE, 6 * S)

  // Barra lateral esquerda
  const barGrad = ctx.createLinearGradient(0, 0, 0, SIZE)
  barGrad.addColorStop(0,   cor)
  barGrad.addColorStop(0.6, cor + 'AA')
  barGrad.addColorStop(1,   cor + '00')
  ctx.fillStyle = barGrad
  ctx.fillRect(0, 0, 5 * S, SIZE)

  const PAD = 90 * S
  const LRG = SIZE * 0.72 // usa 72% da largura para o texto

  // ── CONTEÚDO ──
  // Posição vertical: começa em 30% da altura
  let curY = SIZE * 0.30

  // DESTAQUE (só slide 1) — tag colorida pequena
  if (slide.ordem === 1 && slide.destaque) {
    const fs = 34 * S
    ctx.font = `700 ${fs}px ${fonte.css}`
    const txt = slide.destaque.toUpperCase()
    const tw  = ctx.measureText(txt).width
    // Pill colorida
    ctx.fillStyle = cor
    ctx.globalAlpha = 0.20
    ctx.beginPath()
    ctx.roundRect(PAD - 10 * S, curY - fs * 0.85, tw + 20 * S, fs * 1.15, 4 * S)
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.fillStyle = cor
    ctx.fillText(txt, PAD, curY)
    curY += fs * 1.6
  }

  // TÍTULO — grande, bold, branco
  const fsTit = (slide.ordem === 1 ? 76 : 82) * S
  ctx.font = `${fonte.peso} ${fsTit}px ${fonte.css}`
  ctx.fillStyle = '#FFFFFF'
  // Sombra no texto para legibilidade
  ctx.shadowColor   = 'rgba(0,0,0,0.6)'
  ctx.shadowBlur    = 12 * S
  ctx.shadowOffsetX = 2 * S
  ctx.shadowOffsetY = 2 * S
  const linhasTit = quebrar(ctx, slide.titulo, LRG)
  for (const l of linhasTit) {
    ctx.fillText(l, PAD, curY)
    curY += fsTit * 1.22
  }
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0

  // Linha decorativa
  curY += 16 * S
  ctx.fillStyle   = cor
  ctx.globalAlpha = 0.7
  ctx.fillRect(PAD, curY, 48 * S, 3 * S)
  ctx.globalAlpha = 1
  curY += 24 * S

  // CORPO — linhas curtas, cinza claro
  const fsCorpo = 42 * S
  ctx.font      = `400 ${fsCorpo}px ${fonte.css}`
  ctx.fillStyle = 'rgba(220,228,255,0.85)'
  ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 8 * S
  const linhasCorpo = slide.corpo.split('\n').filter(Boolean).slice(0, 3) // máx 3 linhas
  for (const linha of linhasCorpo) {
    ctx.fillText(linha, PAD, curY)
    curY += fsCorpo * 1.5
  }
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0

  // LOGO — canto superior direito
  if (cfg.logo.url) {
    try {
      const logo = await carregarImg(cfg.logo.url)
      const lH   = cfg.logo.size * S
      const lW   = (logo.width / logo.height) * lH
      ctx.globalAlpha = 0.92
      ctx.drawImage(logo, cfg.logo.x * S, cfg.logo.y * S, lW, lH)
      ctx.globalAlpha = 1
    } catch {}
  }

  // DOTS — canto inferior esquerdo
  const dotY = SIZE - 52 * S
  let   dotX = PAD
  for (let i = 0; i < total; i++) {
    const ativo = i === slide.ordem - 1
    const dW    = ativo ? 32 * S : 8 * S
    ctx.beginPath()
    ctx.roundRect(dotX, dotY, dW, 8 * S, 4 * S)
    ctx.fillStyle = ativo ? cor : 'rgba(255,255,255,0.25)'
    ctx.fill()
    dotX += dW + 10 * S
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
          if (canvas) {
            canvas.width = canvas.height = 340
            canvas.getContext('2d')!.drawImage(img, 0, 0, 340, 340)
          }
          URL.revokeObjectURL(url)
          busy.current = false
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
        onLogoMove((e.clientX - r.left) * (1080 / r.width), (e.clientY - r.top) * (1080 / r.height))
      }}
      onMouseUp={() => { drag.current = false }}
      onMouseLeave={() => { drag.current = false }}
    />
  )
}

// Componente interno que usa useSearchParams
function CriarInner() {
  const supabase=createClient()
  const searchParams=useSearchParams()
  const [tema,setTema]=useState('')
  const [tom,setTom]=useState<Tom>('vender')
  const [qtd,setQtd]=useState(5)
  const [slides,setSlides]=useState<Slide[]>([])
  const [gerando,setGerando]=useState(false)
  const [gerandoFotos,setGerandoFotos]=useState(false)
  const [erro,setErro]=useState('')
  const [baixando,setBaixando]=useState(false)
  const [editando,setEditando]=useState<string|null>(null)
  const [session,setSession]=useState<any>(null)
  const [fotos,setFotos]=useState<string[]>([])
  const [slideAtivo,setSlideAtivo]=useState(0)
  const [trocando,setTrocando]=useState(false)
  const [cfg,setCfg]=useState<Cfg>({cor:'#2D6FFF',fonteId:'modern',logo:{url:'',x:870,y:30,size:80}})
  const fotoRef=useRef<HTMLInputElement>(null)
  const logoRef=useRef<HTMLInputElement>(null)

  useEffect(()=>{supabase.auth.getSession().then(({data})=>setSession(data.session))},[])

  useEffect(()=>{
    const t=searchParams.get('tema'); const m=searchParams.get('tom') as Tom|null
    if(t) setTema(t)
    if(m&&['vender','ensinar','urgencia','inspirar'].includes(m)) setTom(m)
  },[searchParams])

  function lerB64(file:File):Promise<string>{return new Promise((r,j)=>{const f=new FileReader();f.onload=()=>r(f.result as string);f.onerror=j;f.readAsDataURL(file)})}

  async function gerarFotosIA(tema:string,qtd:number):Promise<string[]>{
    const urls:string[]=[]
    for(let i=0;i<qtd;i++){
      try{
        const res=await fetch('/api/gerar-imagem',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tema,idx:i})})
        const data=await res.json()
        if(data.erro){console.error('[fal.ai]',data.erro)}
        urls.push(data.url??'')
      }catch(e:any){console.error('[fal.ai]',e.message);urls.push('')}
    }
    return urls
  }

  async function gerar(){
    if(!tema.trim()){setErro('Digite o tema.');return}
    setErro('');setGerando(true);setSlides([]);setFotos([]);setSlideAtivo(0)
    try{
      const res=await fetch('/api/gerar',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({tema,tom,qtdSlides:qtd,accessToken:session?.access_token,refreshToken:session?.refresh_token})})
      const data=await res.json()
      if(!res.ok){setErro(data.erro??'Erro ao gerar.');return}
      setSlides(data.slides)
      setGerando(false)
      setGerandoFotos(true)
      const urls=await gerarFotosIA(tema,qtd)
      console.log('[gerar] urls geradas:', urls.length, 'vazias:', urls.filter(u=>!u).length)
      setFotos(urls)
      setGerandoFotos(false)
    }catch(e:any){setErro(e.message);setGerando(false);setGerandoFotos(false)}
  }

  async function trocarFoto(){
    setTrocando(true)
    try{
      const res=await fetch('/api/gerar-imagem',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tema,idx:slideAtivo+10+Math.floor(Math.random()*10)})})
      const data=await res.json()
      if(data.url) setFotos(p=>{const n=[...p];n[slideAtivo]=data.url;return n})
      if(data.erro) console.error('[fal.ai trocar]',data.erro)
    }finally{setTrocando(false)}
  }

  function editarSlide(id:string,campo:'titulo'|'corpo',v:string){setSlides(p=>p.map(s=>s.id===id?{...s,[campo]:v}:s))}

  function moverSlide(idx:number,dir:'up'|'down'){
    const n=[...slides];const a=dir==='up'?idx-1:idx+1
    if(a<0||a>=n.length)return
    ;[n[idx],n[a]]=[n[a],n[idx]];n.forEach((s,i)=>{s.ordem=i+1})
    setSlides(n);setSlideAtivo(a)
  }

  async function baixarUm(slide:Slide){
    const blob=await renderSlide(slide,slides.length,fotos[slide.ordem-1]??'',cfg)
    const url=URL.createObjectURL(blob);const a=document.createElement('a')
    a.href=url;a.download=`slide_${String(slide.ordem).padStart(2,'0')}.png`;a.click();URL.revokeObjectURL(url)
  }

  async function baixarTudo(){
    setBaixando(true)
    try{
      const zip=new JSZip()
      for(const s of slides){
        const blob=await renderSlide(s,slides.length,fotos[s.ordem-1]??'',cfg)
        zip.file(`slide_${String(s.ordem).padStart(2,'0')}.png`,blob)
      }
      const blob=await zip.generateAsync({type:'blob'});const url=URL.createObjectURL(blob)
      const a=document.createElement('a');a.href=url;a.download=`sliqr_${tema.slice(0,20).replace(/\s/g,'_')}.zip`;a.click();URL.revokeObjectURL(url)
    }finally{setBaixando(false)}
  }

  const cor=cfg.cor

  return (
    <div style={{padding:'clamp(1rem,4vw,2.5rem)',maxWidth:'1100px',width:'100%',boxSizing:'border-box'}}>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.75rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.4rem'}}>Criar post</h1>
        <p style={{color:'#8B95A8',fontSize:'0.9rem'}}>Configure o visual, digite o tema e crie.</p>
      </div>

      <div style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',padding:'clamp(1rem,3vw,2rem)',marginBottom:'1.5rem'}}>

        {/* CONFIG VISUAL */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1.25rem',marginBottom:'1.75rem',paddingBottom:'1.75rem',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>

          <div>
            <label style={{display:'block',fontSize:'0.72rem',color:'#4A5568',fontFamily:'JetBrains Mono, monospace',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'10px'}}>Cor principal</label>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',alignItems:'center'}}>
              {['#2D6FFF','#00C896','#FF4D4D','#A855F7','#F59E0B','#EC4899','#14B8A6'].map(c=>(
                <button key={c} onClick={()=>setCfg(p=>({...p,cor:c}))}
                  style={{width:'26px',height:'26px',borderRadius:'50%',background:c,border:cor===c?'3px solid #fff':'3px solid transparent',cursor:'pointer',transform:cor===c?'scale(1.2)':'scale(1)',transition:'transform 0.15s',flexShrink:0}}/>
              ))}
              <input type="color" value={cor} onChange={e=>setCfg(p=>({...p,cor:e.target.value}))}
                style={{width:'26px',height:'26px',borderRadius:'50%',border:'2px solid rgba(255,255,255,0.15)',cursor:'pointer',padding:0,background:'transparent',flexShrink:0}}/>
            </div>
          </div>

          <div>
            <label style={{display:'block',fontSize:'0.72rem',color:'#4A5568',fontFamily:'JetBrains Mono, monospace',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'10px'}}>Fonte</label>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {FONTES.map(f=>(
                <button key={f.id} onClick={()=>setCfg(p=>({...p,fonteId:f.id}))}
                  style={{padding:'6px 12px',borderRadius:'8px',border:cfg.fonteId===f.id?`1px solid ${cor}`:'1px solid rgba(255,255,255,0.1)',background:cfg.fonteId===f.id?`${cor}18`:'transparent',color:cfg.fonteId===f.id?cor:'#8B95A8',fontSize:'0.8rem',fontFamily:f.css,fontWeight:cfg.fonteId===f.id?'700':'400',cursor:'pointer'}}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{display:'block',fontSize:'0.72rem',color:'#4A5568',fontFamily:'JetBrains Mono, monospace',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'10px'}}>Logo</label>
            <input ref={logoRef} type="file" accept="image/*" style={{display:'none'}}
              onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const b=await lerB64(f);setCfg(p=>({...p,logo:{...p.logo,url:b}}))}}/>
            <button onClick={()=>logoRef.current?.click()}
              style={{display:'flex',alignItems:'center',gap:'8px',background:cfg.logo.url?`${cor}18`:'#111827',border:cfg.logo.url?`1px solid ${cor}55`:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'8px 12px',color:cfg.logo.url?cor:'#8B95A8',fontSize:'0.8rem',cursor:'pointer',fontFamily:'Sora, sans-serif',marginBottom:'8px'}}>
              <Upload size={13}/> {cfg.logo.url?'Logo ✓':'Upload logo'}
            </button>
            {cfg.logo.url&&(
              <div>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
                  <span style={{fontSize:'0.7rem',color:'#4A5568',flexShrink:0}}>Tamanho</span>
                  <input type="range" min={40} max={300} value={cfg.logo.size}
                    onChange={e=>setCfg(p=>({...p,logo:{...p.logo,size:Number(e.target.value)}}))}
                    style={{flex:1,accentColor:cor}}/>
                  <span style={{fontSize:'0.7rem',color:'#4A5568',flexShrink:0}}>{cfg.logo.size}px</span>
                </div>
                <p style={{fontSize:'0.68rem',color:'#4A5568',margin:'0 0 4px'}}>Arraste no preview para mover</p>
                <button onClick={()=>setCfg(p=>({...p,logo:{...p.logo,url:''}}))}
                  style={{background:'transparent',border:'none',color:'#4A5568',fontSize:'0.7rem',cursor:'pointer',padding:0}}>Remover</button>
              </div>
            )}
          </div>
        </div>

        {/* TEMA */}
        <div style={{marginBottom:'1.25rem'}}>
          <label style={{display:'block',fontSize:'0.72rem',color:'#4A5568',fontFamily:'JetBrains Mono, monospace',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'8px'}}>Tema do post</label>
          <input value={tema} onChange={e=>setTema(e.target.value)} onKeyDown={e=>e.key==='Enter'&&gerar()}
            placeholder="Ex: seguro auto, marmita saudável, plano de saúde..."
            style={{width:'100%',background:'#080B12',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',padding:'0.85rem 1rem',color:'#F0F4FF',fontSize:'0.95rem',fontFamily:'Sora, sans-serif',outline:'none',boxSizing:'border-box'}}/>
        </div>

        {/* TOM */}
        <div style={{marginBottom:'1.25rem'}}>
          <label style={{display:'block',fontSize:'0.72rem',color:'#4A5568',fontFamily:'JetBrains Mono, monospace',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'8px'}}>Como você quer soar?</label>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {TONS.map(t=>(
              <button key={t} onClick={()=>setTom(t)}
                style={{padding:'7px 14px',borderRadius:'100px',border:tom===t?`1px solid ${cor}88`:'1px solid rgba(255,255,255,0.07)',background:tom===t?`${cor}18`:'transparent',color:tom===t?cor:'#8B95A8',fontSize:'0.85rem',fontWeight:500,cursor:'pointer',fontFamily:'Sora, sans-serif'}}>
                {TOM_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* SLIDES */}
        <div style={{marginBottom:'1.25rem'}}>
          <label style={{display:'block',fontSize:'0.72rem',color:'#4A5568',fontFamily:'JetBrains Mono, monospace',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'8px'}}>
            Quantos slides? <span style={{color:cor}}>{qtd}</span>
          </label>
          <input type="range" min={1} max={10} value={qtd} onChange={e=>setQtd(Number(e.target.value))} style={{width:'100%',accentColor:cor}}/>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.72rem',color:'#4A5568',marginTop:'4px'}}><span>1</span><span>10</span></div>
        </div>



        {erro&&<p style={{color:'#FC8181',fontSize:'0.85rem',marginBottom:'1rem'}}>{erro}</p>}
        
        <button onClick={gerar} disabled={gerando||gerandoFotos}
          style={{display:'flex',alignItems:'center',gap:'8px',background:cor,color:'#fff',border:'none',borderRadius:'10px',padding:'0.85rem 2rem',fontFamily:'Sora, sans-serif',fontWeight:600,fontSize:'0.95rem',cursor:(gerando||gerandoFotos)?'not-allowed':'pointer',opacity:(gerando||gerandoFotos)?0.7:1,boxShadow:`0 8px 24px ${cor}44`}}>
          {gerando?<><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Gerando texto...</>
           :gerandoFotos?<><Loader2 size={16} style={{animation:'spin 1s linear infinite'}}/> Gerando imagens...</>
           :<><Zap size={16}/> Criar slides</>}
        </button>
      </div>

      {slides.length>0&&(
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'20px',alignItems:'start'}}>

          {/* Preview */}
          <div style={{position:'sticky',top:'16px'}}>
            <div style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px',padding:'1.25rem'}}>
              {gerandoFotos?(
                <div style={{aspectRatio:'1',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'#080B12',borderRadius:'12px'}}>
                  <Loader2 size={24} style={{color:cor,animation:'spin 1s linear infinite',marginBottom:'10px'}}/>
                  <p style={{color:'#8B95A8',fontSize:'0.82rem',margin:0}}>Gerando imagens com IA...</p>
                </div>
              ):(
                slides[slideAtivo]&&(
                  <SlideCanvas
                    key={`s${slideAtivo}-${(fotos[slideAtivo]??'').slice(-20)}-${cfg.cor}-${cfg.fonteId}-${cfg.logo.size}`}
                    slide={slides[slideAtivo]} total={slides.length}
                    fotoUrl={fotos[slideAtivo]??''} cfg={cfg}
                    onLogoMove={(x,y)=>setCfg(p=>({...p,logo:{...p.logo,x:Math.round(x),y:Math.round(y)}}))}/>
                )
              )}

              <div style={{display:'flex',gap:'8px',marginTop:'10px'}}>
                <button onClick={trocarFoto} disabled={trocando}
                  style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',background:'#111827',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'7px',color:'#8B95A8',fontSize:'0.75rem',cursor:'pointer',fontFamily:'Sora, sans-serif'}}>
                  {trocando?<Loader2 size={12} style={{animation:'spin 1s linear infinite'}}/>:<Sparkles size={12}/>}
                  Nova IA
                </button>
                <input ref={fotoRef} type="file" accept="image/*" style={{display:'none'}}
                  onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const b=await lerB64(f);setFotos(p=>{const n=[...p];n[slideAtivo]=b;return n})}}/>
                <button onClick={()=>fotoRef.current?.click()}
                  style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',background:'#111827',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'7px',color:'#8B95A8',fontSize:'0.75rem',cursor:'pointer',fontFamily:'Sora, sans-serif'}}>
                  <ImageIcon size={12}/> Minha foto
                </button>
              </div>

              <div style={{display:'flex',gap:'7px',marginTop:'12px',justifyContent:'center',flexWrap:'wrap'}}>
                {slides.map((_,i)=>(
                  <button key={i} onClick={()=>setSlideAtivo(i)}
                    style={{width:i===slideAtivo?'22px':'7px',height:'7px',borderRadius:'4px',border:'none',background:i===slideAtivo?cor:'rgba(255,255,255,0.15)',cursor:'pointer',padding:0,transition:'all 0.2s'}}/>
                ))}
              </div>

              <div style={{display:'flex',gap:'8px',marginTop:'12px'}}>
                <button onClick={()=>slides[slideAtivo]&&baixarUm(slides[slideAtivo])}
                  style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',background:'#111827',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'0.6rem',color:'#8B95A8',fontSize:'0.78rem',fontWeight:500,cursor:'pointer',fontFamily:'Sora, sans-serif'}}>
                  <Download size={13}/> Este slide
                </button>
                <button onClick={baixarTudo} disabled={baixando}
                  style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',background:cor,border:'none',borderRadius:'8px',padding:'0.6rem',color:'#fff',fontSize:'0.78rem',fontWeight:600,cursor:'pointer',fontFamily:'Sora, sans-serif',opacity:baixando?0.7:1}}>
                  {baixando?<Loader2 size={13} style={{animation:'spin 1s linear infinite'}}/>:<Download size={13}/>}
                  {baixando?'Gerando...':'Baixar ZIP'}
                </button>
              </div>
            </div>
          </div>

          {/* Lista de slides com edição */}
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <h2 style={{fontSize:'1rem',fontWeight:600,letterSpacing:'-0.02em',marginBottom:'4px'}}>
              {slides.length} slide{slides.length>1?'s':''} — toque no lápis para editar
            </h2>
            {slides.map((slide,idx)=>(
              <div key={slide.id} onClick={()=>setSlideAtivo(idx)}
                style={{background:slideAtivo===idx?'#111827':'#0D1117',border:slideAtivo===idx?`1px solid ${cor}55`:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'1.25rem',cursor:'pointer',transition:'all 0.2s'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'0.75rem'}}>
                  <div style={{flex:1,minWidth:0}}>
                    <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:'0.62rem',color:'#4A5568',letterSpacing:'0.1em'}}>SLIDE {String(slide.ordem).padStart(2,'0')}</span>
                    {editando===slide.id?(
                      <>
                        <input value={slide.titulo} onChange={e=>editarSlide(slide.id,'titulo',e.target.value)} onClick={e=>e.stopPropagation()}
                          style={{display:'block',width:'100%',background:'#080B12',border:`1px solid ${cor}55`,borderRadius:'6px',padding:'6px 10px',color:'#F0F4FF',fontSize:'0.95rem',fontWeight:600,fontFamily:'Sora, sans-serif',outline:'none',marginTop:'6px',marginBottom:'8px',boxSizing:'border-box'}}/>
                        <textarea value={slide.corpo} onChange={e=>editarSlide(slide.id,'corpo',e.target.value)} onClick={e=>e.stopPropagation()} rows={3}
                          style={{display:'block',width:'100%',background:'#080B12',border:`1px solid ${cor}55`,borderRadius:'6px',padding:'6px 10px',color:'#8B95A8',fontSize:'0.85rem',fontFamily:'Sora, sans-serif',outline:'none',resize:'vertical',lineHeight:1.6,boxSizing:'border-box'}}/>
                      </>
                    ):(
                      <>
                        <p style={{fontSize:'0.95rem',fontWeight:600,margin:'4px 0 6px',lineHeight:1.3}}>{slide.titulo}</p>
                        <p style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.6,margin:0,whiteSpace:'pre-line'}}>{slide.corpo}</p>
                      </>
                    )}
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'5px',flexShrink:0}} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>moverSlide(idx,'up')} disabled={idx===0}
                      style={{background:'#111827',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'6px',padding:'6px',cursor:'pointer',color:idx===0?'#4A5568':'#8B95A8',display:'flex'}}>
                      <ChevronUp size={13}/>
                    </button>
                    <button onClick={()=>moverSlide(idx,'down')} disabled={idx===slides.length-1}
                      style={{background:'#111827',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'6px',padding:'6px',cursor:'pointer',color:idx===slides.length-1?'#4A5568':'#8B95A8',display:'flex'}}>
                      <ChevronDown size={13}/>
                    </button>
                    <button onClick={()=>setEditando(editando===slide.id?null:slide.id)}
                      style={{background:editando===slide.id?`${cor}22`:'#111827',border:editando===slide.id?`1px solid ${cor}55`:'1px solid rgba(255,255,255,0.07)',borderRadius:'6px',padding:'6px',cursor:'pointer',color:editando===slide.id?cor:'#8B95A8',display:'flex'}}>
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

// Export com Suspense obrigatório para useSearchParams no Next.js 14
export default function CriarPage() {
  return (
    <Suspense fallback={
      <div style={{padding:'2.5rem',color:'#4A5568',fontFamily:'JetBrains Mono, monospace',fontSize:'0.8rem'}}>
        carregando...
      </div>
    }>
      <CriarInner/>
    </Suspense>
  )
}
