import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function Company() {
  const session = await auth()

  if (!session?.user) {
    redirect('/private/sign-in')
  }

  return (
    <main>
      <div>Company Private</div>
    </main>
  )
}
