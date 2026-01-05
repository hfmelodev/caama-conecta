'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  description: z.string().trim().nonempty({
    message: 'A descrição é obrigatória',
  }),
  logoUrl: z.url().optional(),
  publicImageId: z.string().optional(),
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

type UseNewCompanyFormType = {
  name: string
  slug: string
  description: string
  logoUrl?: string
  publicImageId?: string
  phone?: string
  whatsapp: string
  email: string
  instagram: string
  address: string
  neighborhood: string
  zipCode: string
  discount: string
  benefits: string
  featured?: boolean
  cityId: string
  categoryId: string
}

export function useNewCompanyForm({
  name,
  slug,
  description,
  logoUrl,
  publicImageId,
  phone,
  whatsapp,
  email,
  instagram,
  address,
  neighborhood,
  zipCode,
  discount,
  benefits,
  featured,
  cityId,
  categoryId,
}: UseNewCompanyFormType) {
  return useForm<NewCompanyFormType>({
    shouldUnregister: true,
    resolver: zodResolver(newCompanyFormSchema),
    defaultValues: {
      name: name || '',
      slug: slug || '',
      description: description || '',
      logoUrl: logoUrl || '',
      publicImageId: publicImageId || '',
      phone: phone || '',
      whatsapp: whatsapp || '',
      email: email || '',
      instagram: instagram || '',
      address: address || '',
      neighborhood: neighborhood || '',
      zipCode: zipCode || '',
      discount: discount,
      benefits: benefits || '',
      featured: featured ?? false,
      cityId: cityId || '',
      categoryId: categoryId || '',
    },
  })
}
