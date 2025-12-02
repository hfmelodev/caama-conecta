'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const updateUserFormSchema = z.object({
  id: z.cuid(),
  name: z.string().trim().nonempty({
    message: 'O nome é obrigatório',
  }),
  role: z.enum(['ADMIN', 'MEMBER']),
})

export type UpdateUserFormType = z.infer<typeof updateUserFormSchema>

export type UseUpdateUserFormType = {
  id: string
  name: string | null
  role: 'ADMIN' | 'MEMBER'
}

export function useUpdateUserForm({ id, name, role }: UseUpdateUserFormType) {
  return useForm<UpdateUserFormType>({
    resolver: zodResolver(updateUserFormSchema),
    values: {
      id: id,
      name: name || '',
      role: role,
    },
  })
}
