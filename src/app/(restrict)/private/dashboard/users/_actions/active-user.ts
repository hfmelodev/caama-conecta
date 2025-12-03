'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const activeUserFormSchema = z.object({
  id: z.cuid(),
})

export type ActiveUserFormType = z.infer<typeof activeUserFormSchema>

export async function activeUser({ id }: ActiveUserFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      message: 'Usuário não autenticado',
    }
  }

  const schema = activeUserFormSchema.safeParse({
    id,
  })

  if (!schema.success) {
    return {
      status: 400,
      message: 'Ocorreu um erro ao ativar o usuário',
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        inactive: null,
        updatedAt: new Date(),
      },
    })

    revalidatePath('/private/dashboard/users')

    return {
      status: 200,
      message: 'Usuário ativado com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao ativado o usuário',
    }
  }
}
