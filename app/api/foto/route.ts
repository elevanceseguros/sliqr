import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const tema = request.nextUrl.searchParams.get('tema') ?? ''
  const qtd  = Math.min(Number(request.nextUrl.searchParams.get('qtd') ?? 1), 20)
  const page = Number(request.nextUrl.searchParams.get('page') ?? 1)

  try {
    const res  = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(tema)}&per_page=${qtd}&page=${page}&orientation=squarish&content_filter=high`,
      { headers: { Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}` } }
    )
    const data = await res.json()
    const urls = (data.results ?? []).map((r: any) => r.urls?.regular ?? '').filter(Boolean)
    return NextResponse.json({ urls, url: urls[0] ?? '' })
  } catch {
    return NextResponse.json({ urls: [], url: '' })
  }
}
