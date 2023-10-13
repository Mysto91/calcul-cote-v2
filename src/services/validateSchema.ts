import inputSchema, { type BetSchemaInterface } from '../validators/schemas/inputSchema'
import type * as yup from 'yup'

export async function validateSchema (params: BetSchemaInterface): Promise<yup.ValidationError | null> {
  try {
    await inputSchema().validate(params, { abortEarly: false })
    return null
  } catch (error: any) {
    return error
  }
}
