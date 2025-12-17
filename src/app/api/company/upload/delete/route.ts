import { v2 as cloudinary } from 'cloudinary'
import { type NextRequest, NextResponse } from 'next/server'

import '@/lib/cloudinary'

export async function DELETE(request: NextRequest) {
  const { publicId } = await request.json()

  if (!publicId) {
    return NextResponse.json({ error: 'publicId obrigatório' }, { status: 400 })
  }

  await cloudinary.uploader.destroy(publicId)

  return NextResponse.json({ success: true })
}
