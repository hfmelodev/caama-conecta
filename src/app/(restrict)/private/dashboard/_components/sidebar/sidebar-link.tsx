import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type SidebarLinkProps = {
  href: string
  icon: React.ReactNode
  label: string
  pathname: string
  isCollapsed: boolean
  setIsSheetOpen: (open: boolean) => void
}

export function SidebarLink({ href, icon, label, pathname, isCollapsed, setIsSheetOpen }: SidebarLinkProps) {
  return (
    <Link href={href}>
      {!isCollapsed ? (
        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-2 rounded-md border px-4 py-2 text-primary text-sm transition-colors hover:bg-linear-to-r hover:from-primary hover:to-sky-600 hover:text-primary-foreground',
            {
              'bg-linear-to-r from-primary to-sky-600 text-muted': pathname === href,
            }
          )}
          onClick={() => setIsSheetOpen(false)}
        >
          <span>{icon}</span>
          {!isCollapsed && <span className="font-medium">{label}</span>}
        </button>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                'flex size-9 items-center justify-center gap-2 rounded-md border text-primary transition-colors hover:bg-linear-to-r hover:from-primary hover:to-sky-600 hover:text-primary-foreground',
                {
                  'bg-linear-to-r from-primary to-sky-600 text-muted': pathname === href,
                }
              )}
            >
              {icon}
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-linear-to-r from-primary to-sky-600 font-medium" sideOffset={10} side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </Link>
  )
}
