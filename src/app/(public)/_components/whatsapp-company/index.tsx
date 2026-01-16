'use client'

import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/utils/generate-whatsapp-link'
import { addVisitorInCompany } from '../../_actions/add-visitor-in-company'

type WhatsappCompanyProps = {
  companyId: string
  whatsapp: string
}

export function WhatsappCompany({ companyId, whatsapp }: WhatsappCompanyProps) {
  const whatsAppLink = generateWhatsAppLink({
    whatsapp: whatsapp,
  })

  async function handleAddVisitor() {
    await addVisitorInCompany({ companyId })
  }

  return (
    <Link href={whatsAppLink} passHref target="_blank">
      <Button onClick={handleAddVisitor} className="w-full" variant="whatsapp">
        <FaWhatsapp />
        Chamar no WhatsApp
      </Button>
    </Link>
  )
}
