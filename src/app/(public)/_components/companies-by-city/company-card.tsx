import { MapPin, Star, Tag, UserRound, UsersRound } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShinyButton } from '@/components/ui/shiny-button'
import type { CompanyWithRelations } from '../../_dal/get-companies-by-city'

interface CompanyCardProps {
  company: CompanyWithRelations
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/city/${company.city.slug}/companies/${company.slug}/details`}>
      <Card className="group hover:-translate-y-1.25 flex h-full flex-col transition-all duration-300 hover:border-primary/70 hover:shadow-lg">
        <CardHeader>
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-primary">{company.name}</CardTitle>
              <CardDescription className="mt-1.5 flex items-center gap-2 text-xs">
                <MapPin className="size-3" />
                {company.city.name}
              </CardDescription>
            </div>
            <div className="flex flex-col items-center gap-3">
              {company.featured && (
                <Badge variant="secondary" className="shrink-0">
                  <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                  Destaque
                </Badge>
              )}
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                {company.visitors === 1 ? (
                  <>
                    <UserRound className="h-3.5 w-3.5" />
                    {company.visitors} visitante
                  </>
                ) : (
                  <>
                    <UsersRound className="mb-0.5 h-3.5 w-3.5" />
                    {company.visitors} visitantes
                  </>
                )}
              </span>
            </div>
          </div>

          {company.category && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Tag className="h-3 w-3" />
              <span>{company.category.name}</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex flex-1 flex-col">
          {company.description && <p className="mb-4 line-clamp-2 text-muted-foreground text-sm">{company.description}</p>}

          {company.discount && (
            <ShinyButton className="mt-auto w-full rounded-lg bg-sky-600/10 p-3 text-center">
              <p className="font-semibold text-sky-700/90">{company.discount}% de desconto</p>
            </ShinyButton>
          )}

          {company.neighborhood && (
            <p className="mt-3 text-muted-foreground text-xs">
              {company.address}, {company.neighborhood}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
