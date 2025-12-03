'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const inactiveUserFormSchema = z.object({
  id: z.cuid(),
})

export type InactiveUserFormType = z.infer<typeof inactiveUserFormSchema>

export async function inactiveUser({ id }: InactiveUserFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      message: 'Usuário não autenticado',
    }
  }

  const schema = inactiveUserFormSchema.safeParse({
    id,
  })

  if (!schema.success) {
    return {
      status: 400,
      message: 'Ocorreu um erro ao inativar o usuário',
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        inactive: new Date(),
        updatedAt: new Date(),
      },
    })

    revalidatePath('/private/dashboard/users')

    return {
      status: 200,
      message: 'Usuário inativado com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao inativar o usuário',
    }
  }
}
