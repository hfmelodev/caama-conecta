'use client'

import { Edit2, Inbox, MapPin, Power, Star } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function Home() {
  const data = false
  const company = {
    id: 1,
    name: 'Quem Somos',
    email: 'contato@quemsomos.com.br',
    image: '',
    role: 'USER',
    inactive: false,
  }
  const featured = true
  const icon = '📚'

  return (
    <main className="mx-auto max-w-7xl">
      <Card className="mx-auto mt-8 lg:max-w-7xl">
        <CardHeader>
          <CardTitle>Gerenciamento de Empresas</CardTitle>
          <CardDescription>Gerencie todos as empresas do sistema</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 overflow-x-auto">
          <div className="rounded-sm border p-2">
            <Table className="w-full overflow-x-auto text-sm">
              {data && (
                <TableCaption className="pb-4 text-muted-foreground text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Inbox className="size-5" />
                    <p className="text-center text-sm">Nenhuma empresa cadastrada</p>
                  </div>
                </TableCaption>
              )}

              <TableHeader>
                <TableRow>
                  <TableHead className="px-6 py-4 text-left font-semibold text-foreground text-sm">Empresa</TableHead>
                  <TableHead className="hidden px-6 py-4 text-left font-semibold text-foreground text-sm md:table-cell">
                    Cidade
                  </TableHead>
                  <TableHead className="hidden px-6 py-4 text-left font-semibold text-foreground text-sm md:table-cell">
                    Categoria
                  </TableHead>
                  <TableHead className="px-6 py-4 text-left font-semibold text-foreground text-sm">WhatsApp</TableHead>
                  <TableHead className="px-6 py-4 text-left font-semibold text-foreground text-sm">Status</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 8 }, (_, index) => (
                  <TableRow key={index} className="transition-colors duration-200 hover:bg-primary/5">
                    {/* Company Info */}
                    <TableCell className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10">
                          <Image
                            src="/assets/caama.ico"
                            alt="Empresa"
                            fill
                            className="rounded-full object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">Quem Somos</span>
                            {featured && <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />}
                          </div>
                          <span className="text-muted-foreground text-xs">quemsomos@caama.com.br</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* City */}
                    <TableCell className="hidden px-6 py-4 text-foreground md:table-cell">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <MapPin className="size-3.5" />
                        <span>São Paulo</span>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="hidden px-6 py-4 text-foreground md:table-cell">
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 font-medium text-xs text-yellow-800">
                        {icon && <span className="mr-1.5">{icon}</span>}
                        Tecnologia
                      </span>
                    </TableCell>

                    {/* WhatsApp */}
                    <TableCell className="px-6 py-4 text-muted-foreground">(11) 99999-9999</TableCell>

                    {/* Status */}
                    <TableCell className="px-6 py-4">
                      <Badge
                        className={
                          company.inactive
                            ? 'bg-muted text-muted-foreground'
                            : 'bg-green-500/10 text-emerald-600 dark:text-emerald-400'
                        }
                      >
                        {company.inactive ? 'Inativa' : 'Ativa'}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Componente de edição */}
                        <Button variant="outline" size="icon" className="hover:bg-muted">
                          <Edit2 className="size-4" />
                          <span className="sr-only">Editar</span>
                        </Button>

                        {/* Componente de inativação */}
                        <Button
                          variant="outline"
                          size="icon"
                          className={
                            company.inactive
                              ? 'text-emerald-600 hover:bg-emerald-500/30'
                              : 'text-destructive hover:bg-destructive/30'
                          }
                        >
                          <Power className="size-4" />
                          <span className="sr-only">{company.inactive ? 'Ativar' : 'Inativar'}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
