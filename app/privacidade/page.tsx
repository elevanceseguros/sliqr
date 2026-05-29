export default function PrivacidadePage() {
  return (
    <div style={{ minHeight:'100vh', background:'#080B12', color:'#F0F4FF', fontFamily:'Sora, sans-serif', padding:'clamp(2rem,6vw,6rem) clamp(1rem,5vw,4rem)', maxWidth:'720px', margin:'0 auto' }}>
      <div style={{ marginBottom:'3rem' }}>
        <a href="/landing" style={{ color:'#2D6FFF', textDecoration:'none', fontSize:'0.85rem' }}>← Sliqr</a>
      </div>
      <h1 style={{ fontSize:'2rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.5rem' }}>Política de Privacidade</h1>
      <p style={{ color:'#4A5568', fontSize:'0.85rem', marginBottom:'3rem' }}>Última atualização: maio de 2025</p>

      {[
        { titulo:'1. Informações que coletamos', texto:'Coletamos seu nome, endereço de e-mail e informações de uso ao criar uma conta ou usar nossos serviços. Quando você faz login com o Google, recebemos apenas nome e e-mail conforme autorizado por você.' },
        { titulo:'2. Como usamos suas informações', texto:'Usamos suas informações para fornecer e melhorar o serviço Sliqr, processar pagamentos via Stripe, enviar comunicações relacionadas ao serviço e personalizar sua experiência.' },
        { titulo:'3. Compartilhamento de dados', texto:'Não vendemos seus dados pessoais. Compartilhamos informações apenas com prestadores de serviço necessários para operar a plataforma (Supabase para banco de dados, Stripe para pagamentos, Vercel para hospedagem) e quando exigido por lei.' },
        { titulo:'4. Segurança', texto:'Seus dados são armazenados com segurança usando criptografia em trânsito e em repouso. Utilizamos autenticação segura e boas práticas de desenvolvimento.' },
        { titulo:'5. Seus direitos', texto:'Você pode acessar, corrigir ou excluir seus dados a qualquer momento entrando em contato conosco. Pode também encerrar sua conta pelo painel da plataforma.' },
        { titulo:'6. Cookies', texto:'Usamos cookies essenciais para autenticação e funcionamento da plataforma. Não utilizamos cookies de rastreamento de terceiros para publicidade.' },
        { titulo:'7. Contato', texto:'Para dúvidas sobre esta política, entre em contato pelo e-mail: contato@sliqr.com.br' },
      ].map(s => (
        <div key={s.titulo} style={{ marginBottom:'2rem' }}>
          <h2 style={{ fontSize:'1.1rem', fontWeight:600, marginBottom:'0.5rem', letterSpacing:'-0.01em' }}>{s.titulo}</h2>
          <p style={{ color:'#8B95A8', lineHeight:1.75, fontSize:'0.95rem', fontWeight:300 }}>{s.texto}</p>
        </div>
      ))}
    </div>
  )
}
