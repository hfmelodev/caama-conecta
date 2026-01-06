import type { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/prisma'

type GetCompaniesByCityIdProps = {
  cityId: string
}

export type CompanyWithRelations = Prisma.CompanyGetPayload<{
  include: {
    city: {
      select: {
        name: true
      }
    }
    category: {
      select: {
        name: true
        icon: true
        _count: {
          select: {
            companies: true
          }
        }
      }
    }
  }
}>

export async function findCompaniesByCityId({ cityId }: GetCompaniesByCityIdProps): Promise<CompanyWithRelations[]> {
  return prisma.company.findMany({
    where: {
      cityId,
    },
    include: {
      city: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
          icon: true,
          _count: {
            select: {
              companies: true,
            },
          },
        },
      },
    },
    orderBy: {
      featured: 'desc',
    },
  })
}
