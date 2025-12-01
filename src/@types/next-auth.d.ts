import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user']
  }
}
export interface User {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  inactive: Date | null
  role: 'ADMIN' | 'MEMBER'
  createdAt: Date
  updatedAt: Date
}
