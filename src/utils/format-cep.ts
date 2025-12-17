export function formatCep(value: string) {
  const cleanedValue = value.replace(/\D/g, '').slice(0, 8)

  return cleanedValue.replace(/^(\d{5})(\d)/, '$1-$2')
}
