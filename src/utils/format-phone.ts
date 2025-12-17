export function formatPhone(value: string) {
  const cleanedValue = value.replace(/\D/g, '').slice(0, 10)

  return cleanedValue.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{4})$/, '$1-$2')
}
