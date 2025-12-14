'use server'

import type { City } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

export async function getAllCities(): Promise<City[]> {
  try {
    const cities = await prisma.city.findMany({
      where: {
        active: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return cities || []
  } catch (err) {
    console.error('Erro ao buscar cidades:', err)
    return []
  }
}
