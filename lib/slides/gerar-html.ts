// ─── SLIQR Motor HTML v4 — Sistema visual coeso ───────────────────────────────
// Grid consistente: PAD=72px em todos os lados
// Hierarquia tipográfica única: título sempre no topo, conteúdo abaixo
// Todos os slides têm o mesmo "peso visual"

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

function trunc(s: string, max: number) {
  return s.length > max ? s.slice(0, max-1) + '…' : s
}

// Font-size adaptativo considerando largura disponível e comprimento do título
// larguraDisp: largura em px onde o texto vai renderizar
function fsTitulo(titulo: string, base: number, larguraDisp = 936): number {
  const len = titulo.length
  // Estimativa: cada char bold Inter ocupa ~0.58 * fontSize em largura
  // Queremos que o título caiba em 2 linhas no máximo
  // Chars por linha = larguraDisp / (fontSize * 0.58)
  // 2 linhas => charsMax = 2 * larguraDisp / (fontSize * 0.58)
  // Resolvendo: fontSize = 2 * larguraDisp / (len * 0.58)
  const fsIdeal = Math.round((2 * larguraDisp) / (len * 0.60))
  // Limitar entre 48 e base
  return Math.max(48, Math.min(base, fsIdeal))
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
  const cor    = cfg.cor
  const dark   = lum(cor) < 0.55
  const txt    = '#FFFFFF'
  const sub    = 'rgba(255,255,255,0.80)'
  const icCor  = dark ? 'rgba(255,255,255,0.90)' : drk(cor, 0.25)
  const isMin  = cfg.estilo === 'minimal'

  const FF: Record<string,string> = {
    inter: 'Inter', montserrat: 'Montserrat', playfair: 'Playfair Display'
  }
  const fn = FF[cfg.fonte] ?? 'Inter'
  const fw = cfg.fonte === 'playfair' ? '700' : '900'

  const fi = cfg.fonte === 'playfair'
    ? `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`
    : cfg.fonte === 'montserrat'
    ? `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');`
    : `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');`

  // ── SISTEMA DE GRID ──────────────────────────────────────────────────────
  // PAD: margem em todos os lados
  // HEADER: zona do número do slide (topo)
  // FOOTER: zona da logo + linha (rodapé)
  // CONTENT: área útil restante
  const PAD     = 72
  const HEADER  = 80   // altura da zona de cabeçalho
  const FOOTER  = 140  // altura da zona de rodapé (logo + espaço)
  const CONTENT = 1080 - HEADER - FOOTER  // = 860px disponíveis para conteúdo
  const W       = 1080 - PAD * 2          // = 936px de largura útil

  // ── FUNDO ────────────────────────────────────────────────────────────────
  const temFoto = !!fotoUrl
  const bgStyle = temFoto
    ? `background:${drk(cor, 0.50)};`
    : isMin
    ? `background:${cor};`
    : `background:linear-gradient(145deg,${cor} 0%,${drk(cor,0.40)} 100%);`

  const isFotoFull = temFoto && ['capa','cta'].includes(slide.tipo)
  const isFotoLateral = temFoto && !['capa','cta'].includes(slide.tipo)

  // Capa/CTA: foto full background com overlay escuro
  // Outros slides: foto no lado direito (40% da largura) com gradiente de fusão
  const fotoHtml = isFotoFull ? `
    <img src="${fotoUrl}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.30;z-index:0;"/>
    <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(0,0,0,0.80) 0%,rgba(0,0,0,0.28) 55%,rgba(0,0,0,0.72) 100%);z-index:1;"></div>`
  : isFotoLateral ? `
    <img src="${fotoUrl}" style="position:absolute;top:0;right:0;width:42%;height:100%;object-fit:cover;opacity:0.40;z-index:0;"/>
    <div style="position:absolute;top:0;right:0;width:42%;height:100%;background:linear-gradient(90deg,${bgStyle.includes(cor)?cor:'rgba(0,0,0,0)'} 0%,transparent 40%);z-index:1;"></div>`
  : ''

  // ── DECORATIVOS (consistentes em todos os slides) ─────────────────────────
  const decos = isMin
    ? `<div style="position:absolute;bottom:${FOOTER - 20}px;right:${PAD}px;width:24px;height:24px;background:rgba(255,255,255,0.18);transform:rotate(45deg);z-index:2;"></div>`
    : `
      <div style="position:absolute;top:-60px;right:-60px;width:260px;height:260px;border-radius:50%;background:rgba(255,255,255,0.05);z-index:2;"></div>
      <div style="position:absolute;bottom:${FOOTER}px;left:-40px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,0.04);z-index:2;"></div>
      <div style="position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,${drk(cor,0.55)},${cor},${drk(cor,0.55)});z-index:3;"></div>`

  // ── CABEÇALHO: número do slide (consistente) ──────────────────────────────
  const header = `
    <div style="position:absolute;top:${PAD}px;right:${PAD}px;z-index:4;">
      <span style="font-family:'${fn}',sans-serif;font-size:18px;font-weight:500;color:rgba(255,255,255,0.30);letter-spacing:1px;">${idx+1} / ${total}</span>
    </div>`

  // ── RODAPÉ: linha + logo (consistente) ───────────────────────────────────
  const lW     = Math.min(cfg.logoW ?? 150, 280)
  const lH     = 56
  const lX     = cfg.logoX != null ? Math.round(cfg.logoX*1080 - lW/2) : Math.round(540 - lW/2)
  const lY     = cfg.logoY != null ? Math.round(cfg.logoY*1080 - lH/2) : 1080 - FOOTER + 32
  const footer = `
    <div style="position:absolute;bottom:0;left:0;right:0;height:${FOOTER}px;z-index:4;">
      <div style="position:absolute;top:0;left:${PAD}px;right:${PAD}px;height:1px;background:rgba(255,255,255,0.16);"></div>
      <div style="position:absolute;top:28px;left:50%;transform:translateX(-50%);display:flex;gap:8px;align-items:center;">
        ${Array.from({length:total},(_,i)=>`<div style="width:${i===idx?'28px':'7px'};height:7px;border-radius:4px;background:${i===idx?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.22)'}"></div>`).join('')}
      </div>
    </div>`

  // ── ZONA DE CONTEÚDO (igual em todos os tipos) ────────────────────────────
  // Sempre começa em top=HEADER, tem height=CONTENT
  const cTop  = HEADER
  const cH    = CONTENT  // 860px

  let body = ''
  const tipo = slide.tipo

  // ── CAPA ─────────────────────────────────────────────────────────────────
  if (tipo === 'capa') {
    const titulo = trunc(slide.titulo ?? '', 60)
    const fsT    = fsTitulo(titulo, 108)
    const subtit = trunc(slide.subtitulo ?? '', 90)

    body = `
    <div style="position:absolute;top:${cTop}px;left:${PAD}px;right:${PAD}px;height:${cH}px;display:flex;flex-direction:column;justify-content:center;gap:28px;z-index:4;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;">${titulo}</div>
      ${subtit ? `<div style="font-family:'${fn}',sans-serif;font-size:38px;font-weight:400;color:${sub};line-height:1.55;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${subtit}</div>` : ''}
    </div>`
  }

  // ── ÍCONES ────────────────────────────────────────────────────────────────
  else if (tipo === 'icones') {
    const temFotoLat = isFotoLateral
    const cW         = temFotoLat ? Math.floor(W * 0.56) : W
    const cRight     = temFotoLat ? 'auto' : `${PAD}px`
    const titulo     = trunc(slide.titulo ?? '', 45)
    const fsT        = fsTitulo(titulo, 88, cW)
    const itens      = (slide.itens ?? []).slice(0, 3)
    const n          = itens.length || 1
    const cardH      = Math.floor((cH - 120) / n)

    const cards = itens.map((item: any, i: number) => `
      <div style="display:flex;align-items:center;gap:28px;height:${cardH}px;border-bottom:${i < itens.length-1 ? '1px solid rgba(255,255,255,0.10)' : 'none'};">
        <div style="width:72px;height:72px;border-radius:18px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${ico(item.icone ?? 'star', 36, icCor, 1.6)}
        </div>
        <span style="font-family:'${fn}',sans-serif;font-size:34px;font-weight:700;color:${txt};line-height:1.2;flex:1;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;white-space:normal;">${trunc(item.label ?? '', 40)}</span>
        <span style="font-family:'${fn}',sans-serif;font-size:20px;font-weight:600;color:rgba(255,255,255,0.22);flex-shrink:0;min-width:28px;text-align:right;">${String(i+1).padStart(2,'0')}</span>
      </div>`).join('')

    body = `
    <div style="position:absolute;top:${cTop}px;left:${PAD}px;right:${cRight};width:${temFotoLat ? `${cW}px` : 'auto'};height:${cH}px;display:flex;flex-direction:column;padding-top:24px;z-index:4;overflow:hidden;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;margin-bottom:36px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${titulo}</div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">${cards}</div>
    </div>`
  }

  // ── TÓPICO ────────────────────────────────────────────────────────────────
  else if (tipo === 'topico') {
    const temFotoLat = isFotoLateral
    const cW         = temFotoLat ? Math.floor(W * 0.56) : W
    const cRight     = temFotoLat ? 'auto' : `${PAD}px`
    const titulo     = trunc(slide.titulo ?? '', 40)
    const corpo      = trunc(slide.corpo ?? '', 220)
    const fsT        = fsTitulo(titulo, 88, cW)
    const fsC        = corpo.length > 120 ? 34 : 38

    body = isMin ? `
    <div style="position:absolute;top:${cTop}px;left:${PAD}px;right:${PAD}px;height:${cH}px;display:flex;flex-direction:column;justify-content:center;gap:32px;z-index:4;">
      <div style="width:4px;height:60px;background:rgba(255,255,255,0.45);border-radius:2px;"></div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${titulo}</div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsC}px;font-weight:400;color:${sub};line-height:1.65;overflow:hidden;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;word-break:break-word;overflow-wrap:break-word;">${corpo}</div>
    </div>` : `
    <div style="position:absolute;top:${cTop}px;left:${PAD}px;right:${cRight};width:${temFotoLat ? `${cW}px` : 'auto'};height:${cH}px;display:flex;flex-direction:column;justify-content:center;gap:24px;z-index:4;overflow:hidden;">
      <div style="width:80px;height:80px;border-radius:20px;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;">
        ${ico(slide.icon_nome ?? 'star', 44, icCor)}
      </div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${titulo}</div>
      <div style="width:48px;height:3px;background:rgba(255,255,255,0.35);border-radius:2px;"></div>
      <div style="font-family:'${fn}',sans-serif;font-size:${fsC}px;font-weight:400;color:${sub};line-height:1.65;overflow:hidden;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;word-break:break-word;overflow-wrap:break-word;">${corpo}</div>
    </div>`
  }

  // ── LISTA ─────────────────────────────────────────────────────────────────
  else if (tipo === 'lista') {
    const temFotoLat = isFotoLateral
    const cW         = temFotoLat ? Math.floor(W * 0.56) : W
    const cRight     = temFotoLat ? 'auto' : `${PAD}px`
    const titulo     = trunc(slide.titulo ?? '', 40)
    const fsT        = fsTitulo(titulo, 80, cW)
    const itens      = (slide.itens ?? []).slice(0, 5)
    const n          = itens.length
    const cardH      = Math.floor((cH - 80) / n)
    const fsI        = n >= 5 ? 34 : 38
    const maxChars   = temFotoLat ? 35 : 55

    const rows = itens.map((it: string, i: number) => `
      <div style="display:flex;align-items:center;gap:28px;height:${cardH}px;border-bottom:1px solid rgba(255,255,255,0.10);">
        <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="font-family:'${fn}',sans-serif;font-size:20px;font-weight:700;color:rgba(255,255,255,0.90);">${i + 1}</span>
        </div>
        <span style="font-family:'${fn}',sans-serif;font-size:${fsI}px;font-weight:500;color:${txt};line-height:1.25;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;flex:1;white-space:normal;">${trunc(it, maxChars)}</span>
      </div>`).join('')

    body = `
    <div style="position:absolute;top:${cTop}px;left:${PAD}px;right:${cRight};width:${temFotoLat ? `${cW}px` : 'auto'};height:${cH}px;display:flex;flex-direction:column;padding-top:24px;z-index:4;overflow:hidden;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:32px;">${titulo}</div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">${rows}</div>
    </div>`
  }

  // ── CTA ───────────────────────────────────────────────────────────────────
  else {
    const titulo = trunc(slide.titulo ?? '', 35)
    const subtit = trunc(slide.subtitulo ?? '', 80)
    const fsT    = fsTitulo(titulo, 108)

    body = `
    <div style="position:absolute;top:${cTop}px;left:${PAD}px;right:${PAD}px;height:${cH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:32px;z-index:4;">
      <div style="font-family:'${fn}',sans-serif;font-size:${fsT}px;font-weight:${fw};line-height:1.0;color:${txt};letter-spacing:-3px;text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">${titulo}</div>
      ${subtit ? `<div style="font-family:'${fn}',sans-serif;font-size:36px;font-weight:400;color:${sub};line-height:1.55;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${subtit}</div>` : ''}
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
