import { ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedCard } from './animated-card'

export function Companies() {
  const isSede = true
  const city = { isSede }

  return (
    <section id="empresas" className="bg-primary py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-1">
          <h1 className="flex items-center justify-center gap-2 font-bold text-2xl text-muted md:text-3xl">
            <MapPin className="md:size-7" />
            Selecione sua cidade
          </h1>
          <p className="text-center text-muted">Escolha a subseção ou sede para visualizar as empresas conveniadas</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <AnimatedCard key={index}>
              <Link href="/company/sao-luis">
                <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-primary">
                      <ExternalLink
                        className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/15 via-primary/10 to-primary/5 text-primary shadow-sm transition-all duration-500 ease-out group-hover:rotate-3 group-hover:scale-110 group-hover:from-primary group-hover:via-primary group-hover:to-primary/90 group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25">
                      <MapPin className="size-6" />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary">São Luís</h4>
                      {city.isSede && (
                        <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                          Sede
                        </span>
                      )}
                    </div>
                  </CardContent>

                  <Button size="sm" className="absolute right-4 bottom-4">
                    Ver empresas
                  </Button>
                </Card>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}
