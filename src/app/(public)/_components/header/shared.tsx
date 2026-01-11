'use client'

import { Share2 } from 'lucide-react'
import { WhatsappShareButton } from 'react-share'

export function Shared({ url }: { url: string }) {
  return (
    <WhatsappShareButton
      url={url}
      className="flex h-8 min-w-40 items-center justify-center gap-2 rounded-sm bg-linear-to-r from-primary to-sky-600 px-4 text-primary-foreground hover:opacity-90"
    >
      <Share2 className="size-4 text-muted" />
      <h2 className="font-semibold text-muted text-sm">Compartilhe</h2>
      <span className="animate-wave md:text-lg">👋🏻</span>
    </WhatsappShareButton>
  )
}
