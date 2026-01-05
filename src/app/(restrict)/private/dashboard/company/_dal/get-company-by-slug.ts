'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type GetCompanyBySlugProps = {
  slug: string
}

export async function getCompanyBySlug({ slug }: GetCompanyBySlugProps) {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Usuário não autenticado')
  }

  const company = await prisma.company.findUnique({
    where: { slug },
  })

  if (!company) {
    return null
  }

  return company
}
