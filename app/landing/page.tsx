import Link from 'next/link'

export default function LandingPage() {
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
            <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.72rem',color:'#6B9FFF',letterSpacing:'0.06em',textTransform:'uppercase'}}>Crie posts para o Instagram em segundos</span>
          </div>

          <h1 className="fade2" style={{fontSize:'clamp(3rem,7.5vw,5.8rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.0,marginBottom:'1.5rem'}}>
            Você digita o tema.<br/>
            <span style={{background:'linear-gradient(90deg,#2D6FFF,#00D4FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>A Sliqr cria o post.</span>
          </h1>

          <p className="fade3" style={{fontSize:'clamp(1rem,1.8vw,1.15rem)',color:'#8B95A8',fontWeight:300,lineHeight:1.75,maxWidth:'520px',margin:'0 auto 2.5rem'}}>
            Sem precisar de designer, sem complicação. Digite o assunto do seu negócio e receba um carrossel completo, pronto para publicar.
          </p>

          <div className="fade4" style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',textDecoration:'none',borderRadius:'10px',padding:'0.85rem 2rem',fontWeight:600,fontSize:'0.95rem',boxShadow:'0 12px 32px rgba(45,111,255,0.3)'}}>
              Criar meu primeiro post grátis
            </Link>
            <a href="#como-funciona" style={{background:'transparent',color:'#8B95A8',textDecoration:'none',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'10px',padding:'0.85rem 2rem',fontWeight:500,fontSize:'0.95rem'}}>
              Ver como funciona
            </a>
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
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',overflow:'hidden'}}>
          {[
            {n:'01',t:'Digite o tema do seu negócio',p:'Qualquer assunto, qualquer área. Seguro, saúde, alimentação, imóveis — a Sliqr entende o contexto e cria o conteúdo certo para o seu público.'},
            {n:'02',t:'Escolha como você quer soar',p:'Quer vender, ensinar, criar urgência ou inspirar? Com um clique, o texto de cada slide muda de estilo — e já sai pronto para publicar.'},
            {n:'03',t:'Ajuste e baixe as imagens',p:'Edite o texto, troque a ordem. Depois é só baixar os slides separados ou todos de uma vez e publicar no Instagram.'},
          ].map(s => (
            <div key={s.n} style={{background:'#0D1117',padding:'2.5rem 2rem'}}>
              <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',letterSpacing:'0.1em',color:'#4A5568',marginBottom:'1.25rem'}}>PASSO {s.n}</div>
              <h3 style={{fontSize:'1rem',fontWeight:600,marginBottom:'0.5rem',letterSpacing:'-0.02em'}}>{s.t}</h3>
              <p style={{fontSize:'0.875rem',color:'#8B95A8',lineHeight:1.65,fontWeight:300}}>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="section-pad" style={{padding:'7rem 5%',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',letterSpacing:'0.1em',textTransform:'uppercase',color:'#2D6FFF',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{width:'20px',height:'1px',background:'#2D6FFF',display:'block'}}/>Planos
        </div>
        <h2 style={{fontSize:'clamp(2rem,3.5vw,2.8rem)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'4rem'}}>
          Comece grátis.<br/><span style={{background:'linear-gradient(90deg,#2D6FFF,#00D4FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Pague só quando quiser mais.</span>
        </h2>
        <div className="planos-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px',alignItems:'start'}}>
          {[
            {nome:'Free',preco:'R$0',periodo:'para sempre',features:['1 post por dia','1 slide por post','Baixar pacote'],off:['Sem edição','Com marca d\'água'],featured:false},
            {nome:'Starter',preco:'R$37',periodo:'/mês',features:['1 post por dia','Até 5 slides','Baixar separado ou ZIP','Edite antes de baixar','Sem marca d\'água'],off:['Sem logo própria'],featured:false},
            {nome:'Pro',preco:'R$77',periodo:'/mês',features:['2 posts por dia','Até 10 slides','Baixar separado ou ZIP','Edite antes de baixar','Sem marca d\'água','Com logo da empresa'],off:[],featured:true},
            {nome:'Ilimitado',preco:'R$147',periodo:'/mês',features:['Posts sem limite','Até 10 slides','Baixar separado ou ZIP','Edite antes de baixar','Sem marca d\'água','Com logo da empresa'],off:[],featured:false},
          ].map(p => (
            <div key={p.nome} style={{background: p.featured ? 'linear-gradient(145deg,#0D1829,#0A1422)' : '#0D1117',border: p.featured ? '1px solid rgba(45,111,255,0.4)' : '1px solid rgba(255,255,255,0.07)',borderRadius:'24px',padding:'2rem',boxShadow: p.featured ? '0 0 0 1px rgba(45,111,255,0.1),0 20px 50px rgba(45,111,255,0.12)' : 'none',position:'relative'}}>
              {p.featured && <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#2D6FFF',color:'#fff',fontSize:'0.65rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',padding:'3px 12px',borderRadius:'100px',whiteSpace:'nowrap'}}>Mais popular</div>}
              <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.75rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#8B95A8',marginBottom:'1.5rem'}}>{p.nome}</div>
              <div style={{fontSize:'2.75rem',fontWeight:700,letterSpacing:'-0.04em',lineHeight:1,marginBottom:'0.3rem'}}>{p.preco}</div>
              <div style={{fontSize:'0.78rem',color:'#4A5568',marginBottom:'1.5rem'}}>{p.periodo}</div>
              <div style={{height:'1px',background:'rgba(255,255,255,0.07)',marginBottom:'1.5rem'}}/>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px',marginBottom:'2rem'}}>
                {p.features.map(f => (
                  <li key={f} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'0.85rem',color:'#8B95A8',fontWeight:300}}>
                    <span style={{width:'16px',height:'16px',borderRadius:'4px',background:'rgba(45,111,255,0.12)',border:'1px solid rgba(45,111,255,0.35)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#2D6FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
                {p.off.map(f => (
                  <li key={f} style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'0.85rem',color:'#4A5568',fontWeight:300,opacity:0.5}}>
                    <span style={{width:'16px',height:'16px',borderRadius:'4px',background:'#1A2235',border:'1px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/cadastro" style={{display:'block',width:'100%',padding:'0.75rem',borderRadius:'8px',textAlign:'center',fontWeight:600,fontSize:'0.875rem',textDecoration:'none',background: p.featured ? '#2D6FFF' : 'transparent',color: p.featured ? '#fff' : '#8B95A8',border: p.featured ? 'none' : '1px solid rgba(255,255,255,0.1)'}}>
                {p.nome === 'Free' ? 'Começar grátis' : `Assinar ${p.nome}`}
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
          {['Privacidade','Termos de uso','Contato'].map(l => (
            <a key={l} href="#" style={{color:'#4A5568',textDecoration:'none',fontSize:'0.8rem'}}>{l}</a>
          ))}
        </div>
        <p style={{fontSize:'0.75rem',color:'#4A5568',fontFamily:'JetBrains Mono,monospace'}}>© 2025 Sliqr</p>
      </footer>
    </>
  )
}
