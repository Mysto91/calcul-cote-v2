export function avoidTypeError (currentValue: string, originalValue: string | null): string | null {
  return (originalValue === '' ? null : currentValue)
}
