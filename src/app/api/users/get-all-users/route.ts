import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = Number(searchParams.get('page')) || 1
  const name = searchParams.get('name') || ''
  const email = searchParams.get('email') || ''

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
          email: email ? { contains: email, mode: 'insensitive' } : undefined,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          inactive: true,
          role: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * 5,
        take: 5,
      }),
      prisma.user.count({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
          email: email ? { contains: email, mode: 'insensitive' } : undefined,
        },
      }),
    ])

    if (!users) {
      return NextResponse.json({ error: 'Usuários não encontrados.' }, { status: 404 })
    }

    return NextResponse.json({ users, total }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Houve um erro ao obter todos os usuários.' }, { status: 500 })
  }
}
