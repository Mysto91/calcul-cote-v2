import { ValidationError } from 'yup'
import { type InputError } from '../interfaces/errorInterface'
import { type InputEnum } from '../enums/inputEnums'
import inputSchema, { type BetSchemaInterface } from '../validators/schemas/inputSchema'
import { Nullable } from '../interfaces/nullableType'

async function validateSchema (params: BetSchemaInterface): Promise<Nullable<ValidationError>> {
  try {
    await inputSchema().validate(params, { abortEarly: false })
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return error
    }
  }

  return null
}

interface ValidationProps {
  params: BetSchemaInterface
  setIsLoading: (isLoading: boolean) => void
  setErrors: (errors: InputError[]) => void
}

export async function handleValidation ({ params, setIsLoading, setErrors }: ValidationProps): Promise<void> {
  setIsLoading(true)

  const error = await validateSchema(params)

  if (error === null) {
    setErrors([])
    setIsLoading(false)
    return
  }

  const inputErrors = error.inner.map((validationError: ValidationError): InputError => (
    {
      inputId: validationError.params?.path as InputEnum,
      message: validationError.message,
    }
  ))

  setErrors(inputErrors)
  setIsLoading(false)
}
