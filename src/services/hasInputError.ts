import { type InputEnum } from '../enums/inputEnums'
import { type InputError } from '../interfaces/errorInterface'

export function hasInputError (inputErrors: InputError[], inputId: InputEnum): boolean {
  return inputErrors.some((inputError: InputError) => inputError.inputId === inputId)
}
