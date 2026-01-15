import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function DELETE(request: NextRequest) {
  const { publicId } = await request.json()

  if (!publicId) {
    return NextResponse.json({ error: 'publicId obrigatório' }, { status: 400 })
  }

  await createClient().storage.from('companies').remove(publicId)

  return NextResponse.json({ success: true })
}
