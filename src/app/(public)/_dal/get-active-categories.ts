'use server'

import { prisma } from '@/lib/prisma'

export async function getActiveCategories(citySlug: string) {
  const city = await prisma.city.findUnique({
    where: { slug: citySlug },
    select: { id: true },
  })

  if (!city) {
    return [] // ou throw new Error('Cidade não encontrada')
  }

  return prisma.category.findMany({
    where: {
      active: true,
      companies: {
        // some => pelo menos um
        some: {
          active: true,
          cityId: city.id,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
      icon: true,
      _count: {
        select: {
          companies: {
            where: {
              active: true,
              cityId: city.id,
            },
          },
        },
      },
    },
  })
}
