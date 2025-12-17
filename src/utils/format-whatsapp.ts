export function formatWhatsapp(value: string) {
  const cleanedValue = value.replace(/\D/g, '').slice(0, 11)

  return cleanedValue.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4,5})(\d{4})$/, '$1-$2')
}
