const ICONS: Record<string, string> = {
  'shield':       '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'heart':        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  'star':         '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'zap':          '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'trending-up':  '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  'users':        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'clock':        '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'dollar-sign':  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  'award':        '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>',
  'lock':         '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'phone':        '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.99-2H6.6a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.91-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'target':       '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'bar-chart':    '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  'briefcase':    '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'home':         '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'leaf':         '<path d="M2 22l10-10"/><path d="M16 8c0 4.42-3.58 8-8 8a8 8 0 0 1 8-16c4.42 0 8 3.58 8 8z"/>',
  'book':         '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  'mail':         '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  'info':         '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  'piggy-bank':   '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.8 1.7-1.8 2-3h2v-4h-2c0-1-.5-1.5-1-2h0z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>',
  'stethoscope':  '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>',
}

function svgIcon(nome: string, size = 44, cor = '#FFFFFF'): string {
  const paths = ICONS[nome] ?? ICONS['star']
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}

function lum(hex: string) {
  const r = parseInt(hex.slice(1,3)||'88',16)
  const g = parseInt(hex.slice(3,5)||'88',16)
  const b = parseInt(hex.slice(5,7)||'88',16)
  return (r*.299 + g*.587 + b*.114) / 255
}

function esc(hex: string, f = 0.4): string {
  const r = parseInt(hex.slice(1,3)||'88',16)
  const g = parseInt(hex.slice(3,5)||'88',16)
  const b = parseInt(hex.slice(5,7)||'88',16)
  return '#'+[r,g,b].map(v=>Math.round(v*f).toString(16).padStart(2,'0')).join('')
}

export interface SlideCfg {
  cor: string
  fonte: string
  logoUrl?: string
  logoX?: number
  logoY?: number
  logoW?: number
}

