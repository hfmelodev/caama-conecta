export function formatCNPJ(value: string) {
  const cleaned = value.replace(/\D/g, '').slice(0, 14)

  if (cleaned.length <= 2) return cleaned
  if (cleaned.length <= 5) return cleaned.replace(/^(\d{2})(\d+)/, '$1.$2')
  if (cleaned.length <= 8) return cleaned.replace(/^(\d{2})(\d{3})(\d+)/, '$1.$2.$3')
  if (cleaned.length <= 12) return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4')

  return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}
