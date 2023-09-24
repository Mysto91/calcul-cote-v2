export function formatToEuroCurrency (value: number): string {
  return `${value} €`.replace(',', '.')
}
