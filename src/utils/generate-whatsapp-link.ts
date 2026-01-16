type GenerateWhatsAppLinkProps = {
  whatsapp: string
}

export function generateWhatsAppLink({ whatsapp }: GenerateWhatsAppLinkProps): string {
  const message = encodeURIComponent(
    `Olá! Sou advogado(a) e encontrei vocês no Caama Conecta. Poderia me dar mais detalhes sobre os benefícios oferecidos aos advogados da OAB-MA?`
  )

  return `https://wa.me/${whatsapp}?text=${message}`
}
