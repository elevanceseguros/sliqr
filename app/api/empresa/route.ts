import { NextRequest, NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const admin = () => createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ empresa: null })
  const { data: { user } } = await admin().auth.getUser(token)
  if (!user) return NextResponse.json({ empresa: null })
  const { data } = await admin().from('empresas').select('*').eq('usuario_id', user.id).single()
  return NextResponse.json({ empresa: data ?? null })
}

export async function POST(request: NextRequest) {
  try {
    const { accessToken, ...empresa } = await request.json()
    if (!accessToken) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
    const { data: { user } } = await admin().auth.getUser(accessToken)
    if (!user) return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })

    const { data, error } = await admin()
      .from('empresas')
      .upsert({ ...empresa, usuario_id: user.id, atualizado_em: new Date().toISOString() },
        { onConflict: 'usuario_id' })
      .select().single()

    if (error) throw error
    return NextResponse.json({ empresa: data })
  } catch (err: any) {
    return NextResponse.json({ erro: err.message }, { status: 500 })
  }
}
