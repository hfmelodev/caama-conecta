'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Power } from 'lucide-react'
import { useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
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

export function ToggleCity({ city }: InactiveCityProps) {
  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleCityMutation = useMutation({
    mutationFn: async ({ city }: InactiveCityProps) => {
      return city.active ? inactiveCity({ id: city.id }) : activeCity({ id: city.id })
    },
    onSuccess: async response => {
      if (response.error) {
        toast.error(response.error)
        return
      }

      await queryClient.invalidateQueries({ queryKey: ['cities'] })
      toast.success(response.message)
      setIsDialogOpen(false)
    },
  })

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
              onClick={() => toggleCityMutation.mutateAsync({ city })}
            >
              {toggleCityMutation.isPending ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Desativando...
                </>
              ) : (
                <>
                  <Power className="size-4" />
                  Desativar
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              variant="whatsapp"
              size="sm"
              disabled={toggleCityMutation.isPending}
              className="rounded-sm md:w-[50%]"
              onClick={() => toggleCityMutation.mutateAsync({ city })}
            >
              {toggleCityMutation.isPending ? (
                <>
                  <ImSpinner2 className="animate-spin" />
                  Ativando...
                </>
              ) : (
                <>
                  <Power className="size-4" />
                  Ativar
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
