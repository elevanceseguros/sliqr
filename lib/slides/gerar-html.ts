// ─── SLIQR Motor HTML v8 — Posicionamento absoluto, sem truncamento ───────────

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
  return (parseInt(h.slice(1,3)||'88',16)*.299 + parseInt(h.slice(3,5)||'88',16)*.587 + parseInt(h.slice(5,7)||'88',16)*.114) / 255
}

function drk(h: string, f = 0.4): string {
  return '#' + [1,3,5].map(i => Math.round(parseInt(h.slice(i,i+2)||'88',16)*f).toString(16).padStart(2,'0')).join('')
}

// Calcula altura real que o título vai ocupar (nLinhas * fsT * lineHeight + marginBottom)
function calcTituloH(titulo: string, txtW: number, fsT: number): number {
  const FATOR = 0.68
  const charsPerLine = txtW / (fsT * FATOR)
  const nLinhas = Math.ceil((titulo.length || 1) / charsPerLine)
  return Math.ceil(fsT * 1.15 * nLinhas) + 24
}

// Encontra o maior fsT tal que cardH >= minCardH para nItens itens
function calcLayout(titulo: string, txtW: number, nItens: number, maxFs: number, tituloTop: number): {
  fsT: number, cardH: number, itensTop: number
} {
  const FOOTER_TOP = 940  // 1080 - 140
  const MIN_CARD_H = 72

  for (let fsT = maxFs; fsT >= 36; fsT -= 2) {
    const tH       = calcTituloH(titulo, txtW, fsT)
    const itensTop = tituloTop + tH
    const cardH    = Math.floor((FOOTER_TOP - itensTop) / nItens)
    if (cardH >= MIN_CARD_H) {
      return { fsT, cardH, itensTop }
    }
  }
  const fsT      = 36
  const tH       = calcTituloH(titulo, txtW, fsT)
  const itensTop = tituloTop + tH
  const cardH    = Math.floor((FOOTER_TOP - itensTop) / nItens)
  return { fsT, cardH: Math.max(cardH, MIN_CARD_H), itensTop }
}

