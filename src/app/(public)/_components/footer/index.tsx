import Image from 'next/image'
import { FaFacebookSquare, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { SocialTooltip } from './social-tooltip'

export function Footer() {
  return (
    <footer className="bg-primary-foreground py-12">
      <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Image src="/assets/logo-caama.png" alt="Logo" width={220} height={50} quality={100} priority />

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
            <SocialTooltip label="Instagram" link="https://www.instagram.com/caama.oabma/?utm_medium=copy_link">
              <Image src="/assets/instagram_icon.png" alt="Instagram" width={24} height={24} quality={100} priority />
            </SocialTooltip>

            <SocialTooltip label="WhatsApp" link="https://wa.link/dpzt6t">
              <FaWhatsapp className="size-5 text-emerald-600 sm:size-6" />
            </SocialTooltip>

            <SocialTooltip label="Facebook" link="https://www.facebook.com/caama.oabma">
              <FaFacebookSquare className="size-5 text-primary sm:size-6" />
            </SocialTooltip>

            <SocialTooltip label="Youtube" link="https://www.youtube.com/user/oabma">
              <FaYoutube className="size-5 text-red-600 sm:size-6" />
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
