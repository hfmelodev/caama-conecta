import { MapPin, Star, Tag } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { CompanyWithRelations } from '../../_dal/get-companies-by-cityId'

interface CompanyCardProps {
  company: CompanyWithRelations
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/empresa/${company.slug}`}>
      <Card className="group hover:-translate-y-1.25 h-full transition-all duration-300 hover:border-primary hover:shadow-lg">
        <CardHeader>
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-primary">{company.name}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-1 text-xs">
                <MapPin className="h-3 w-3" />
                {company.name}
              </CardDescription>
            </div>
            {company.featured && (
              <Badge variant="secondary" className="shrink-0">
                <Star className="mr-1 h-3 w-3 fill-yellow-300 text-yellow-300" />
                Destaque
              </Badge>
            )}
          </div>

          {company.category && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Tag className="h-3 w-3" />
              <span>{company.category.name}</span>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {company.description && <p className="mb-4 line-clamp-2 text-muted-foreground text-sm">{company.description}</p>}

          {company.discount && (
            <div className="rounded-lg bg-sky-600/10 p-3 text-center">
              <p className="font-semibold text-sky-700/90">{company.discount}% de desconto</p>
            </div>
          )}

          {company.neighborhood && <p className="mt-3 text-muted-foreground text-xs">{company.neighborhood}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}