// Font-size para textos sem itens (capa, topico, cta)
function fsTitulo(titulo: string, txtW: number, maxFs: number, maxLinhas = 3, upper = true): number {
  const fator = upper ? 0.68 : 0.52
  for (let fs = maxFs; fs >= 36; fs -= 2) {
    const charsPerLine = txtW / (fs * fator)
    const nLinhas = Math.ceil((titulo.length || 1) / charsPerLine)
    if (nLinhas <= maxLinhas) return fs
  }
  return 36
}

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
  const cor   = cfg.cor
  const dark  = lum(cor) < 0.55
  const txt   = '#FFFFFF'
  const sub   = 'rgba(255,255,255,0.80)'
  const icCor = dark ? 'rgba(255,255,255,0.90)' : drk(cor, 0.25)
  const isMin = cfg.estilo === 'minimal'

  const FF: Record<string,string> = { inter:'Inter', montserrat:'Montserrat', playfair:'Playfair Display' }
  const fn = FF[cfg.fonte] ?? 'Inter'
  const fw = cfg.fonte === 'playfair' ? '700' : '900'

  const fi = cfg.fonte === 'playfair'
    ? `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`
    : cfg.fonte === 'montserrat'
    ? `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');`
    : `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');`

  const PAD    = 72
  const HEADER = 80
  const FOOTER = 140

  const temFoto      = !!fotoUrl
  const W            = 1080 - PAD * 2  // 936

  const bgStyle = temFoto
    ? `background:${drk(cor, 0.50)};`
    : isMin
    ? `background:${cor};`
    : `background:linear-gradient(145deg,${cor} 0%,${drk(cor,0.40)} 100%);`

  const isFotoFull    = temFoto && ['capa','cta'].includes(slide.tipo)
  const isFotoLateral = temFoto && !['capa','cta'].includes(slide.tipo)

  const fotoHtml = isFotoFull ? `
    <img src="${fotoUrl}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.30;z-index:0;"/>
    <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(0,0,0,0.80) 0%,rgba(0,0,0,0.28) 55%,rgba(0,0,0,0.72) 100%);z-index:1;"></div>`
  : isFotoLateral ? `
    <img src="${fotoUrl}" style="position:absolute;top:0;right:0;width:42%;height:100%;object-fit:cover;opacity:0.40;z-index:0;"/>
    <div style="position:absolute;top:0;right:0;width:50%;height:100%;background:linear-gradient(90deg,${cor} 0%,transparent 60%);z-index:1;"></div>`
  : ''

  const decos = isMin
    ? `<div style="position:absolute;bottom:${FOOTER-20}px;right:${PAD}px;width:24px;height:24px;background:rgba(255,255,255,0.18);transform:rotate(45deg);z-index:2;"></div>`
    : `
      <div style="position:absolute;top:-60px;right:-60px;width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,0.05);z-index:2;"></div>
      <div style="position:absolute;bottom:${FOOTER}px;left:-40px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,0.04);z-index:2;"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,${drk(cor,0.55)},${cor},${drk(cor,0.55)});z-index:3;"></div>`

  const header = `
    <div style="position:absolute;top:${PAD}px;right:${PAD}px;z-index:4;">
      <span style="font-family:'${fn}',sans-serif;font-size:18px;font-weight:500;color:rgba(255,255,255,0.30);letter-spacing:1px;">${idx+1} / ${total}</span>
    </div>`

  const lW = Math.min(cfg.logoW ?? 150, 280)
  const lH = 56
  const lX = cfg.logoX != null ? Math.round(cfg.logoX*1080 - lW/2) : Math.round(540 - lW/2)
  const lY = cfg.logoY != null ? Math.round(cfg.logoY*1080 - lH/2) : 1080 - FOOTER + 32
  const footer = `
    <div style="position:absolute;bottom:0;left:0;right:0;height:${FOOTER}px;z-index:4;">
      <div style="position:absolute;top:0;left:${PAD}px;right:${PAD}px;height:1px;background:rgba(255,255,255,0.16);"></div>
      <div style="position:absolute;top:28px;left:50%;transform:translateX(-50%);display:flex;gap:8px;align-items:center;">
        ${Array.from({length:total},(_,i)=>`<div style="width:${i===idx?'28px':'7px'};height:7px;border-radius:4px;background:${i===idx?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.22)'}"></div>`).join('')}
      </div>
    </div>`

  // Largura real do container de texto
  const hasLat = isFotoLateral
  const txtW   = hasLat ? Math.floor(W * 0.54) : W
  const rightV = hasLat ? 'auto' : `${PAD}px`
  const widthV = hasLat ? `${txtW}px` : 'auto'

  // Top absoluto do título: logo abaixo do header
  const TITULO_TOP = HEADER + 32

  // Estilo base para elementos posicionados absolutamente na área de texto
  const absBase = `position:absolute;left:${PAD}px;right:${rightV};width:${widthV};box-sizing:border-box;z-index:4;`

  let body = ''
  const tipo = slide.tipo

  // ── CAPA ──────────────────────────────────────────────────────────────────
  if (tipo === 'capa') {
    const titulo = slide.titulo ?? ''
    const subtit = slide.subtitulo ?? ''
    const fsT    = fsTitulo(titulo, W, 108, 3)
    const fsS    = fsTitulo(subtit, W, 40, 3, false)
    const CONTENT_TOP    = HEADER
    const CONTENT_BOTTOM = FOOTER

    body = `
    <div style="position:absolute;top:${CONTENT_TOP}px;bottom:${CONTENT_BOTTOM}px;left:${PAD}px;right:${PAD}px;display:flex;flex-direction:column;justify-content:center;gap:28px;z-index:4;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.15;color:${txt};letter-spacing:-2px;text-transform:uppercase;">${titulo}</div>
      ${subtit ? `<div style="font-family:'${fn}',sans-serif;font-size:${fsS}px;font-weight:400;color:${sub};line-height:1.55;">${subtit}</div>` : ''}
    </div>`
  }

  // ── ÍCONES ────────────────────────────────────────────────────────────────
  else if (tipo === 'icones') {
    const titulo = slide.titulo ?? ''
    const itens  = (slide.itens ?? []).slice(0, 3)
    const n      = itens.length || 1
    const { fsT, cardH, itensTop } = calcLayout(titulo, txtW, n, 80, TITULO_TOP)
    const fsL = Math.max(24, Math.min(32, Math.floor(cardH * 0.30)))

    const tituloDiv = `<div style="${absBase}top:${TITULO_TOP}px;font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.15;color:${txt};letter-spacing:-2px;text-transform:uppercase;">${titulo}</div>`

    const cards = itens.map((item: any, i: number) => {
      const top    = itensTop + i * cardH
      const border = i < n-1 ? '1px solid rgba(255,255,255,0.10)' : 'none'
      return `<div style="${absBase}top:${top}px;min-height:${cardH}px;display:flex;align-items:center;gap:28px;border-bottom:${border};">
        <div style="width:72px;height:72px;border-radius:18px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${ico(item.icone ?? 'star', 36, icCor, 1.6)}
        </div>
        <span style="font-family:'${fn}',sans-serif;font-size:${fsL}px;font-weight:700;color:${txt};line-height:1.3;flex:1;">${item.label ?? ''}</span>
        <span style="font-family:'${fn}',sans-serif;font-size:18px;font-weight:600;color:rgba(255,255,255,0.22);flex-shrink:0;">${String(i+1).padStart(2,'0')}</span>
      </div>`
    }).join('')

    body = tituloDiv + cards
  }

  // ── TÓPICO ────────────────────────────────────────────────────────────────
  else if (tipo === 'topico') {
    const titulo = slide.titulo ?? ''
    const corpo  = slide.corpo ?? ''
    const fsT    = fsTitulo(titulo, txtW, 80, 3)
    const fsC    = fsTitulo(corpo, txtW, 38, 6, false)
    const CONTENT_TOP    = HEADER
    const CONTENT_BOTTOM = FOOTER

    body = isMin ? `
    <div style="position:absolute;top:${CONTENT_TOP}px;bottom:${CONTENT_BOTTOM}px;left:${PAD}px;right:${PAD}px;display:flex;flex-direction:column;justify-content:center;gap:28px;z-index:4;">
      <div style="width:4px;height:60px;background:rgba(255,255,255,0.45);border-radius:2px;flex-shrink:0;"></div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.15;color:${txt};letter-spacing:-2px;text-transform:uppercase;">${titulo}</div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsC}px;font-weight:400;color:${sub};line-height:1.6;">${corpo}</div>
    </div>` : `
    <div style="position:absolute;top:${CONTENT_TOP}px;bottom:${CONTENT_BOTTOM}px;left:${PAD}px;right:${rightV};width:${widthV};display:flex;flex-direction:column;justify-content:center;gap:22px;z-index:4;box-sizing:border-box;">
      <div style="width:80px;height:80px;border-radius:20px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        ${ico(slide.icon_nome ?? 'star', 44, icCor)}
      </div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.15;color:${txt};letter-spacing:-2px;text-transform:uppercase;flex-shrink:0;">${titulo}</div>
      <div style="width:48px;height:3px;background:rgba(255,255,255,0.35);border-radius:2px;flex-shrink:0;"></div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsC}px;font-weight:400;color:${sub};line-height:1.6;">${corpo}</div>
    </div>`
  }

  // ── LISTA ─────────────────────────────────────────────────────────────────
  else if (tipo === 'lista') {
    const titulo = slide.titulo ?? ''
    const itens  = (slide.itens ?? []).slice(0, 5)
    const n      = itens.length || 1
    const { fsT, cardH, itensTop } = calcLayout(titulo, txtW, n, 76, TITULO_TOP)
    const fsI = Math.max(22, Math.min(34, Math.floor(cardH * 0.30)))

    const tituloDiv = `<div style="${absBase}top:${TITULO_TOP}px;font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.15;color:${txt};letter-spacing:-2px;text-transform:uppercase;">${titulo}</div>`

    const rows = itens.map((it: string, i: number) => {
      const top    = itensTop + i * cardH
      const border = i < n-1 ? '1px solid rgba(255,255,255,0.10)' : 'none'
      return `<div style="${absBase}top:${top}px;min-height:${cardH}px;display:flex;align-items:center;gap:28px;border-bottom:${border};">
        <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="font-family:'${fn}',sans-serif;font-size:20px;font-weight:700;color:rgba(255,255,255,0.90);">${i+1}</span>
        </div>
        <span style="font-family:'${fn}',sans-serif;font-size:${fsI}px;font-weight:500;color:${txt};line-height:1.3;flex:1;">${it}</span>
      </div>`
    }).join('')

    body = tituloDiv + rows
  }

  // ── CTA ───────────────────────────────────────────────────────────────────
  else {
    const titulo = slide.titulo ?? ''
    const subtit = slide.subtitulo ?? ''
    const fsT    = fsTitulo(titulo, W, 108, 3)
    const fsS    = fsTitulo(subtit, W, 38, 2, false)
    const CONTENT_TOP    = HEADER
    const CONTENT_BOTTOM = FOOTER

    body = `
    <div style="position:absolute;top:${CONTENT_TOP}px;bottom:${CONTENT_BOTTOM}px;left:${PAD}px;right:${PAD}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:32px;z-index:4;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.15;color:${txt};letter-spacing:-3px;text-transform:uppercase;">${titulo}</div>
      ${subtit ? `<div style="font-family:'${fn}',sans-serif;font-size:${fsS}px;font-weight:400;color:${sub};line-height:1.55;">${subtit}</div>` : ''}
      <div style="display:inline-flex;align-items:center;gap:14px;background:rgba(255,255,255,0.14);border:2px solid rgba(255,255,255,0.32);border-radius:999px;padding:22px 60px;margin-top:8px;">
        ${ico('phone', 28, '#FFFFFF', 2)}
        <span style="font-family:'${fn}',sans-serif;font-size:32px;font-weight:700;color:#FFFFFF;letter-spacing:0.5px;">Me chame no direct</span>
      </div>
    </div>`
  }

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>${fi}*{box-sizing:border-box;margin:0;padding:0;}body{width:1080px;height:1080px;overflow:hidden;}</style>
</head><body>
<div style="width:1080px;height:1080px;position:relative;overflow:hidden;${bgStyle}">
  ${fotoHtml}${decos}${header}${body}${footer}
</div>
</body></html>`
}
