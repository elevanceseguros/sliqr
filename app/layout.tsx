import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sliqr — Posts para Instagram prontos em segundos',
  description: 'Você digita o tema. A Sliqr cria o post. Sem designer, sem complicação.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://sliqr.com.br'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
