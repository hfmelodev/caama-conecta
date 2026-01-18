import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = Number(searchParams.get('page')) || 1
  const name = searchParams.get('name') || ''

  try {
    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          isThirst: true,
          active: true,
        },

        skip: (page - 1) * 8,
        take: 8,
      }),
      prisma.city.count({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
        },
      }),
    ])

    if (!cities) {
      return NextResponse.json({ error: 'Cidades não encontradas.' }, { status: 404 })
    }

    return NextResponse.json({ cities, total }, { status: 200 })
  } catch (err) {
    console.log(err)
    throw NextResponse.json({ error: 'Erro ao buscar cidades' }, { status: 500 })
  }
}
