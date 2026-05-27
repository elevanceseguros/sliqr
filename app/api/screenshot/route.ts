import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

/** Remove whitespace desnecessário do HTML para reduzir tamanho da URL */
function minifyHtml(html: string): string {
  return html
    .replace(/\n\s*/g, ' ')   // quebras de linha + indent → espaço
    .replace(/\s{2,}/g, ' ')  // múltiplos espaços → um
    .replace(/> </g, '><')    // espaço entre tags
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let html = body?.html

    if (!html || typeof html !== 'string') {
      return NextResponse.json({ erro: 'HTML obrigatório' }, { status: 400 })
    }

    // Injeta logo no HTML se fornecida (só para download final)
    if (body.logoUrl) {
      const lW  = Math.min(body.logoW ?? 160, 300)
      const lH  = 64
      const lX  = Math.round((body.logoX ?? 0.5) * 1080 - lW / 2)
      const lY  = Math.round((body.logoY ?? 0.92) * 1080 - lH / 2)
      const tag = `<img src="${body.logoUrl}" style="position:absolute;left:${lX}px;top:${lY}px;width:${lW}px;height:${lH}px;object-fit:contain;z-index:10;" />`
      html = html.replace(/<\/div>\s*<\/body>/, `  ${tag}\n</div>\n</body>`)
    }

    const htmlSize = Buffer.byteLength(html, 'utf8')
    console.log(`[screenshot] HTML size: ${htmlSize} bytes`)

    // ── 1º: ScreenshotOne — POST com body HTML (suporta HTML grande) ──────
    const screenshotOneKey = process.env.SCREENSHOTONE_ACCESS_KEY

    if (screenshotOneKey) {
      try {
        const params = new URLSearchParams({
          access_key:          screenshotOneKey,
          format:              'png',
          viewport_width:      '1080',
          viewport_height:     '1080',
          device_scale_factor: '1',
          full_page:           'false',
          wait_until:          'networkidle2',
          delay:               '2',
          timeout:             '25',
          cache:               'false',
          block_ads:           'true',
        })

        const imgRes = await fetch(
          `https://api.screenshotone.com/take?${params.toString()}`,
          {
            method:  'POST',
            headers: { 'Content-Type': 'text/html' },
            body:    html,
          }
        )

        if (imgRes.ok) {
          const ct = imgRes.headers.get('content-type') ?? ''
          if (ct.includes('image')) {
            const buffer = await imgRes.arrayBuffer()
            const base64 = Buffer.from(buffer).toString('base64')
            console.log('[screenshot] ScreenshotOne ✓')
            return NextResponse.json({ url: `data:image/png;base64,${base64}` })
          }
          const errText = await imgRes.text()
          console.error('[screenshot] ScreenshotOne resposta não-imagem:', imgRes.status, errText.slice(0, 300))
        } else {
          const errText = await imgRes.text()
          console.error('[screenshot] ScreenshotOne erro HTTP:', imgRes.status, errText.slice(0, 300))
        }
      } catch (e: any) {
        console.error('[screenshot] ScreenshotOne exception:', e.message)
      }
    } else {
      console.warn('[screenshot] SCREENSHOTONE_ACCESS_KEY não configurada')
    }

    // ── 2º: ScreenshotAPI.net — GET com HTML minificado ───────────────────
    // Atenção: limite prático de URL ~8KB. Minificamos o HTML para caber.
    const screenshotApiToken = process.env.SCREENSHOTAPI_TOKEN

    if (screenshotApiToken) {
      try {
        const htmlMin = minifyHtml(html)
        const htmlMinSize = Buffer.byteLength(htmlMin, 'utf8')
        console.log(`[screenshot] ScreenshotAPI.net HTML minificado: ${htmlMinSize} bytes`)

        // Só tenta se o HTML minificado couber razoavelmente na URL (~6KB de margem)
        if (htmlMinSize <= 6000) {
          const params = new URLSearchParams({
            token:          screenshotApiToken,
            output:         'image',
            file_type:      'png',
            width:          '1080',
            height:         '1080',
            full_page:      'false',
            wait_for_event: 'networkidle',
            delay:          '1500',
            fresh:          'true',
            custom_html:    htmlMin,
          })

          const imgRes = await fetch(
            `https://shot.screenshotapi.net/v3/screenshot?${params.toString()}`,
            { method: 'GET' }
          )

          if (imgRes.ok) {
            const ct = imgRes.headers.get('content-type') ?? ''
            if (ct.includes('image')) {
              const buffer = await imgRes.arrayBuffer()
              const base64 = Buffer.from(buffer).toString('base64')
              console.log('[screenshot] ScreenshotAPI.net ✓')
              return NextResponse.json({ url: `data:image/png;base64,${base64}` })
            }
            const errText = await imgRes.text()
            console.error('[screenshot] ScreenshotAPI.net resposta não-imagem:', imgRes.status, errText.slice(0, 300))
          } else {
            const errText = await imgRes.text()
            console.error('[screenshot] ScreenshotAPI.net erro HTTP:', imgRes.status, errText.slice(0, 300))
          }
        } else {
          console.warn(`[screenshot] ScreenshotAPI.net ignorado: HTML minificado (${htmlMinSize}b) excede limite de URL`)
        }
      } catch (e: any) {
        console.error('[screenshot] ScreenshotAPI.net exception:', e.message)
      }
    } else {
      console.warn('[screenshot] SCREENSHOTAPI_TOKEN não configurada')
    }

    // ── 3º: hcti (fallback final — pode estar esgotado) ───────────────────
    const hctiUser = process.env.HCTI_USER_ID
    const hctiKey  = process.env.HCTI_API_KEY

    if (hctiUser && hctiKey) {
      try {
        const res = await fetch('https://hcti.io/v1/image', {
          method:  'POST',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${hctiUser}:${hctiKey}`).toString('base64'),
          },
          body: JSON.stringify({ html, viewport_width: 1080, viewport_height: 1080, ms_delay: 800 }),
        })

        if (res.ok) {
          const data   = await res.json()
          const imgUrl = data.url ?? ''
          if (imgUrl) {
            const imgRes2  = await fetch(imgUrl)
            const buffer2  = await imgRes2.arrayBuffer()
            const base64_2 = Buffer.from(buffer2).toString('base64')
            console.log('[screenshot] hcti ✓')
            return NextResponse.json({ url: `data:image/png;base64,${base64_2}` })
          }
        }
        const err = await res.text().catch(() => '')
        console.error('[screenshot] hcti erro:', res.status, err.slice(0, 100))
      } catch (e: any) {
        console.error('[screenshot] hcti exception:', e.message)
      }
    }

    console.error('[screenshot] Todos os serviços falharam')
    return NextResponse.json({ erro: 'Nenhum serviço de screenshot disponível' }, { status: 500 })

  } catch (err: any) {
    console.error('[screenshot] erro geral:', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
