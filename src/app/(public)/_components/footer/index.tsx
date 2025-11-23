import Image from 'next/image'
import { FaFacebookSquare, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { SiInstagram } from 'react-icons/si'
import { SocialTooltip } from './social-tooltip'

export function Footer() {
  return (
    <footer className="bg-primary-foreground py-12">
      <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Image src="/assets/logo-caama-azul.png" alt="Logo" width={190} height={50} quality={100} priority />

          <div className="flex items-center gap-4">
            <SocialTooltip label="Instagram" link="https://www.instagram.com/caama.oabma/?utm_medium=copy_link">
              <SiInstagram className="size-6" />
            </SocialTooltip>

            <SocialTooltip label="WhatsApp" link="https://wa.link/dpzt6t">
              <FaWhatsapp className="size-6" />
            </SocialTooltip>

            <SocialTooltip label="Facebook" link="https://www.facebook.com/caama.oabma">
              <FaFacebookSquare className="size-6" />
            </SocialTooltip>

            <SocialTooltip label="Youtube" link="https://www.youtube.com/user/oabma">
              <FaYoutube className="size-6" />
            </SocialTooltip>
          </div>
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="text-center text-muted-foreground text-xs md:text-base">
          <p>&copy; {new Date().getFullYear()} Caixa de Assistência dos Advogados do Maranhão.</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
