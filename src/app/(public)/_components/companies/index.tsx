import { ExternalLink, MapPin, MapPinOff } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getActiveCities } from '../../_dal/get-active-cities'
import { AnimatedCard } from './animated-card'

export async function Companies() {
  const cities = await getActiveCities()

  return (
    <section id="empresas" className="bg-linear-to-r from-primary to-sky-600 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-1">
          <h1 className="flex items-center justify-center gap-2 font-bold text-2xl text-muted md:text-3xl">
            <MapPin className="md:size-7" />
            Selecione sua cidade
          </h1>
          <p className="text-center text-muted">Escolha a subseção ou sede para visualizar as empresas conveniadas</p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cities.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center gap-1 py-4 text-muted">
              <MapPinOff className="size-7 animate-pulse opacity-80" />
              <span className="font-medium text-sm">Nenhuma cidade ativa encontrada</span>
            </div>
          )}

          {cities.map(city => (
            <AnimatedCard key={city.id}>
              <Link href={`/city/${city.slug}/companies`}>
                <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-primary">
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
                      <h4 className="font-semibold text-foreground group-hover:text-primary">{city.name}</h4>
                      {city.isThirst ? (
                        <span className="flex items-center gap-1.5 text-primary text-xs">
                          <div className="size-2 animate-pulse rounded-full bg-primary" />
                          Sede
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <div className="size-2 rounded-full bg-muted-foreground" />
                          Subseção
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
