export function avoidTypeError (currentValue: string, originalValue: string | null): string | null {
  return (originalValue === '' ? null : currentValue)
}

export function avoidCommaError (currentValue: string, originalValue: string | null | undefined): string {
  if (originalValue === null || originalValue === undefined || originalValue === '') {
    return currentValue
  }

  return currentValue.replace(',', '.')
}
