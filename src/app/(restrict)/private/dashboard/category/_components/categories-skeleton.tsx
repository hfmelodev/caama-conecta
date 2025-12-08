import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function CategoriesSkeleton() {
  return Array.from({ length: 8 }, (_, index) => (
    <TableRow key={index}>
      {/* Category Info */}
      <TableCell className="px-6 py-4 md:px-2 md:py-3">
        <Skeleton className="h-4 w-32" />
      </TableCell>

      {/* Slug Info */}
      <TableCell className="hidden px-6 py-4 md:table-cell md:px-2 md:py-3">
        <Skeleton className="h-4 w-24 rounded-sm" />
      </TableCell>

      {/* Ícone Info */}
      <TableCell className="hidden px-6 py-4 text-center md:table-cell md:px-2 md:py-3">
        <div className="flex justify-center">
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      </TableCell>

      {/* Status Info */}
      <TableCell className="px-6 py-4 text-center md:px-2 md:py-3">
        <div className="flex justify-center">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </TableCell>

      {/* Ações */}
      <TableCell className="px-6 py-4 md:px-2 md:py-3">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  ))
}
