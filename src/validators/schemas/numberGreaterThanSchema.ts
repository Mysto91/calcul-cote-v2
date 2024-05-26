import * as yup from 'yup'
import { avoidCommaError, avoidTypeError } from './util'

export function numberGreaterThanSchema (minValue: number, fieldName: string): yup.StringSchema {
  return yup
    .string()
    .transform(avoidTypeError)
    .transform(avoidCommaError)
    .test('isNumber',
      `La ${fieldName} doit être un nombre valide`,
      (value: unknown) => !isNaN(value as number),
    )
    .test(
      `greaterThan${minValue}`,
      `La ${fieldName} doit être supérieure à ${minValue}`,
      (value: unknown) => value as number > minValue,
    )
}
