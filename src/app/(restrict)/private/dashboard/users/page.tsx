import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { UserContent } from './_components/users'

export const metadata: Metadata = {
  title: 'Usuários | Caama Conecta',
}

export default async function User() {
  const session = await auth()

  if (!session?.user || session?.user.role !== 'ADMIN') {
    redirect('/private/sign-in')
  }

  if (session.user && session.user.inactive) {
    redirect('/private/sign-in/blocked')
  }

  return <UserContent />
}
