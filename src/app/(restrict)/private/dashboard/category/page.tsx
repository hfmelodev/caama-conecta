import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { CategoriesContent } from './_components/categories'

export default async function Categories() {
  const session = await auth()

  if (!session?.user || session?.user.role !== 'ADMIN') {
    redirect('/private/sign-in')
  }

  if (session.user && session.user.inactive) {
    redirect('/private/sign-in/blocked')
  }

  return <CategoriesContent />
}
