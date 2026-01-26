'use client'

import { useQueryClient } from '@tanstack/react-query'
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
import { activeCompany } from '../_actions/active-company'
import { inactiveCompany } from '../_actions/inactive-company'

type InactiveCompanyProps = {
  company: {
    id: string
    active: boolean
  }
}

export function InactiveCompany({ company }: InactiveCompanyProps) {
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleInactiveCompany(id: string) {
    setIsLoading(true)

    const response = await inactiveCompany({ id })

    if (response.error) {
      toast.error(response.error)
      setIsLoading(false)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['companies'] })

    toast.success(response.message)
    setIsDialogOpen(false)
    setIsLoading(false)
  }

  async function handleActiveCompany(id: string) {
    setIsLoading(true)

    const response = await activeCompany({ id })

    if (response.error) {
      toast.error(response.error)
      setIsLoading(false)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['companies'] })

    toast.success(response.message)
    setIsDialogOpen(false)
    setIsLoading(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={company.active ? 'text-destructive hover:bg-destructive/30' : 'text-emerald-600 hover:bg-emerald-500/30'}
        >
          <Power className="size-4" />
          <span className="sr-only">{company.active ? 'Inativar' : 'Ativar'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {company.active ? (
            <>
              <DialogTitle>Inativar empresa</DialogTitle>
              <DialogDescription>Tem certeza que deseja inativar esta empresa?</DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>Ativar empresa</DialogTitle>
              <DialogDescription>Tem certeza que deseja ativar esta empresa?</DialogDescription>
            </>
          )}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" type="button" className="rounded-sm md:w-[50%]">
              Cancelar
            </Button>
          </DialogClose>

          {company.active ? (
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              size="sm"
              className="rounded-sm md:w-[50%]"
              onClick={() => handleInactiveCompany(company.id)}
            >
              {isLoading ? (
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
              disabled={isLoading}
              size="sm"
              className="rounded-sm bg-emerald-600 hover:bg-emerald-500 md:w-[50%]"
              onClick={() => handleActiveCompany(company.id)}
            >
              {isLoading ? (
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
