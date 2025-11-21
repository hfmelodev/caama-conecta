import Image from 'next/image'
import Link from 'next/link'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/assets/logo-caama-azul.png" alt="Logo CAAMA" width={190} height={50} quality={100} priority />
          </Link>

          <Button asChild variant="outline">
            <Link href="#empresas" className="relative flex items-center gap-2 overflow-hidden">
              <h2 className="font-semibold text-primary md:font-medium">Empresas parceiras</h2>
              <span className="animate-wave md:text-xl">👋</span>
              <BorderBeam duration={6} size={100} className="from-transparent via-destructive/70 to-transparent" />
              <BorderBeam
                duration={6}
                delay={3}
                size={100}
                borderWidth={1}
                className="from-transparent via-primary/70 to-transparent"
              />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
