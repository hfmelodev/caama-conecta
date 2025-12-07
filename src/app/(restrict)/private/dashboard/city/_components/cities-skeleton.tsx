import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function CitiesSkeleton() {
  return Array.from({ length: 10 }, (_, index) => (
    <TableRow key={index} className="py-5">
      {/* City name */}
      <TableCell className="px-6 py-4 md:px-2 md:py-3">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </TableCell>

      {/* Slug */}
      <TableCell className="hidden px-6 py-4 md:table-cell md:px-2 md:py-3">
        <Skeleton className="h-5 w-24 rounded-sm" />
      </TableCell>

      {/* Tipo (badge) */}
      <TableCell className="hidden px-6 py-4 md:table-cell md:px-2 md:py-3">
        <Skeleton className="h-5 w-20 rounded-full" />
      </TableCell>

      {/* Status */}
      <TableCell className="px-6 py-4 md:px-2 md:py-3">
        <Skeleton className="h-5 w-16 rounded-full" />
      </TableCell>

      {/* Ações */}
      <TableCell className="px-6 py-4 md:px-2 md:py-3">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  ))
}
