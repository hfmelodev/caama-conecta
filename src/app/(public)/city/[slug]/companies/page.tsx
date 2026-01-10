import { notFound } from 'next/navigation'
import { CompaniesByCityContent } from '@/app/(public)/_components/companies-by-city'
import { getCityBySlug } from '@/app/(public)/_dal/get-city-by-slug'

type CompaniesByCityPageProps = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    query: string
    categories: string | string[]
  }>
}

export default async function CompaniesByCity({ params, searchParams }: CompaniesByCityPageProps) {
  const { slug } = await params
  const { query, categories } = await searchParams

  const city = await getCityBySlug({ slug })

  if (!city) {
    notFound()
  }

  return <CompaniesByCityContent city={city} query={query} categories={categories} />
}
