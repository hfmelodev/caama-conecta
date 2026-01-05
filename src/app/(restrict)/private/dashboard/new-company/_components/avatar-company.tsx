'use client'

import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { type ChangeEvent, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

type CloudinaryResultProps = {
  url: string
  public_id: string
}

type AvatarCompanyProps = {
  logoUrl?: string
  setLogoUrl: (url?: string) => void
  publicImageId?: string
  setPublicImageId: (publicImageId?: string) => void
}

export function AvatarCompany({ logoUrl, setLogoUrl, publicImageId, setPublicImageId }: AvatarCompanyProps) {
  const [loadingImage, setLoadingImage] = useState(false)
  const [loadingRemoveImage, setLoadingRemoveImage] = useState(false)

  async function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setLoadingImage(true)
      const image = event.target.files[0]

      if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        toast.error('Formato de imagem inválido')
        setLoadingImage(false)
        return
      }

      const newImageName = `${Date.now()}-${image.name}`
      const newImage = new File([image], newImageName, { type: image.type })

      const urlImage = await handleUploadImage(newImage)

      if (urlImage) {
        setLogoUrl(urlImage.url)
        setPublicImageId(urlImage.public_id)
      }
    }
  }

  async function handleUploadImage(image: File): Promise<CloudinaryResultProps | null> {
    try {
      toast.warning('Aguarde! Carregando imagem...')

      const formData = new FormData()
      formData.append('file', image)

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        toast.error('Erro ao enviar imagem')
        return null
      }

      const data: CloudinaryResultProps = await response.json()

      setLoadingImage(false)

      toast.success('Imagem carregada com sucesso')

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async function handleRemoveImage() {
    if (publicImageId) {
      setLoadingRemoveImage(true)
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/upload/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ publicId: publicImageId }),
      })

      toast.success('Imagem removida com sucesso')
    }

    setPublicImageId(undefined)
    setLoadingRemoveImage(false)
    setLogoUrl(undefined)
  }

  return (
    <div className="mx-auto max-w-md px-8">
      {logoUrl ? (
        <div className="relative h-48 w-96 overflow-hidden rounded-xl border border-border">
          <Image
            src={logoUrl}
            alt="Preview da Imagem"
            fill
            priority
            quality={100}
            className="w-full rounded-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
            onClick={handleRemoveImage}
          >
            {loadingRemoveImage ? <ImSpinner2 className="size-5 animate-spin text-muted" /> : <X className="size-5 text-muted" />}
          </Button>
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          className="relative block w-full cursor-pointer rounded-xl border-2 border-primary/40 border-dashed p-8 transition-all hover:border-primary hover:bg-primary/5"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
              {loadingImage ? (
                <ImSpinner2 className="size-6 animate-spin text-primary" />
              ) : (
                <Upload className="size-6 text-primary" />
              )}
            </div>

            <div className="text-center">
              {loadingImage ? (
                <>
                  <p className="font-medium text-foreground text-sm">Realizando upload da imagem</p>
                  <p className="mt-1 text-muted-foreground text-xs">Aguarde uns instantes...</p>
                </>
              ) : (
                <>
                  <p className="font-medium text-foreground text-sm">Clique para enviar a imagem</p>
                  <p className="mt-1 text-muted-foreground text-xs">PNG, JPG, JPEG até 5MB</p>
                </>
              )}
            </div>
          </div>

          <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleChangeImage} />
        </label>
      )}
    </div>
  )
}
