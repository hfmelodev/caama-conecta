import { MapPin, Pencil, Power } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { auth } from '@/lib/auth'
import { NewCity } from './_components/new-city'

export default async function City() {
  const session = await auth()

  const isSede = true
  const isActive = true

  if (!session?.user || session?.user.role !== 'ADMIN') {
    redirect('/private/sign-in')
  }

  if (session.user && session.user.inactive) {
    redirect('/private/sign-in/blocked')
  }

  return (
    <main className="mx-auto max-w-7xl">
      <Card className="mx-auto mt-8 lg:max-w-7xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <CardTitle>Gerenciamento de Cidades</CardTitle>
            <CardDescription>Gerencie todas as cidades do sistema</CardDescription>
          </div>

          {/* Componente de Nova Cidade  */}
          <NewCity />
        </CardHeader>

        <CardContent className="space-y-3 overflow-x-auto">
          <div className="rounded-sm border p-2">
            <Table className="w-full overflow-x-auto text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] px-6 py-4 md:px-2 md:py-3">Cidade</TableHead>
                  <TableHead className="hidden px-6 py-4 md:table-cell md:px-2 md:py-3">Slug</TableHead>
                  <TableHead className="hidden px-6 py-4 md:table-cell md:px-2 md:py-3">Tipo</TableHead>
                  <TableHead className="px-6 py-4 md:px-2 md:py-3">Status</TableHead>
                  <TableHead className="px-6 py-4 text-center md:px-2 md:py-3">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index} className="py-5 hover:bg-muted/50">
                    {/* User Info */}
                    <TableCell className="px-6 py-4 font-medium md:px-2 md:py-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-primary" />
                        <span className="font-medium text-foreground">São Luís</span>
                      </div>
                    </TableCell>

                    {/* Slug Info */}
                    <TableCell className="hidden px-6 py-4 font-medium md:table-cell md:px-2 md:py-3">
                      <code className="rounded-sm bg-muted px-2 py-1 text-muted-foreground text-xs">sao-luis</code>
                    </TableCell>

                    {/* Tipo Info */}
                    <TableCell className="hidden px-6 py-4 font-medium md:table-cell md:px-2 md:py-3">
                      {isSede ? (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary text-xs">
                          Sede
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 font-medium text-muted-foreground text-xs">
                          Subseção
                        </span>
                      )}
                    </TableCell>

                    {/* Status Info */}
                    <TableCell className="px-6 py-4 font-medium md:px-2 md:py-3">
                      {isActive ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800 text-xs">
                          Ativa
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 font-medium text-red-800 text-xs">
                          Inativa
                        </span>
                      )}
                    </TableCell>

                    {/* Acões Info */}
                    <TableCell className="px-6 py-4 font-medium md:px-2 md:py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="outline" size="icon-sm">
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="outline" size="icon-sm">
                          <Power className="size-4 text-destructive" />
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
