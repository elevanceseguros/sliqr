import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url)

  const titulo    = searchParams.get('titulo')    ?? ''
  const corpo     = searchParams.get('corpo')     ?? ''
  const destaque  = searchParams.get('destaque')  ?? ''
  const ordem     = Number(searchParams.get('ordem') ?? 1)
  const total     = Number(searchParams.get('total') ?? 1)
  const corMarca  = searchParams.get('cor')       ?? '#2D6FFF'
  const watermark = searchParams.get('wm')        === '1'

  const linhasCorpo = corpo.split('\\n').filter(Boolean)
  const ePrimeiro   = ordem === 1

  return new ImageResponse(
    (
      <div
        style={{
          width:           '1080px',
          height:          '1080px',
          display:         'flex',
          flexDirection:   'column',
          justifyContent:  'space-between',
          background:      '#080B12',
          padding:         '72px',
          fontFamily:      'sans-serif',
          position:        'relative',
          overflow:        'hidden',
        }}
      >
        {/* Glow de fundo */}
        <div style={{
          position:     'absolute',
          top:          '-200px',
          left:         '50%',
          transform:    'translateX(-50%)',
          width:        '800px',
          height:       '500px',
          background:   `radial-gradient(ellipse, ${corMarca}22 0%, transparent 70%)`,
          pointerEvents:'none',
        }} />

        {/* Grid lines */}
        <div style={{
          position:   'absolute',
          inset:      0,
          backgroundImage: `linear-gradient(${corMarca}08 1px, transparent 1px), linear-gradient(90deg, ${corMarca}08 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        {/* Linha de cor no topo */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '4px',
          background: corMarca,
        }} />

        {/* Número do slide */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          position:       'relative',
        }}>
          <div style={{
            fontSize:     '22px',
            color:        '#4A5568',
            fontFamily:   'monospace',
            letterSpacing:'0.1em',
          }}>
            {String(ordem).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          {watermark && (
            <div style={{
              fontSize:     '20px',
              color:        '#4A5568',
              fontFamily:   'monospace',
              letterSpacing:'0.06em',
            }}>
              sliqr.com.br
            </div>
          )}
        </div>

        {/* Conteúdo central */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          flex:          1,
          justifyContent:'center',
          gap:           '32px',
          position:      'relative',
        }}>
          {/* Destaque (só slide 1) */}
          {ePrimeiro && destaque && (
            <div style={{
              fontSize:      '96px',
              fontWeight:    900,
              color:         corMarca,
              lineHeight:    1.0,
              letterSpacing: '-0.03em',
            }}>
              {destaque}
            </div>
          )}

          {/* Título */}
          <div style={{
            fontSize:      ePrimeiro ? '52px' : '64px',
            fontWeight:    800,
            color:         '#F0F4FF',
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
          }}>
            {titulo}
          </div>

          {/* Corpo */}
          <div style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '16px',
          }}>
            {linhasCorpo.map((linha, i) => (
              <div key={i} style={{
                fontSize:   '36px',
                color:      '#8B95A8',
                lineHeight: 1.5,
                fontWeight: 300,
              }}>
                {linha}
              </div>
            ))}
          </div>
        </div>

        {/* Barra inferior */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          position:       'relative',
        }}>
          <div style={{
            display: 'flex',
            gap:     '8px',
          }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{
                width:        i === ordem - 1 ? '32px' : '8px',
                height:       '8px',
                borderRadius: '4px',
                background:   i === ordem - 1 ? corMarca : '#1A2235',
              }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  )
}
