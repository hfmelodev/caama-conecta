'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const updateCompanyFormSchema = z.object({
  id: z.cuid(),
  name: z.string().trim().nonempty(),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z]+(?:-[a-z]+)*$/)
    .nonempty(),
  description: z.string().trim().nonempty(),
  logoUrl: z.url().optional(),
  publicImageId: z.string().optional(),
  phone: z.string().trim().optional(),
  whatsapp: z.string().trim().nonempty(),
  email: z.email().trim(),
  instagram: z.string().trim().nonempty(),
  address: z.string().trim().nonempty(),
  neighborhood: z.string().trim().nonempty(),
  zipCode: z.string().trim().nonempty(),
  discount: z
    .string()
    .trim()
    .nonempty()
    .refine(value => {
      const number = Number(value)
      return !Number.isNaN(number) && number >= 0 && number <= 100
    }),
  benefits: z.string().trim().nonempty(),
  featured: z.boolean().optional(),
  cityId: z.cuid(),
  categoryId: z.cuid(),
})

export type UpdateFormType = z.infer<typeof updateCompanyFormSchema>

export async function updateCompany(data: UpdateFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = updateCompanyFormSchema.safeParse(data)

  if (!schema.success) {
    return {
      status: 400,
      error: 'Dados inválidos, verifique os campos e tente novamente',
    }
  }

  try {
    await prisma.company.update({
      where: {
        id: data.id,
      },
      data,
    })

    revalidatePath('/private/dashboard')

    return {
      status: 200,
      message: 'Empresa atualizada com sucesso',
    }
  } catch (err) {
    console.log(err)

    return {
      status: 500,
      error: 'Ocorreu um erro ao atualizar a empresa',
    }
  }
}
