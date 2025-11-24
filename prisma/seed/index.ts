import { prisma } from '@/lib/prisma'

async function main() {
  const adminCandidateEmail = await prisma.user.findUnique({
    where: {
      email: process.env.ADMIN_EMAIL,
    },
  })

  if (!adminCandidateEmail) {
    return console.error('> E-mail candidato à administrador não encontrado.')
  }

  if (adminCandidateEmail) {
    await prisma.user.update({
      where: {
        id: adminCandidateEmail.id,
      },
      data: {
        role: 'ADMIN',
      },
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
