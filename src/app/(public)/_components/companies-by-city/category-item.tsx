'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type CategoryItemProps = {
  category: {
    name: string
    id: string
    icon: string | null
    _count: {
      companies: number
    }
  }
}

export function CategoryItem({ category }: CategoryItemProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentCategoriesIds = searchParams.getAll('categories')
  const currentQuery = searchParams.get('query')

  const isSelected = currentCategoriesIds.includes(category.id)

  function handleOnSelectCategories() {
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          query: currentQuery,
          categories: isSelected ? currentCategoriesIds.filter(id => id !== category.id) : [...currentCategoriesIds, category.id],
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    )

    router.push(url)
  }

  return (
    <Button
      key={category.id}
      size="sm"
      variant={isSelected ? 'default' : 'outline'}
      className="flex shrink-0 cursor-pointer! select-none items-center gap-2 whitespace-nowrap transition-all duration-300 hover:border-primary/70"
      onClick={handleOnSelectCategories}
    >
      <span>{category.icon}</span>
      <p>{category.name}</p>
      {category._count?.companies > 0 && (
        <Badge variant="secondary" className="ml-2">
          {category._count?.companies}
        </Badge>
      )}
    </Button>
  )
}
