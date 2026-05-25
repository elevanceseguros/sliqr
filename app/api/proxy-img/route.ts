import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get('src') ?? ''
  if (!src) return new NextResponse('Missing src', { status: 400 })
  
  try {
    const res  = await fetch(src)
    const blob = await res.blob()
    return new NextResponse(blob, {
      headers: {
        'Content-Type': res.headers.get('Content-Type') ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return new NextResponse('Error', { status: 500 })
  }
}
