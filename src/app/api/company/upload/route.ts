import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/client'

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })
  }

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return NextResponse.json({ error: 'Formato de imagem inválido' }, { status: 400 })
  }

  // Converte o arquivo para um buffer de Uint8Array
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const fileExt = file.name.split('.').pop() // Pega a extensão do arquivo
  const fileName = `${crypto.randomUUID()}.${fileExt}` // Gera um nome aleatório para o arquivo
  const filePath = `uploads/${fileName}` // Define o caminho do arquivo

  const { error } = await createClient().storage.from('companies').upload(filePath, buffer, {
    contentType: file.type,
    upsert: false, // Impede que o arquivo seja sobrescrito
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = createClient().storage.from('companies').getPublicUrl(filePath)

  return NextResponse.json({ url: publicUrl, public_id: filePath }, { status: 200 })
}
