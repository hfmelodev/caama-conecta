'use server'

import { prisma } from '@/lib/prisma'

type GetCompanyBySlugProps = {
  slug: string
}

export async function getCompanyBySlug({ slug }: GetCompanyBySlugProps) {
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      city: true,
      category: true,
    },
  })

  if (!company) {
    return null
  }

  return company
}
