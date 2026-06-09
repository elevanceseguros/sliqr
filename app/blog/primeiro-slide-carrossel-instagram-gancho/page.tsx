import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Como Criar o Primeiro Slide do Carrossel que Para o Dedo - Sliqr Blog',
  description: 'O primeiro slide define tudo. Aprenda a criar ganchos irresistiveis que fazem o seguidor parar de rolar o feed e clicar no seu carrossel.',
  keywords: ['primeiro slide carrossel','gancho instagram','como parar o dedo instagram','cover carrossel instagram'],
  openGraph: {
    title: 'Como Criar o Primeiro Slide do Carrossel que Para o Dedo',
    description: 'Ganchos irresistiveis para o primeiro slide do carrossel.',
    url: 'https://sliqr.com.br/blog/primeiro-slide-carrossel-instagram-gancho',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}

export default function Post() {
  const formulas = [
    {n:'01',formula:'Numero + Promessa',exemplos:['5 erros que te fazem perder clientes','7 dicas para vender mais sem gastar nada','3 coisas que todo empreendedor precisa saber']},
    {n:'02',formula:'Pergunta que Doa',exemplos:['Por que seu concorrente vende mais que voce?','Voce ainda usa essa estrategia ultrapassada?','Sabe quanto voce esta perdendo por nao postar?']},
    {n:'03',formula:'Afirmacao Controversa',exemplos:['Postar todos os dias esta destruindo seu alcance','Seguidor nao e cliente. Pare de contar curtidas','O Canva esta te fazendo perder 2 horas por semana']},
    {n:'04',formula:'Revelacao Exclusiva',exemplos:['O algoritmo mudou e quase ninguem sabe','Descobri como dobrar o alcance sem anuncio','O segredo que grandes marcas usam no carrossel']},
    {n:'05',formula:'Dor Especifica',exemplos:['Cansado de postar e nao ter retorno?','Abre o Instagram e nao sabe o que postar?','Perde horas no Canva para um post que ninguem ve?']},
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Como Criar o Primeiro Slide do Carrossel que Para o Dedo',
        'datePublished':'2025-06-12','dateModified':'2025-06-12',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/primeiro-slide-carrossel-instagram-gancho'
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
          <span style={{color:'#8B95A8'}}>Primeiro Slide</span>
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',color:'#6B9FFF',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>CARROSSEL</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>12 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>6 min de leitura</span>
        </div>
        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Como Criar o Primeiro Slide do Carrossel que Para o Dedo
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Voce tem 1.7 segundo para capturar a atencao de quem esta rolando o feed. O primeiro slide e a unica chance. Se ele nao parar o dedo, o carrossel nao existe.
        </p>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>O Sliqr cria o gancho automaticamente</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>A IA gera o primeiro slide com gancho baseado no seu tema.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>O que torna um gancho irresistivel</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Um bom gancho faz uma coisa: desperta curiosidade ou dor. Curiosidade faz a pessoa querer saber o que vem depois. Dor faz ela reconhecer que o conteudo e sobre ela. Os melhores ganchos fazem as duas coisas ao mesmo tempo.
            </p>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>5 formulas com exemplos prontos</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'14px'}}>
              {formulas.map(({n,formula,exemplos}) => (
                <div key={n} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'1.25rem'}}>
                  <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'0.75rem'}}>
                    <div style={{width:'28px',height:'28px',background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#2D6FFF',fontSize:'0.72rem'}}>{n}</div>
                    <div style={{fontWeight:700,fontSize:'0.92rem'}}>{formula}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column' as const,gap:'6px'}}>
                    {exemplos.map((e,i) => (
                      <div key={i} style={{fontFamily:'JetBrains Mono,monospace',color:'#4A5568',fontSize:'0.75rem',padding:'0.5rem 0.75rem',background:'rgba(45,111,255,0.04)',borderRadius:'6px',borderLeft:'2px solid rgba(45,111,255,0.2)'}}>
                        &quot;{e}&quot;
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>O que evitar no primeiro slide</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'8px'}}>
              {['Nome da empresa como unico elemento -- o seguidor nao esta la para ver logo','Foto do produto sem contexto -- produto sozinho nao gera curiosidade','Texto longo demais -- maximo 8 palavras no gancho','Fonte pequena -- tem que ser legivel em tela de celular sem zoom','Muito design, pouco texto -- design bonito nao substitui gancho forte'].map((item,i) => (
                <div key={i} style={{display:'flex',gap:'10px',padding:'0.65rem 0.85rem',background:'rgba(252,129,129,0.04)',borderRadius:'8px',border:'1px solid rgba(252,129,129,0.1)'}}>
                  <span style={{color:'#FC8181',flexShrink:0,fontSize:'0.8rem'}}>X</span>
                  <span style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.5}}>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Crie seu gancho com IA agora</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>O Sliqr gera o primeiro slide com gancho automaticamente. Gratis para comecar.</p>
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
