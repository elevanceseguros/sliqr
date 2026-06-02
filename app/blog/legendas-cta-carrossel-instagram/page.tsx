import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legendas e CTAs para Carrossel: Como Fazer Seu Publico Agir - Sliqr Blog',
  description: 'Templates prontos de legenda e CTA para carrossel no Instagram que geram salvamentos, comentarios e cliques.',
  keywords: ['legenda carrossel instagram','cta instagram','como escrever legenda instagram','templates legenda instagram'],
  openGraph: {
    title: 'Legendas e CTAs para Carrossel: Como Fazer Seu Publico Agir',
    description: 'Templates prontos de legenda e CTA que convertem.',
    url: 'https://sliqr.com.br/blog/legendas-cta-carrossel-instagram',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV_STYLE = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO_BOX = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}
const BTN_CTA = {background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.55rem 1.25rem',fontSize:'0.85rem',fontWeight:600}
const MAIN_STYLE = {paddingTop:'64px',maxWidth:'720px',margin:'0 auto',padding:'64px 1.5rem 4rem'}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Legendas e CTAs para Carrossel: Como Fazer Seu Publico Agir',
        'datePublished':'2025-06-06','dateModified':'2025-06-06',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/legendas-cta-carrossel-instagram'
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
        <Link href="/cadastro" style={BTN_CTA}>Criar gratis</Link>
      </nav>

      <main style={MAIN_STYLE}>
        <nav style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'2rem',marginTop:'2rem',fontSize:'0.78rem',color:'#4A5568'}}>
          <Link href="/landing">Inicio</Link><span>-&gt;</span><Link href="/blog">Blog</Link><span>-&gt;</span>
          <span style={{color:'#8B95A8'}}>Legendas e CTAs</span>
        </nav>

        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(192,132,252,0.1)',border:'1px solid rgba(192,132,252,0.2)',color:'#C084FC',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>COPYWRITING</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>06 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>5 min de leitura</span>
        </div>

        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Legendas e CTAs para Carrossel: Como Fazer Seu Publico Agir
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          A legenda e onde a maioria dos empreendedores desperdicam a oportunidade. Voce criou um otimo carrossel -- mas sem um CTA claro, o seguidor vai embora sem fazer nada.
        </p>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>O Sliqr gera a legenda automaticamente</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>Com hashtags e CTA incluidos. Gratis para comecar.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>

        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Por que a legenda importa tanto</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              O Instagram mostra a legenda logo abaixo do carrossel. Ela e a segunda chance de converter quem parou no seu post. Uma boa legenda aumenta comentarios (o que o algoritmo adora), gera cliques no link da bio e cria conexao com o leitor. Uma legenda ruim -- ou inexistente -- joga fora todo o trabalho do carrossel.
            </p>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>A estrutura que funciona</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
              {[
                {n:'01',t:'Gancho (1a linha)',d:'E o que aparece antes do "ver mais". Precisa gerar curiosidade. Ex: "Isso vai mudar como voce posta no Instagram."'},
                {n:'02',t:'Desenvolvimento (2-4 linhas)',d:'Complementa o conteudo do carrossel ou adiciona contexto. Nao repita os slides.'},
                {n:'03',t:'CTA (ultima linha)',d:'Uma acao clara e unica. Salva, comenta, manda direct, clica no link. So uma.'},
              ].map(({n,t,d}) => (
                <div key={n} style={{display:'flex',gap:'12px',alignItems:'flex-start',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'10px',padding:'0.85rem 1rem'}}>
                  <div style={{width:'36px',height:'36px',background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#2D6FFF',fontSize:'0.8rem'}}>{n}</div>
                  <div>
                    <div style={{fontWeight:600,fontSize:'0.88rem',marginBottom:'3px'}}>{t}</div>
                    <div style={{color:'#8B95A8',fontSize:'0.83rem',lineHeight:1.6}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Templates prontos por objetivo</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
              {[
                {icone:'Salvamento',txt:'Salva esse post para nao perder quando precisar. | Guarda aqui para usar essa semana.'},
                {icone:'Comentario',txt:'Qual dessas dicas voce ja usa? Comenta abaixo com um numero. | Me conta nos comentarios: voce ja passou por isso?'},
                {icone:'Direct',txt:'Quer saber como aplicar isso no seu negocio? Me manda uma mensagem. | Manda um DM com a palavra X e te envio mais detalhes.'},
                {icone:'Link na bio',txt:'Link na bio para fazer agora. | Acessa sliqr.com.br e cria o seu gratis.'},
                {icone:'Compartilhamento',txt:'Marca aquele amigo empreendedor que precisa ver isso. | Compartilha nos seus Stories se foi util.'},
              ].map(({icone,txt}) => (
                <div key={icone} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'10px',padding:'0.85rem 1rem'}}>
                  <div style={{fontWeight:700,fontSize:'0.78rem',color:'#2D6FFF',marginBottom:'6px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>{icone.toUpperCase()}</div>
                  <div style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.6}}>{txt}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>04 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Hashtags: como usar sem parecer spam</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Use de 5 a 10 hashtags relevantes -- nao 30. Misture hashtags grandes (500k+ posts), medias (50k-500k) e pequenas (ate 50k). As pequenas tem menos concorrencia e alcancam publico mais especifico. Exemplos para empreendedor: #empreendedorismo #mei #pequenoempreendedor #marketingdigital #instagramparanegocio.
            </p>
          </section>

        </div>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Coloca em pratica agora</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>O Sliqr gera legenda com hashtags e CTA automaticamente. Gratis para comecar.</p>
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
