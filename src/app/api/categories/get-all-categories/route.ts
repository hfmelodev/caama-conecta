import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = Number(searchParams.get('page')) || 1
  const name = searchParams.get('name') || ''

  try {
    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
          active: true,
        },
        skip: (page - 1) * 8,
        take: 8,
      }),
      prisma.category.count({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
        },
      }),
    ])

    if (!categories) {
      return {
        status: 404,
        error: 'Categorias não encontradas.',
      }
    }

    return NextResponse.json({ categories, total }, { status: 200 })
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Houve um erro ao obter todos os   usuários.',
    }
  }
}
