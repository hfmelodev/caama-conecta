import { Companies } from './_components/companies'
import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Hero } from './_components/hero'

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Header />

      <div>
        <Hero />
        <Companies />
      </div>

      <Footer />
    </main>
  )
}
