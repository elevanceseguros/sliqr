import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const tema = request.nextUrl.searchParams.get('tema') ?? ''
  
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(tema)}&per_page=1&orientation=squarish&content_filter=high`,
      { headers: { Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}` } }
    )
    const data = await res.json()
    const url  = data.results?.[0]?.urls?.regular ?? ''
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ url: '' })
  }
}
