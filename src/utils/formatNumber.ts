export function formatNumber (value: number | null): number {
  return Number(value?.toString().replace(',', '.'))
}
