'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const inactiveCompanyFormSchema = z.object({
  id: z.cuid(),
})

export type InactiveCompanyFormType = z.infer<typeof inactiveCompanyFormSchema>

export async function inactiveCompany({ id }: InactiveCompanyFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = inactiveCompanyFormSchema.safeParse({
    id,
  })

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao inativar a empresa',
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
        active: false,
        updatedAt: new Date(),
      },
    })

    revalidatePath('/private/dashboard')

    return {
      status: 200,
      message: 'Empresa inativada com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao inativar a empresa.',
    }
  }
}
