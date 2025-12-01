'use server'

import { prisma } from '@/lib/prisma'

type getProfileProps = {
  userId: string
}

export async function getProfile({ userId }: getProfileProps) {
  if (!userId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return user
  } catch (err) {
    console.log(err)
    return {
      message: 'Houve um erro ao obter todos os usuários.',
    }
  }
}
