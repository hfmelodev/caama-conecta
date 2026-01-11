import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { CitiesContent } from './_components/cities'

export const metadata: Metadata = {
  title: 'Cidades | Caama Conecta',
}

export default async function City() {
  const session = await auth()

  if (!session?.user || session?.user.role !== 'ADMIN') {
    redirect('/private/sign-in')
  }

  if (session.user && session.user.inactive) {
    redirect('/private/sign-in/blocked')
  }

  return <CitiesContent />
}
