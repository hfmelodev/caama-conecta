import { ArrowLeft, ExternalLink, Gift, Mail, MapPin, Navigation, Phone, Star, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaInstagram } from 'react-icons/fa'
import { WhatsappCompany } from '@/app/(public)/_components/whatsapp-company'
import { getCompanyBySlug } from '@/app/(public)/_dal/get-company-by-slug'
import { Badge } from '@/components/ui/badge'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ShinyButton } from '@/components/ui/shiny-button'
import { formatPhone } from '@/utils/format-phone'

export const metadata: Metadata = {
  title: `Detalhes | Caama Conecta`,
}

type CompanyDetailsPageProps = {
  params: Promise<{
    slug_company: string
  }>
}

export default async function CompanyDetailsPage({ params }: CompanyDetailsPageProps) {
  const { slug_company } = await params

  const company = await getCompanyBySlug({
    slug: slug_company,
  })

  if (!company) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/city/${company.city.slug}/companies`} className="group">
              <ArrowLeft className="group-hover:-translate-x-1 mr-2 size-4 text-foreground/80 transition-transform duration-200" />
            </Link>
            <div>
              <h1 className="font-bold text-foreground text-lg">Detalhes da Empresa</h1>
              <p className="text-muted-foreground text-xs">{company.city.name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Main Info Card */}
          <Card className="relative mb-6 overflow-hidden shadow-lg">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <CardTitle className="text-2xl md:text-3xl">{company.name}</CardTitle>
                    {company.featured && (
                      <Badge variant="secondary" className="shrink-0">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        Destaque
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {company.city.name}
                  </CardDescription>
                </div>

                {/* {company.category && ( */}
                <Badge variant="outline" className="gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  {company.category.name}
                </Badge>
                {/* )} */}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Description */}
              {company.description && (
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Sobre</h3>
                  <p className="text-pretty text-muted-foreground leading-relaxed">{company.description}</p>
                </div>
              )}

              {/* Discount Highlight */}
              {company.discount && (
                <ShinyButton className="w-full rounded-lg bg-sky-600/10 p-4 text-center">
                  <Gift className="mx-auto mb-2 h-6 w-6 text-sky-700/90" />
                  <p className="font-semibold text-lg text-sky-700/90">{company.discount}% de desconto</p>
                </ShinyButton>
              )}

              {/* Benefits */}
              {company.benefits && (
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Benefícios</h3>
                  <p className="text-pretty text-muted-foreground leading-relaxed">{company.benefits}</p>
                </div>
              )}

              <Separator />

              {/* Contact Information */}
              <div>
                <h3 className="mb-4 font-semibold text-foreground">Informações de Contato</h3>
                <div className="space-y-3">
                  <WhatsappCompany companyId={company.id} whatsapp={company.whatsapp} name={company.name} />

                  {/* Phone */}
                  {company.phone && (
                    <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">Telefone</p>
                        <a href={`tel:${company.phone}`} className="text-muted-foreground text-sm hover:text-primary">
                          {formatPhone(company.phone)}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {company.email && (
                    <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">E-mail</p>
                        <a href={`mailto:${company.email}`} className="text-muted-foreground text-sm hover:text-primary">
                          {company.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Instagram */}
                  <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FaInstagram className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">Instagram</p>
                      <Link
                        href={`https://instagram.com/${company.instagram}`}
                        target="_blank"
                        className="flex items-center text-muted-foreground text-sm transition-all duration-300 hover:font-medium hover:text-primary"
                      >
                        <span>@{company.instagram}</span>
                        <ExternalLink className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Address */}
              <div>
                <h3 className="mb-4 font-semibold text-foreground">Endereço</h3>
                <div className="flex items-start gap-3 rounded-lg border bg-card p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-sm">{company.address}</p>
                    <p className="text-muted-foreground text-sm">{company.neighborhood}</p>
                    <p className="text-muted-foreground text-sm">CEP: {company.zipCode}</p>
                    <p className="mt-1 font-medium text-primary text-sm">{company.city.name} - MA</p>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="rounded-lg border-primary border-l-4 bg-primary/5 p-4">
                <p className="text-foreground text-sm">
                  <strong>Importante:</strong> Apresente sua carteira da OAB-MA para garantir os descontos e benefícios exclusivos
                  desta empresa conveniada.
                </p>
              </div>
            </CardContent>

            <BorderBeam duration={6} size={600} borderWidth={2} className="from-transparent via-primary/70 to-transparent" />
            <BorderBeam
              duration={6}
              delay={3}
              size={600}
              borderWidth={2}
              className="from-transparent via-primary/70 to-transparent"
            />
          </Card>

          {/* Back Button */}
          <Link href={`/city/${company.city.slug}/companies`}>
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para empresas de {company.city.name}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
