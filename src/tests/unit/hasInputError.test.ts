import { hasInputError } from '../../services/hasInputError'
import { InputEnum } from '../../enums/inputEnums'
import { type InputError } from '../../interfaces/errorInterface'

const inputErrors: InputError[] = [
  {
    inputId: InputEnum.QUOTATION_ONE,
    message: 'erreur lamda',
  },
  {
    inputId: InputEnum.BET_VALUE,
    message: 'erreur lamda',
  },
]

it('test having errors on field returns true', () => {
  expect(hasInputError(inputErrors, InputEnum.QUOTATION_ONE)).toEqual(true)
})

it('test not having errors on field returns false', () => {
  expect(hasInputError(inputErrors, InputEnum.QUOTATION_TWO)).toEqual(false)
})