export function gerarHTML(slide: any, total: number, idx: number, cfg: SlideCfg): string {
  const cor    = cfg.cor
  const escuro = esc(cor, 0.38)
  const isDark = lum(cor) < 0.55
  const txt    = isDark ? '#FFFFFF' : '#111111'
  const sub    = isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.62)'
  const ic     = isDark ? '#FFFFFF' : esc(cor, 0.45)
  const ac     = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)'
  const div    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)'

  const FF: Record<string,string> = {
    inter:      '"Inter", sans-serif',
    playfair:   '"Playfair Display", serif',
    montserrat: '"Montserrat", sans-serif',
  }
  const ff = FF[cfg.fonte] ?? FF.inter

  const fontLink = cfg.fonte === 'playfair'
    ? '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">'
    : cfg.fonte === 'montserrat'
    ? '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap" rel="stylesheet">'
    : '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">'

  const dots = Array.from({length:total},(_,i)=>
    `<div style="width:${i===idx?'28px':'8px'};height:8px;border-radius:4px;background:${i===idx?(isDark?'rgba(255,255,255,0.9)':esc(cor,0.5)):(isDark?'rgba(255,255,255,0.25)':'rgba(0,0,0,0.18)')};flex-shrink:0;"></div>`
  ).join('')

  const lW = cfg.logoW ?? 160
  const lH = 70
  const lX = Math.round((cfg.logoX ?? 0.5) * 1080 - lW/2)
  const lY = Math.round((cfg.logoY ?? 0.90) * 1080 - lH/2)
  // Logo não é renderizada no HTML base — é composta no download final
  const logoHtml = ''

  let body = ''

  if (slide.tipo === 'capa') {
    body = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:80px 88px 180px;">
      <div style="display:inline-flex;align-items:center;gap:12px;background:${ac};border:1px solid ${isDark?'rgba(255,255,255,0.15)':'rgba(0,0,0,0.10)'};border-radius:8px;padding:10px 22px;align-self:flex-start;margin-bottom:36px;">
        ${svgIcon(slide.icon_nome??'star',20,ic)}
        <span style="font-family:${ff};font-size:18px;font-weight:700;color:${ic};letter-spacing:2px;text-transform:uppercase;">${(slide.subtitulo??'').split(' ').slice(0,3).join(' ')}</span>
      </div>
      <h1 style="font-family:${ff};font-size:90px;font-weight:900;line-height:1.0;color:${txt};margin:0 0 32px;letter-spacing:-2px;">${slide.titulo}</h1>
      <p style="font-family:${ff};font-size:38px;font-weight:400;color:${sub};margin:0;line-height:1.65;max-width:860px;">${slide.subtitulo??''}</p>
    </div>`

  } else if (slide.tipo === 'topico') {
    body = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:80px 88px 180px;">
      <div style="width:96px;height:96px;border-radius:22px;background:${ac};display:flex;align-items:center;justify-content:center;margin-bottom:40px;">
        ${svgIcon(slide.icon_nome??'star',48,ic)}
      </div>
      <h1 style="font-family:${ff};font-size:82px;font-weight:900;line-height:1.05;color:${txt};margin:0 0 24px;letter-spacing:-2px;">${slide.titulo}</h1>
      <div style="width:64px;height:3px;background:${isDark?'rgba(255,255,255,0.35)':esc(cor,0.35)};border-radius:2px;margin-bottom:28px;"></div>
      <p style="font-family:${ff};font-size:38px;font-weight:400;color:${sub};margin:0;line-height:1.7;">${slide.corpo??''}</p>
    </div>`

  } else if (slide.tipo === 'lista') {
    const itens = (slide.itens??[]).slice(0,5)
    const rows = itens.map((it:string)=>`
      <div style="display:flex;align-items:center;gap:20px;padding:20px 0;border-bottom:1px solid ${div};">
        ${svgIcon('check-circle',32,ic)}
        <span style="font-family:${ff};font-size:36px;font-weight:500;color:${txt};line-height:1.3;">${it}</span>
      </div>`).join('')
    body = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;padding:72px 88px 180px;">
      <h1 style="font-family:${ff};font-size:72px;font-weight:900;line-height:1.05;color:${txt};margin:0 0 36px;letter-spacing:-2px;">${slide.titulo}</h1>
      ${rows}
    </div>`

  } else {
    body = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 88px 180px;text-align:center;">
      <h1 style="font-family:${ff};font-size:96px;font-weight:900;line-height:1.0;color:${txt};margin:0 0 28px;letter-spacing:-2px;">${slide.titulo}</h1>
      <p style="font-family:${ff};font-size:38px;font-weight:400;color:${sub};margin:0 0 52px;line-height:1.6;">${slide.subtitulo??''}</p>
      <div style="background:${ac};border:2px solid ${isDark?'rgba(255,255,255,0.25)':esc(cor,0.35)};border-radius:999px;padding:22px 64px;">
        <span style="font-family:${ff};font-size:34px;font-weight:700;color:${txt};letter-spacing:1px;">Swipe para ver mais →</span>
      </div>
    </div>`
  }

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
${fontLink}
<style>*{box-sizing:border-box;margin:0;padding:0;}body{width:1080px;height:1080px;overflow:hidden;}</style>
</head><body>
<div style="width:1080px;height:1080px;position:relative;overflow:hidden;background:linear-gradient(140deg,${cor} 0%,${escuro} 100%);">
  <div style="position:absolute;top:-100px;right:-100px;width:420px;height:420px;border-radius:50%;background:${isDark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)'}"></div>
  <div style="position:absolute;bottom:-80px;left:-80px;width:280px;height:280px;border-radius:50%;background:${isDark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)'}"></div>
  <div style="position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,${esc(cor,0.6)},${cor},${esc(cor,0.6)})"></div>
  ${body}
  ${logoHtml}
  <div style="position:absolute;bottom:44px;left:0;right:0;display:flex;justify-content:center;gap:10px;align-items:center;">${dots}</div>
</div>
</body></html>`
}
