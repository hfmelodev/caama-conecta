import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function UsersTableSkeleton() {
  return Array.from({ length: 5 }, (_, index) => (
    <TableRow key={index} className="hover:bg-muted/70">
      {/* User Info */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32" /> {/* Nome */}
            <Skeleton className="h-3 w-40 md:hidden" /> {/* Email mobile */}
          </div>
        </div>
      </TableCell>

      {/* Email */}
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-4 w-48" />
      </TableCell>

      {/* Role */}
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-6 w-24 rounded-full" />
      </TableCell>

      {/* Status */}
      <TableCell className="text-center">
        <div className="flex justify-center">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" /> {/* Edit */}
          <Skeleton className="h-8 w-8 rounded-md" /> {/* Power */}
        </div>
      </TableCell>
    </TableRow>
  ))
}
