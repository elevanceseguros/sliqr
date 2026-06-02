'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [anual, setAnual] = useState(true)

  const desc = 0.25 // 25% de desconto no anual

  // Todas as features para renderização uniforme
  const TODAS = ['posts','slides','zip','legenda','historico','logo','sugestoes']
  const LABELS: Record<string,string> = {
    posts:'posts/dia', slides:'slides', zip:'Download ZIP',
    legenda:'Legenda com hashtags', historico:'Histórico de posts',
    logo:'Logo da empresa', sugestoes:'Sugestões de conteúdo',
  }
  const planos = [
    { nome:'Free',      preco:0,   feat:{ posts:'1 post/dia',    slides:'Até 2 slides',       zip:true, legenda:true, historico:false, logo:false, sugestoes:false }, featured:false },
    { nome:'Starter',   preco:37,  feat:{ posts:'1 post/dia',    slides:'Até 5 slides',  zip:true, legenda:true, historico:true,  logo:false, sugestoes:false }, featured:false },
    { nome:'Pro',       preco:77,  feat:{ posts:'2 posts/dia',   slides:'Até 10 slides', zip:true, legenda:true, historico:true,  logo:true,  sugestoes:true  }, featured:true  },
    { nome:'Ilimitado', preco:147, feat:{ posts:'Ilimitado',     slides:'Até 10 slides', zip:true, legenda:true, historico:true,  logo:true,  sugestoes:true  }, featured:false },
  ]

  function precoMes(base: number) {
    if (base === 0) return 'R$0'
    if (anual) return `R$${Math.round(base * (1 - desc))}`
    return `R$${base}`
  }

  function precoAnual(base: number) {
    return Math.round(base * (1 - desc)) * 12
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'Sora',sans-serif;background:#080B12;color:#F0F4FF;-webkit-font-smoothing:antialiased;overflow-x:hidden}
        body::before{content:'';position:fixed;inset:0;z-index:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}
        .fade1{animation:fadeUp 0.6s ease both}
        .fade2{animation:fadeUp 0.6s 0.1s ease both}
        .fade3{animation:fadeUp 0.6s 0.2s ease both}
        .fade4{animation:fadeUp 0.6s 0.3s ease both}
        .fade5{animation:fadeUp 0.6s 0.4s ease both}
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-section { padding: 100px 5% 60px !important; }
          .section-pad { padding: 4rem 5% !important; }
          .cta-box { padding: 3rem 1.5rem !important; }
          .planos-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; }
        }
        @media (max-width: 480px) {
          .hero-section { padding: 90px 4% 50px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.85)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'9px',fontWeight:800,fontSize:'1.3rem',letterSpacing:'-0.04em'}}>
          <div style={{width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          Sliqr
        </div>
        <div className="nav-links" style={{display:'flex',gap:'0',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'100px',padding:'4px'}}>
          {['Como funciona','O que faz','Planos'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} style={{color:'#8B95A8',textDecoration:'none',fontSize:'0.8rem',fontWeight:500,padding:'0.4rem 1.1rem',borderRadius:'100px'}}>{l}</a>
          ))}
          <Link href="/blog" style={{color:'#8B95A8',textDecoration:'none',fontSize:'0.8rem',fontWeight:500,padding:'0.4rem 1.1rem',borderRadius:'100px'}}>Blog</Link>
        </div>
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <Link href="/login" style={{color:'#8B95A8',textDecoration:'none',fontSize:'0.85rem',fontWeight:500,padding:'0.5rem 1rem'}}>Entrar</Link>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',textDecoration:'none',borderRadius:'8px',padding:'0.55rem 1.25rem',fontSize:'0.85rem',fontWeight:600}}>Criar grátis</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:'120px 5% 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(45,111,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(45,111,255,0.04) 1px,transparent 1px)',backgroundSize:'60px 60px',maskImage:'radial-gradient(ellipse 80% 60% at 50% 40%,black 30%,transparent 80%)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',width:'600px',height:'400px',background:'rgba(45,111,255,0.12)',filter:'blur(120px)',borderRadius:'50%',top:'5%',left:'50%',transform:'translateX(-50%)',pointerEvents:'none'}}/>

        <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:'860px',margin:'0 auto'}}>
          <div className="fade1" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#111827',border:'1px solid rgba(45,111,255,0.35)',borderRadius:'100px',padding:'5px 14px 5px 8px',marginBottom:'2rem'}}>
            <div style={{width:'20px',height:'20px',background:'rgba(45,111,255,0.12)',border:'1px solid rgba(45,111,255,0.35)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{width:'6px',height:'6px',background:'#2D6FFF',borderRadius:'50%',display:'block',animation:'blink 2s ease-in-out infinite'}}/>
            </div>
            <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.72rem',color:'#6B9FFF',letterSpacing:'0.06em',textTransform:'uppercase'}}>Carrosséis para Instagram com IA — sem designer</span>
          </div>

          <h1 className="fade2" style={{fontSize:'clamp(3rem,7.5vw,5.8rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.0,marginBottom:'1.5rem'}}>
            Você digita o tema.<br/>
            <span style={{background:'linear-gradient(90deg,#2D6FFF,#00D4FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>A Sliqr cria o post.</span>
          </h1>

          <p className="fade3" style={{fontSize:'clamp(1rem,1.8vw,1.15rem)',color:'#8B95A8',fontWeight:300,lineHeight:1.75,maxWidth:'540px',margin:'0 auto 2.5rem'}}>
            Sem designer, sem Canva, sem espera. Em menos de 1 minuto você tem um carrossel completo com imagens, texto e legenda — pronto para publicar.
          </p>

          <div className="fade4" style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',textDecoration:'none',borderRadius:'10px',padding:'0.85rem 2rem',fontWeight:600,fontSize:'0.95rem',boxShadow:'0 12px 32px rgba(45,111,255,0.3)'}}>
              Criar meu primeiro post grátis
            </Link>
            <a href="#como-funciona" style={{background:'transparent',color:'#8B95A8',textDecoration:'none',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',padding:'0.85rem 2rem',fontWeight:500,fontSize:'0.95rem'}}>
              Ver como funciona
            </a>
          </div>

          <p className="fade5" style={{marginTop:'1.5rem',fontFamily:'JetBrains Mono,monospace',fontSize:'0.68rem',color:'#4A5568',letterSpacing:'0.06em'}}>
            // GRÁTIS PARA COMEÇAR · SEM CARTÃO · SEM CONFIGURAÇÃO
          </p>
        </div>

        {/* Mockup de slides */}
        <style>{`
          .hero-mockup-desktop { display: flex; }
          .hero-mockup-mobile  { display: none; }
          @media (max-width: 600px) {
            .hero-mockup-desktop { display: none; }
            .hero-mockup-mobile  { display: flex; }
          }
          .hero-scroll::-webkit-scrollbar { display: none; }
          .hero-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Desktop: 3 slides com rotação */}
        <div className="hero-mockup-desktop" style={{position:'relative',zIndex:1,width:'100%',maxWidth:'900px',margin:'3rem auto 0',gap:'12px',justifyContent:'center',alignItems:'flex-end',padding:'0 5%',overflow:'hidden'}}>
          <div style={{flex:'0 0 auto',width:'clamp(120px,20vw,240px)',borderRadius:'14px',overflow:'hidden',boxShadow:'0 20px 50px rgba(0,0,0,0.5)',transform:'rotate(-3deg) translateY(20px)',opacity:0.65}}>
            <img src="/slides/demo5.png" alt="exemplo de carrossel" style={{width:'100%',display:'block'}}/>
          </div>
          <div style={{flex:'0 0 auto',width:'clamp(160px,24vw,280px)',borderRadius:'16px',overflow:'hidden',boxShadow:'0 28px 70px rgba(0,0,0,0.6)',transform:'rotate(-1deg)',zIndex:2,border:'1px solid rgba(255,255,255,0.08)'}}>
            <img src="/slides/demo1.png" alt="exemplo de carrossel" style={{width:'100%',display:'block'}}/>
          </div>
          <div style={{flex:'0 0 auto',width:'clamp(120px,20vw,240px)',borderRadius:'14px',overflow:'hidden',boxShadow:'0 20px 50px rgba(0,0,0,0.5)',transform:'rotate(2deg) translateY(15px)',opacity:0.7}}>
            <img src="/slides/demo2.png" alt="exemplo de carrossel" style={{width:'100%',display:'block'}}/>
          </div>
        </div>

        {/* Mobile: carrossel deslizável com peek dos laterais */}
        <div className="hero-mockup-mobile" style={{position:'relative',zIndex:1,width:'100%',margin:'2.5rem auto 0',justifyContent:'center'}}>
          <div className="hero-scroll" style={{display:'flex',gap:'12px',overflowX:'auto',scrollSnapType:'x mandatory',WebkitOverflowScrolling:'touch',padding:'0 12% 1rem',width:'100%',boxSizing:'border-box'}}>
            {[
              {src:'/slides/demo5.png', rot:'-2deg', op:'0.75'},
              {src:'/slides/demo1.png', rot:'0deg',  op:'1'},
              {src:'/slides/demo2.png', rot:'2deg',  op:'0.75'},
            ].map((s,i) => (
              <div key={i} style={{flex:'0 0 72vw',scrollSnapAlign:'center',borderRadius:'16px',overflow:'hidden',boxShadow:'0 20px 50px rgba(0,0,0,0.5)',transform:`rotate(${s.rot})`,opacity:Number(s.op),border: i===1 ? '1px solid rgba(255,255,255,0.1)' : 'none'}}>
                <img src={s.src} alt="exemplo de carrossel" style={{width:'100%',display:'block'}}/>
              </div>
            ))}
          </div>
          {/* Indicadores */}
          <div style={{display:'flex',justifyContent:'center',gap:'6px',marginTop:'0.5rem'}}>
            {[0,1,2].map(i => (
              <div key={i} style={{width: i===1 ? '20px' : '6px',height:'6px',borderRadius:'3px',background: i===1 ? '#2D6FFF' : 'rgba(255,255,255,0.2)',transition:'width 0.3s'}}/>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="section-pad" style={{padding:'7rem 5%',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',letterSpacing:'0.1em',textTransform:'uppercase',color:'#2D6FFF',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{width:'20px',height:'1px',background:'#2D6FFF',display:'block'}}/>Simples assim
        </div>
        <h2 style={{fontSize:'clamp(2rem,3.5vw,2.8rem)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'4rem'}}>
          Três passos e o post<br/><span style={{background:'linear-gradient(90deg,#2D6FFF,#00D4FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>está pronto.</span>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'16px'}}>
          {[
            {n:'01',emoji:'✍️',t:'Digite o tema',p:'Qualquer assunto do seu negócio. A Sliqr entende o contexto e gera conteúdo específico e relevante para o seu público.',img:'/slides/demo4.png'},
            {n:'02',emoji:'🎨',t:'Personalize as cores e fonte',p:'Escolha a paleta da sua marca em segundos. Imagens geradas por IA e legenda com hashtags já incluídas automaticamente.',img:'/slides/demo1.png'},
            {n:'03',emoji:'📲',t:'Baixe e publique',p:'ZIP com todos os slides + legenda pronta para copiar. Do prompt ao post em menos de 1 minuto.',img:'/slides/demo2.png'},
          ].map(s => (
            <div key={s.n} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',overflow:'hidden'}}>
              <div style={{padding:'1.75rem 1.75rem 0'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'0.75rem'}}>
                  <div style={{width:'32px',height:'32px',background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem'}}>{s.emoji}</div>
                  <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',letterSpacing:'0.1em',color:'#2D6FFF'}}>PASSO {s.n}</div>
                </div>
                <h3 style={{fontSize:'1.1rem',fontWeight:600,marginBottom:'0.5rem',letterSpacing:'-0.02em'}}>{s.t}</h3>
                <p style={{fontSize:'0.875rem',color:'#8B95A8',lineHeight:1.65,fontWeight:300,marginBottom:'1.25rem'}}>{s.p}</p>
              </div>
              <img src={s.img} alt={s.t} style={{width:'100%',display:'block',borderTop:'1px solid rgba(255,255,255,0.05)'}}/>
            </div>
          ))}
        </div>
      </section>

      {/* O QUE FAZ */}
      <section id="o-que-faz" className="section-pad" style={{padding:'7rem 5%',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',letterSpacing:'0.1em',textTransform:'uppercase',color:'#2D6FFF',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{width:'20px',height:'1px',background:'#2D6FFF',display:'block'}}/>Para quem é
        </div>
        <h2 style={{fontSize:'clamp(2rem,3.5vw,2.8rem)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'3rem'}}>
          Para todo negócio que precisa<br/><span style={{background:'linear-gradient(90deg,#2D6FFF,#00D4FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>postar mais e melhor.</span>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px'}}>
          {[
            {titulo:'Corretores de seguros',desc:'Eduque clientes sobre coberturas, prevenção e benefícios sem depender de agência.'},
            {titulo:'Nutricionistas',desc:'Compartilhe dicas, cardápios e transformações que atraem novos pacientes.'},
            {titulo:'Farmácias de manipulação',desc:'Explique fórmulas, ingredientes e diferenciais que constroem confiança.'},
            {titulo:'Corretores de imóveis',desc:'Mostre lançamentos, tendências e dicas para quem quer comprar ou investir.'},
            {titulo:'Estúdios e ateliês',desc:'Apresente portfólio, processos e resultados que vendem sem precisar explicar.'},
            {titulo:'Qualquer pequeno negócio',desc:'Se você tem algo pra contar, a Sliqr transforma em post profissional.'},
          ].map(c => (
            <div key={c.titulo} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px',padding:'1.5rem'}}>
              <div style={{width:'32px',height:'32px',background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'0.75rem'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D6FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 style={{fontSize:'0.9rem',fontWeight:600,marginBottom:'0.4rem',letterSpacing:'-0.01em'}}>{c.titulo}</h3>
              <p style={{fontSize:'0.8rem',color:'#8B95A8',lineHeight:1.6,fontWeight:300}}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="section-pad" style={{padding:'7rem 5%',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',letterSpacing:'0.1em',textTransform:'uppercase',color:'#2D6FFF',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{width:'20px',height:'1px',background:'#2D6FFF',display:'block'}}/>Planos
        </div>
        <h2 style={{fontSize:'clamp(2rem,3.5vw,2.8rem)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'2rem'}}>
          Comece grátis.<br/><span style={{background:'linear-gradient(90deg,#2D6FFF,#00D4FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Pague só quando quiser mais.</span>
        </h2>

        {/* Toggle mensal/anual */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:'3.5rem'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'0',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'100px',padding:'4px',position:'relative'}}>
            <button
              onClick={() => setAnual(false)}
              style={{padding:'0.45rem 1.4rem',borderRadius:'100px',border:'none',cursor:'pointer',fontSize:'0.82rem',fontWeight:600,transition:'all 0.2s',background: !anual ? '#1A2845' : 'transparent',color: !anual ? '#F0F4FF' : '#4A5568',boxShadow: !anual ? '0 0 0 1px rgba(45,111,255,0.3)' : 'none'}}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnual(true)}
              style={{padding:'0.45rem 1.4rem',borderRadius:'100px',border:'none',cursor:'pointer',fontSize:'0.82rem',fontWeight:600,transition:'all 0.2s',background: anual ? '#1A2845' : 'transparent',color: anual ? '#F0F4FF' : '#4A5568',boxShadow: anual ? '0 0 0 1px rgba(45,111,255,0.3)' : 'none',display:'flex',alignItems:'center',gap:'8px'}}
            >
              Anual
              <span style={{background: anual ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',border:`1px solid ${anual ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)'}`,color: anual ? '#34D399' : '#4A5568',fontSize:'0.65rem',fontWeight:700,padding:'1px 7px',borderRadius:'100px',letterSpacing:'0.04em',transition:'all 0.2s'}}>
                −25%
              </span>
            </button>
          </div>
        </div>

        <div className="planos-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px',alignItems:'stretch'}}>
          {planos.map(p => (
            <div key={p.nome} style={{background: p.featured ? 'linear-gradient(145deg,#0D1829,#0A1422)' : '#0D1117',border: p.featured ? '1px solid rgba(45,111,255,0.4)' : '1px solid rgba(255,255,255,0.07)',borderRadius:'24px',padding:'2rem',boxShadow: p.featured ? '0 0 0 1px rgba(45,111,255,0.1),0 20px 50px rgba(45,111,255,0.12)' : 'none',position:'relative',display:'flex',flexDirection:'column'}}>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
                <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.75rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#8B95A8'}}>{p.nome}</div>
                {p.featured && <div style={{background:'linear-gradient(90deg,rgba(45,111,255,0.25),rgba(0,212,255,0.15))',border:'1px solid rgba(45,111,255,0.4)',color:'#6B9FFF',fontSize:'0.6rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'3px 10px',borderRadius:'100px',whiteSpace:'nowrap'}}>Mais popular</div>}
                {anual && p.preco > 0 && !p.featured && <div style={{background:'rgba(52,211,153,0.08)',border:'1px solid rgba(52,211,153,0.25)',color:'#34D399',fontSize:'0.6rem',fontWeight:700,padding:'2px 8px',borderRadius:'100px'}}>−25%</div>}
              </div>

              {p.preco === 0 ? (
                <>
                  <div style={{fontSize:'2.75rem',fontWeight:700,letterSpacing:'-0.04em',lineHeight:1,marginBottom:'0.3rem'}}>R$0</div>
                  <div style={{fontSize:'0.78rem',color:'#4A5568',marginBottom:'1.5rem'}}>para sempre</div>
                </>
              ) : anual ? (
                <>
                  <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
                    <div style={{fontSize:'2.6rem',fontWeight:700,letterSpacing:'-0.04em',lineHeight:1}}>{precoMes(p.preco)}</div>
                    <div style={{fontSize:'0.78rem',color:'#4A5568'}}>/mês</div>
                    <div style={{fontSize:'0.75rem',color:'#4A5568',textDecoration:'line-through',marginLeft:'2px'}}>R${p.preco}</div>
                  </div>
                  <div style={{fontSize:'0.73rem',color:'#34D399',marginBottom:'1.5rem',display:'flex',alignItems:'center',gap:'5px'}}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    R${precoAnual(p.preco)}/ano · cobrado anualmente
                  </div>
                </>
              ) : (
                <>
                  <div style={{fontSize:'2.75rem',fontWeight:700,letterSpacing:'-0.04em',lineHeight:1,marginBottom:'0.3rem'}}>R${p.preco}</div>
                  <div style={{fontSize:'0.78rem',color:'#4A5568',marginBottom:'1.5rem'}}>/mês</div>
                </>
              )}

              <div style={{height:'1px',background:'rgba(255,255,255,0.07)',marginBottom:'1.5rem'}}/>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px',marginBottom:'2rem'}}>
                {TODAS.map(k => {
                  const val   = (p as any).feat[k]
                  const ativo = val !== false
                  const label = typeof val === 'string' ? val : LABELS[k]
                  return (
                    <li key={k} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'0.82rem',color:ativo ? '#8B95A8' : '#2D3748',fontWeight:300,textDecoration:ativo ? 'none' : 'line-through'}}>
                      <span style={{width:'14px',height:'14px',borderRadius:'3px',background:ativo ? 'rgba(45,111,255,0.12)' : '#111827',border:`1px solid ${ativo ? 'rgba(45,111,255,0.35)' : 'rgba(255,255,255,0.05)'}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                        {ativo
                          ? <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#2D6FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          : <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FC4444" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        }
                      </span>
                      {label}
                    </li>
                  )
                })}
              </ul>
              <Link
                href={p.preco === 0 ? '/cadastro' : `/cadastro?plano=${p.nome.toLowerCase()}&periodo=${anual ? 'anual' : 'mensal'}`}
                style={{display:'block',width:'100%',padding:'0.75rem',borderRadius:'8px',textAlign:'center',fontWeight:600,fontSize:'0.875rem',textDecoration:'none',background: p.featured ? '#2D6FFF' : 'transparent',color: p.featured ? '#fff' : '#8B95A8',border: p.featured ? 'none' : '1px solid rgba(255,255,255,0.1)'}}
              >
                {p.preco === 0 ? 'Começar grátis' : `Assinar ${p.nome}${anual ? ' Anual' : ''}`}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{padding:'6rem 5%',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
        <div className="cta-box" style={{maxWidth:'800px',margin:'0 auto',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',padding:'5rem 3rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-80px',left:'50%',transform:'translateX(-50%)',width:'400px',height:'200px',background:'rgba(45,111,255,0.1)',filter:'blur(60px)',borderRadius:'50%',pointerEvents:'none'}}/>
          <h2 style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'1rem',position:'relative'}}>
            Crie seu primeiro post<br/><span style={{background:'linear-gradient(90deg,#2D6FFF,#00D4FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>agora. É grátis.</span>
          </h2>
          <p style={{color:'#8B95A8',fontSize:'1rem',fontWeight:300,marginBottom:'2.5rem',position:'relative'}}>Sem cartão de crédito. Sem precisar configurar nada.</p>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',textDecoration:'none',borderRadius:'10px',padding:'0.85rem 2.5rem',fontWeight:600,fontSize:'1rem',boxShadow:'0 12px 32px rgba(45,111,255,0.3)',position:'relative'}}>
            Quero criar meu primeiro post
          </Link>
          <p style={{marginTop:'1.25rem',fontFamily:'JetBrains Mono,monospace',fontSize:'0.68rem',color:'#4A5568',letterSpacing:'0.06em',position:'relative'}}>// GRÁTIS · SEM CARTÃO · SEM COMPLICAÇÃO</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.07)',padding:'2rem 5%',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'7px',fontWeight:700,letterSpacing:'-0.03em'}}>
          <div style={{width:'22px',height:'22px',background:'#2D6FFF',borderRadius:'5px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          Sliqr
        </div>
        <div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap'}}>
          <a href="/blog" style={{color:'#4A5568',textDecoration:'none',fontSize:'0.8rem'}}>Blog</a>
          <a href="/privacidade" style={{color:'#4A5568',textDecoration:'none',fontSize:'0.8rem'}}>Privacidade</a>
          <a href="/termos" style={{color:'#4A5568',textDecoration:'none',fontSize:'0.8rem'}}>Termos de uso</a>
          <a href="mailto:contato@sliqr.com.br" style={{color:'#4A5568',textDecoration:'none',fontSize:'0.8rem'}}>Contato</a>
        </div>
        <p style={{fontSize:'0.75rem',color:'#4A5568',fontFamily:'JetBrains Mono,monospace'}}>© 2025 Sliqr</p>
      </footer>
    </>
  )
}
