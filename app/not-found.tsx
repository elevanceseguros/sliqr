import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', background:'#080B12', color:'#F0F4FF', fontFamily:'Sora, sans-serif', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem', textAlign:'center' }}>
      <div style={{ width:'64px', height:'64px', background:'rgba(45,111,255,0.1)', border:'1px solid rgba(45,111,255,0.2)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.5rem' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D6FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.7rem', color:'#4A5568', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>ERRO 404</div>
      <h1 style={{ fontSize:'1.75rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:'0.5rem' }}>Página não encontrada</h1>
      <p style={{ color:'#8B95A8', fontSize:'0.9rem', marginBottom:'2rem', maxWidth:'360px', lineHeight:1.65 }}>
        A página que você procura não existe ou foi movida.
      </p>
      <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center' }}>
        <Link href="/criar" style={{ background:'#2D6FFF', color:'#fff', textDecoration:'none', borderRadius:'10px', padding:'0.75rem 1.5rem', fontWeight:600, fontSize:'0.875rem' }}>
          Criar post
        </Link>
        <Link href="/landing" style={{ background:'transparent', color:'#8B95A8', textDecoration:'none', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.75rem 1.5rem', fontWeight:500, fontSize:'0.875rem' }}>
          Página inicial
        </Link>
      </div>
    </div>
  )
}
