'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap, Lightbulb, Clock, Building2, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const supabase = createClient()

  async function sair() { await supabase.auth.signOut(); window.location.href = '/login' }

  const links = [
    { href:'/criar',     icon:<Zap size={16}/>,        label:'Criar post' },
    { href:'/sugestoes', icon:<Lightbulb size={16}/>,  label:'Sugestões' },
    { href:'/historico', icon:<Clock size={16}/>,      label:'Histórico' },
    { href:'/empresa',   icon:<Building2 size={16}/>,  label:'Minha empresa' },
  ]

  return (
    <>
      <header style={{ display:'none', position:'fixed', top:0, left:0, right:0, zIndex:150, height:'56px', background:'rgba(13,17,23,0.95)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(255,255,255,0.07)', alignItems:'center', justifyContent:'space-between', padding:'0 1rem' }} className="mobile-header">
        <div style={{ display:'flex', alignItems:'center', gap:'8px', fontWeight:800, fontSize:'1.2rem', letterSpacing:'-0.04em' }}>
          <div style={{ width:'24px', height:'24px', background:'#2D6FFF', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          Sliqr
        </div>
        <button onClick={() => setOpen(p => !p)} style={{ background:'transparent', border:'none', color:'#F0F4FF', cursor:'pointer', padding:'8px' }}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </header>

      {open && (
        <div style={{ position:'fixed', inset:0, zIndex:140, background:'rgba(0,0,0,0.6)' }} onClick={() => setOpen(false)}>
          <nav style={{ position:'absolute', top:'56px', left:0, bottom:0, width:'240px', background:'#0D1117', borderRight:'1px solid rgba(255,255,255,0.07)', padding:'1rem', display:'flex', flexDirection:'column', gap:'4px' }}
            onClick={e => e.stopPropagation()}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0.75rem 1rem', borderRadius:'8px', color:'#8B95A8', textDecoration:'none', fontSize:'0.9rem', fontWeight:500 }}>
                {l.icon} {l.label}
              </Link>
            ))}
            <button onClick={sair} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0.75rem 1rem', borderRadius:'8px', color:'#4A5568', background:'transparent', border:'none', fontSize:'0.9rem', cursor:'pointer', fontFamily:'Sora, sans-serif', marginTop:'auto' }}>
              <LogOut size={16}/> Sair
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
