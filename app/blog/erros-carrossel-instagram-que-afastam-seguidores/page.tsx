import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '7 Erros no Carrossel do Instagram que Afastam Seguidores — Sliqr Blog',
  description: 'Veja os erros mais comuns em carrosséis de pequenos empreendedores e como corrigi-los para aumentar alcance e engajamento.',
  keywords: ['erros carrossel instagram','carrossel que não engaja','melhorar carrossel instagram','engajamento instagram'],
  openGraph: {
    title: '7 Erros no Carrossel do Instagram que Estão Afastando Seus Seguidores',
    description: 'Corrija esses erros e veja seu engajamento aumentar.',
    url: 'https://sliqr.com.br/blog/erros-carrossel-instagram-que-afastam-seguidores',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

export default function Post() {
  const erros = [
    {n:'01', erro:'Primeira imagem sem gancho', problema:'Se o primeiro slide não parar o dedo, o post morreu. A maioria coloca foto do produto ou o nome da empresa.', fix:'Use uma promessa, uma pergunta ou uma afirmação polêmica. Ex: "Você está perdendo clientes por causa disso" ou "3 coisas que ninguém te conta sobre X".'},
    {n:'02', erro:'Slides com muito texto', problema:'O leitor abre o carrossel no celular. Parágrafos longos em fonte pequena = deslizar sem ler.', fix:'Máximo 2-3 linhas por slide. Uma ideia por slide. Use ícones ou emojis para dividir visualmente.'},
    {n:'03', erro:'Sem continuidade entre slides', problema:'Cada slide parece um post separado. O usuário não tem motivo para continuar deslizando.', fix:'Crie suspense. "Mas tem um detalhe..." ou "O slide 5 é o mais importante" geram curiosidade e fazem a pessoa passar todos os slides.'},
    {n:'04', erro:'Identidade visual inconsistente', problema:'Cores diferentes, fontes diferentes, layouts diferentes em cada slide. Passa a impressão de amador.', fix:'Escolha 2 cores e 1 fonte e use em todos os slides. O Sliqr faz isso automaticamente — você escolhe a cor e a IA mantém o padrão.'},
    {n:'05', erro:'Último slide sem CTA', problema:'O usuário chegou até o fim — é o momento em que ele está mais engajado. E aí... nada.', fix:'O último slide deve ter UMA ação clara: "Salva esse post", "Me chama no direct", "Link na bio", "Comenta abaixo". Só uma — não misture.'},
    {n:'06', erro:'Legenda genérica', problema:'"Esperamos que gostem!" ou emojis aleatórios não geram comentário, não geram clique, não geram nada.', fix:'A legenda é a segunda chance de converter. Use pergunta, lista rápida ou continuação do conteúdo do carrossel. Termine sempre com CTA.'},
    {n:'07', erro:'Postar e sumir', problema:'Responder comentários nas primeiras horas depois de postar é o que o algoritmo usa para decidir o alcance. Ignorar = morte do post.', fix:'Reserve 15 minutos após postar para responder comentários. Até um "obrigado" já sinaliza atividade para o algoritmo.'},
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org","@type":"Article",
        "headline":"7 Erros no Carrossel do Instagram que Estão Afastando Seus Seguidores",
        "datePublished":"2025-06-03","dateModified":"2025-06-03",
        "author":{"@type":"Organization","name":"Sliqr"},
        "publisher":{"@type":"Organization","name":"Sliqr","url":"https://sliqr.com.br"},
        "mainEntityOfPage":"https://sliqr.com.br/blog/erros-carrossel-instagram-que-afastam-seguidores"
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
          <span style={{color:'#8B95A8'}}>Erros no Carrossel</span>
        </nav>

        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap'}}>
          <span style={{background:'rgba(255,80,80,0.1)',border:'1px solid rgba(255,80,80,0.2)',color:'#FC8181',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>ERROS</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>03 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>6 min de leitura</span>
        </div>

        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          7 Erros no Carrossel do Instagram que Estão Afastando Seus Seguidores
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Você cria o carrossel, publica — e o alcance é uma fração do que esperava. Na maioria das vezes, um (ou vários) desses erros é o culpado.
        </p>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Evite esses erros automaticamente</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>O Sliqr cria carrosséis com IA que já seguem as boas práticas.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap'}}>Criar grátis →</Link>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
          {erros.map(({n, erro, problema, fix}) => (
            <div key={n} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',padding:'1.5rem',overflow:'hidden'}}>
              <div style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:'1rem'}}>
                <div style={{width:'36px',height:'36px',background:'rgba(252,129,129,0.1)',border:'1px solid rgba(252,129,129,0.2)',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#FC8181',fontSize:'0.8rem'}}>{n}</div>
                <h2 style={{fontSize:'1.05rem',fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.3}}>{erro}</h2>
              </div>
              <div style={{background:'rgba(252,129,129,0.05)',border:'1px solid rgba(252,129,129,0.1)',borderRadius:'8px',padding:'0.75rem 1rem',marginBottom:'0.75rem'}}>
                <div style={{fontSize:'0.7rem',color:'#FC8181',fontFamily:'JetBrains Mono,monospace',marginBottom:'4px',letterSpacing:'0.06em'}}>PROBLEMA</div>
                <p style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.65}}>{problema}</p>
              </div>
              <div style={{background:'rgba(52,211,153,0.05)',border:'1px solid rgba(52,211,153,0.15)',borderRadius:'8px',padding:'0.75rem 1rem'}}>
                <div style={{fontSize:'0.7rem',color:'#34D399',fontFamily:'JetBrains Mono,monospace',marginBottom:'4px',letterSpacing:'0.06em'}}>CORREÇÃO</div>
                <p style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.65}}>{fix}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center'}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Crie carrosséis sem esses erros</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>O Sliqr usa IA para gerar carrosséis que seguem as boas práticas automaticamente. Grátis para começar.</p>
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
