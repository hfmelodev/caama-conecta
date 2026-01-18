import './styles/globals.css'

import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { ProgressProviderWrapper } from '@/components/app/progress-provider-wrapper'
import SessionAuthProvider from '@/components/app/session-auth'

export const metadata: Metadata = {
  title: 'Caama Conecta',
  description: 'Descontos e benefícios exclusivos para advogados associados à CAAMA.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Caama Conecta',
  },
  icons: {
    icon: [
      { url: '/android-chrome-192x192.png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
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
