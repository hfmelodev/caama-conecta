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
import { activeCity } from '../_actions/active-city'
import { inactiveCity } from '../_actions/inactive-city'

type InactiveCityProps = {
  city: {
    id: string
    active: boolean
  }
}

export function InactiveCity({ city }: InactiveCityProps) {
  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleInactiveCity(id: string) {
    const response = await inactiveCity({ id })

    if (response.error) {
      toast.error(response.message)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['cities'] })

    setIsDialogOpen(false)

    toast.success(response.message)
  }

  async function handleActiveCity(id: string) {
    const response = await activeCity({ id })

    if (response.error) {
      toast.error(response.message)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['cities'] })

    setIsDialogOpen(false)

    toast.success(response.message)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={city.active ? 'text-destructive hover:bg-destructive/30' : 'text-emerald-600 hover:bg-emerald-500/30'}
        >
          <Power className="size-4" />
          <span className="sr-only">{city.active ? 'Inativar' : 'Ativar'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {city.active ? (
            <>
              <DialogTitle>Inativar cidade</DialogTitle>
              <DialogDescription>Tem certeza que deseja inativar esta cidade?</DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>Ativar cidade</DialogTitle>
              <DialogDescription>Tem certeza que deseja ativar esta cidade?</DialogDescription>
            </>
          )}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" type="button" className="rounded-sm md:w-[50%]">
              Cancelar
            </Button>
          </DialogClose>

          {city.active ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="rounded-sm md:w-[50%]"
              onClick={() => handleInactiveCity(city.id)}
            >
              <Power className="size-4" />
              Desativar
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              className="rounded-sm bg-emerald-600 hover:bg-emerald-500 md:w-[50%]"
              onClick={() => handleActiveCity(city.id)}
            >
              <Power className="size-4" />
              Ativar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
