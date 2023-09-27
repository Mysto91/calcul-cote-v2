import * as yup from 'yup'
import { avoidTypeError } from './util'

export function numberGreaterThanSchema (minValue: number, fieldName: string): yup.StringSchema {
  return yup
    .string()
    .transform(avoidTypeError)
    .test('isNumber',
        `La ${fieldName} doit être un nombre valide`,
        (value: any) => !isNaN(value)
    )
    .test(
      `greaterThan${minValue}`,
            `La ${fieldName} doit être supérieure à ${minValue}`,
            (value: any) => value > minValue
    )
}
