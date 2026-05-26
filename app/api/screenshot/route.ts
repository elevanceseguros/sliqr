import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

async function getBrowser() {
  if (process.env.VERCEL) {
    const chromium = (await import('@sparticuz/chromium')).default
    const puppeteer = (await import('puppeteer-core')).default
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
      defaultViewport: { width: 1080, height: 1080 },
    })
  }
  const puppeteer = (await import('puppeteer-core')).default
  return puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1080, height: 1080 },
    executablePath:
      process.platform === 'win32'
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : '/usr/bin/google-chrome-stable',
  })
}

export async function POST(request: NextRequest) {
  let browser
  try {
    const { html } = await request.json()
    if (!html) return NextResponse.json({ erro: 'HTML obrigatório' }, { status: 400 })

    browser = await getBrowser()
    const page = await browser.newPage()
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 })
    await page.setContent(html, { waitUntil: 'load', timeout: 30000 })

    const png = await page.screenshot({ type: 'png' })
    await browser.close()
    browser = undefined

    const b64 = Buffer.from(png).toString('base64')
    return NextResponse.json({ url: `data:image/png;base64,${b64}` })

  } catch (err: any) {
    if (browser) { try { await browser.close() } catch {} }
    console.error('[screenshot]', err.message)
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
