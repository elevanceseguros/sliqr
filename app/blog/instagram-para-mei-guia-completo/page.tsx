import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instagram para MEI: Guia Completo para Vender Mais em 2025 — Sliqr Blog',
  description: 'Tudo que um MEI precisa saber para usar o Instagram como canal de vendas — do perfil à estratégia de conteúdo.',
  keywords: ['instagram para mei','mei instagram','vender pelo instagram','pequeno negocio instagram','como usar instagram para vender'],
  openGraph: {
    title: 'Instagram para MEI: Guia Completo para Vender Mais em 2025',
    description: 'Do perfil à estratégia de conteúdo para MEI no Instagram.',
    url: 'https://sliqr.com.br/blog/instagram-para-mei-guia-completo',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org","@type":"Article",
        "headline":"Instagram para MEI: Guia Completo para Vender Mais em 2025",
        "datePublished":"2025-06-04","dateModified":"2025-06-04",
        "author":{"@type":"Organization","name":"Sliqr"},
        "publisher":{"@type":"Organization","name":"Sliqr","url":"https://sliqr.com.br"},
        "mainEntityOfPage":"https://sliqr.com.br/blog/instagram-para-mei-guia-completo"
      })}}/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Sora',sans-serif;background:#080B12;color:#F0F4FF;-webkit-font-smoothing:antialiased}
        a{color:inherit;text-decoration:none}
      `}</style>

      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <Link href="/landing" style={{display:'flex',alignItems:'center',gap:'9px',fontWeight:800,fontSize:'1.3rem',letterSpacing:'-0.04em'}}>
          <div style={{width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          Sliqr
        </Link>
        <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.55rem 1.25rem',fontSize:'0.85rem',fontWeight:600}}>Criar grátis</Link>
      </nav>

      <main style={{paddingTop:'64px',maxWidth:'720px',margin:'0 auto',padding:'64px 1.5rem 4rem'}}>
        <nav style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'2rem',marginTop:'2rem',fontSize:'0.78rem',color:'#4A5568'}}>
          <Link href="/landing">Início</Link><span>→</span>
          <Link href="/blog">Blog</Link><span>→</span>
          <span style={{color:'#8B95A8'}}>Instagram para MEI</span>
        </nav>

        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap'}}>
          <span style={{background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',color:'#6B9FFF',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>MEI</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>04 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>9 min de leitura</span>
        </div>

        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Instagram para MEI: Guia Completo para Vender Mais em 2025
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Mais de 22 milhões de MEIs no Brasil. A maioria tem Instagram. Poucos usam direito. Este guia vai te mostrar exatamente o que fazer — do zero.
        </p>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Crie conteúdo para seu MEI em 45 segundos</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>Sem designer, sem Canva. Grátis para começar.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap'}}>Criar grátis →</Link>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'2.5rem'}}>
          {[
            {n:'01', t:'Por que o Instagram é o canal certo para MEI',
              c:`O Instagram tem mais de 113 milhões de usuários no Brasil — e a maioria deles descobre negócios locais pela plataforma antes de qualquer outra. Para MEI, não existe canal mais acessível: sem custo de entrada, alcance orgânico ainda possível e formato visual que funciona para qualquer segmento. Seja nutricionista, manicure, marceneiro ou doceira — o Instagram é onde seu cliente está.`},
            {n:'02', t:'Perfil profissional: o básico que muita gente erra',
              c:`Troque para conta profissional (gratuito). Coloque o nome do negócio no campo "Nome" — não só seu nome pessoal. Bio: o que você faz, para quem e onde. Máximo 3 linhas. Link na bio: leve para o WhatsApp, cardápio, site ou agendamento. Foto de perfil: logo ou foto profissional com fundo claro. Não use selfie de cotidiano.`},
            {n:'03', t:'Que tipo de conteúdo postar',
              c:`MEIs que mais crescem no Instagram combinam 3 tipos de conteúdo: Educativo (ensina algo relevante para seu público), Bastidores (mostra o processo, o dia a dia, a humanização) e Prova social (depoimentos, antes/depois, resultados de clientes). Carrosséis educativos são o formato com maior taxa de salvamento — o que sinaliza qualidade para o algoritmo.`},
            {n:'04', t:'Frequência ideal para MEI',
              c:`Não precisa postar todo dia. Consistência é mais importante que volume. Para MEI, o mínimo viável é: 3 posts por semana no feed (2 carrosséis + 1 Reels ou foto). 1-2 Stories por dia (pode ser simples: bastidor, pergunta, produto do dia). O segredo é ter um dia fixo para criar o conteúdo da semana — e ferramentas de IA para fazer isso rápido.`},
            {n:'05', t:'Como transformar seguidores em clientes',
              c:`Seguidores não pagam conta. O objetivo final é sempre converter. Faça isso com CTAs claros no último slide do carrossel, link do WhatsApp na bio, Stories com enquete que levam para o direct, e posts de oferta 1-2 vezes por semana. A regra é: para cada post de venda, publique 3-4 posts de valor. Quem educa vende mais.`},
            {n:'06', t:'Ferramentas gratuitas para MEI no Instagram',
              c:`Para criar conteúdo sem gastar muito: Sliqr (carrosséis com IA — grátis para começar), CapCut (edição de Reels no celular), Canva Free (para Stories e destaques), Linktree (múltiplos links na bio). O segredo não é ter muitas ferramentas — é usar poucas muito bem.`},
          ].map(({n,t,c}) => (
            <section key={n}>
              <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>{n} —</div>
              <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>{t}</h2>
              <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>{c}</p>
            </section>
          ))}
        </div>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center'}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Comece a criar conteúdo para o seu MEI hoje</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>O Sliqr cria carrosséis completos com IA em 45 segundos. Grátis para começar.</p>
          <Link href="/cadastro" style={{display:'inline-block',background:'#2D6FFF',color:'#fff',borderRadius:'10px',padding:'0.85rem 2rem',fontWeight:700,fontSize:'0.95rem',boxShadow:'0 8px 24px rgba(45,111,255,0.3)'}}>
            Criar meu primeiro post grátis →
          </Link>
        </div>
        <div style={{marginTop:'2rem',textAlign:'center'}}>
          <Link href="/blog" style={{color:'#4A5568',fontSize:'0.82rem'}}>← Voltar para o blog</Link>
        </div>
      </main>
    </>
  )
}
