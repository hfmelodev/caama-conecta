'use server'

import type { Category } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

export async function getAllCategories(): Promise<Category[]> {
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
    return []
  }
}
