'use client'

import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/utils/generate-whatsapp-link'
import { addVisitorInCompany } from '../../_actions/add-visitor-in-company'

type WhatsappCompanyProps = {
  companyId: string
  whatsapp: string
  name: string
}

export function WhatsappCompany({ companyId, whatsapp, name }: WhatsappCompanyProps) {
  const whatsAppLink = generateWhatsAppLink({
    whatsapp: whatsapp,
    companyName: name,
  })

  async function handleAddVisitor() {
    await addVisitorInCompany({ companyId })
  }

  return (
    <Button onClick={handleAddVisitor} className="w-full" variant="default" size="lg">
      <Link href={whatsAppLink} target="_blank" className="flex items-center gap-2">
        <FaWhatsapp />
        Entrar em contato via WhatsApp
      </Link>
    </Button>
  )
}
