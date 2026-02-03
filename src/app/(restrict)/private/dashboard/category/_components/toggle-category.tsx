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
import { activeCategory } from '../_actions/active-category'
import { inactiveCategory } from '../_actions/inactive-category'

type ToggleCategoryProps = {
  category: {
    id: string
    active: boolean
  }
}

export function ToggleCategory({ category }: ToggleCategoryProps) {
  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleCategoryMutation = useMutation({
    mutationFn: async ({ category }: ToggleCategoryProps) => {
      return category.active ? inactiveCategory({ id: category.id }) : activeCategory({ id: category.id })
    },
    onSuccess: async response => {
      if (response.error) {
        toast.error(response.error)
        return
      }

      await queryClient.invalidateQueries({ queryKey: ['categories'] })
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
              disabled={toggleCategoryMutation.isPending}
              className="rounded-sm md:w-[50%]"
              onClick={() => toggleCategoryMutation.mutateAsync({ category })}
            >
              {toggleCategoryMutation.isPending ? (
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
              disabled={toggleCategoryMutation.isPending}
              className="rounded-sm md:w-[50%]"
              onClick={() => toggleCategoryMutation.mutateAsync({ category })}
            >
              {toggleCategoryMutation.isPending ? (
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
