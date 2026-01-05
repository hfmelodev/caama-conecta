import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Companies } from './_components/companies'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/private/sign-in')
  }

  if (session.user && session.user.inactive) {
    redirect('/private/sign-in/blocked')
  }

  return <Companies />
}
