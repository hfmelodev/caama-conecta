'use server'

import { prisma } from '@/lib/prisma'

type GetCityBySlugProps = {
  slug: string
}

export async function getCityBySlug({ slug }: GetCityBySlugProps) {
  const city = await prisma.city.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      active: true,
      _count: {
        select: {
          companies: {
            where: {
              active: true,
            },
          },
        },
      },
    },
  })

  if (!city) {
    return null
  }

  return city
}
