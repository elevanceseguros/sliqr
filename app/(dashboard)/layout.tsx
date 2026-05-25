'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Zap, Clock, LogOut, Building2, Lightbulb, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const pathname = usePathname()
  const [plano, setPlano]         = useState('free')
  const [postsHoje, setPostsHoje] = useState(0)
  const [empresa, setEmpresa]     = useState('')
  const [pronto, setPronto]       = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    async function verificar() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }
      const { data: perfil } = await supabase
        .from('perfis').select('plano, posts_hoje').eq('id', session.user.id).single()
      if (perfil) { setPlano(perfil.plano ?? 'free'); setPostsHoje(perfil.posts_hoje ?? 0) }
      const res  = await fetch(`/api/empresa?token=${session.access_token}`)
      const data = await res.json()
      if (data.empresa?.nome) setEmpresa(data.empresa.nome)
      setPronto(true)
    }
    verificar()
  }, [])

  // Fecha menu ao navegar
  useEffect(() => { setMenuOpen(false) }, [pathname])

  async function sair() { await supabase.auth.signOut(); window.location.href = '/login' }

  if (!pronto) return (
    <div style={{ minHeight:'100vh', background:'#080B12', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:'#4A5568', fontFamily:'JetBrains Mono, monospace', fontSize:'0.8rem' }}>carregando...</div>
    </div>
  )

  const planoCores: Record<string, string> = {
    free:'#4A5568', starter:'#2D6FFF', pro:'#00D4FF', ilimitado:'#6BCB77',
  }

  const links = [
    { href:'/criar',      icon:<Zap size={15}/>,        label:'Criar post' },
    { href:'/sugestoes',  icon:<Lightbulb size={15}/>,  label:'Sugestões' },
    { href:'/historico',  icon:<Clock size={15}/>,      label:'Histórico' },
    { href:'/empresa',    icon:<Building2 size={15}/>,  label:'Minha empresa' },
  ]

  function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    const ativo = pathname === href
    return (
      <Link href={href}
        style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0.65rem 0.85rem', borderRadius:'8px', color: ativo ? '#F0F4FF' : '#8B95A8', textDecoration:'none', fontSize:'0.875rem', fontWeight: ativo ? 600 : 500, background: ativo ? 'rgba(45,111,255,0.12)' : 'transparent', transition:'all 0.15s' }}>
        {icon} {label}
      </Link>
    )
  }

  const SidebarContent = () => (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ marginBottom:'1.5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom: empresa ? '6px' : '0' }}>
          <div style={{ width:'28px', height:'28px', background:'#2D6FFF', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          <span style={{ fontWeight:800, fontSize:'1.2rem', letterSpacing:'-0.04em', color:'#F0F4FF' }}>Sliqr</span>
        </div>
        {empresa && (
          <p style={{ fontSize:'0.7rem', color:'#4A5568', fontFamily:'JetBrains Mono, monospace', paddingLeft:'36px', letterSpacing:'0.04em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', margin:0 }}>
            {empresa}
          </p>
        )}
      </div>

      <nav style={{ display:'flex', flexDirection:'column', gap:'3px', flex:1 }}>
        {links.map(l => <NavLink key={l.href} {...l} />)}
      </nav>

      <div>
        <div style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px', padding:'0.75rem', marginBottom:'0.75rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' }}>
            <span style={{ fontSize:'0.68rem', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.08em', textTransform:'uppercase', color:'#4A5568' }}>Plano</span>
            <span style={{ fontSize:'0.72rem', fontWeight:700, color: planoCores[plano] ?? '#4A5568', textTransform:'uppercase', letterSpacing:'0.06em' }}>{plano}</span>
          </div>
          {plano !== 'ilimitado' && <div style={{ fontSize:'0.75rem', color:'#8B95A8' }}>{postsHoje} post(s) hoje</div>}
          {plano === 'free' && (
            <Link href="/criar?upgrade=true" style={{ display:'block', marginTop:'8px', background:'#2D6FFF', color:'#fff', textAlign:'center', borderRadius:'6px', padding:'5px', fontSize:'0.75rem', fontWeight:600, textDecoration:'none' }}>
              Fazer upgrade
            </Link>
          )}
        </div>
        <button onClick={sair} style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', background:'transparent', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px', padding:'0.6rem 0.75rem', color:'#4A5568', fontSize:'0.82rem', cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
          <LogOut size={14}/> Sair
        </button>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sliqr-sidebar { display: none !important; }
          .sliqr-main   { margin-left: 0 !important; padding-top: 56px !important; }
          .sliqr-topbar { display: flex !important; }
        }
        @media (min-width: 769px) {
          .sliqr-topbar  { display: none !important; }
          .sliqr-overlay { display: none !important; }
        }
      `}</style>

      {/* Topbar mobile */}
      <header className="sliqr-topbar"
        style={{ position:'fixed', top:0, left:0, right:0, zIndex:300, height:'56px', background:'rgba(13,17,23,0.97)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(255,255,255,0.07)', alignItems:'center', justifyContent:'space-between', padding:'0 1.25rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', fontWeight:800, fontSize:'1.15rem', letterSpacing:'-0.04em', color:'#F0F4FF' }}>
          <div style={{ width:'24px', height:'24px', background:'#2D6FFF', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          Sliqr
        </div>
        <button onClick={() => setMenuOpen(p => !p)}
          style={{ background:'transparent', border:'none', color:'#F0F4FF', cursor:'pointer', padding:'8px', display:'flex', alignItems:'center' }}>
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </header>

      {/* Overlay mobile */}
      {menuOpen && (
        <div className="sliqr-overlay"
          style={{ position:'fixed', inset:0, zIndex:250, background:'rgba(0,0,0,0.7)' }}
          onClick={() => setMenuOpen(false)}>
          <nav style={{ position:'absolute', top:'56px', left:0, bottom:0, width:'260px', background:'#0D1117', borderRight:'1px solid rgba(255,255,255,0.07)', padding:'1.25rem 1rem', display:'flex', flexDirection:'column' }}
            onClick={e => e.stopPropagation()}>
            <SidebarContent />
          </nav>
        </div>
      )}

      {/* Sidebar desktop */}
      <aside className="sliqr-sidebar"
        style={{ width:'220px', flexShrink:0, background:'#0D1117', borderRight:'1px solid rgba(255,255,255,0.07)', padding:'1.5rem 1rem', position:'fixed', top:0, left:0, bottom:0, zIndex:100 }}>
        <SidebarContent />
      </aside>

      {/* Conteúdo principal */}
      <div style={{ minHeight:'100vh', background:'#080B12' }}>
        <main className="sliqr-main" style={{ marginLeft:'220px', minHeight:'100vh' }}>
          {children}
        </main>
      </div>
    </>
  )
}
