'use client'

import { Building2, User } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { CiMenuFries } from 'react-icons/ci'
import { LuMapPinHouse, LuPanelLeftOpen, LuPanelRightOpen } from 'react-icons/lu'
import { RiProfileLine } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { SidebarLink } from './sidebar-link'

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const pathname = usePathname()

  return (
    <main className="flex min-h-screen w-full">
      {/* Menu Sidebar Desktop */}
      <aside
        className={cn('flex h-full flex-col border-r bg-background p-4 transition-all duration-300', {
          'w-20': isCollapsed,
          'w-64': !isCollapsed,
          'hidden md:fixed md:flex md:items-center': true,
        })}
      >
        {isCollapsed ? (
          <Image src="/assets/logo-caama-azul-cut.png" alt="Logo CAAMA" width={50} height={50} quality={100} priority />
        ) : (
          <Image src="/assets/logo-caama-azul.png" alt="Logo CAAMA" width={190} height={50} quality={100} priority />
        )}

        <Separator className="my-4" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn('self-end', {
                'self-center': isCollapsed,
              })}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <LuPanelLeftOpen className="size-5" strokeWidth={1.8} />
              ) : (
                <LuPanelRightOpen className="size-5" strokeWidth={1.8} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-primary font-medium" side={isCollapsed ? 'right' : 'top'}>
            <p>{isCollapsed ? 'Expandir' : 'Minimizar'}</p>
          </TooltipContent>
        </Tooltip>

        {isCollapsed && <Separator className="mt-3 mb-2" />}

        {/* Quando collapsed exibirá somente os icones do menu */}
        {isCollapsed && (
          <nav className="flex flex-col gap-4 overflow-hidden">
            <SidebarLink
              href="/private/dashboard"
              icon={<RxDashboard className="size-5" />}
              label="Dashboard"
              pathname={pathname}
              isCollapsed={isCollapsed}
              setIsSheetOpen={setIsSheetOpen}
            />
            <SidebarLink
              href="/private/dashboard/city"
              icon={<LuMapPinHouse className="size-5" />}
              label="Cidades"
              pathname={pathname}
              isCollapsed={isCollapsed}
              setIsSheetOpen={setIsSheetOpen}
            />
            <SidebarLink
              href="/private/dashboard/company"
              icon={<Building2 className="size-5" />}
              label="Empresas"
              pathname={pathname}
              isCollapsed={isCollapsed}
              setIsSheetOpen={setIsSheetOpen}
            />
            <SidebarLink
              href="/private/dashboard/user"
              icon={<User className="size-5" />}
              label="Usuários"
              pathname={pathname}
              isCollapsed={isCollapsed}
              setIsSheetOpen={setIsSheetOpen}
            />

            <SidebarLink
              href="/private/dashboard/profile"
              icon={<RiProfileLine className="size-5" />}
              label="Perfil"
              pathname={pathname}
              isCollapsed={isCollapsed}
              setIsSheetOpen={setIsSheetOpen}
            />
          </nav>
        )}

        <Collapsible open={!isCollapsed} className="mt-4 w-full self-start">
          <CollapsibleContent>
            <nav className="flex flex-col gap-2.5 overflow-hidden">
              <h3 className="font-semibold text-muted-foreground text-xs uppercase">Administrativo</h3>
              <SidebarLink
                href="/private/dashboard"
                icon={<RxDashboard className="size-5" />}
                label="Dashboard"
                pathname={pathname}
                isCollapsed={isCollapsed}
                setIsSheetOpen={setIsSheetOpen}
              />
              <SidebarLink
                href="/private/dashboard/city"
                icon={<LuMapPinHouse className="size-5" />}
                label="Cidades"
                pathname={pathname}
                isCollapsed={isCollapsed}
                setIsSheetOpen={setIsSheetOpen}
              />
              <SidebarLink
                href="/private/dashboard/company"
                icon={<Building2 className="size-5" />}
                label="Empresas"
                pathname={pathname}
                isCollapsed={isCollapsed}
                setIsSheetOpen={setIsSheetOpen}
              />
              <SidebarLink
                href="/private/dashboard/user"
                icon={<User className="size-5" />}
                label="Usuários"
                pathname={pathname}
                isCollapsed={isCollapsed}
                setIsSheetOpen={setIsSheetOpen}
              />

              <Separator className="my-2" />

              <h3 className="font-semibold text-muted-foreground text-xs uppercase">Minha Conta</h3>
              <SidebarLink
                href="/private/dashboard/profile"
                icon={<RiProfileLine className="size-5" />}
                label="Perfil"
                pathname={pathname}
                isCollapsed={isCollapsed}
                setIsSheetOpen={setIsSheetOpen}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      {/* Menu Sidebar Mobile */}
      <div
        className={cn('flex flex-1 flex-col transition-all duration-300', {
          'md:ml-20': isCollapsed,
          'md:ml-64': !isCollapsed,
        })}
      >
        <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <div className="flex items-center justify-between px-4 py-2">
              <Image src="/assets/logo-caama-azul.png" alt="Logo CAAMA" width={190} height={50} quality={100} priority />

              <SheetTrigger asChild>
                <Button variant="outline" size={'icon'} className="md:hidden" onClick={() => setIsCollapsed(false)}>
                  <CiMenuFries className="size-5" />
                </Button>
              </SheetTrigger>
            </div>

            <SheetContent side="right">
              <SheetHeader className="border-b bg-card/80 p-2">
                <SheetTitle>
                  <Image src="/assets/logo-caama-azul.png" alt="Logo CAAMA" width={190} height={50} quality={100} priority />
                </SheetTitle>
                <SheetDescription className="sr-only" />
              </SheetHeader>

              <nav className="grid gap-2.5 px-4">
                <h3 className="font-semibold text-muted-foreground text-xs uppercase">Administrativo</h3>
                <SidebarLink
                  href="/private/dashboard"
                  icon={<RxDashboard className="size-5" />}
                  label="Dashboard"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  setIsSheetOpen={setIsSheetOpen}
                />
                <SidebarLink
                  href="/private/dashboard/city"
                  icon={<LuMapPinHouse className="size-5" />}
                  label="Cidades"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  setIsSheetOpen={setIsSheetOpen}
                />
                <SidebarLink
                  href="/private/dashboard/company"
                  icon={<Building2 className="size-5" />}
                  label="Empresas"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  setIsSheetOpen={setIsSheetOpen}
                />
                <SidebarLink
                  href="/private/dashboard/user"
                  icon={<User className="size-5" />}
                  label="Usuários"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  setIsSheetOpen={setIsSheetOpen}
                />

                <Separator className="my-2" />

                <h3 className="font-semibold text-muted-foreground text-xs uppercase">Minha Conta</h3>
                <SidebarLink
                  href="/private/dashboard/profile"
                  icon={<RiProfileLine className="size-5" />}
                  label="Perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  setIsSheetOpen={setIsSheetOpen}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1 px-6 py-2 md:p-6">{children}</div>
      </div>
    </main>
  )
}
