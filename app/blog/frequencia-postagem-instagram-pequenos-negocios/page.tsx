import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quantas Vezes por Semana Postar no Instagram? A Resposta Definitiva - Sliqr Blog',
  description: 'A frequencia ideal de postagem para pequenos negocios no Instagram e como manter consistencia sem enlouquecer.',
  keywords: ['frequencia postagem instagram','quantas vezes postar instagram','consistencia instagram','algoritmo instagram 2025'],
  openGraph: {
    title: 'Quantas Vezes por Semana Postar no Instagram?',
    description: 'A frequencia ideal para pequenos negocios no Instagram.',
    url: 'https://sliqr.com.br/blog/frequencia-postagem-instagram-pequenos-negocios',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV_STYLE = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO_BOX = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}

export default function Post() {
  const formatos = [
    {n:'Feed',freq:'3-4 posts por semana',d:'2 carrosseis + 1-2 fotos ou Reels. O carrossel e o formato com maior taxa de salvamento -- priorize.'},
    {n:'Stories',freq:'1-3 por dia',d:'Pode ser simples: bastidor, produto, pergunta, curtida. Stories mantem voce na cabeca do seguidor.'},
    {n:'Reels',freq:'1-2 por semana',d:'Alto potencial de alcance para novos seguidores. Mas exige mais producao.'},
  ]

  const horarios = [
    'Terca a quinta: melhores dias para negocios e servicos',
    'Manha 8h-9h: antes do trabalho -- alto engajamento',
    'Almoco 12h-13h: pausa -- pessoa no celular',
    'Noite 19h-21h: apos o trabalho -- pico de uso',
    'Sabado de manha: funciona bem para alimentacao, beleza e lazer',
    'Domingo: menor alcance -- evite para conteudo importante',
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Quantas Vezes por Semana Postar no Instagram? A Resposta Definitiva',
        'datePublished':'2025-06-07','dateModified':'2025-06-07',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/frequencia-postagem-instagram-pequenos-negocios'
      })}}/>
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Sora',sans-serif;background:#080B12;color:#F0F4FF;-webkit-font-smoothing:antialiased}
        a{color:inherit;text-decoration:none}
      `}}/>

      <nav style={NAV_STYLE}>
        <Link href="/landing" style={{display:'flex',alignItems:'center',gap:'9px',fontWeight:800,fontSize:'1.3rem',letterSpacing:'-0.04em'}}>
          <div style={LOGO_BOX}><svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg></div>
          Sliqr
        </Link>
        <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.55rem 1.25rem',fontSize:'0.85rem',fontWeight:600}}>Criar gratis</Link>
      </nav>

      <main style={{paddingTop:'64px',maxWidth:'720px',margin:'0 auto',padding:'64px 1.5rem 4rem'}}>
        <nav style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'2rem',marginTop:'2rem',fontSize:'0.78rem',color:'#4A5568'}}>
          <Link href="/landing">Inicio</Link><span>-&gt;</span><Link href="/blog">Blog</Link><span>-&gt;</span>
          <span style={{color:'#8B95A8'}}>Frequencia de Postagem</span>
        </nav>

        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)',color:'#F59E0B',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>ESTRATEGIA</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>07 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>6 min de leitura</span>
        </div>

        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Quantas Vezes por Semana Postar no Instagram? A Resposta Definitiva
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          A resposta nao e "quanto mais, melhor". E sobre consistencia. E a frequencia certa depende de quanto tempo voce tem -- nao de uma regra universal.
        </p>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Mantenha consistencia sem perder tempo</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>O Sliqr cria um carrossel completo em 45 segundos.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>

        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>O que o algoritmo realmente valoriza</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              O Instagram nao recompensa quem posta mais -- recompensa quem gera engajamento consistente. Um post com 200 comentarios publicado 2x por semana bate um post com 10 comentarios publicado todos os dias. O algoritmo olha para taxa de engajamento, nao volume de posts.
            </p>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>A frequencia minima viavel por formato</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'12px'}}>
              {formatos.map(({n,freq,d}) => (
                <div key={n} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'1.25rem'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem',flexWrap:'wrap' as const,gap:'6px'}}>
                    <div style={{fontWeight:700,fontSize:'0.95rem'}}>{n}</div>
                    <div style={{background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',color:'#6B9FFF',fontSize:'0.72rem',fontWeight:600,padding:'3px 10px',borderRadius:'100px'}}>{freq}</div>
                  </div>
                  <p style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.65}}>{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>A regra do dia de criacao</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              O maior erro de consistencia nao e falta de vontade -- e falta de sistema. Defina um dia fixo por semana (ex: segunda-feira de manha) para criar todo o conteudo da semana de uma vez. Em 1-2 horas voce cria 3-4 posts. Com o Sliqr, cada carrossel sai em 45 segundos -- entao essa hora vira 20 minutos.
            </p>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>04 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Quando postar para mais alcance</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'8px'}}>
              {horarios.map((h,i) => (
                <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'0.65rem 0.85rem',background:'rgba(255,255,255,0.03)',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.05)'}}>
                  <span style={{color:'#2D6FFF',fontSize:'0.8rem',flexShrink:0,marginTop:'1px'}}>-&gt;</span>
                  <span style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.6}}>{h}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>05 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Como nao perder consistencia</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Tenha um banco de ideias. Toda semana anote 5 assuntos que seus clientes perguntam. Quando chegar o dia de criacao, voce ja sabe o que criar. Use ferramentas de agendamento como o Meta Business Suite (gratuito) para postar automaticamente no horario certo sem precisar estar no celular.
            </p>
          </section>

        </div>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Crie seu conteudo da semana em minutos</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>O Sliqr cria carrosseis com IA em 45 segundos. Gratis para comecar.</p>
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
