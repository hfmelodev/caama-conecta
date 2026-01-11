'use client'

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

    window.open(whatsAppLink, '_blank')
  }

  return (
    <Button onClick={handleAddVisitor} className="w-full gap-2" variant="default" size="lg">
      <FaWhatsapp className="h-5 w-5" />
      Entrar em contato via WhatsApp
    </Button>
  )
}
