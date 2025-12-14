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

type UseNewCompanyFormType = {
  name: string
  slug: string
  description?: string
  phone?: string
  whatsapp: string
  email?: string
  website?: string
  address?: string
  neighborhood?: string
  zipCode?: string
  discount?: number
  benefits?: string
  featured?: boolean
  cityId: string
  categoryId: string
}

export function useNewCompanyForm({
  name,
  slug,
  description,
  phone,
  whatsapp,
  email,
  website,
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
      phone: phone || '',
      whatsapp: whatsapp || '',
      email: email ?? undefined,
      website: website ?? undefined,
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
