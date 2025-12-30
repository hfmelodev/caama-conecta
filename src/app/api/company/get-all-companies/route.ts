'use server'

import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = Number(searchParams.get('page')) || 1
  const name = searchParams.get('name') || ''
  const city = searchParams.get('city') || ''

  try {
    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
          city: city
            ? {
                name: {
                  contains: city,
                  mode: 'insensitive',
                },
              }
            : undefined,
        },
        select: {
          id: true,
          name: true,
          email: true,
          logoUrl: true,
          city: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              icon: true,
            },
          },
          whatsapp: true,
          active: true,
          featured: true,
        },
        orderBy: {
          featured: 'desc', // Ordena por destaque primeiro, depois por data de criação
        },
        skip: (page - 1) * 8,
        take: 8,
      }),
      prisma.company.count({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
          city: city
            ? {
                name: {
                  contains: city,
                  mode: 'insensitive',
                },
              }
            : undefined,
        },
      }),
    ])

    if (!companies || companies.length === 0) {
      return NextResponse.json({ error: 'Nenhuma empresa encontrada.' }, { status: 404 })
    }

    return NextResponse.json({ companies, total }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Houve um erro ao obter todas as empresas.' }, { status: 500 })
  }
}
