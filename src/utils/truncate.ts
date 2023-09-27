export function truncate (value: number, digit: number = 2): number {
  return !isNaN(value) && value % 1 !== 0 ? Number(value.toFixed(digit)) : value
}
