import Image from 'next/image'
import Link from 'next/link'
import { Shared } from './shared'

export function Header() {
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/assets/logo-caama-azul.png" alt="Logo CAAMA" width={190} height={50} quality={100} priority />
          </Link>

          <Shared url={shareUrl} />
        </div>
      </div>
    </header>
  )
}
