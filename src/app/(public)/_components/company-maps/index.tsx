'use client'

import { ExternalLink } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import type { City, Company } from '@/generated/prisma/client'

type CompanyProps = {
  company: Company & { city: City }
}

export function CompanyMaps({ company }: CompanyProps) {
  function handleAccessLinkExternalMaps() {
    if (!company) return

    const fullAddress = [company.address, company.neighborhood, company.city.name, company.zipCode]
      .filter(Boolean) // remove undefined/null
      .join(', ')

    const encodedAddress = encodeURIComponent(fullAddress)

    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank')
  }

  function handleAccessLinkGoogleMaps() {
    if (!company) return

    const encodedAddress = encodeURIComponent(
      `${company.address}, ${company.neighborhood}, ${company.city.name}, ${company.zipCode}`
    )

    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank')
  }

  return (
    <>
      <Button onClick={handleAccessLinkExternalMaps} variant="outline" size="sm" className="w-full sm:w-auto">
        <ExternalLink />
        Como Chegar
      </Button>

      <Button onClick={handleAccessLinkGoogleMaps} variant="outline" size="sm" className="w-full sm:w-auto">
        <FcGoogle />
        Ver no Google Maps
      </Button>
    </>
  )
}
