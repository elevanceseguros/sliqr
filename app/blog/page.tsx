import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Sliqr — Dicas de Instagram e Marketing Digital para Empreendedores',
  description: 'Artigos práticos sobre carrosséis para Instagram, marketing digital e crescimento para pequenos empreendedores brasileiros.',
  openGraph: {
    title: 'Blog Sliqr — Dicas de Instagram para Empreendedores',
    description: 'Artigos práticos sobre carrosséis, conteúdo e crescimento no Instagram.',
    url: 'https://sliqr.com.br/blog',
    siteName: 'Sliqr',
    locale: 'pt_BR',
    type: 'website',
  },
}

const posts = [
  {
    slug: 'carrossel-vs-reels-qual-usar',
    titulo: 'Carrossel ou Reels: Qual Usar para Vender Mais no Instagram?',
    descricao: 'Comparacao direta entre carrossel e Reels -- quando usar cada formato e como combinar os dois para crescer e vender.',
    tag: 'Formatos', data: '15 Jun 2025', leitura: '6 min',
  },
  {
    slug: 'como-escrever-bio-instagram-profissional',
    titulo: 'Como Escrever uma Bio do Instagram que Converte Visitantes em Seguidores',
    descricao: 'A bio e a primeira impressao. Aprenda a escrever uma bio profissional que converte visitantes em clientes.',
    tag: 'Perfil', data: '14 Jun 2025', leitura: '5 min',
  },
  {
    slug: 'instagram-para-prestadores-de-servico',
    titulo: 'Instagram para Prestadores de Servico: Como Atrair Clientes',
    descricao: 'Guia completo para advogados, medicos, nutricionistas e outros profissionais liberais usarem o Instagram.',
    tag: 'Servicos', data: '13 Jun 2025', leitura: '7 min',
  },
  {
    slug: 'primeiro-slide-carrossel-instagram-gancho',
    titulo: 'Como Criar o Primeiro Slide do Carrossel que Para o Dedo',
    descricao: '5 formulas de gancho com exemplos prontos para qualquer nicho -- para o seguidor parar de rolar o feed.',
    tag: 'Carrossel', data: '12 Jun 2025', leitura: '6 min',
  },
  {
    slug: 'como-crescer-instagram-organicamente-2025',
    titulo: 'Como Crescer no Instagram Organicamente em 2025',
    descricao: 'Estrategias reais para crescer no Instagram sem pagar por anuncios -- para pequenos empreendedores brasileiros.',
    tag: 'Crescimento', data: '11 Jun 2025', leitura: '7 min',
  },
  {
    slug: 'planejamento-conteudo-instagram-pequenos-negocios',
    titulo: 'Planejamento de Conteudo para Instagram: Guia para Pequenos Negocios',
    descricao: 'Como criar um planejamento de conteudo para Instagram que voce realmente consegue manter.',
    tag: 'Planejamento', data: '10 Jun 2025', leitura: '7 min',
  },
  {
    slug: 'como-usar-carrossel-para-gerar-leads-instagram',
    titulo: 'Como Usar Carrossel para Gerar Leads no Instagram',
    descricao: '5 estrategias para transformar carrosseis em maquina de captacao de clientes qualificados.',
    tag: 'Estrategia', data: '09 Jun 2025', leitura: '6 min',
  },

  {
    slug: 'como-criar-carrossel-instagram-que-vende',
    titulo: 'Como Criar Carrosséis para Instagram que Realmente Vendem',
    descricao: 'Descubra a estrutura exata de carrossel que transforma seguidores em clientes — com exemplos práticos para qualquer nicho.',
    tag: 'Carrossel',
    data: '08 Jun 2025',
    leitura: '7 min',
  },
  {
    slug: 'frequencia-postagem-instagram-pequenos-negocios',
    titulo: 'Quantas Vezes por Semana Postar no Instagram? A Resposta Definitiva',
    descricao: 'Chega de achismo: veja a frequência ideal de postagem para pequenos negócios no Instagram e como manter consistência sem enlouquecer.',
    tag: 'Estratégia',
    data: '07 Jun 2025',
    leitura: '6 min',
  },
  {
    slug: 'legendas-cta-carrossel-instagram',
    titulo: 'Legendas e CTAs para Carrossel: Como Fazer Seu Público Agir',
    descricao: 'Templates prontos de legenda e CTA para carrossel no Instagram que geram salvamentos, comentários e cliques no link da bio.',
    tag: 'Copywriting',
    data: '06 Jun 2025',
    leitura: '5 min',
  },
  {
    slug: 'ideias-carrossel-instagram-por-nicho',
    titulo: '30 Ideias de Carrossel para Instagram por Nicho (com Exemplos)',
    descricao: 'Lista completa de ideias de carrossel para nutricionistas, corretores, lojas, clínicas, salões e muito mais.',
    tag: 'Ideias',
    data: '05 Jun 2025',
    leitura: '8 min',
  },
  {
    slug: 'instagram-para-mei-guia-completo',
    titulo: 'Instagram para MEI: Guia Completo para Vender Mais em 2025',
    descricao: 'Tudo que um MEI precisa saber para usar o Instagram como canal de vendas — do perfil à estratégia de conteúdo.',
    tag: 'MEI',
    data: '04 Jun 2025',
    leitura: '9 min',
  },
  {
    slug: 'erros-carrossel-instagram-que-afastam-seguidores',
    titulo: '7 Erros no Carrossel do Instagram que Estão Afastando Seus Seguidores',
    descricao: 'Veja os erros mais comuns em carrosséis de pequenos empreendedores e como corrigi-los para aumentar alcance e engajamento.',
    tag: 'Erros',
    data: '03 Jun 2025',
    leitura: '6 min',
  },
  {
    slug: 'como-usar-ia-para-criar-conteudo-instagram',
    titulo: 'Como Usar IA para Criar Conteúdo para o Instagram (Guia Prático)',
    descricao: 'Aprenda como a inteligência artificial pode criar carrosséis, legendas e ideias de conteúdo para o seu negócio em segundos.',
    tag: 'IA',
    data: '02 Jun 2025',
    leitura: '7 min',
  },
]

