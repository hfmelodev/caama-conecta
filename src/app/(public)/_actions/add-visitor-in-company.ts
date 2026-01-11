'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'

type AddVisitorInCompanyProps = {
  companyId: string
}

const addVisitorInCompanySchema = z.object({
  companyId: z.cuid(),
})

export async function addVisitorInCompany({ companyId }: AddVisitorInCompanyProps) {
  const schema = addVisitorInCompanySchema.safeParse({
    companyId,
  })

  if (!schema.success) {
    return {
      status: 400,
      error: 'Ocorreu um erro ao adicionar visitante',
    }
  }

  // TODO: Verificar se a empresa existe
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  })

  if (!company) {
    return {
      status: 404,
      error: 'Empresa não encontrada',
    }
  }

  // TODO: Atualizar o contador de visitantes
  await prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      visitors: {
        increment: 1,
      },
    },
  })

  // Verificar se a empresa deve ser destacada
  if (company.visitors && company.visitors >= 20 && !company.featured) {
    await prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        featured: true,
      },
    })
  }

  // TODO: Retornar sucesso
  return {
    status: 200,
    message: 'Visitante adicionado com sucesso',
  }
}
