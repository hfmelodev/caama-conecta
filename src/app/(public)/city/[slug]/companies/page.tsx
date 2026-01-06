import { notFound } from 'next/navigation'
import { CompaniesByCityContent } from '@/app/(public)/_components/companies-by-city'
import { getCompaniesByCity } from '@/app/(public)/_dal/get-companies-by-city'

type CompaniesByCityPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function CompaniesByCity({ params }: CompaniesByCityPageProps) {
  const { slug } = await params

  const city = await getCompaniesByCity({ slug })

  if (!city) {
    notFound()
  }

  return <CompaniesByCityContent city={city} />
}
