import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { UserContent } from './_components/users'

export default async function User() {
  const session = await auth()

  if (!session?.user || session?.user.role !== 'ADMIN') {
    redirect('/private/sign-in')
  }

  return <UserContent />
}
