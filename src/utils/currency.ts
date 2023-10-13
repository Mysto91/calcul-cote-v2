export function formatToEuroCurrency (value: number): string {
  return `${value % 1 === 0 ? value : value.toFixed(2)} €`.replace(',', '.')
}
