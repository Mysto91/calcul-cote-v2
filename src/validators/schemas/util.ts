import { Nullable } from '../../interfaces/nullableType'

export function avoidTypeError (
  currentValue: string,
  originalValue: Nullable<string>,
): Nullable<string> {
  return (originalValue === '' ? null : currentValue)
}

export function avoidCommaError(
  currentValue: string,
  originalValue: Nullable<string | undefined>,
): string {
  if (
    originalValue === null ||
    originalValue === undefined ||
    originalValue === ''
  ) {
    return currentValue
  }

  return currentValue.replace(',', '.')
}
