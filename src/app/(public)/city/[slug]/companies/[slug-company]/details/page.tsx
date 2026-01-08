import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CompanyDetailsPage() {
  return (
    <div className="min-h-screen bg-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/city/buriticupu/companies`} className="group">
              <ArrowLeft className="group-hover:-translate-x-1 mr-2 size-4 text-foreground/80 transition-transform duration-200" />
            </Link>
            <div>
              <h1 className="font-bold text-foreground text-lg">Detalhes da Empresa</h1>
              <p className="text-muted-foreground text-xs">Butiticupu</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
