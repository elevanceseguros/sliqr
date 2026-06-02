import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Como Criar Carrosseis para Instagram que Realmente Vendem - Sliqr Blog',
  description: 'A estrutura exata de carrossel que transforma seguidores em clientes -- com exemplos praticos para qualquer nicho.',
  keywords: ['como criar carrossel instagram','carrossel que vende','estrutura carrossel instagram','carrossel para vender'],
  openGraph: {
    title: 'Como Criar Carrosseis para Instagram que Realmente Vendem',
    description: 'A estrutura certa para carrosseis que convertem seguidores em clientes.',
    url: 'https://sliqr.com.br/blog/como-criar-carrossel-instagram-que-vende',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV_STYLE = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO_BOX = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}

export default function Post() {
  const slides = [
    {n:'Slide 1',t:'Gancho -- para o dedo',d:'Uma promessa, uma dor ou uma afirmacao que o publico reconhece. Ex: "Por que voce perde vendas sem perceber" ou "O erro que 9 em 10 empreendedores cometem no Instagram".'},
    {n:'Slide 2',t:'Contexto -- o problema',d:'Expande o gancho. Mostra que o leitor nao esta sozinho nesse problema. Gera identificacao.'},
    {n:'Slides 3-4',t:'Solucao -- o conteudo de valor',d:'A carne do post. Dicas, passos ou revelacoes. Cada slide: uma ideia. Maximo 3 linhas de texto.'},
    {n:'Slide 5',t:'CTA -- a acao',d:'O momento da venda ou conversao. "Me chama no direct", "Link na bio", "Salva para usar", "Comenta X". Uma acao. So uma.'},
  ]

  const tipos = [
    {n:'01',t:'Carrossel Educativo',d:'Ensina algo util. Ex: "5 formas de usar o produto X". Gera autoridade e salvamentos. E o que mais converte em seguidores fieis.'},
    {n:'02',t:'Carrossel de Transformacao',d:'Antes e depois, problema e solucao. Ex: "Como minha cliente foi de X para Y". Gera prova social e desejo.'},
    {n:'03',t:'Carrossel de Lista',d:'"Os 7 erros que...", "5 dicas para...". Facil de consumir, facil de salvar. Funciona para qualquer nicho.'},
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Como Criar Carrosseis para Instagram que Realmente Vendem',
        'datePublished':'2025-06-08','dateModified':'2025-06-08',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/como-criar-carrossel-instagram-que-vende'
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
          <span style={{color:'#8B95A8'}}>Carrossel que Vende</span>
        </nav>

        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',color:'#6B9FFF',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>CARROSSEL</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>08 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>7 min de leitura</span>
        </div>

        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Como Criar Carrosseis para Instagram que Realmente Vendem
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Nao e sobre ter o melhor design. E sobre ter a estrutura certa. Carrosseis que vendem seguem um padrao -- e voce pode replicar isso hoje mesmo.
        </p>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Crie carrosseis com essa estrutura em 45s</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>O Sliqr usa IA para gerar a estrutura certa automaticamente.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>

        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Por que o carrossel e o melhor formato para vender</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              O carrossel tem a maior taxa de salvamento do Instagram -- ate 3x mais que fotos unicas. Quando alguem salva, o algoritmo entende que o conteudo e valioso e aumenta o alcance. Alem disso, cada slide e uma chance de aprofundar o argumento de compra. E como uma mini landing page dentro do feed.
            </p>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>A estrutura dos 5 slides que converte</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'12px'}}>
              {slides.map(({n,t,d}) => (
                <div key={n} style={{display:'flex',gap:'14px',alignItems:'flex-start',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'1.25rem'}}>
                  <div style={{minWidth:'80px',background:'rgba(45,111,255,0.08)',border:'1px solid rgba(45,111,255,0.15)',borderRadius:'8px',padding:'4px 8px',textAlign:'center' as const,fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',fontWeight:700,color:'#2D6FFF',flexShrink:0}}>{n}</div>
                  <div>
                    <div style={{fontWeight:700,marginBottom:'4px',fontSize:'0.95rem'}}>{t}</div>
                    <div style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.65}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Os 3 tipos de carrossel que mais vendem</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'12px'}}>
              {tipos.map(({n,t,d}) => (
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
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>04 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Design: o minimo que voce precisa saber</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Nao precisa ser designer. Precisa de: 1 cor principal consistente em todos os slides, 1 fonte legivel, contraste alto entre fundo e texto, e espaco em branco -- nao encha o slide. O Sliqr cuida de tudo isso automaticamente: voce escolhe a cor e a IA mantem o padrao visual.
            </p>
          </section>

          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>05 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Coloque em pratica agora</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Escolha um dos 3 formatos acima. Pense em uma duvida que seus clientes tem com frequencia. Esse e o tema do seu proximo carrossel. Se tiver 45 segundos, cole esse tema no Sliqr e a IA cria os slides, as imagens e a legenda por voce.
            </p>
          </section>

        </div>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Crie seu carrossel que vende agora</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>O Sliqr usa IA para gerar a estrutura certa automaticamente. Gratis para comecar.</p>
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
