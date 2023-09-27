import * as yup from 'yup'
import { numberGreaterThanSchema } from './numberGreaterThanSchema'

export interface BetSchemaInterface {
  quotationOne: any
  quotationTwo: any
  betValue: any
}

// TODO améliorer les validations et rajouter des messages en français
export default function inputSchema (): yup.Schema<BetSchemaInterface> {
  return yup.object().shape({
    quotationOne: numberGreaterThanSchema(1, 'cote 1')
      .required('La cote 1 doit être renseignée'),
    quotationTwo: numberGreaterThanSchema(1, 'cote 2')
      .required('La cote 2 doit être renseignée'),
    betValue: numberGreaterThanSchema(0, 'mise')
      .required('La mise doit être renseignée')
  })
}
