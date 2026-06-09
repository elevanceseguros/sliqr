import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Como Usar Carrossel para Gerar Leads no Instagram - Sliqr Blog',
  description: 'Aprenda a transformar carrosseis em maquina de captacao de leads no Instagram -- com estrategias praticas para qualquer nicho.',
  keywords: ['carrossel para leads instagram','gerar leads instagram','captacao clientes instagram','instagram para vendas'],
  openGraph: {
    title: 'Como Usar Carrossel para Gerar Leads no Instagram',
    description: 'Transforme carrosseis em maquina de captacao de clientes.',
    url: 'https://sliqr.com.br/blog/como-usar-carrossel-para-gerar-leads-instagram',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}
const MAIN = {paddingTop:'64px',maxWidth:'720px',margin:'0 auto',padding:'64px 1.5rem 4rem'}

export default function Post() {
  const estrategias = [
    {n:'01',t:'Carrossel Isca Digital',d:'Ofereca algo de valor gratuito no ultimo slide em troca do contato. Ex: "Quer o checklist completo? Me manda um direct com a palavra CHECKLIST." Funciona para qualquer nicho.'},
    {n:'02',t:'Carrossel de Diagnostico',d:'Crie um carrossel com perguntas ou sintomas. Ex: "Voce tem esses 5 sinais? Pode ser X." No CTA: "Manda direct para entender melhor o seu caso." Atrai leads qualificados que ja reconhecem o problema.'},
    {n:'03',t:'Carrossel de Antes e Depois',d:'Mostre a transformacao de um cliente real (com permissao). No ultimo slide: "Quer esse resultado? Manda uma mensagem." Leads que chegam assim ja confiam no seu trabalho.'},
    {n:'04',t:'Carrossel com Oferta Limitada',d:'Use urgencia real -- nao falsa. Ex: "Tenho 3 vagas abertas para o mes de junho." No CTA: "Comenta QUERO ou manda direct." Cria movimento e prova social nos comentarios.'},
    {n:'05',t:'Carrossel Educativo com Upgrade',d:'Ensina 3 de 7 dicas. No ultimo slide: "Quer as outras 4? Manda direct com a palavra DICAS." Quem pede ja e um lead quente -- demonstrou interesse no conteudo.'},
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Como Usar Carrossel para Gerar Leads no Instagram',
        'datePublished':'2025-06-09','dateModified':'2025-06-09',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/como-usar-carrossel-para-gerar-leads-instagram'
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
      <main style={MAIN}>
        <nav style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'2rem',marginTop:'2rem',fontSize:'0.78rem',color:'#4A5568'}}>
          <Link href="/landing">Inicio</Link><span>-&gt;</span><Link href="/blog">Blog</Link><span>-&gt;</span>
          <span style={{color:'#8B95A8'}}>Leads com Carrossel</span>
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',color:'#6B9FFF',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>ESTRATEGIA</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>09 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>6 min de leitura</span>
        </div>
        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Como Usar Carrossel para Gerar Leads no Instagram
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Curtida nao paga conta. Seguidor nao paga conta. O que paga e cliente. E o carrossel e o formato mais eficiente do Instagram para transformar visualizacoes em contatos qualificados.
        </p>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Crie carrosseis que captam leads em 45s</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>O Sliqr gera o conteudo e o CTA automaticamente. Gratis.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Por que o carrossel gera mais leads que outros formatos</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              O carrossel mantem a pessoa engajada por mais tempo -- ela desliza slide a slide, aprofundando o interesse. Quando chega ao ultimo slide, ja leu o conteudo, ja confia mais, ja esta mais propensa a agir. E exatamente esse momento que voce usa para pedir o contato.
            </p>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>5 estrategias que funcionam</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'12px'}}>
              {estrategias.map(({n,t,d}) => (
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
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>O que fazer com o lead depois</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Responda no direct em menos de 1 hora -- quanto mais rapido, mais quente o lead. Tenha um roteiro simples: cumprimentar, entender a situacao, apresentar a solucao, fazer a oferta. Nao tente vender tudo no primeiro direct. Construa confianca primeiro, venda depois.
            </p>
          </section>
        </div>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Crie seu carrossel de captacao agora</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>O Sliqr gera carrosseis completos com IA em 45 segundos. Gratis para comecar.</p>
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
