'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

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

export type NewCityFormType = z.infer<typeof newCityFormSchema>

export type UseNewCityFormType = {
  name: string
  slug: string
  isThirst: boolean
}

export function useNewCityForm({ name, slug, isThirst }: UseNewCityFormType) {
  return useForm<NewCityFormType>({
    shouldUnregister: true,
    resolver: zodResolver(newCityFormSchema),
    defaultValues: {
      name: name || '',
      slug: slug || '',
      isThirst: isThirst,
    },
  })
}
