import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instagram para Prestadores de Servico: Como Atrair Clientes - Sliqr Blog',
  description: 'Guia completo para advogados, medicos, nutricionistas, personal trainers e outros profissionais liberais usarem o Instagram para atrair clientes.',
  keywords: ['instagram para prestadores de servico','instagram profissional liberal','como atrair clientes instagram','marketing para servicos'],
  openGraph: {
    title: 'Instagram para Prestadores de Servico: Como Atrair Clientes',
    description: 'Como profissionais liberais usam o Instagram para atrair clientes.',
    url: 'https://sliqr.com.br/blog/instagram-para-prestadores-de-servico',
    siteName: 'Sliqr', locale: 'pt_BR', type: 'article',
  },
}

const NAV = {position:'fixed' as const,top:0,left:0,right:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5%',height:'64px',background:'rgba(8,11,18,0.9)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}
const LOGO = {width:'28px',height:'28px',background:'#2D6FFF',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}

export default function Post() {
  const profissoes = [
    {prof:'Nutricionista',ideia:'Mito vs verdade sobre alimentacao -- desmistifique crencas comuns do seu publico'},
    {prof:'Personal Trainer',ideia:'Comparacao de exercicios -- qual queima mais gordura e por que'},
    {prof:'Advogado',ideia:'Direito do consumidor: o que voce pode exigir e nao sabe'},
    {prof:'Psicologo',ideia:'Sinais de que voce precisa de ajuda profissional -- sem tabu'},
    {prof:'Medico / Clinica',ideia:'Quando ir ao pronto-socorro vs consulta -- guia pratico'},
    {prof:'Contador',ideia:'Quanto custa abrir um MEI vs CLT -- comparacao real'},
    {prof:'Corretor de Seguros',ideia:'O que o seguro nao cobre e todo mundo acha que cobre'},
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context':'https://schema.org','@type':'Article',
        'headline':'Instagram para Prestadores de Servico: Como Atrair Clientes',
        'datePublished':'2025-06-13','dateModified':'2025-06-13',
        'author':{'@type':'Organization','name':'Sliqr'},
        'publisher':{'@type':'Organization','name':'Sliqr','url':'https://sliqr.com.br'},
        'mainEntityOfPage':'https://sliqr.com.br/blog/instagram-para-prestadores-de-servico'
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
          <span style={{color:'#8B95A8'}}>Instagram para Servicos</span>
        </nav>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap' as const}}>
          <span style={{background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.2)',color:'#F59E0B',fontSize:'0.65rem',fontWeight:700,padding:'3px 10px',borderRadius:'100px',fontFamily:'JetBrains Mono,monospace',letterSpacing:'0.06em'}}>SERVICOS</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>13 Jun 2025</span>
          <span style={{color:'#4A5568',fontSize:'0.75rem',fontFamily:'JetBrains Mono,monospace'}}>7 min de leitura</span>
        </div>
        <h1 style={{fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.2,marginBottom:'1rem'}}>
          Instagram para Prestadores de Servico: Como Atrair Clientes
        </h1>
        <p style={{fontSize:'1.1rem',color:'#8B95A8',lineHeight:1.7,marginBottom:'2rem'}}>
          Servico nao tem prateleira para mostrar. Por isso, quem presta servico precisa vender confianca antes de vender o servico. E o Instagram e o melhor lugar para fazer isso.
        </p>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'16px',padding:'1.25rem 1.5rem',marginBottom:'2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap' as const,gap:'1rem'}}>
          <div>
            <div style={{fontWeight:700,fontSize:'0.95rem',marginBottom:'4px'}}>Crie conteudo de autoridade em 45s</div>
            <div style={{color:'#8B95A8',fontSize:'0.82rem'}}>O Sliqr gera carrosseis completos para qualquer profissao.</div>
          </div>
          <Link href="/cadastro" style={{background:'#2D6FFF',color:'#fff',borderRadius:'8px',padding:'0.65rem 1.25rem',fontWeight:600,fontSize:'0.85rem',whiteSpace:'nowrap' as const}}>Criar gratis</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column' as const,gap:'2.5rem'}}>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>01 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>A regra de ouro: educar antes de vender</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Prestadores de servico que mais crescem no Instagram nao ficam postando preco e disponibilidade. Eles ensinam algo util toda semana. Cada conteudo educativo constroi uma camada de confianca. Quando o seguidor precisar do servico, voce ja e a primeira opcao -- porque ja provou que sabe do que fala.
            </p>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>02 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Uma ideia de carrossel por profissao</h2>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px'}}>
              {profissoes.map(({prof,ideia}) => (
                <div key={prof} style={{background:'#0D1117',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'10px',padding:'0.85rem 1rem'}}>
                  <div style={{fontWeight:700,fontSize:'0.82rem',color:'#2D6FFF',fontFamily:'JetBrains Mono,monospace',marginBottom:'5px',letterSpacing:'0.04em'}}>{prof.toUpperCase()}</div>
                  <div style={{color:'#8B95A8',fontSize:'0.85rem',lineHeight:1.55}}>{ideia}</div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'0.65rem',color:'#2D6FFF',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>03 --</div>
            <h2 style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.03em',marginBottom:'0.75rem'}}>Como transformar conteudo em consulta ou contrato</h2>
            <p style={{color:'#8B95A8',lineHeight:1.75,fontSize:'0.95rem'}}>
              Nao espere o seguidor te pedir. Ao final de cada carrossel, direcione com clareza: "Quer uma avaliacao gratuita? Manda direct.", "Faco atendimento online para todo o Brasil -- chama aqui." O CTA especifico converte mais que o generico "link na bio". Diga exatamente o que a pessoa deve fazer e por que agir agora.
            </p>
          </section>
        </div>
        <div style={{background:'linear-gradient(135deg,#0D1829,#0A1422)',border:'1px solid rgba(45,111,255,0.3)',borderRadius:'20px',padding:'2rem',marginTop:'3rem',textAlign:'center' as const}}>
          <h3 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-0.03em',marginBottom:'0.5rem'}}>Crie seu carrossel de autoridade agora</h3>
          <p style={{color:'#8B95A8',fontSize:'0.88rem',marginBottom:'1.5rem',lineHeight:1.6}}>O Sliqr cria carrosseis completos para qualquer profissao em 45 segundos. Gratis.</p>
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
