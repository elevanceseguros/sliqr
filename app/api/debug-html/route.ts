import { NextRequest, NextResponse } from 'next/server'
import { gerarSlides } from '@/lib/claude/gerar-slides'
import { gerarHTML } from '@/lib/slides/gerar-html'

export async function GET(request: NextRequest) {
  try {
    const slides = await gerarSlides('benefícios do seguro de vida', 2)
    const cfg = { cor: '#059669', fonte: 'inter', estilo: 'modern' as const }
    const html = gerarHTML(slides[0], 2, 0, cfg)
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
  } catch (err: any) {
    return NextResponse.json({ erro: err.message })
  }
}
