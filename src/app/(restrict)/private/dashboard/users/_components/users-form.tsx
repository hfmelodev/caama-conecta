import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const updateUserFormSchema = z.object({
  id: z.string(),
  name: z.string().trim().nonempty({
    message: 'O nome é obrigatório',
  }),
  role: z.enum(['ADMIN', 'MEMBER']),
})

type UpdateUserFormType = z.infer<typeof updateUserFormSchema>

export type UseUpdateUserFormType = {
  id: string
  name: string | null
  role: 'ADMIN' | 'MEMBER'
}

export function useUpdateUserForm({ name, role }: UseUpdateUserFormType) {
  return useForm<UpdateUserFormType>({
    shouldUnregister: true,
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      name: name || '',
      role: role || 'MEMBER',
    },
  })
}
