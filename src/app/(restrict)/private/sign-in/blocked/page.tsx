import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import { Lock } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Footer } from '@/app/(public)/_components/footer'
import { Squares } from '@/app/(public)/_components/hero/squares'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Acesso Bloqueado | Caama Conecta',
}

dayjs.extend(utc)
dayjs.locale(ptBR)

export default async function BlockedPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/private/sign-in')
  }

  if (session.user.inactive === null) {
    redirect('/private/dashboard')
  }

  const dataInactived = session?.user.inactive

  const formattedDate = dataInactived ? dayjs.utc(dataInactived).format('DD [de] MMMM [de] YYYY') : null

  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <div className="relative my-auto flex items-center justify-center p-4">
        <Squares />

        <div className="w-full max-w-md space-y-4">
          <Card>
            <CardHeader className="space-y-2">
              <div className="flex justify-center">
                <div className="rounded-full bg-destructive/10 p-2.5">
                  <Lock className="size-7 text-destructive" />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <CardTitle className="text-xl">Acesso Bloqueado</CardTitle>
                <CardDescription>Sua conta foi desativada e o acesso está indisponível</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Blocked Date Info */}
              <div className="space-y-2 rounded-lg border border-destructive/20 border-l-4 bg-destructive/5 p-4">
                <p className="text-center font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Data do Bloqueio
                </p>
                <p className="text-center font-semibold text-base text-foreground">{formattedDate}</p>
              </div>

              {/* Explanation */}
              <p className="text-justify text-muted-foreground text-sm leading-relaxed">
                Seu acesso à aplicação foi revogado pelo administrador do sistema. Se acredita que isso foi um erro, entre em
                contato com o administrador para mais informações.
              </p>

              {/* Alert Info */}
              <div className="flex gap-3 rounded-lg border border-amber-200 border-l-4 bg-amber-50 p-4">
                <p className="text-amber-900 text-xs leading-relaxed">
                  Se continuar com problemas, solicite suporte ao administrador do sistema fornecendo a data de bloqueio e sua
                  conta de email.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
