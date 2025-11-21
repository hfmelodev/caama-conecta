import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookSquare, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { SiInstagram } from 'react-icons/si'

export function Footer() {
  return (
    <footer className="bg-primary-foreground py-12">
      <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Image src="/assets/logo-caama-azul.png" alt="Logo" width={190} height={50} quality={100} priority />

          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/caama.oabma/?utm_medium=copy_link" target="_blank" rel="noopener noreferrer">
              <SiInstagram className="size-6 text-primary" />
            </Link>

            <Link href="https://wa.link/dpzt6t" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="size-6 text-primary" />
            </Link>

            <Link href="https://www.facebook.com/caama.oabma" target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare className="size-6 text-primary" />
            </Link>

            <Link href="https://www.youtube.com/user/oabma" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="size-6 text-primary" />
            </Link>
          </div>
        </div>

        <div className="h-[1px] w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="text-center text-muted-foreground text-xs md:text-base">
          <p>&copy; {new Date().getFullYear()} Caixa de Assistência dos Advogados do Maranhão.</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
