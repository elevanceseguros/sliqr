import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '30 Ideias de Carrossel para Instagram por Nicho (com Exemplos) — Sliqr Blog',
  description: 'Lista completa de ideias de carrossel para nutricionistas, corretores, lojas, clínicas, salões e muito mais.',
  keywords: ['ideias carrossel instagram','temas carrossel instagram','o que postar no instagram','conteudo instagram por nicho'],
  openGraph: {
    title: '30 Ideias de Carrossel para Instagram por Nicho',
    description: 'Ideias práticas para qualquer segmento.',
    url: 'https://sliqr.com.br/blog/ideias-carrossel-instagram-por-nicho',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const nichos = [
  {emoji:'💊', nicho:'Farmácia / Saúde', ideias:['Quando tomar suplemento X e qual a dose certa','5 medicamentos que você não deve misturar','Como escolher protetor solar pelo tipo de pele','Diferença entre genérico e referência — o que você precisa saber','Sinais de que você está com deficiência de vitamina D']},
  {emoji:'🏋️', nicho:'Personal Trainer / Academia', ideias:['5 erros que impedem de perder gordura mesmo malhando','Treino de 20 minutos para fazer em casa','Como montar uma dieta sem passar fome','Diferença entre hipertrofia e definição muscular','Por que a balança mente sobre seu progresso']},
  {emoji:'💄', nicho:'Estética / Beleza', ideias:['Cuidados essenciais antes e depois do procedimento X','Como escolher a cor de base certa para seu tom de pele','Skincare básica para começar hoje — 3 produtos','Diferença entre limpeza de pele e peeling','Erros que envelhecem a pele mais rápido']},
  {emoji:'🏠', nicho:'Corretor de Imóveis', ideias:['Como financiar um imóvel com score baixo — passo a passo','Documentos necessários para comprar um imóvel','Diferença entre escritura, matrícula e contrato','ITBI, IPTU e taxas: o que o comprador precisa saber','Vale mais alugar ou comprar? Calculando o ponto de equilíbrio']},
  {emoji:'🍽️', nicho:'Restaurante / Alimentação', ideias:['Os 3 pratos mais pedidos da semana — vote no seu favorito','Como fazemos nosso molho especial — bastidores','5 combinações de ingredientes que funcionam sempre','Cardápio especial de fim de semana — veja o que preparamos','Dica de harmonização: o que beber com cada prato']},
  {emoji:'📱', nicho:'Loja / E-commerce', ideias:['Como escolher o tamanho certo — guia de medidas','5 formas de usar o produto X que você não sabia','Chegou novidade! Veja o que tem de novo no estoque','Guia de presentes por faixa de preço','Antes e depois: clientes usando nossos produtos']},
]

export default function Post() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org","@type":"Article",
        "headline":"30 Ideias de Carrossel para Instagram por Nicho (com Exemplos)",
        "datePublished":"2025-06-05","dateModified":"2025-06-05",
        "author":{"@type":"Organization","name":"Sliqr"},
        "publisher":{"@type":"Organization","name":"Sliqr","url":"https://sliqr.com.br"},
        "mainEntityOfPage":"https://sliqr.com.br/blog/ideias-carrossel-instagram-por-nicho"
      })}}/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Sora',sans-serif;background:#080B12;color:#F0F4FF;-webkit-font-smoothing:antialiased}
        a{color:inherit;text-decoration:none}
      `}</style>
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <Link href="/landing" style={{display:'flex',alignItems:'center',gap:'9px',fontWeight:800,fontSize:'1.3rem',letterSpacing:'-0.04em'}}>
          <div style={{width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg></div>
          Sliqr
        </Link>
        <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.55rem 1.25rem',fontSize:'0.85rem',fontWeight:600}}>Criar grátis</Link>
      </nav>
      <main style={{paddingTop:'64px',maxWidth:'720px',margin:'0 auto',padding:'64px 1.5rem 4rem'}}>
        <nav style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'2rem',marginTop:'2rem',fontSize:'0.78rem',color:'#4A5568'}}>
          <Link href="/landing">Início</Link><span>→</span><Link href="/blog">Blog</Link><span>→</span>
          <span style={{color:'#8B95A8'}}>Ideias por Nicho</span>
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap'}}>
          <span style={{background:'rgba(52,211,153,0.1)',border:'1px solid rgba(52,211,153,0.2)',color:'#34D399',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>IDEIAS</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>05 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>8 min de leitura</span>
        </div>
        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          30 Ideias de Carrossel para Instagram por Nicho (com Exemplos)
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Chega de ficar olhando para a tela sem saber o que postar. Escolha o seu nicho e use qualquer uma dessas ideias hoje mesmo.
        </p>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
          <div><div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Transforme qualquer ideia em carrossel</div><div style={{color:'#8B95A8',fontSize:'0.82rem'}}>Cole o título no Sliqr e a IA cria o post completo em 45s.</div></div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap'}}>Criar grátis →</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
          {nichos.map(({emoji,nicho,ideias}) => (
            <div key={nicho} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',padding:'1.5rem'}}>
              <h2 style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'1rem',display:'flex',alignItems:'center',gap:'8px'}}><span>{emoji}</span>{nicho}</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {ideias.map((ideia,i) => (
                  <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'0.6rem 0.75rem',background:'rgba(255,255,255,0.03)',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.05)'}}>
                    <span style={{color:'#2D6FFF',fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',fontWeight:700,flexShrink:0,marginTop:'2px'}}>0{i+1}</span>
                    <span style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.5}}>{ideia}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center'}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Cole qualquer ideia dessas no Sliqr</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>A IA cria o carrossel completo em 45 segundos. Grátis para começar.</p>
          <Link href="/cadastro" style={{display:'inline-block',background:'#2D6FFF',color:'#fff',borderRadius:'10px',padding:'0.85rem 2rem',fontWeight:700,fontSize:'0.95rem',boxShadow:'0 8px 24px rgba(45,111,255,0.3)'}}>Criar meu primeiro post grátis →</Link>
        </div>
        <div style={{marginTop:'2rem',textAlign:'center'}}><Link href="/blog" style={{color:'#4A5568',fontSize:'0.82rem'}}>← Voltar para o blog</Link></div>
      </main>
    </>
  )
}
