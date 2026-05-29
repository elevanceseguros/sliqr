export default function TermosPage() {
  return (
    <div style={{ minHeight:'100vh', background:'#080B12', color:'#F0F4FF', fontFamily:'Sora, sans-serif', padding:'clamp(2rem,6vw,6rem) clamp(1rem,5vw,4rem)', maxWidth:'720px', margin:'0 auto' }}>
      <div style={{ marginBottom:'3rem' }}>
        <a href="/landing" style={{ color:'#2D6FFF', textDecoration:'none', fontSize:'0.85rem' }}>← Sliqr</a>
      </div>
      <h1 style={{ fontSize:'2rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.5rem' }}>Termos de Serviço</h1>
      <p style={{ color:'#4A5568', fontSize:'0.85rem', marginBottom:'3rem' }}>Última atualização: maio de 2025</p>

      {[
        { titulo:'1. Aceitação dos termos', texto:'Ao usar o Sliqr, você concorda com estes termos. Se não concordar, não utilize o serviço.' },
        { titulo:'2. Descrição do serviço', texto:'O Sliqr é uma plataforma de geração de carrosséis para Instagram usando inteligência artificial. Oferecemos planos gratuitos e pagos com diferentes limites e funcionalidades.' },
        { titulo:'3. Conta do usuário', texto:'Você é responsável por manter a segurança da sua conta e senha. Notifique-nos imediatamente em caso de uso não autorizado.' },
        { titulo:'4. Uso aceitável', texto:'Você concorda em não usar o Sliqr para criar conteúdo ilegal, ofensivo, difamatório ou que viole direitos de terceiros. Reservamos o direito de encerrar contas que violem estas regras.' },
        { titulo:'5. Pagamentos e cancelamento', texto:'Os planos pagos são cobrados mensalmente ou anualmente via Stripe. Você pode cancelar a qualquer momento. Não há reembolso para períodos já cobrados, exceto quando exigido por lei.' },
        { titulo:'6. Propriedade intelectual', texto:'O conteúdo gerado pela plataforma pertence a você. O código, design e marca Sliqr são de nossa propriedade.' },
        { titulo:'7. Limitação de responsabilidade', texto:'O Sliqr é fornecido "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. Nossa responsabilidade é limitada ao valor pago pelo serviço nos últimos 3 meses.' },
        { titulo:'8. Alterações nos termos', texto:'Podemos atualizar estes termos a qualquer momento. Notificaremos por e-mail sobre mudanças significativas.' },
        { titulo:'9. Contato', texto:'Dúvidas sobre estes termos: contato@sliqr.com.br' },
      ].map(s => (
        <div key={s.titulo} style={{ marginBottom:'2rem' }}>
          <h2 style={{ fontSize:'1.1rem', fontWeight:600, marginBottom:'0.5rem', letterSpacing:'-0.01em' }}>{s.titulo}</h2>
          <p style={{ color:'#8B95A8', lineHeight:1.75, fontSize:'0.95rem', fontWeight:300 }}>{s.texto}</p>
        </div>
      ))}
    </div>
  )
}
