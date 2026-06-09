import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Planejamento de Conteudo para Instagram: Guia para Pequenos Negocios - Sliqr Blog',
  description: 'Como criar um planejamento de conteudo para Instagram que voce realmente consegue manter -- pratico, simples e sem enrolacao.',
  keywords: ['planejamento conteudo instagram','calendario editorial instagram','como planejar posts instagram','estrategia conteudo instagram'],
  openGraph: {
    title: 'Planejamento de Conteudo para Instagram: Guia para Pequenos Negocios',
    description: 'Um planejamento que voce realmente consegue manter.',
    url: 'https://sliqr.com.br/blog/planejamento-conteudo-instagram-pequenos-negocios',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}

export default function Post() {
  const pilares = [
    {n:'01',t:'Educativo (40%)',d:'Ensina algo relevante para seu publico. Gera autoridade, salvamentos e compartilhamentos. Ex: dicas, tutoriais, curiosidades do seu nicho.'},
    {n:'02',t:'Bastidores (30%)',d:'Mostra o processo, o dia a dia, a historia do negocio. Humaniza a marca e cria conexao emocional com os seguidores.'},
    {n:'03',t:'Prova Social (20%)',d:'Depoimentos, antes e depois, resultados de clientes. Reduz objecoes e gera confianca para quem ainda nao comprou.'},
    {n:'04',t:'Oferta (10%)',d:'Posts diretos de venda, promocao ou chamada para acao comercial. Pouco frequente para nao canshar o seguidor.'},
  ]

  const semana = [
    {dia:'Segunda',tipo:'Carrossel Educativo',ex:'5 dicas sobre o seu nicho'},
    {dia:'Quarta',tipo:'Bastidores ou Prova Social',ex:'Story do processo ou depoimento de cliente'},
    {dia:'Sexta',tipo:'Carrossel de Lista ou Oferta',ex:'Lista util ou post de servico/produto'},
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Planejamento de Conteudo para Instagram: Guia para Pequenos Negocios',
        'datePublished':'2025-06-10','dateModified':'2025-06-10',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/planejamento-conteudo-instagram-pequenos-negocios'
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
          <span style={{color:'#8B95A8'}}>Planejamento de Conteudo</span>
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(52,211,153,0.1)',border:'1px solid rgba(52,211,153,0.2)',color:'#34D399',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>PLANEJAMENTO</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>10 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>7 min de leitura</span>
        </div>
        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Planejamento de Conteudo para Instagram: Guia para Pequenos Negocios
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          A maioria dos empreendedores desiste do Instagram nao por falta de vontade -- mas por falta de sistema. Um planejamento simples resolve isso. Veja como montar o seu em menos de 30 minutos.
        </p>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Execute o planejamento em 45 segundos por post</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>O Sliqr cria o carrossel completo enquanto voce planeja o proximo.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Defina os 3 objetivos do seu Instagram</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem',marginBottom:'1rem'}}>
              Antes de criar qualquer conteudo, responda: para que voce usa o Instagram? As 3 respostas mais comuns para pequenos negocios sao: atrair novos clientes, fidelizar quem ja comprou, e construir autoridade no nicho. Seus posts devem servir a pelo menos um desses objetivos. Se nao servir, nao publique.
            </p>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Os 4 pilares de conteudo</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
              {pilares.map(({n,t,d}) => (
                <div key={n} style={{display:'flex',gap:'12px',alignItems:'flex-start',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'10px',padding:'0.85rem 1rem'}}>
                  <div style={{width:'36px',height:'36px',background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#2D6FFF',fontSize:'0.8rem'}}>{n}</div>
                  <div>
                    <div style={{fontWeight:700,marginBottom:'4px',fontSize:'0.92rem'}}>{t}</div>
                    <div style={{color:'#8B95A8',fontSize:'0.83rem',lineHeight:1.6}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>O modelo de semana que funciona</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
              {semana.map(({dia,tipo,ex}) => (
                <div key={dia} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'10px',padding:'0.85rem 1rem',display:'flex',gap:'16px',alignItems:'flex-start',flexWrap:'wrap' as const}}>
                  <div style={{minWidth:'80px',fontFamily:'JetBrains Mono,monospace',fontSize:'0.72rem',fontWeight:700,color:'#2D6FFF'}}>{dia}</div>
                  <div>
                    <div style={{fontWeight:600,fontSize:'0.88rem',marginBottom:'3px'}}>{tipo}</div>
                    <div style={{color:'#4A5568',fontSize:'0.8rem'}}>{ex}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>04 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Banco de ideias: como nunca ficar sem assunto</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Reserve 10 minutos por semana para anotar: perguntas que seus clientes fizeram, duvidas que aparecem no direct, comentarios que repetem nos posts, tendencias do seu nicho. Esse banco e sua materia-prima. Com 30 ideias salvas, voce tem conteudo para mais de 2 meses.
            </p>
          </section>
        </div>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Execute o planejamento em segundos</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>Com o Sliqr, cada ideia do banco vira um carrossel completo em 45 segundos. Gratis para comecar.</p>
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
