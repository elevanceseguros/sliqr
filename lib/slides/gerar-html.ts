interface SlideData {
  tipo: string
  titulo: string
  subtitulo?: string
  corpo?: string
  itens?: { icone: string; label: string }[]
  botao?: string
  ordem: number
}

interface Cfg {
  cor: string
  fonteId: string
  logoUrl?: string
}

function lum(hex: string) {
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255
}

function escurecer(hex: string, f = 0.45): string {
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  return `rgb(${Math.round(r*f)},${Math.round(g*f)},${Math.round(b*f)})`
}

export function gerarHTML(slide: SlideData, total: number, cfg: Cfg): string {
  const cor     = cfg.cor
  const isDark  = lum(cor) < 0.55
  const txtMain = isDark ? '#FFFFFF' : '#111111'
  const txtSub  = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.60)'
  const escuro  = escurecer(cor, 0.45)
  const btnCor  = escurecer(cor, 0.30)

  const fontFamily = '"Inter", "Helvetica Neue", system-ui, sans-serif'

  const logoHtml = cfg.logoUrl
    ? `<img src="${cfg.logoUrl}" style="height:52px;max-width:180px;object-fit:contain;" />`
    : `<span style="font-family:${fontFamily};font-size:18px;font-weight:700;color:${isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)'}">Sliqr</span>`

  const dotsHtml = Array.from({ length: total }, (_, i) => {
    const ativo = i === slide.ordem - 1
    return `<div style="width:${ativo ? '28px' : '8px'};height:8px;border-radius:4px;background:${ativo ? (isDark ? 'rgba(255,255,255,0.9)' : escurecer(cor,0.5)) : (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)')};"></div>`
  }).join('')

  let conteudo = ''

  if (slide.tipo === 'capa') {
    conteudo = `
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 80px 40px;">
        <h1 style="font-family:${fontFamily};font-size:100px;font-weight:900;line-height:1.05;color:${txtMain};margin:0 0 36px;letter-spacing:-2px;">${slide.titulo}</h1>
        ${slide.subtitulo || slide.corpo ? `<p style="font-family:${fontFamily};font-size:40px;font-weight:400;color:${txtSub};margin:0;line-height:1.55;">${slide.subtitulo || slide.corpo}</p>` : ''}
      </div>`

  } else if (slide.tipo === 'icones') {
    const itens = slide.itens ?? []
    const cols = itens.map(item => `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:20px;">
        <div style="width:148px;height:148px;border-radius:50%;background:${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'};display:flex;align-items:center;justify-content:center;font-size:76px;line-height:1;">
          ${item.icone}
        </div>
        <p style="font-family:${fontFamily};font-size:36px;font-weight:600;color:${txtSub};text-align:center;margin:0;line-height:1.4;">${item.label}</p>
      </div>`).join('')

    conteudo = `
      <div style="flex:1;display:flex;flex-direction:column;padding:0 80px 40px;">
        <h1 style="font-family:${fontFamily};font-size:88px;font-weight:900;line-height:1.05;color:${txtMain};margin:0 0 64px;letter-spacing:-2px;">${slide.titulo}</h1>
        <div style="display:flex;gap:48px;justify-content:center;align-items:flex-start;">
          ${cols}
        </div>
      </div>`

  } else if (slide.tipo === 'cta') {
    conteudo = `
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 80px 40px;gap:48px;">
        <h1 style="font-family:${fontFamily};font-size:100px;font-weight:900;line-height:1.05;color:${txtMain};margin:0;letter-spacing:-2px;">${slide.titulo}</h1>
        <div style="display:inline-flex;align-self:flex-start;">
          <div style="background:${btnCor};border-radius:999px;padding:24px 56px;">
            <span style="font-family:${fontFamily};font-size:38px;font-weight:800;color:#FFFFFF;letter-spacing:1.5px;">${slide.botao || 'SAIBA MAIS'}</span>
          </div>
        </div>
      </div>`

  } else {
    const linhas = (slide.corpo ?? '').split('\n').filter(Boolean)
    const linhasHtml = linhas.map(l =>
      `<p style="font-family:${fontFamily};font-size:42px;font-weight:400;color:${txtSub};margin:0;line-height:1.65;">${l}</p>`
    ).join('')

    conteudo = `
      <div style="flex:1;display:flex;flex-direction:column;padding:0 80px 40px;">
        <h1 style="font-family:${fontFamily};font-size:88px;font-weight:900;line-height:1.05;color:${txtMain};margin:0 0 32px;letter-spacing:-2px;">${slide.titulo}</h1>
        <div style="width:180px;height:3px;background:${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'};margin-bottom:36px;"></div>
        <div style="display:flex;flex-direction:column;gap:12px;">${linhasHtml}</div>
      </div>`
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>* { box-sizing:border-box; margin:0; padding:0; } body { width:1080px; height:1080px; overflow:hidden; }</style>
</head>
<body>
  <div style="width:1080px;height:1080px;background:linear-gradient(135deg,${cor} 0%,${escuro} 100%);display:flex;flex-direction:column;position:relative;overflow:hidden;">

    <!-- Círculo decorativo -->
    <div style="position:absolute;top:-80px;right:-80px;width:340px;height:340px;border-radius:50%;background:${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}"></div>

    <!-- Losango -->
    <div style="position:absolute;bottom:44px;right:44px;width:38px;height:38px;background:${isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)'};transform:rotate(45deg)"></div>

    <!-- Número do slide -->
    <div style="padding:52px 80px 0;flex-shrink:0;">
      <span style="font-family:${fontFamily};font-size:24px;font-weight:600;color:${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.28)'};">${slide.ordem} / ${total}</span>
    </div>

    ${conteudo}

    <!-- Rodapé -->
    <div style="padding:0 80px 52px;flex-shrink:0;">
      <div style="height:1px;background:${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.10)'};margin-bottom:28px;"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        ${logoHtml}
        <div style="display:flex;gap:10px;align-items:center;">${dotsHtml}</div>
      </div>
    </div>
  </div>
</body>
</html>`
}
