import React, { type ReactElement, createContext, useState, type ReactNode } from 'react'
import { type InputError } from '../interfaces/errorInterface'

export interface ErrorContextInterface {
  errors: InputError[]
  setErrors: (errors: InputError[]) => void
}

export const ErrorContext = createContext<ErrorContextInterface>({
  errors: [],
  setErrors: (errors: InputError[]) => {}
})

export function ErrorContextProvider ({ children }: { children: ReactNode }): ReactElement {
  const [errors, setErrors] = useState<InputError[]>([])

  return (
    <ErrorContext.Provider value={{
      errors,
      setErrors: (newErrors) => { setErrors(newErrors) }
    }}>
      {children}
    </ErrorContext.Provider>
  )
}
