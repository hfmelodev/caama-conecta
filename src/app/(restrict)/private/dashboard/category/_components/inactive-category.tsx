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
import { activeCategory } from '../_actions/active-category'
import { inactiveCategory } from '../_actions/inactive-category'

type InactiveCategoryProps = {
  category: {
    id: string
    active: boolean
  }
}

export function InactiveCategory({ category }: InactiveCategoryProps) {
  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleInactiveCategory(id: string) {
    const response = await inactiveCategory({ id })

    if (response.error) {
      toast.error(response.error)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['categories'] })

    setIsDialogOpen(false)

    toast.success(response.message)
  }

  async function handleActiveCategory(id: string) {
    const response = await activeCategory({ id })

    if (response.error) {
      toast.error(response.error)
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['categories'] })

    setIsDialogOpen(false)

    toast.success(response.message)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={category.active ? 'text-destructive hover:bg-destructive/30' : 'text-emerald-600 hover:bg-emerald-500/30'}
        >
          <Power className="size-4" />
          <span className="sr-only">{category.active ? 'Inativar' : 'Ativar'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {category.active ? (
            <>
              <DialogTitle>Inativar categoria</DialogTitle>
              <DialogDescription>Tem certeza que deseja inativar esta categoria?</DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>Ativar categoria</DialogTitle>
              <DialogDescription>Tem certeza que deseja ativar esta categoria?</DialogDescription>
            </>
          )}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm" type="button" className="rounded-sm md:w-[50%]">
              Cancelar
            </Button>
          </DialogClose>

          {category.active ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="rounded-sm md:w-[50%]"
              onClick={() => handleInactiveCategory(category.id)}
            >
              <Power className="size-4" />
              Desativar
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              className="rounded-sm bg-emerald-600 hover:bg-emerald-500 md:w-[50%]"
              onClick={() => handleActiveCategory(category.id)}
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
