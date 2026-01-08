'use client'

import { DraggableScroll } from '@/components/app/draggable-scroll'
import type { Category } from '@/generated/prisma/client'
import { CategoryItem } from './category-item'

type CategoriesItemProps = {
  categories: Category[]
}

export function CategoriesList({ categories }: CategoriesItemProps) {
  return (
    <DraggableScroll className="scroll-hidden mask-r-from-80% flex w-full gap-2 overflow-auto pr-28">
      {categories.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </DraggableScroll>
  )
}
