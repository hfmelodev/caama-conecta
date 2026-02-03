'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newCategoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: 'O nome é obrigatório' })
    .refine(value => /^[A-Za-zÀ-ÿ]/.test(value), {
      message: 'O nome não pode começar com número',
    }),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z]+(?:-[a-z]+)*$/, {
      message: 'Use apenas letras minúsculas e hífens',
    })
    .nonempty(),
  icon: z
    .string()
    .regex(/^$|^(\p{Emoji}(?:\u200D\p{Emoji})*)$/u, 'O ícone deve ser apenas um emoji')
    .optional(),
})

export type NewCategoryFormType = z.infer<typeof newCategoryFormSchema>

export type UseNewCategoryFormType = {
  name: string
  slug: string
  icon: string | null
}

export function useNewCategoryForm({ name, slug, icon }: UseNewCategoryFormType) {
  return useForm<NewCategoryFormType>({
    shouldUnregister: true,
    resolver: zodResolver(newCategoryFormSchema),
    defaultValues: {
      name: name || '',
      slug: slug || '',
      icon: icon || '',
    },
  })
}
