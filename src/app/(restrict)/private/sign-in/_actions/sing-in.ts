'use server'

import { signIn } from '@/lib/auth'

type handleRegisterWithGoogleProps = {
  provider: 'google'
}

export async function handleRegister({ provider }: handleRegisterWithGoogleProps) {
  await signIn(provider, {
    redirectTo: '/private/dashboard',
  })
}
