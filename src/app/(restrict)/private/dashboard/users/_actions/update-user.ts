'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const userFormSchema = z.object({
  id: z.cuid(),
  name: z.string().trim().nonempty(),
  role: z.enum(['ADMIN', 'MEMBER']),
})

export type UserFormType = z.infer<typeof userFormSchema>

export async function updateProfile({ id, name, role }: UserFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      message: 'Usuário não autenticado',
    }
  }

  const schema = userFormSchema.safeParse({
    id,
    name,
    role,
  })

  if (!schema.success) {
    return {
      status: 400,
      message: 'Os campos obrigatórios devem ser preenchidos',
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        role,
      },
    })

    revalidatePath('private/dashboard/users')

    return {
      status: 200,
      message: 'Usuário atualizado com sucesso',
    }
  } catch (err) {
    console.log(err)

    return {
      status: 500,
      error: 'Ocorreu um erro ao atualizar o perfil',
    }
  }
}
