// SVG icons outline estilo Feather/Lucide
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
  'stethoscope':  '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>',
  'piggy-bank':   '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.8 1.7-1.8 2-3h2v-4h-2c0-1-.5-1.5-1-2h0z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>',
  'hospital':     '<rect x="3" y="2" width="18" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><path d="M3 12h18"/><path d="M3 7h3"/><path d="M3 17h3"/><line x1="12" y1="5" x2="12" y2="9"/><line x1="10" y1="7" x2="14" y2="7"/>',
  'map':          '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  'tag':          '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
  'activity':     '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
}

function ico(nome: string, sz: number, cor: string): string {
  const p = ICONS[nome] ?? ICONS['star']
  return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;">${p}</svg>`
}

function lum(h: string) {
  return (parseInt(h.slice(1,3)||'88',16)*.299 + parseInt(h.slice(3,5)||'88',16)*.587 + parseInt(h.slice(5,7)||'88',16)*.114)/255
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
  const cor   = cfg.cor
  const dark  = lum(cor) < 0.55
  const txt   = '#FFFFFF'  // texto sempre branco
  const sub   = 'rgba(255,255,255,0.88)'
  // Cor do ícone: azul escuro se fundo claro, branco se fundo escuro
  const iconCor = dark ? '#FFFFFF' : '#1a3a5c'

  const FF: Record<string,string> = {
    inter:      'Inter',
    montserrat: 'Montserrat',
    playfair:   'Playfair Display',
  }
  const fn = FF[cfg.fonte] ?? 'Inter'

  const fontImport = cfg.fonte === 'playfair'
    ? `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`
    : cfg.fonte === 'montserrat'
    ? `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');`
    : `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');`

  // Logo no rodapé centralizada
  const logoW = cfg.logoW ?? 160
  const logoH = 64
  const logoX = cfg.logoX != null ? Math.round(cfg.logoX * 1080 - logoW/2) : Math.round(1080/2 - logoW/2)
  const logoY = cfg.logoY != null ? Math.round(cfg.logoY * 1080 - logoH/2) : Math.round(1080 - 120)
  const logoHtml = cfg.logoUrl
    ? `<img src="${cfg.logoUrl}" style="position:absolute;left:${logoX}px;top:${logoY}px;width:${logoW}px;height:${logoH}px;object-fit:contain;" />`
    : ''

  // Losango decorativo canto inferior direito (igual Gemini)
  const losango = `<div style="position:absolute;bottom:44px;right:44px;width:32px;height:32px;background:rgba(255,255,255,0.22);transform:rotate(45deg);"></div>`

  let body = ''

  // ── CAPA ── título enorme + subtítulo menor + logo
  if (slide.tipo === 'capa') {
    body = `
    <div style="position:absolute;top:80px;left:80px;right:80px;bottom:160px;display:flex;flex-direction:column;justify-content:center;">
      <div style="font-family:'${fn}',sans-serif;font-size:96px;font-weight:900;line-height:1.05;color:${txt};letter-spacing:-2px;text-transform:uppercase;">${slide.titulo}</div>
      ${slide.subtitulo ? `<div style="font-family:'${fn}',sans-serif;font-size:40px;font-weight:400;color:${sub};margin-top:28px;line-height:1.55;">${slide.subtitulo}</div>` : ''}
    </div>`

  // ── ÍCONES ── título no topo + 2-3 ícones centralizados com label
  } else if (slide.tipo === 'icones') {
    const itens = slide.itens ?? []
    const qtd   = Math.min(itens.length, 3)
    const colW  = Math.round(860 / qtd)

    const cols = itens.slice(0, qtd).map((item: any) => `
      <div style="display:flex;flex-direction:column;align-items:center;gap:20px;width:${colW}px;">
        ${ico(item.icone ?? 'star', 110, iconCor)}
        <div style="font-family:'${fn}',sans-serif;font-size:34px;font-weight:600;color:${txt};text-align:center;line-height:1.35;">${item.label}</div>
      </div>`).join('')

    body = `
    <div style="position:absolute;top:80px;left:80px;right:80px;bottom:160px;display:flex;flex-direction:column;">
      <div style="font-family:'${fn}',sans-serif;font-size:86px;font-weight:900;line-height:1.05;color:${txt};letter-spacing:-2px;text-transform:uppercase;margin-bottom:64px;">${slide.titulo}</div>
      <div style="display:flex;justify-content:center;align-items:flex-start;gap:0px;flex:1;">
        ${cols}
      </div>
    </div>`

  // ── LISTA ── título + itens com check SVG
  } else if (slide.tipo === 'lista') {
    const itens = (slide.itens ?? []).slice(0, 5)
    const rows = itens.map((it: string) => `
      <div style="display:flex;align-items:center;gap:24px;padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.18);">
        ${ico('check-circle', 36, iconCor)}
        <span style="font-family:'${fn}',sans-serif;font-size:38px;font-weight:500;color:${txt};line-height:1.3;">${it}</span>
      </div>`).join('')

    body = `
    <div style="position:absolute;top:80px;left:80px;right:80px;bottom:160px;display:flex;flex-direction:column;justify-content:center;">
      <div style="font-family:'${fn}',sans-serif;font-size:76px;font-weight:900;line-height:1.05;color:${txt};letter-spacing:-2px;text-transform:uppercase;margin-bottom:36px;">${slide.titulo}</div>
      ${rows}
    </div>`

  // ── CTA ── título grande centralizado + botão "Me chame no direct"
  } else {
    body = `
    <div style="position:absolute;top:80px;left:80px;right:80px;bottom:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="font-family:'${fn}',sans-serif;font-size:100px;font-weight:900;line-height:1.0;color:${txt};letter-spacing:-2px;text-transform:uppercase;margin-bottom:32px;">${slide.titulo}</div>
      ${slide.subtitulo ? `<div style="font-family:'${fn}',sans-serif;font-size:38px;font-weight:400;color:${sub};margin-bottom:52px;line-height:1.55;">${slide.subtitulo}</div>` : ''}
      <div style="display:inline-flex;align-items:center;gap:16px;background:rgba(255,255,255,0.18);border:2px solid rgba(255,255,255,0.40);border-radius:999px;padding:22px 64px;">
        ${ico('phone', 30, '#FFFFFF')}
        <span style="font-family:'${fn}',sans-serif;font-size:34px;font-weight:700;color:#FFFFFF;letter-spacing:1px;">Me chame no direct</span>
      </div>
    </div>`
  }

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
${fontImport}
*{box-sizing:border-box;margin:0;padding:0;}
body{width:1080px;height:1080px;overflow:hidden;}
</style>
</head><body>
<div style="width:1080px;height:1080px;position:relative;overflow:hidden;background:${cor};">
  ${body}
  ${logoHtml}
  ${losango}
</div>
</body></html>`
}
