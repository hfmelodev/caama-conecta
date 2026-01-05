'use server'

import z from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const deleteImageCompanyFormSchema = z.object({
  publicImageId: z.string(),
})

export type DeleteImageCompanyFormType = z.infer<typeof deleteImageCompanyFormSchema>

export async function deleteImageCompany({ publicImageId }: DeleteImageCompanyFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = deleteImageCompanyFormSchema.safeParse({
    publicImageId,
  })

  if (!schema.success) {
    return {
      status: 400,
      error: 'Os campos obrigatórios devem ser preenchidos',
    }
  }

  const imageCompany = await prisma.company.findUnique({
    where: {
      publicImageId,
    },
  })

  if (!imageCompany) {
    return {
      status: 404,
      error: 'Imagem da empresa não encontrada',
    }
  }

  try {
    await prisma.company.update({
      where: {
        publicImageId,
      },
      data: {
        logoUrl: null,
        publicImageId: null,
      },
    })

    return {
      status: 200,
      message: 'Imagem da empresa deletada com sucesso',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Ocorreu um erro ao deletar a imagem da empresa',
    }
  }
}
