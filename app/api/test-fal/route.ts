import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.FAL_API_KEY
  if (!key) return NextResponse.json({ status: 'FAL_API_KEY não encontrada' })
  try {
    const res = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'blue circle', image_size: 'square_hd', num_inference_steps: 4, num_images: 1 }),
    })
    const texto = await res.text()
    return NextResponse.json({ status: res.ok ? 'OK' : 'ERRO', http_status: res.status, key_prefix: key.slice(0,12)+'...', response: texto.slice(0,300) })
  } catch (e: any) {
    return NextResponse.json({ status: 'EXCEPTION', erro: e.message })
  }
}
