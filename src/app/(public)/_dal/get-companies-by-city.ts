'use server'

import { prisma } from '@/lib/prisma'

type GetCompaniesByCityProps = {
  slug: string
}

export async function getCompaniesByCity({ slug }: GetCompaniesByCityProps) {
  const city = await prisma.city.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          companies: true,
        },
      },
    },
  })

  if (!city) {
    return null
  }

  return city
}
