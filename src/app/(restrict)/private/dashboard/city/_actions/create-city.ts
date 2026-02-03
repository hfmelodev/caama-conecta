'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const newCityFormSchema = z.object({
  name: z.string().trim().nonempty({
    message: 'O nome é obrigatório',
  }),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z]+(?:-[a-z]+)*$/, {
      message: 'Use apenas letras minúsculas e hífens',
    })
    .nonempty(),
  isThirst: z.boolean(),
})

type NewCityFormType = z.infer<typeof newCityFormSchema>

export async function createCity({ name, slug, isThirst }: NewCityFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = newCityFormSchema.safeParse({
    name,
    slug,
    isThirst,
  })

  if (!schema.success) {
    return {
      status: 400,
      error: 'Os campos obrigatórios devem ser preenchidos',
    }
  }

  const cityExists = await prisma.city.findUnique({
    where: {
      slug,
    },
  })

  if (cityExists) {
    return {
      status: 400,
      error: 'Cidade já cadastrada no sistema.',
    }
  }

  // 🔹 REGRA DE NEGÓCIO: só pode existir UMA sede
  if (isThirst) {
    const existingHeadCity = await prisma.city.findFirst({
      where: { isThirst: true },
      select: { id: true, name: true },
    })

    if (existingHeadCity) {
      return {
        status: 400,
        error: 'Já existe uma cidade como Sede.',
      }
    }
  }

  try {
    await prisma.city.create({
      data: {
        name,
        slug,
        isThirst,
      },
    })

    revalidatePath('/private/dashboard/city')
    revalidatePath('/')

    return {
      status: 201,
      message: 'Cidade cadastrada com sucesso.',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Erro ao cadastrar cidade.',
    }
  }
}
