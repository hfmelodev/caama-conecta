'use server'

import type { City } from '@/generated/prisma/client'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function getAllCities(): Promise<City[]> {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Usuário não autenticado')
  }

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
    throw new Error('Erro ao buscar cidades')
  }
}
