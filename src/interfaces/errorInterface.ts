import { type InputEnum } from '../enums/inputEnums'

export interface Error {
  message: string
}

export interface InputError extends Error {
  inputId: InputEnum
}
