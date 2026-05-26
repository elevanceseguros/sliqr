const ICONS: Record<string, string> = {
  'shield':       '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'heart':        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  'star':         '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'check':        '<polyline points="20 6 9 17 4 12"/>',
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
  'stethoscope':  '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>',
  'piggy-bank':   '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.8 1.7-1.8 2-3h2v-4h-2c0-1-.5-1.5-1-2h0z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>',
  'activity':     '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  'map-pin':      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
}

function ico(n: string, sz: number, cor: string, sw = 1.6): string {
  const p = ICONS[n] ?? ICONS['star']
  return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex-shrink:0;">${p}</svg>`
}

function lum(h: string) {
  return (parseInt(h.slice(1,3)||'88',16)*.299+parseInt(h.slice(3,5)||'88',16)*.587+parseInt(h.slice(5,7)||'88',16)*.114)/255
}
function drk(h: string, f=0.4): string {
  return '#'+[1,3,5].map(i=>Math.round(parseInt(h.slice(i,i+2)||'88',16)*f).toString(16).padStart(2,'0')).join('')
}
function trunc(s: string, max: number) { return s.length>max ? s.slice(0,max-1)+'…' : s }

export interface SlideCfg {
  cor: string
  fonte: string
  estilo: 'minimal' | 'modern'
  logoUrl?: string
  logoX?: number
  logoY?: number
  logoW?: number
}

