'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { CompanyWithRelations } from '../../_dal/get-companies-by-cityId'
import { CompanyCard } from './company-card'

type CompanyListClientProps = {
  companies: CompanyWithRelations[]
}

export function CompanyListClient({ companies }: CompanyListClientProps) {
  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar empresas..."
            className="pl-10 focus-visible:shadow-lg focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div>
          <p className="font-medium text-muted-foreground text-sm">Filtrar por categoria:</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </>
  )
}
