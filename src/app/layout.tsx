import type { Metadata } from 'next'
import './styles/globals.css'
import { Toaster } from 'sonner'
import { ProgressProviderWrapper } from '@/components/app/progress-provider-wrapper'
import SessionAuthProvider from '@/components/app/session-auth'

export const metadata: Metadata = {
  title: 'CaamaConecta',
  description: 'Descontos e benefícios exclusivos para advogados associados à CAAMA.',
  icons: {
    icon: '/assets/caama.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-geist antialiased">
        <SessionAuthProvider>
          <ProgressProviderWrapper>
            <Toaster richColors position="top-right" />
            {children}
          </ProgressProviderWrapper>
        </SessionAuthProvider>
      </body>
    </html>
  )
}
