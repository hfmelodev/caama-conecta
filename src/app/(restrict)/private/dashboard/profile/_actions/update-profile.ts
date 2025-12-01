'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const profileFormSchema = z.object({
  name: z.string().trim().nonempty(),
})

export type ProfileFormType = z.infer<typeof profileFormSchema>

export async function updateProfile({ name }: ProfileFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      message: 'Usuário não autenticado',
    }
  }

  const schema = profileFormSchema.safeParse({
    name,
  })

  if (!schema.success) {
    return {
      status: 400,
      message: 'O nome é obrigatório',
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
      },
    })

    revalidatePath('/private/dashboard/profile')

    return {
      status: 200,
      message: 'Perfil atualizado com sucesso',
    }
  } catch (err) {
    console.log(err)

    return {
      status: 500,
      error: 'Ocorreu um erro ao atualizar o perfil',
    }
  }
}
