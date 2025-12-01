'use client'

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { type UseUpdateUserFormType, useUpdateUserForm } from './users-form'

type UpdateUsersProps = {
  user: {
    id: string
    name: string | null
    role: 'ADMIN' | 'MEMBER'
  }
}

export function UpdateUsers({ user }: UpdateUsersProps) {
  const form = useUpdateUserForm({
    id: user.id,
    name: user.name || '',
    role: user.role,
  })

  async function handleUpdateUser(data: UseUpdateUserFormType) {
    console.log(data.id)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Informações do Funcionário</DialogTitle>
        <DialogDescription>Altere os dados do funcionário conforme necessário.</DialogDescription>
      </DialogHeader>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdateUser)}>
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel>Nome completo:</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>

                    {errors.name ? (
                      <FormMessage className="text-destructive text-xs">{errors.name.message}</FormMessage>
                    ) : (
                      <FormDescription className="text-muted-foreground text-xs">
                        Por favor, insira o nome completo do funcionário
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </DialogContent>
  )
}
