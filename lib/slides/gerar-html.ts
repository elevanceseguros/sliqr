// SVG icons outline estilo Feather/Lucide
const ICONS: Record<string, string> = {
  'shield':       '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'heart':        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  'star':         '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'zap':          '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'trending-up':  '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  'users':        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
  'clock':        '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'dollar-sign':  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  'award':        '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>',
  'lock':         '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'phone':        '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.99-2H6.6a2 2 0 0 1 2 1.72"/>',
}

function ico(nome: string, sz: number, cor: string): string {
  const p = ICONS[nome] ?? ICONS['star']

  return `
  <svg
    width="${sz}"
    height="${sz}"
    viewBox="0 0 24 24"
    fill="none"
    stroke="${cor}"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    style="display:block;"
  >
    ${p}
  </svg>`
}

function lum(h: string) {
  return (
    parseInt(h.slice(1, 3) || '88', 16) * .299 +
    parseInt(h.slice(3, 5) || '88', 16) * .587 +
    parseInt(h.slice(5, 7) || '88', 16) * .114
  ) / 255
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

  const cor = cfg.cor
  const dark = lum(cor) < 0.55

  const txt = '#FFFFFF'
  const sub = 'rgba(255,255,255,0.78)'
  const iconCor = dark ? '#FFFFFF' : '#0f172a'

  const FF: Record<string, string> = {
    inter: 'Inter',
    montserrat: 'Montserrat',
    playfair: 'Playfair Display',
  }

  const fn = FF[cfg.fonte] ?? 'Inter'

  const fontImport =
    cfg.fonte === 'playfair'
      ? `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`
      : cfg.fonte === 'montserrat'
      ? `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');`
      : `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');`

  const logoW = cfg.logoW ?? 190
  const logoH = 70

  const logoX = cfg.logoX != null
    ? Math.round(cfg.logoX * 1080 - logoW / 2)
    : Math.round(1080 / 2 - logoW / 2)

  const logoY = cfg.logoY != null
    ? Math.round(cfg.logoY * 1080 - logoH / 2)
    : 920

  const logoHtml = cfg.logoUrl
    ? `
      <img
        src="${cfg.logoUrl}"
        style="
          position:absolute;
          left:${logoX}px;
          top:${logoY}px;
          width:${logoW}px;
          height:${logoH}px;
          object-fit:contain;
          z-index:50;
          opacity:.96;
        "
      />
    `
    : ''

  const deco = `
    <div style="
      position:absolute;
      top:-180px;
      right:-180px;
      width:520px;
      height:520px;
      border-radius:999px;
      background:rgba(255,255,255,0.10);
      filter:blur(90px);
    "></div>

    <div style="
      position:absolute;
      bottom:-220px;
      left:-120px;
      width:420px;
      height:420px;
      border-radius:999px;
      background:rgba(255,255,255,0.08);
      filter:blur(100px);
    "></div>
  `

  let body = ''

  // CAPA
  if (slide.tipo === 'capa') {

    body = `
      <div style="
        position:absolute;
        top:90px;
        left:84px;
        right:84px;
        bottom:180px;
        display:flex;
        flex-direction:column;
        justify-content:center;
      ">

        <div style="
          font-family:'${fn}',sans-serif;
          font-size:82px;
          font-weight:900;
          line-height:1.02;
          letter-spacing:-3px;
          color:${txt};
          max-width:820px;
          text-transform:uppercase;
          text-shadow:
          0 4px 30px rgba(255,255,255,0.12);
        ">
          ${slide.titulo}
        </div>

        ${
          slide.subtitulo
            ? `
            <div style="
              margin-top:30px;
              max-width:720px;
              font-family:'${fn}',sans-serif;
              font-size:34px;
              line-height:1.55;
              font-weight:500;
              color:${sub};
            ">
              ${slide.subtitulo}
            </div>
          `
            : ''
        }

      </div>
    `
  }

  // ICONES
  else if (slide.tipo === 'icones') {

    const itens = (slide.itens ?? []).slice(0, 3)

    const cols = itens.map((item: any) => `
      <div style="
        width:280px;
        min-height:280px;
        border-radius:34px;
        background:rgba(255,255,255,0.10);
        backdrop-filter:blur(20px);
        border:1px solid rgba(255,255,255,0.12);
        box-shadow:
        0 12px 40px rgba(0,0,0,0.18);
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        padding:34px;
      ">

        <div style="
          width:96px;
          height:96px;
          border-radius:999px;
          background:rgba(255,255,255,0.12);
          display:flex;
          align-items:center;
          justify-content:center;
          margin-bottom:22px;
        ">
          ${ico(item.icone ?? 'star', 42, iconCor)}
        </div>

        <div style="
          font-family:'${fn}',sans-serif;
          font-size:30px;
          line-height:1.35;
          font-weight:700;
          color:${txt};
          text-align:center;
        ">
          ${item.label}
        </div>

      </div>
    `).join('')

    body = `
      <div style="
        position:absolute;
        top:90px;
        left:84px;
        right:84px;
        bottom:180px;
      ">

        <div style="
          font-family:'${fn}',sans-serif;
          font-size:72px;
          font-weight:900;
          line-height:1.05;
          letter-spacing:-3px;
          color:${txt};
          max-width:860px;
          margin-bottom:56px;
          text-transform:uppercase;
        ">
          ${slide.titulo}
        </div>

        <div style="
          display:flex;
          justify-content:space-between;
          gap:28px;
        ">
          ${cols}
        </div>

      </div>
    `
  }

  // LISTA
  else if (slide.tipo === 'lista') {

    const itens = (slide.itens ?? []).slice(0, 5)

    const rows = itens.map((it: string) => `
      <div style="
        display:flex;
        align-items:flex-start;
        gap:22px;
        padding:24px 26px;
        border-radius:24px;
        margin-bottom:18px;
        background:rgba(255,255,255,0.08);
        backdrop-filter:blur(18px);
        border:1px solid rgba(255,255,255,0.10);
      ">

        <div style="
          min-width:52px;
          width:52px;
          height:52px;
          border-radius:999px;
          background:rgba(255,255,255,0.12);
          display:flex;
          align-items:center;
          justify-content:center;
        ">
          ${ico('check-circle', 26, iconCor)}
        </div>

        <div style="
          font-family:'${fn}',sans-serif;
          font-size:32px;
          line-height:1.45;
          font-weight:600;
          color:${txt};
        ">
          ${it}
        </div>

      </div>
    `).join('')

    body = `
      <div style="
        position:absolute;
        top:90px;
        left:84px;
        right:84px;
        bottom:180px;
      ">

        <div style="
          font-family:'${fn}',sans-serif;
          font-size:72px;
          font-weight:900;
          line-height:1.05;
          letter-spacing:-3px;
          color:${txt};
          margin-bottom:42px;
          text-transform:uppercase;
          max-width:860px;
        ">
          ${slide.titulo}
        </div>

        ${rows}

      </div>
    `
  }

  // CTA
  else {

    body = `
      <div style="
        position:absolute;
        top:90px;
        left:84px;
        right:84px;
        bottom:180px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        text-align:center;
      ">

        <div style="
          font-family:'${fn}',sans-serif;
          font-size:84px;
          font-weight:900;
          line-height:1.02;
          letter-spacing:-3px;
          color:${txt};
          max-width:860px;
          margin-bottom:30px;
          text-transform:uppercase;
          text-shadow:
          0 4px 30px rgba(255,255,255,0.10);
        ">
          ${slide.titulo}
        </div>

        ${
          slide.subtitulo
            ? `
            <div style="
              max-width:720px;
              font-family:'${fn}',sans-serif;
              font-size:34px;
              line-height:1.55;
              font-weight:500;
              color:${sub};
              margin-bottom:50px;
            ">
              ${slide.subtitulo}
            </div>
          `
            : ''
        }

        <div style="
          display:inline-flex;
          align-items:center;
          gap:18px;
          background:rgba(255,255,255,0.12);
          backdrop-filter:blur(18px);
          border:1px solid rgba(255,255,255,0.22);
          box-shadow:
          0 10px 40px rgba(0,0,0,0.28),
          inset 0 1px 0 rgba(255,255,255,0.12);
          border-radius:999px;
          padding:24px 56px;
        ">

          ${ico('phone', 30, '#FFFFFF')}

          <span style="
            font-family:'${fn}',sans-serif;
            font-size:30px;
            font-weight:800;
            color:#FFFFFF;
            letter-spacing:.5px;
          ">
            Me chame no direct
          </span>

        </div>

      </div>
    `
  }

  return `
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8" />

<style>

${fontImport}

*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

body{
  width:1080px;
  height:1080px;
  overflow:hidden;
}

</style>

</head>

<body>

<div style="
  width:1080px;
  height:1080px;
  position:relative;
  overflow:hidden;

  background:
  radial-gradient(circle at top left, rgba(255,255,255,0.14), transparent 35%),
  radial-gradient(circle at bottom right, rgba(255,255,255,0.10), transparent 30%),
  linear-gradient(135deg, ${cor} 0%, #0f172a 140%);
">

  <div style="
    position:absolute;
    inset:0;
    backdrop-filter:blur(120px);

    background:
    linear-gradient(
    180deg,
    rgba(255,255,255,0.04),
    rgba(255,255,255,0)
    );
  "></div>

  ${deco}

  ${body}

  ${logoHtml}

</div>

</body>
</html>
`
}
