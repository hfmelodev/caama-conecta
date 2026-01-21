'use server'

import type { City } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

export async function getActiveCities(): Promise<City[]> {
  const cities = await prisma.city.findMany({
    where: {
      active: true,
    },
    orderBy: {
      isThirst: 'desc',
    },
  })

  if (!cities) {
    return []
  }

  return cities
}
