'use server'

import type { Category } from '@/generated/prisma/client'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function getAllCategories(): Promise<Category[]> {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Usuário não autenticado')
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        active: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return categories || []
  } catch (err) {
    console.error('Erro ao buscar categorias:', err)
    throw new Error('Erro ao buscar categorias')
  }
}