export function gerarHTML(slide: any, total: number, idx: number, cfg: SlideCfg, fotoUrl?: string): string {
  const cor    = cfg.cor
  const dark   = lum(cor) < 0.55
  const txt    = '#FFFFFF'
  const sub    = 'rgba(255,255,255,0.82)'
  const icCor  = dark ? '#FFFFFF' : drk(cor, 0.28)
  const isMin  = cfg.estilo === 'minimal'

  const FF: Record<string,string> = { inter:'Inter', montserrat:'Montserrat', playfair:'Playfair Display' }
  const fn = FF[cfg.fonte] ?? 'Inter'
  const fw = cfg.fonte==='playfair' ? '700' : '900'

  const fi = cfg.fonte==='playfair'
    ? `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`
    : cfg.fonte==='montserrat'
    ? `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');`
    : `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');`

  // Logo — não incluída aqui, será injetada pelo servidor no download
  // (no preview é overlay do frontend)

  const temFoto = !!fotoUrl && ['capa','cta'].includes(slide.tipo)
  const bgStyle = temFoto
    ? `background:${drk(cor,0.55)};`
    : isMin
    ? `background:${cor};`
    : `background:linear-gradient(140deg,${cor} 0%,${drk(cor,0.42)} 100%);`

  const fotoHtml = temFoto ? `
    <img src="${fotoUrl}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.32;z-index:0;" />
    <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.32) 55%,rgba(0,0,0,0.78) 100%);z-index:1;"></div>` : ''

  const decos = isMin && !temFoto
    ? `<div style="position:absolute;bottom:44px;right:44px;width:26px;height:26px;background:rgba(255,255,255,0.18);transform:rotate(45deg);z-index:2;"></div>`
    : !isMin ? `
      <div style="position:absolute;top:-80px;right:-80px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,0.05);z-index:2;"></div>
      <div style="position:absolute;bottom:-60px;left:-60px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.04);z-index:2;"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,${drk(cor,0.55)},${cor},${drk(cor,0.55)});z-index:3;"></div>` : ''

  const tipo = slide.tipo
  const PAD  = 80
  const BOT  = 150
  const H    = 1080 - PAD - BOT

  let content = ''

  // ── CAPA ──────────────────────────────────────────────────────────────────
  if (tipo === 'capa') {
    const tit = trunc(slide.titulo??'', 55)
    const sub2 = trunc(slide.subtitulo??'', 110)
    const fsT  = tit.length>30 ? 82 : tit.length>20 ? 94 : 104

    content = `
    <div style="position:absolute;top:${PAD}px;left:${PAD}px;right:${PAD}px;height:${H}px;display:flex;flex-direction:column;justify-content:center;z-index:4;">
      ${!isMin ? `<div style="display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:8px;padding:10px 20px;align-self:flex-start;margin-bottom:28px;">
        ${ico(slide.icon_nome??'star',18,'rgba(255,255,255,0.9)')}
        <span style="font-family:'${fn}',sans-serif;font-size:16px;font-weight:700;color:rgba(255,255,255,0.9);letter-spacing:2px;text-transform:uppercase;">${trunc((slide.subtitulo??'').split(' ').slice(0,3).join(' '),18)}</span>
      </div>` : ''}
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;">${tit}</div>
      ${sub2 ? `<div style="font-family:'${fn}',sans-serif;font-size:36px;font-weight:400;color:${sub};margin-top:24px;line-height:1.55;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${sub2}</div>` : ''}
    </div>`
  }

  // ── ÍCONES ────────────────────────────────────────────────────────────────
  else if (tipo === 'icones') {
    const itens = (slide.itens??[]).slice(0,3)
    const qtd   = itens.length || 1
    const colW  = Math.floor(860/qtd)
    const cols  = itens.map((item: any) => `
      <div style="display:flex;flex-direction:column;align-items:center;gap:16px;width:${colW}px;text-align:center;">
        <div style="width:108px;height:108px;border-radius:${isMin?'0':'20px'};background:rgba(255,255,255,${isMin?'0':'0.12'});display:flex;align-items:center;justify-content:center;">
          ${ico(item.icone??'star',54,icCor,1.5)}
        </div>
        <div style="font-family:'${fn}',sans-serif;font-size:28px;font-weight:600;color:${txt};line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${trunc(item.label??'',28)}</div>
      </div>`).join('')

    const fsT = (slide.titulo??'').length>25 ? 74 : 84
    content = `
    <div style="position:absolute;top:${PAD}px;left:${PAD}px;right:${PAD}px;height:${H}px;display:flex;flex-direction:column;z-index:4;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;margin-bottom:52px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${trunc(slide.titulo??'',48)}</div>
      <div style="display:flex;justify-content:center;gap:0;flex:1;align-items:center;">${cols}</div>
    </div>`
  }

  // ── TÓPICO ────────────────────────────────────────────────────────────────
  else if (tipo === 'topico') {
    const tit   = trunc(slide.titulo??'',42)
    const corpo = trunc(slide.corpo??'',190)
    const fsT   = tit.length>24 ? 74 : tit.length>18 ? 82 : 88
    const fsC   = corpo.length>100 ? 34 : 38

    content = isMin ? `
    <div style="position:absolute;top:${PAD}px;left:${PAD}px;right:${PAD}px;height:${H}px;display:flex;flex-direction:column;justify-content:center;z-index:4;">
      <div style="width:3px;height:68px;background:rgba(255,255,255,0.5);margin-bottom:28px;border-radius:2px;"></div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;margin-bottom:22px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${tit}</div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsC}px;font-weight:400;color:${sub};line-height:1.65;overflow:hidden;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;">${corpo}</div>
    </div>` : `
    <div style="position:absolute;top:${PAD}px;left:${PAD}px;right:${PAD}px;height:${H}px;display:flex;flex-direction:column;justify-content:center;z-index:4;">
      <div style="width:90px;height:90px;border-radius:20px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;margin-bottom:30px;">
        ${ico(slide.icon_nome??'star',46,icCor)}
      </div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;margin-bottom:16px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${tit}</div>
      <div style="width:50px;height:3px;background:rgba(255,255,255,0.35);border-radius:2px;margin-bottom:18px;"></div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsC}px;font-weight:400;color:${sub};line-height:1.65;overflow:hidden;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;">${corpo}</div>
    </div>`
  }

  // ── LISTA ─────────────────────────────────────────────────────────────────
  else if (tipo === 'lista') {
    const itens = (slide.itens??[]).slice(0,5)
    const n     = itens.length
    const fsT   = n>=5 ? 62 : 70
    const fsI   = n>=5 ? 32 : 36
    const padI  = n>=5 ? 14 : 17

    const rows = itens.map((it: string) => `
      <div style="display:flex;align-items:center;gap:18px;padding:${padI}px 0;border-bottom:1px solid rgba(255,255,255,0.14);">
        ${ico('check-circle',30,icCor,1.8)}
        <span style="font-family:'${fn}',sans-serif;font-size:${fsI}px;font-weight:500;color:${txt};line-height:1.25;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${trunc(it,52)}</span>
      </div>`).join('')

    content = `
    <div style="position:absolute;top:${PAD}px;left:${PAD}px;right:${PAD}px;height:${H}px;display:flex;flex-direction:column;justify-content:center;z-index:4;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;margin-bottom:26px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${trunc(slide.titulo??'',48)}</div>
      ${rows}
    </div>`
  }

  // ── CTA ───────────────────────────────────────────────────────────────────
  else {
    const tit  = trunc(slide.titulo??'',38)
    const sub2 = trunc(slide.subtitulo??'',95)
    const fsT  = tit.length>18 ? 82 : tit.length>12 ? 94 : 106

    content = `
    <div style="position:absolute;top:${PAD}px;left:${PAD}px;right:${PAD}px;height:${H}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:4;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-3px;text-transform:uppercase;margin-bottom:26px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${tit}</div>
      ${sub2 ? `<div style="font-family:'${fn}',sans-serif;font-size:34px;font-weight:400;color:${sub};margin-bottom:44px;line-height:1.55;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${sub2}</div>` : ''}
      <div style="display:inline-flex;align-items:center;gap:14px;background:rgba(255,255,255,0.14);border:2px solid rgba(255,255,255,0.32);border-radius:999px;padding:20px 54px;">
        ${ico('phone',26,'#FFFFFF',2)}
        <span style="font-family:'${fn}',sans-serif;font-size:30px;font-weight:700;color:#FFFFFF;letter-spacing:1px;">Me chame no direct</span>
      </div>
    </div>`
  }

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>${fi}*{box-sizing:border-box;margin:0;padding:0;}body{width:1080px;height:1080px;overflow:hidden;}</style>
</head><body>
<div style="width:1080px;height:1080px;position:relative;overflow:hidden;${bgStyle}">
  ${fotoHtml}${decos}${content}
</div>
</body></html>`
}
