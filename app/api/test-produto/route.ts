import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.FAL_API_KEY
  if (!key) return NextResponse.json({ erro: 'FAL_API_KEY não configurada' })

  // Testa 3 prompts diferentes para ver qualidade
  const prompts = [
    'colorful diamond-shaped collagen gummy bears, multiple vibrant colors purple red orange yellow, arranged on white marble surface, fresh tropical fruits scattered around, professional product photography, studio lighting, ultra realistic, 8k',
    'health insurance concept, happy Brazilian family with doctor, modern clinic, warm lighting, photorealistic, professional photography',
    'healthy açaí bowl and meal prep containers, colorful nutritious food, flat lay photography, bright natural lighting, commercial food photography',
  ]

  const results = []
  for (const prompt of prompts) {
    try {
      const res = await fetch('https://fal.run/fal-ai/flux/schnell', {
        method: 'POST',
        headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, image_size: 'square_hd', num_inference_steps: 8, num_images: 1, enable_safety_checker: false }),
      })
      const data = await res.json()
      results.push({ label: prompt.slice(0, 40) + '...', url: data.images?.[0]?.url ?? '' })
    } catch (e: any) {
      results.push({ label: prompt.slice(0, 40), url: '', erro: e.message })
    }
  }

  return NextResponse.json({ results })
}
