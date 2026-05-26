const ICONS: Record<string, string> = {
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  heart: '<path d="M20.84 4.61a5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 1.06-8.84z"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.65 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.22a2 2 0 0 1 2.11-.45c.83.32 1.7.53 2.6.65A2 2 0 0 1 22 16.92z"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
}

function esc(v: any): string {
  return String(v ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function icon(name: string, size = 42, color = '#fff') {
  const path = ICONS[name] ?? ICONS.star
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
}

function lum(h: string) {
  return (
    parseInt(h.slice(1, 3) || '88', 16) * .299 +
    parseInt(h.slice(3, 5) || '88', 16) * .587 +
    parseInt(h.slice(5, 7) || '88', 16) * .114
  ) / 255
}

function clampText(text: any, max: number) {
  const t = esc(text)
  return t.length > max ? `${t.slice(0, max - 1)}…` : t
}

export interface SlideCfg {
  cor: string
  fonte: string
  logoUrl?: string
  logoX?: number
  logoY?: number
  logoW?: number
  imagemUrl?: string
}

export function gerarHTML(slide: any, total: number, idx: number, cfg: SlideCfg): string {
  const cor = cfg.cor || '#0f172a'
  const isLight = lum(cor) > 0.62
  const muted = isLight ? 'rgba(15,23,42,.72)' : 'rgba(255,255,255,.76)'
  const accent = '#ffffff'
  const hot = '#ffd43b'
  const imagemUrl = cfg.imagemUrl

  const FF: Record<string, string> = {
    inter: 'Inter',
    montserrat: 'Montserrat',
    playfair: 'Playfair Display',
  }

  const fn = FF[cfg.fonte] ?? 'Inter'

  const fontImport =
    cfg.fonte === 'playfair'
      ? `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&display=swap');`
      : cfg.fonte === 'montserrat'
      ? `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&display=swap');`
      : `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&display=swap');`

  const progress = `
    <div class="progress">
      <span>${idx + 1}</span>
      <div><i style="width:${Math.max(8, ((idx + 1) / Math.max(total, 1)) * 100)}%"></i></div>
      <span>${total}</span>
    </div>
  `

  const visual = imagemUrl
    ? `
      <div class="aiVisualWrap">
        <img class="aiVisual" src="${esc(imagemUrl)}" />
      </div>
    `
    : ''

  let body = ''

  if (slide.tipo === 'capa') {
    body = `
      <section class="center left hasVisual">
        <div class="badge">${icon('zap', 22, hot)} CONTEÚDO RÁPIDO</div>
        <h1>${clampText(slide.titulo, 92)}</h1>
        ${slide.subtitulo ? `<p>${clampText(slide.subtitulo, 150)}</p>` : ''}
      </section>
    `
  } else if (slide.tipo === 'icones') {
    const itens = (slide.itens ?? []).slice(0, 3)

    body = `
      <section class="top">
        <div class="kicker">Pontos principais</div>
        <h2>${clampText(slide.titulo, 76)}</h2>
        <div class="cards">
          ${itens.map((item: any, i: number) => `
            <div class="card">
              <div class="num">0${i + 1}</div>
              <div class="icon">${icon(item.icone ?? 'star', 46, accent)}</div>
              <strong>${clampText(item.label, 64)}</strong>
            </div>
          `).join('')}
        </div>
      </section>
    `
  } else if (slide.tipo === 'lista') {
    const itens = (slide.itens ?? []).slice(0, 5)

    body = `
      <section class="top">
        <div class="kicker">Checklist</div>
        <h2>${clampText(slide.titulo, 74)}</h2>
        <div class="list ${imagemUrl ? 'withVisual' : ''}">
          ${itens.map((it: string) => `
            <div class="row">
              <div class="check">${icon('check', 26, '#0f172a')}</div>
              <span>${clampText(it, 86)}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `
  } else {
    body = `
      <section class="center ${imagemUrl ? 'ctaWithVisual' : ''}">
        <div class="bigIcon">${icon('phone', 64, accent)}</div>
        <h1>${clampText(slide.titulo, 76)}</h1>
        ${slide.subtitulo ? `<p>${clampText(slide.subtitulo, 140)}</p>` : ''}
        <div class="button">${icon('phone', 28, '#0f172a')} Me chame no direct</div>
      </section>
    `
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
${fontImport}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1080px;overflow:hidden;font-family:'${fn}',sans-serif}
.stage{
  width:1080px;height:1080px;position:relative;overflow:hidden;color:#fff;
  background:
    radial-gradient(circle at 15% 8%, rgba(255,255,255,.22), transparent 28%),
    radial-gradient(circle at 88% 18%, rgba(255,212,59,.18), transparent 26%),
    radial-gradient(circle at 50% 105%, rgba(255,255,255,.14), transparent 34%),
    linear-gradient(145deg, ${cor} 0%, #07111f 115%);
}
.stage:before{
  content:"";position:absolute;inset:0;opacity:.15;
  background-image:linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
  background-size:42px 42px;mask-image:linear-gradient(to bottom, black, transparent 86%);
}
.stage:after{
  content:"";position:absolute;inset:0;z-index:4;pointer-events:none;
  background:
    linear-gradient(90deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.24) 48%, rgba(0,0,0,.62) 100%),
    linear-gradient(0deg, rgba(0,0,0,.44), transparent 44%);
}
.blob1,.blob2{position:absolute;border-radius:999px;filter:blur(85px);z-index:1}
.blob1{width:460px;height:460px;right:-180px;top:180px;background:rgba(255,212,59,.18)}
.blob2{width:520px;height:520px;left:-220px;bottom:-150px;background:rgba(255,255,255,.12)}
.aiVisualWrap{
  position:absolute;
  right:-75px;
  bottom:20px;
  width:610px;
  height:610px;
  z-index:3;
  border-radius:48px;
  overflow:hidden;
  opacity:.92;
  transform:rotate(-2deg);
  filter:drop-shadow(0 44px 90px rgba(0,0,0,.45));
  mask-image:linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%);
}
.aiVisualWrap:after{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 50% 50%, transparent 34%, rgba(7,17,31,.40) 78%),
    linear-gradient(90deg, rgba(7,17,31,.55), transparent 35%);
}
.aiVisual{
  width:100%;
  height:100%;
  object-fit:cover;
  transform:scale(1.08);
}
.progress{
  position:absolute;top:48px;left:64px;right:64px;z-index:20;display:flex;align-items:center;gap:14px;
  color:rgba(255,255,255,.72);font-size:20px;font-weight:800;letter-spacing:.04em;
}
.progress div{flex:1;height:6px;border-radius:999px;background:rgba(255,255,255,.16);overflow:hidden}
.progress i{display:block;height:100%;border-radius:999px;background:${hot}}
section{position:absolute;z-index:10;left:74px;right:74px}
.center{top:120px;bottom:145px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.center.left{align-items:flex-start;text-align:left}
.top{top:118px;bottom:120px}
.badge,.kicker{
  display:inline-flex;align-items:center;gap:10px;width:max-content;max-width:850px;padding:14px 20px;border-radius:999px;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.86);
  font-size:20px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;margin-bottom:34px;
}
h1{
  max-width:${imagemUrl ? '690px' : '900px'};
  font-size:${imagemUrl ? '78px' : '88px'};
  line-height:.98;font-weight:900;letter-spacing:-4px;color:#fff;text-transform:uppercase;
  text-shadow:0 16px 55px rgba(0,0,0,.34);
}
h2{
  max-width:${imagemUrl ? '720px' : '900px'};
  font-size:72px;line-height:1.02;font-weight:900;letter-spacing:-3px;color:#fff;text-transform:uppercase;
  text-shadow:0 16px 50px rgba(0,0,0,.25);margin-bottom:40px;
}
p{max-width:${imagemUrl ? '620px' : '790px'};margin-top:30px;color:${muted};font-size:35px;line-height:1.36;font-weight:650}
.cards{display:flex;gap:24px;margin-top:22px}
.card{
  flex:1;min-height:360px;border-radius:38px;padding:28px;background:rgba(255,255,255,.105);
  border:1px solid rgba(255,255,255,.18);box-shadow:0 30px 80px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.16);
  backdrop-filter:blur(22px);display:flex;flex-direction:column;justify-content:space-between;
}
.card .num{color:${hot};font-size:24px;font-weight:900;letter-spacing:.08em}
.card .icon{width:92px;height:92px;border-radius:28px;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center}
.card strong{display:block;color:#fff;font-size:31px;line-height:1.18;font-weight:850}
.list{margin-top:22px;display:flex;flex-direction:column;gap:18px;max-width:${imagemUrl ? '610px' : '100%'}}
.row{
  min-height:92px;display:flex;align-items:center;gap:22px;padding:20px 26px;border-radius:28px;
  background:rgba(255,255,255,.105);border:1px solid rgba(255,255,255,.16);
  box-shadow:0 18px 60px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.13);backdrop-filter:blur(20px);
}
.check{min-width:54px;width:54px;height:54px;border-radius:999px;background:${hot};display:flex;align-items:center;justify-content:center}
.row span{color:#fff;font-size:32px;line-height:1.23;font-weight:750}
.bigIcon{
  width:132px;height:132px;border-radius:42px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.18);
  display:flex;align-items:center;justify-content:center;margin-bottom:34px;box-shadow:0 30px 90px rgba(0,0,0,.24);
}
.button{
  margin-top:48px;display:inline-flex;align-items:center;gap:16px;padding:24px 48px;border-radius:999px;background:${hot};
  color:#0f172a;font-size:30px;font-weight:950;box-shadow:0 28px 80px rgba(0,0,0,.30);
}
</style>
</head>
<body>
  <div class="stage">
    <div class="blob1"></div>
    <div class="blob2"></div>
    ${visual}
    ${progress}
    ${body}
  </div>
</body>
</html>`
}
