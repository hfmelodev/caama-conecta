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
    <Link href={href} className="mx-4 sm:mx-0">
      {!isCollapsed ? (
        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground',
            {
              'bg-primary text-muted': pathname === href,
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
                'flex items-center gap-2 rounded-md border px-3 py-2 text-primary transition-colors hover:bg-primary hover:text-primary-foreground',
                {
                  'bg-primary text-muted': pathname === href,
                }
              )}
            >
              {icon}
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-primary font-medium" sideOffset={10} side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </Link>
  )
}
