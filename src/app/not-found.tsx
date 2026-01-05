import type { Metadata } from 'next'
import { Page404 } from '@/components/app/404'

export const metadata: Metadata = {
  title: '404 | Caama Conecta',
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Page404 />
    </div>
  )
}
