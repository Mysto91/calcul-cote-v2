import { create } from 'zustand'
import { type InputError } from '../interfaces/errorInterface'

interface ErrorsStoreInterface {
  errors: InputError[]
  setErrors: (errors: InputError[]) => void
}
export const useErrorsStore = create<ErrorsStoreInterface>((set) => ({
  errors: [],
  setErrors: (errors: InputError[]) => { set(() => ({ errors })) }
}))
