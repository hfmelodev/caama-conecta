import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function HomeTableSkeleton() {
  return Array.from({ length: 8 }, (_, index) => (
    <TableRow key={index} className="animate-pulse">
      {/* Company Info */}
      <TableCell className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </TableCell>

      {/* City */}
      <TableCell className="hidden px-6 py-4 md:table-cell">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </TableCell>

      {/* Category */}
      <TableCell className="hidden px-6 py-4 md:table-cell">
        <Skeleton className="h-6 w-28 rounded-full" />
      </TableCell>

      {/* WhatsApp */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-4 w-32" />
      </TableCell>

      {/* Status */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>

      {/* Actions */}
      <TableCell className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="size-9 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  ))
}
