import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Como Crescer no Instagram Organicamente em 2025 - Sliqr Blog',
  description: 'Estrategias reais para crescer no Instagram sem pagar por anuncios -- focadas em pequenos empreendedores brasileiros.',
  keywords: ['crescer instagram organicamente','crescimento instagram 2025','instagram sem anuncio','aumentar seguidores instagram'],
  openGraph: {
    title: 'Como Crescer no Instagram Organicamente em 2025',
    description: 'Estrategias reais para crescer sem pagar por anuncios.',
    url: 'https://sliqr.com.br/blog/como-crescer-instagram-organicamente-2025',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}

export default function Post() {
  const acoes = [
    {n:'01',t:'Otimize o perfil para conversao',d:'Nome com palavras-chave que seu cliente pesquisa. Bio com o que voce faz, para quem e onde. Link na bio funcionando. Foto de perfil profissional. Isso nao e estetica -- e SEO do Instagram.'},
    {n:'02',t:'Publique carrosseis toda semana',d:'Carrosseis tem a maior taxa de salvamento -- o sinal mais forte que o algoritmo usa para ampliar alcance. Um carrossel salvo por 50 pessoas vale mais que 500 curtidas em uma foto.'},
    {n:'03',t:'Responda todos os comentarios nas primeiras horas',d:'O algoritmo mede atividade nas primeiras 1-3 horas apos a publicacao. Cada resposta sua gera uma notificacao para quem comentou -- que muitas vezes volta e comenta de novo.'},
    {n:'04',t:'Use Stories diariamente',d:'Stories mantem voce no topo da lista dos seguidores. Use enquetes, perguntas e caixas de resposta -- interacoes em Stories aumentam o alcance dos posts no feed.'},
    {n:'05',t:'Colabore com outros perfis do nicho',d:'Posts colaborativos (Collab) aparecem no feed dos dois perfis. Escolha parceiros com publico complementar -- nao concorrentes diretos, mas quem atende a mesma pessoa por outros angulos.'},
    {n:'06',t:'Consista por pelo menos 90 dias',d:'O algoritmo leva tempo para entender e distribuir seu conteudo. A maioria desiste nos primeiros 30 dias, exatamente quando o crescimento ainda e lento. Quem chega aos 90 dias ja ve os resultados compostos.'},
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Como Crescer no Instagram Organicamente em 2025',
        'datePublished':'2025-06-11','dateModified':'2025-06-11',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/como-crescer-instagram-organicamente-2025'
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
          <span style={{color:'#8B95A8'}}>Crescimento Organico</span>
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',color:'#6B9FFF',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>CRESCIMENTO</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>11 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>7 min de leitura</span>
        </div>
        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Como Crescer no Instagram Organicamente em 2025
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Crescimento organico nao e rapido. Mas e o mais solido. Seguidores que chegam por conteudo de qualidade compram mais, indicam mais e ficam mais tempo. Veja o que realmente funciona em 2025.
        </p>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Mantenha a consistencia com IA</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>O Sliqr cria um carrossel em 45 segundos. Gratis para comecar.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column' as const,gap:'12px'}}>
          {acoes.map(({n,t,d}) => (
            <div key={n} style={{display:'flex',gap:'14px',alignItems:'flex-start',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'1.25rem'}}>
              <div style={{width:'36px',height:'36px',background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#2D6FFF',fontSize:'0.8rem'}}>{n}</div>
              <div>
                <div style={{fontWeight:700,marginBottom:'4px',fontSize:'0.95rem'}}>{t}</div>
                <div style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.65}}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Comece a crescer hoje</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>Consistencia e a chave. O Sliqr torna isso facil -- carrosseis completos em 45 segundos. Gratis.</p>
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
