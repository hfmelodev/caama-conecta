'use server'

import type { City } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

export async function getActiveCities(): Promise<City[]> {
  return await prisma.city.findMany({
    where: {
      active: true,
    },
    orderBy: {
      isThirst: 'desc',
    },
  })
}
