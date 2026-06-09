import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Como Escrever uma Bio do Instagram que Converte Visitantes em Seguidores - Sliqr Blog',
  description: 'A bio do Instagram e a primeira impressao. Aprenda a escrever uma bio profissional que converte visitantes em seguidores e clientes.',
  keywords: ['bio instagram profissional','como escrever bio instagram','bio instagram negocio','perfil instagram otimizado'],
  openGraph: {
    title: 'Como Escrever uma Bio do Instagram que Converte',
    description: 'Bio profissional que transforma visitas em seguidores.',
    url: 'https://sliqr.com.br/blog/como-escrever-bio-instagram-profissional',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}

export default function Post() {
  const elementos = [
    {n:'01',t:'Nome com palavra-chave',d:'O campo "Nome" e indexado pelo buscador do Instagram. Coloque o que seu cliente pesquisa, nao so seu nome. Ex: "Ana Lima | Nutricionista SP" ou "Clinica Bem Estar | Estetica BH".'},
    {n:'02',t:'O que voce faz em uma linha',d:'Seja direto. "Ajudo mulheres a emagrecer sem dieta restritiva." Ou "Carrosseis para Instagram com IA em 45 segundos." O visitante precisa entender em 3 segundos se voce e relevante para ele.'},
    {n:'03',t:'Para quem voce atende',d:'Especificar o publico aumenta a conversao. "Para maes que querem voltar a trabalhar" converte mais que "para todos". Nichar a bio nao afasta -- qualifica.'},
    {n:'04',t:'Uma prova social ou diferencial',d:'Ex: "+500 clientes atendidos", "10 anos de experiencia", "unico certificado em X na cidade". Uma linha. So uma.'},
    {n:'05',t:'CTA com link funcionando',d:'Diga exatamente o que fazer: "Agendamento pelo link abaixo", "Fale comigo no WhatsApp", "Crie seu carrossel gratis". Sem CTA, o visitante nao age.'},
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Como Escrever uma Bio do Instagram que Converte Visitantes em Seguidores',
        'datePublished':'2025-06-14','dateModified':'2025-06-14',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/como-escrever-bio-instagram-profissional'
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
          <span style={{color:'#8B95A8'}}>Bio do Instagram</span>
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(192,132,252,0.1)',border:'1px solid rgba(192,132,252,0.2)',color:'#C084FC',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>PERFIL</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>14 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>5 min de leitura</span>
        </div>
        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Como Escrever uma Bio do Instagram que Converte
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Voce tem 150 caracteres e menos de 3 segundos. A bio e o cartao de visita do seu perfil. Se ela nao convencer o visitante a seguir, nem o melhor carrossel do mundo resolve.
        </p>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Otimize a bio e crie o conteudo junto</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>O Sliqr gera carrosseis que reforcem sua bio. Gratis para comecar.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Os 5 elementos de uma bio que converte</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'12px'}}>
              {elementos.map(({n,t,d}) => (
                <div key={n} style={{display:'flex',gap:'14px',alignItems:'flex-start',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'1.25rem'}}>
                  <div style={{width:'36px',height:'36px',background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#2D6FFF',fontSize:'0.8rem'}}>{n}</div>
                  <div>
                    <div style={{fontWeight:700,marginBottom:'4px',fontSize:'0.95rem'}}>{t}</div>
                    <div style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.65}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Exemplo de bio antes e depois</h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              <div style={{background:'rgba(252,129,129,0.05)',border:'1px solid rgba(252,129,129,0.15)',borderRadius:'10px',padding:'1rem'}}>
                <div style={{fontSize:'0.65rem',color:'#FC8181',fontFamily:'JetBrains Mono,monospace',marginBottom:'8px',letterSpacing:'0.06em'}}>ANTES</div>
                <div style={{color:'#8B95A8',fontSize:'0.82rem',lineHeight:1.6}}>
                  Nutricionista | CRN 12345<br/>
                  Consultorio na Av. Paulista<br/>
                  Agende sua consulta<br/>
                  linktr.ee/ananutri
                </div>
              </div>
              <div style={{background:'rgba(52,211,153,0.05)',border:'1px solid rgba(52,211,153,0.15)',borderRadius:'10px',padding:'1rem'}}>
                <div style={{fontSize:'0.65rem',color:'#34D399',fontFamily:'JetBrains Mono,monospace',marginBottom:'8px',letterSpacing:'0.06em'}}>DEPOIS</div>
                <div style={{color:'#8B95A8',fontSize:'0.82rem',lineHeight:1.6}}>
                  Ana Lima | Nutricionista SP<br/>
                  Emagreca sem dieta restritiva<br/>
                  Para mulheres 30-50 anos<br/>
                  +300 pacientes atendidas<br/>
                  Consulta online: link abaixo
                </div>
              </div>
            </div>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Depois da bio: o conteudo precisa entregar o que prometeu</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Uma bio otimizada atrai o clique. O conteudo converte o visitante em seguidor -- e depois em cliente. Se a bio diz que voce ensina sobre nutricao, os posts precisam ensinar sobre nutricao. Consistencia entre bio e conteudo e o que cria confianca de longo prazo.
            </p>
          </section>
        </div>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Bio otimizada + conteudo com IA</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>Com o Sliqr, voce cria carrosseis que entregam o que a bio promete -- em 45 segundos. Gratis.</p>
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
