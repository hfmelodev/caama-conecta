import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/private/sign-in')
  }

  return <div>Dashboard Private</div>
}
