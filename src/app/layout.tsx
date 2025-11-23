import type { Metadata } from 'next'
import './styles/globals.css'
import SessionAuthProvider from '@/components/app/session-auth'

export const metadata: Metadata = {
  title: 'CaamaConecta',
  description: 'Descontos e benefícios exclusivos para advogados associados à CAAMA.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-geist antialiased">
        <SessionAuthProvider>{children}</SessionAuthProvider>
      </body>
    </html>
  )
}
