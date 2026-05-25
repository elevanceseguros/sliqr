'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Zap, Clock, LogOut } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const [plano, setPlano]       = useState('free')
  const [postsHoje, setPostsHoje] = useState(0)
  const [pronto, setPronto]     = useState(false)

  useEffect(() => {
    async function verificar() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }
      const { data: perfil } = await supabase
        .from('perfis')
        .select('plano, posts_hoje')
        .eq('id', session.user.id)
        .single()
      if (perfil) {
        setPlano(perfil.plano ?? 'free')
        setPostsHoje(perfil.posts_hoje ?? 0)
      }
      setPronto(true)
    }
    verificar()
  }, [])

  async function sair() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (!pronto) return (
    <div style={{ minHeight:'100vh', background:'#080B12', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:'#4A5568', fontFamily:'JetBrains Mono, monospace', fontSize:'0.8rem' }}>carregando...</div>
    </div>
  )

  const planoCores: Record<string, string> = {
    free:'#4A5568', starter:'#2D6FFF', pro:'#00D4FF', ilimitado:'#6BCB77',
  }

  return (
    <div style={{ minHeight:'100vh', background:'#080B12', display:'flex' }}>
      <aside style={{ width:'220px', flexShrink:0, background:'#0D1117', borderRight:'1px solid rgba(255,255,255,0.07)', display:'flex', flexDirection:'column', padding:'1.5rem 1rem', position:'fixed', top:0, left:0, bottom:0 }}>
        <Link href="/criar" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', marginBottom:'2rem' }}>
          <div style={{ width:'28px', height:'28px', background:'#2D6FFF', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><rect x="2" y="3" width="5" height="10" rx="1.5"/><rect x="9" y="3" width="5" height="6" rx="1.5"/></svg>
          </div>
          <span style={{ fontWeight:800, fontSize:'1.2rem', letterSpacing:'-0.04em', color:'#F0F4FF' }}>Sliqr</span>
        </Link>

        <nav style={{ display:'flex', flexDirection:'column', gap:'4px', flex:1 }}>
          <Link href="/criar" style={{ display:'flex', alignItems:'center', gap:'8px', padding:'0.6rem 0.75rem', borderRadius:'8px', color:'#8B95A8', textDecoration:'none', fontSize:'0.875rem', fontWeight:500 }}>
            <Zap size={15}/> Criar post
          </Link>
          <Link href="/historico" style={{ display:'flex', alignItems:'center', gap:'8px', padding:'0.6rem 0.75rem', borderRadius:'8px', color:'#8B95A8', textDecoration:'none', fontSize:'0.875rem', fontWeight:500 }}>
            <Clock size={15}/> Histórico
          </Link>
        </nav>

        <div style={{ background:'#111827', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px', padding:'0.75rem', marginBottom:'1rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
            <span style={{ fontSize:'0.7rem', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.08em', textTransform:'uppercase', color:'#4A5568' }}>Plano</span>
            <span style={{ fontSize:'0.72rem', fontWeight:600, color: planoCores[plano] ?? '#4A5568', textTransform:'uppercase', letterSpacing:'0.06em' }}>{plano}</span>
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

        <button onClick={sair} style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', background:'transparent', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'8px', padding:'0.6rem 0.75rem', color:'#4A5568', fontSize:'0.82rem', cursor:'pointer', fontFamily:'Sora, sans-serif' }}>
          <LogOut size={14}/> Sair
        </button>
      </aside>

      <main style={{ flex:1, marginLeft:'220px', minHeight:'100vh' }}>
        {children}
      </main>
    </div>
  )
}
