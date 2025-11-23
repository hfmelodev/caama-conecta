import type { Metadata } from 'next'
import { Footer } from '@/app/(public)/_components/footer'
import { Squares } from '@/app/(public)/_components/hero/squares'
import { SignInWithGoogle } from './_components/sign-in-with-google'

export const metadata: Metadata = {
  title: 'Login | CaamaConecta',
}

export default function SignIn() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <Squares />

        <div className="container z-50 mx-auto">
          <div className="flex items-center justify-center px-4">
            <SignInWithGoogle />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
