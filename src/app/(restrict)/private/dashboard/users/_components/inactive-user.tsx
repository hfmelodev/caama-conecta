'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Power } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { activeUser } from '../_actions/active-user'
import { inactiveUser } from '../_actions/inactive-user'

type InactiveUserProps = {
  user: {
    id: string
    inactive: Date | null
  }
}

export function InactiveUser({ user }: InactiveUserProps) {
  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleInactiveUser(id: string) {
    const response = await inactiveUser({ id })

    if (response.error) {
      toast.error(response.message)
      return
    }

    await queryClient.invalidateQueries({
      queryKey: ['users'],
    })

    setIsDialogOpen(false)

    toast.success(response.message)
  }

  async function handleActiveUser(id: string) {
    const response = await activeUser({ id })

    if (response.error) {
      toast.error(response.message)
      return
    }

    await queryClient.invalidateQueries({
      queryKey: ['users'],
    })

    setIsDialogOpen(false)

    toast.success(response.message)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={user.inactive ? 'text-emerald-600 hover:bg-emerald-500/30' : 'text-destructive hover:bg-destructive/30'}
        >
          <Power className="size-4" />
          <span className="sr-only">{user.inactive ? 'Ativar' : 'Inativar'}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          {user.inactive ? (
            <>
              <DialogTitle>Ativar usuário</DialogTitle>
              <DialogDescription>Tem certeza que deseja ativar esse usuário?</DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>Inativar usuário</DialogTitle>
              <DialogDescription>Tem certeza que deseja inativar esse usuário?</DialogDescription>
            </>
          )}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" type="button" className="rounded-sm md:w-[50%]">
              Cancelar
            </Button>
          </DialogClose>

          {user.inactive ? (
            <Button
              type="button"
              size="sm"
              className="rounded-sm bg-emerald-600 hover:bg-emerald-500 md:w-[50%]"
              onClick={() => handleActiveUser(user.id)}
            >
              <Power className="size-4" />
              Ativar
            </Button>
          ) : (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="rounded-sm md:w-[50%]"
              onClick={() => handleInactiveUser(user.id)}
            >
              <Power className="size-4" />
              Desativar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