export default function BlogPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Sora',sans-serif;background:#080B12;color:#F0F4FF;-webkit-font-smoothing:antialiased}
        a{color:inherit;text-decoration:none}
        .post-card:hover{border-color:rgba(45,111,255,0.4) !important;transform:translateY(-2px)}
        .post-card{transition:all 0.2s}
      `}</style>

      {/* NAV */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
        <Link href="/landing" style={{display:'flex',alignItems:'center',gap:'9px',fontWeight:800,fontSize:'1.3rem',letterSpacing:'-0.04em'}}>
          <div style={{width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          Sliqr
        </Link>
        <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.55rem 1.25rem',fontSize:'0.85rem',fontWeight:600}}>Criar grátis</Link>
      </nav>

      <main style={{paddingTop:'64px',minHeight:'100vh'}}>
        {/* Hero */}
        <section style={{padding:'5rem 5% 3rem',textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.7rem',color:'#2D6FFF',letterSpacing:'0.12em',marginBottom:'1rem'}}>// BLOG SLIQR</div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:800,letterSpacing:'-0.04em',marginBottom:'1rem',maxWidth:'700px',margin:'0 auto 1rem'}}>
            Dicas práticas de Instagram<br/>para quem tem pouco tempo
          </h1>
          <p style={{color:'#8B95A8',fontSize:'1rem',maxWidth:'500px',margin:'0 auto 2rem',lineHeight:1.65}}>
            Artigos diretos ao ponto para pequenos empreendedores que querem vender mais usando o Instagram.
          </p>
        </section>

        {/* Posts */}
        <section style={{padding:'3rem 5%',maxWidth:'960px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'20px'}}>
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card" style={{display:'block',background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px',padding:'1.5rem',cursor:'pointer'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
                  <span style={{background:'rgba(45,111,255,0.1)',border:'1px solid rgba(45,111,255,0.2)',color:'#6B9FFF',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>{post.tag.toUpperCase()}</span>
                  <span style={{color:'#4A5568',fontSize:'0.72rem',fontFamily:'JetBrains Mono,monospace'}}>{post.leitura}</span>
                </div>
                <h2 style={{fontSize:'1rem',fontWeight:700,lineHeight:1.4,marginBottom:'0.6rem',letterSpacing:'-0.02em'}}>{post.titulo}</h2>
                <p style={{color:'#8B95A8',fontSize:'0.82rem',lineHeight:1.6,marginBottom:'1rem'}}>{post.descricao}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{color:'#4A5568',fontSize:'0.72rem'}}>{post.data}</span>
                  <span style={{color:'#2D6FFF',fontSize:'0.78rem',fontWeight:600}}>Ler →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{padding:'4rem 5%',textAlign:'center',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
          <p style={{color:'#8B95A8',marginBottom:'1rem',fontSize:'0.9rem'}}>Cansado de ler sobre carrosséis? Crie o seu agora.</p>
          <Link href="/cadastro" style={{display:'inline-block',background:'#2D6FFF',color:'#fff',borderRadius:'10px',padding:'0.85rem 2rem',fontWeight:700,fontSize:'0.95rem',boxShadow:'0 8px 24px rgba(45,111,255,0.3)'}}>
            Criar meu primeiro post grátis →
          </Link>
        </section>
      </main>
    </>
  )
}
