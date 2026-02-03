'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const cityFormSchema = z.object({
  id: z.cuid(),
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

export type CityFormType = z.infer<typeof cityFormSchema>

export async function updateProfile({ id, name, slug, isThirst }: CityFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = cityFormSchema.safeParse({
    id,
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
      id: schema.data.id,
    },
  })

  if (!cityExists) {
    return {
      status: 404,
      error: 'Cidade não encontrada',
    }
  }

  // 🔹 Verifica se já existe OUTRA cidade com mesmo nome ou slug
  const duplicateCity = await prisma.city.findFirst({
    where: {
      OR: [{ name }, { slug }],
      NOT: { id },
    },
    select: { id: true, name: true, slug: true },
  })

  if (duplicateCity) {
    return {
      status: 400,
      error: 'Já existe outra cidade cadastrada com esse nome ou slug.',
    }
  }

  // 🔹 REGRA DE NEGÓCIO: só pode existir UMA sede
  if (isThirst) {
    const existingHeadCity = await prisma.city.findFirst({
      where: {
        isThirst: true,
        NOT: { id }, // permite salvar se a própria cidade já for sede
      },
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
    await prisma.city.update({
      where: {
        id: id,
      },
      data: {
        name,
        slug,
        isThirst,
      },
    })

    revalidatePath('/private/dashboard/city')
    revalidatePath('/')

    return {
      status: 200,
      message: 'Cidade atualizada com sucesso',
    }
  } catch (err) {
    console.log(err)

    return {
      status: 500,
      error: 'Ocorreu um erro ao atualizar a cidade.',
    }
  }
}
