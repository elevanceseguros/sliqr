import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const tema = request.nextUrl.searchParams.get('tema') ?? ''
  const qtd  = Math.min(Number(request.nextUrl.searchParams.get('qtd') ?? 1), 10)

  try {
    const res  = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(tema)}&per_page=${qtd}&orientation=squarish&content_filter=high&order_by=relevant`,
      { headers: { Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}` } }
    )
    const data = await res.json()
    const urls = (data.results ?? []).map((r: any) => r.urls?.regular ?? '')
    return NextResponse.json({ urls, url: urls[0] ?? '' })
  } catch {
    return NextResponse.json({ urls: [], url: '' })
  }
}
