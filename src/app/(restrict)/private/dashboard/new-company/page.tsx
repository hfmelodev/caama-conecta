import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { NewCompany } from './_components/new-company'
import { getAllCategories } from './_dal/get-all-categories'
import { getAllCities } from './_dal/get-all-cities'

export const metadata: Metadata = {
  title: 'Nova Empresa | Caama Conecta',
}

export default async function Company() {
  const session = await auth()

  if (!session?.user) {
    redirect('/private/sign-in')
  }

  if (session.user && session.user.inactive) {
    redirect('/private/sign-in/blocked')
  }

  const cities = await getAllCities()
  const categories = await getAllCategories()

  return <NewCompany cities={cities} categories={categories} />
}
