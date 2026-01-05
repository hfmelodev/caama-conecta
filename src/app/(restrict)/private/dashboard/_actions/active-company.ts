'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const activeCompanySchema = z.object({
  id: z.cuid(),
})

export type ActiveCompanyFormType = z.infer<typeof activeCompanySchema>

export async function activeCompany({ id }: ActiveCompanyFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = activeCompanySchema.safeParse({
    id,
  })

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao ativar a empresa',
    }
  }

  const companyExists = await prisma.company.findUnique({
    where: {
      id: schema.data.id,
    },
  })

  if (!companyExists) {
    return {
      status: 404,
      error: 'Empresa não encontrada',
    }
  }

  try {
    await prisma.company.update({
      where: {
        id: schema.data.id,
      },
      data: {
        active: true,
        updatedAt: new Date(),
      },
    })

    revalidatePath('/private/dashboard')

    return {
      status: 200,
      message: 'Empresa ativada com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao ativar a cidade.',
    }
  }
}
