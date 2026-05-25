import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Layers, Clock, Zap } from 'lucide-react'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: perfil } = await supabase
    .from('perfis')
    .select('plano, nome, posts_hoje')
    .eq('id', user.id)
    .single()

  const plano     = perfil?.plano ?? 'free'
  const postsHoje = perfil?.posts_hoje ?? 0

  const planoCores: Record<string, string> = {
    free: '#4A5568', starter: '#2D6FFF', pro: '#00D4FF', ilimitado: '#6BCB77',
  }

  return (
    <div style={{ minHeight:'100vh', background:'#080B12', display:'flex' }}>

      {/* Sidebar */}
      <aside style={{ width:'220px', flexShrink:0, background:'#0D1117', borderRight:'1px solid rgba(255,255,255,0.07)', display:'flex', flexDirection:'column', padding:'1.5rem 1rem', position:'fixed', top:0, left:0, bottom:0 }}>

        {/* Logo */}
        <Link href="/criar" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', marginBottom:'2rem' }}>
          <div style={{ width:'28px', height:'28px', background:'#2D6FFF', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          <span style={{ fontWeight:800, fontSize:'1.2rem', letterSpacing:'-0.04em', color:'#F0F4FF' }}>Sliqr</span>
        </Link>

        {/* Nav links */}
        <nav style={{ display:'flex', flexDirection:'column', gap:'4px', flex:1 }}>
          <NavLink href="/criar" icon={<Zap size={15}/>} label="Criar post" />
          <NavLink href="/historico" icon={<Clock size={15}/>} label="Histórico" />
        </nav>

        {/* Plano badge */}
        <div style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px', padding:'0.75rem', marginBottom:'1rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
            <span style={{ fontSize:'0.7rem', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.08em', textTransform:'uppercase', color:'#4A5568' }}>Plano</span>
            <span style={{ fontSize:'0.72rem', fontWeight:600, color: planoCores[plano], textTransform:'uppercase', letterSpacing:'0.06em' }}>{plano}</span>
          </div>
          {plano !== 'ilimitado' && (
            <div style={{ fontSize:'0.75rem', color:'#8B95A8' }}>{postsHoje} post(s) hoje</div>
          )}
          {plano === 'free' && (
            <Link href="/criar?upgrade=true" style={{ display:'block', marginTop:'8px', background:'#2D6FFF', color:'#fff', textAlign:'center', borderRadius:'6px', padding:'5px', fontSize:'0.75rem', fontWeight:600, textDecoration:'none' }}>
              Fazer upgrade
            </Link>
          )}
        </div>

        {/* Logout */}
        <form action="/api/auth/logout" method="POST">
          <button type="submit" style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', background:'transparent', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px', padding:'0.6rem 0.75rem', color:'#4A5568', fontSize:'0.82rem', cursor:'pointer', fontFamily:'Sora, sans-serif', transition:'all 0.2s' }}>
            <LogOut size={14}/> Sair
          </button>
        </form>
      </aside>

      {/* Main */}
      <main style={{ flex:1, marginLeft:'220px', minHeight:'100vh' }}>
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'0.6rem 0.75rem', borderRadius:'8px', color:'#8B95A8', textDecoration:'none', fontSize:'0.875rem', fontWeight:500, transition:'all 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#1A2235'; (e.currentTarget as HTMLElement).style.color='#F0F4FF' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='#8B95A8' }}>
      {icon} {label}
    </Link>
  )
}
