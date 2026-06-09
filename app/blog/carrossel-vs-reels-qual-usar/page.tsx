import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carrossel ou Reels: Qual Usar para Vender Mais no Instagram? - Sliqr Blog',
  description: 'Comparacao direta entre carrossel e Reels para pequenos empreendedores -- quando usar cada formato e como combinar os dois.',
  keywords: ['carrossel vs reels instagram','quando usar carrossel instagram','reels ou carrossel','melhor formato instagram'],
  openGraph: {
    title: 'Carrossel ou Reels: Qual Usar para Vender Mais?',
    description: 'Quando usar carrossel e quando usar Reels no Instagram.',
    url: 'https://sliqr.com.br/blog/carrossel-vs-reels-qual-usar',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Carrossel ou Reels: Qual Usar para Vender Mais no Instagram?',
        'datePublished':'2025-06-15','dateModified':'2025-06-15',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/carrossel-vs-reels-qual-usar'
      })}}/>
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Sora',sans-serif;background:#080B12;color:#F0F4FF;-webkit-font-smoothing:antialiased}
        a{color:inherit;text-decoration:none}
      `}}/>
      <nav style={NAV}>
        <Link href="/landing" style={{display:'flex',alignItems:'center',gap:'9px',fontWeight:800,fontSize:'1.3rem',letterSpacing:'-0.04em'}}>
          <div style={LOGO}><svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg></div>
          Sliqr
        </Link>
        <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.55rem 1.25rem',fontSize:'0.85rem',fontWeight:600}}>Criar gratis</Link>
      </nav>
      <main style={{paddingTop:'64px',maxWidth:'720px',margin:'0 auto',padding:'64px 1.5rem 4rem'}}>
        <nav style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'2rem',marginTop:'2rem',fontSize:'0.78rem',color:'#4A5568'}}>
          <Link href="/landing">Inicio</Link><span>-&gt;</span><Link href="/blog">Blog</Link><span>-&gt;</span>
          <span style={{color:'#8B95A8'}}>Carrossel vs Reels</span>
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',color:'#6B9FFF',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>FORMATOS</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>15 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>6 min de leitura</span>
        </div>
        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Carrossel ou Reels: Qual Usar para Vender Mais no Instagram?
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Nao e um vs o outro. Sao ferramentas diferentes com objetivos diferentes. Entenda qual usar em cada situacao -- e como combinar os dois para crescer e vender ao mesmo tempo.
        </p>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Crie carrosseis em 45 segundos com IA</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>Enquanto grava o Reels, o Sliqr cuida dos carrosseis. Gratis.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Comparacao direta</h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              <div style={{background:'#0D1117',border:'1px solid rgba(45,111,255,0.2)',borderRadius:'12px',padding:'1.25rem'}}>
                <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',fontWeight:700,color:'#2D6FFF',marginBottom:'0.75rem',letterSpacing:'0.06em'}}>CARROSSEL</div>
                {['Maior taxa de salvamento','Conteudo educativo','Profundidade e detalhe','Vida util mais longa','Facil de criar','Melhor para converter'].map((item,i) => (
                  <div key={i} style={{display:'flex',gap:'6px',marginBottom:'6px',alignItems:'flex-start'}}>
                    <span style={{color:'#34D399',fontSize:'0.75rem',flexShrink:0}}>+</span>
                    <span style={{color:'#8B95A8',fontSize:'0.78rem',lineHeight:1.5}}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'1.25rem'}}>
                <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',fontWeight:700,color:'#8B95A8',marginBottom:'0.75rem',letterSpacing:'0.06em'}}>REELS</div>
                {['Maior alcance para novos','Viral potential','Mostra personalidade','Conecta emocionalmente','Exige mais producao','Melhor para crescer'].map((item,i) => (
                  <div key={i} style={{display:'flex',gap:'6px',marginBottom:'6px',alignItems:'flex-start'}}>
                    <span style={{color:'#34D399',fontSize:'0.75rem',flexShrink:0}}>+</span>
                    <span style={{color:'#8B95A8',fontSize:'0.78rem',lineHeight:1.5}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Quando usar cada um</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
              {[
                {formato:'Use CARROSSEL quando',casos:['Quer ensinar algo com profundidade','Precisa de salvamentos e compartilhamentos','Quer converter seguidores em clientes','Tem pouco tempo para producao de video']},
                {formato:'Use REELS quando',casos:['Quer atingir pessoas que nao te seguem','Quer mostrar bastidores ou sua personalidade','Quer viralizar um conteudo rapido','Tem habilidade ou tempo para editar video']},
              ].map(({formato,casos}) => (
                <div key={formato} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'10px',padding:'1rem'}}>
                  <div style={{fontWeight:700,fontSize:'0.88rem',marginBottom:'0.6rem',color:'#F0F4FF'}}>{formato}</div>
                  {casos.map((c,i) => (
                    <div key={i} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                      <span style={{color:'#2D6FFF',fontSize:'0.75rem',flexShrink:0}}>-&gt;</span>
                      <span style={{color:'#8B95A8',fontSize:'0.82rem'}}>{c}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>A estrategia que combina os dois</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Use Reels para atrair novos seguidores com alcance organico. Use carrosseis para educar, aprofundar e converter esses novos seguidores em clientes. Um Reels de 30 segundos pode trazer 1.000 novos visitantes. Um carrossel de 5 slides pode converter 10 deles em clientes. Os dois juntos e o que faz o Instagram trabalhar por voce.
            </p>
          </section>
        </div>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Enquanto grava o Reels, o Sliqr cuida do carrossel</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>Carrosseis completos com IA em 45 segundos. Gratis para comecar.</p>
          <Link href="/cadastro" style={{display:'inline-block',background:'#2D6FFF',color:'#fff',borderRadius:'10px',padding:'0.85rem 2rem',fontWeight:700,fontSize:'0.95rem',boxShadow:'0 8px 24px rgba(45,111,255,0.3)'}}>
            Criar meu primeiro post gratis
          </Link>
        </div>
        <div style={{marginTop:'2rem',textAlign:'center' as const}}>
          <Link href="/blog" style={{color:'#4A5568',fontSize:'0.82rem'}}>Voltar para o blog</Link>
        </div>
      </main>
    </>
  )
}
