'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const newCompanyFormSchema = z.object({
  name: z.string().trim().nonempty({
    message: 'O nome é obrigatório',
  }),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z]+(?:-[a-z]+)*$/, {
      message: 'Use apenas letras minúsculas e hífens',
    })
    .nonempty(),
  description: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  whatsapp: z.string().trim().nonempty({
    message: 'O WhatsApp é obrigatório',
  }),
  email: z.email().optional(),
  website: z.url().optional(),
  address: z.string().trim().optional(),
  neighborhood: z.string().trim().optional(),
  zipCode: z.string().trim().optional(),
  discount: z.number().int('Use um número inteiro').min(0, 'Mínimo 0%').max(100, 'Máximo 100%').optional(),
  benefits: z.string().trim().optional(),
  featured: z.boolean().optional(),
  cityId: z.cuid({
    message: 'A cidade é obrigatória',
  }),
  categoryId: z.cuid({
    message: 'A categoria é obrigatória',
  }),
})

export type NewCompanyFormType = z.input<typeof newCompanyFormSchema>

export async function createCompany(data: NewCompanyFormType) {
  const session = await auth()

  if (!session?.user) {
    return {
      status: 401,
      error: 'Usuário não autenticado',
    }
  }

  const schema = newCompanyFormSchema.safeParse(data)

  if (!schema.success) {
    return {
      status: 400,
      error: 'Os campos obrigatórios devem ser preenchidos',
    }
  }

  const companyExists = await prisma.company.findUnique({
    where: {
      slug: data.slug,
    },
  })

  if (companyExists) {
    return {
      status: 400,
      error: 'Empresa já cadastrada no sistema.',
    }
  }

  try {
    await prisma.company.create({ data })

    revalidatePath('/private/dashboard/company')

    return {
      status: 201,
      message: 'Empresa cadastrada com sucesso.',
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500,
      error: 'Erro ao cadastrar nova empresa.',
    }
  }
}
