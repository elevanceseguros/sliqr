import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url)

  const titulo   = searchParams.get('titulo')   ?? ''
  const corpo    = searchParams.get('corpo')    ?? ''
  const destaque = searchParams.get('destaque') ?? ''
  const ordem    = Number(searchParams.get('ordem') ?? 1)
  const total    = Number(searchParams.get('total') ?? 1)
  const cor      = searchParams.get('cor')      ?? '#2D6FFF'
  const wm       = searchParams.get('wm')       === '1'

  const linhas   = corpo.split('\\n').filter(Boolean)
  const primeiro = ordem === 1

  return new ImageResponse(
    (
      <div
        style={{
          width: '1080px',
          height: '1080px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080B12',
          padding: '72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Linha topo */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background: cor, display:'flex' }} />

        {/* Glow */}
        <div style={{
          position:'absolute', top:'-150px', left:'50%',
          width:'700px', height:'400px',
          background:`radial-gradient(ellipse, ${cor}33 0%, transparent 70%)`,
          transform:'translateX(-50%)',
          display:'flex',
        }} />

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:'monospace', fontSize:'22px', color:'#4A5568', letterSpacing:'0.1em' }}>
            {String(ordem).padStart(2,'0')} / {String(total).padStart(2,'0')}
          </span>
          {wm && <span style={{ fontFamily:'monospace', fontSize:'20px', color:'#4A5568' }}>sliqr.com.br</span>}
        </div>

        {/* Conteúdo */}
        <div style={{ display:'flex', flexDirection:'column', flex:1, justifyContent:'center', gap:'28px' }}>
          {primeiro && destaque && (
            <div style={{
              fontSize:'88px', fontWeight:900, color: cor,
              lineHeight:1.0, letterSpacing:'-0.03em', fontFamily:'sans-serif',
            }}>
              {destaque}
            </div>
          )}

          <div style={{
            fontSize: primeiro ? '52px' : '64px',
            fontWeight: 800,
            color: '#F0F4FF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontFamily: 'sans-serif',
          }}>
            {titulo}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {linhas.map((linha, i) => (
              <div key={i} style={{
                fontSize:'36px', color:'#8B95A8',
                lineHeight:1.5, fontWeight:300, fontFamily:'sans-serif',
              }}>
                {linha}
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display:'flex', gap:'8px' }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: i === ordem - 1 ? '32px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === ordem - 1 ? cor : '#1A2235',
            }} />
          ))}
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  )
}
