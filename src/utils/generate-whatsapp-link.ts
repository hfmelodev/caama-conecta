type GenerateWhatsAppLinkProps = {
  whatsapp: string
  companyName: string
}

export function generateWhatsAppLink({ whatsapp, companyName }: GenerateWhatsAppLinkProps): string {
  const message = encodeURIComponent(
    `Olá! Sou advogado(a) e conheci vocês ${companyName} pelo Caama Conecta. Poderia me dar mais detalhes sobre os benefícios oferecidos aos advogados da OAB-MA?`
  )

  return `https://wa.me/${whatsapp}?text=${message}`
}
