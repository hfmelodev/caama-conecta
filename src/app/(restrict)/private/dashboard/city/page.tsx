import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { CitiesContent } from './_components/cities'

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
