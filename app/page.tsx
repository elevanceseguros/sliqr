import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// A landing page completa está em /public/landing.html
// Aqui redirecionamos usuários logados para o dashboard
export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/criar')

  // Redireciona para a landing estática
  redirect('/landing')
}
