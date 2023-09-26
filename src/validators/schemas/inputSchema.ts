import * as yup from 'yup'

export interface BetSchemaInterface {
  quotationOne: any
  quotationTwo: any
  betValue: any
}

export default function inputSchema (): yup.Schema<BetSchemaInterface> {
  return yup.object().shape({
    quotationOne: yup
      .number()
      .test('notZero', 'La cote 1 ne doit pas être égale à 0', (value: any) => value !== 0)
      .required(),
    quotationTwo: yup
      .number()
      .test('notZero', 'La cote 2 ne doit pas être égale à 0', (value: any) => value !== 0)
      .required(),
    betValue: yup
      .number()
      .test('notZero', 'La mise ne doit pas être égale à 0', (value: any) => value !== 0)
      .required()
  })
}
