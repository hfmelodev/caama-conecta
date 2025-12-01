import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { ProfileContent } from './_components/profile'
import { getProfile } from './_dal/get-profile'

export default async function Profile() {
  const session = await auth()

  if (!session?.user) {
    redirect('/private/sign-in')
  }

  const user = await getProfile({
    userId: session.user.id,
  })

  if (!user) {
    redirect('/private/sign-in')
  }

  return <ProfileContent user={user} />
}
