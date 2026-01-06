'use server'

import type { Category } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

export async function getActiveCategories(): Promise<Category[]> {
  return await prisma.category.findMany({
    where: {
      active: true,
    },
    orderBy: {
      name: 'asc',
    },
  })
}
