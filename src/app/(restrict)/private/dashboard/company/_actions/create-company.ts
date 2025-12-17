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
  description: z.string().trim().nonempty(),
  logoUrl: z.url().optional(),
  phone: z.string().trim().optional(),
  whatsapp: z.string().trim().nonempty({
    message: 'O WhatsApp é obrigatório',
  }),
  email: z
    .email({
      message: 'Insira um e-mail válido',
    })
    .trim(),
  instagram: z.string().trim().nonempty({
    message: 'O Instagram é obrigatório',
  }),
  address: z.string().trim().nonempty({
    message: 'O endereço é obrigatório',
  }),
  neighborhood: z.string().trim().nonempty({
    message: 'O bairro é obrigatório',
  }),
  zipCode: z.string().trim().nonempty({
    message: 'O CEP é obrigatório',
  }),
  discount: z
    .string()
    .trim()
    .nonempty({ message: 'O desconto é obrigatório' })
    .refine(
      value => {
        const number = Number(value)
        return !Number.isNaN(number) && number >= 0 && number <= 100
      },
      {
        message: 'O desconto deve ser um número entre 0 e 100',
      }
    ),
  benefits: z.string().trim().nonempty({
    message: 'Os benefícios são obrigatórios',
  }),
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
