import { create } from 'zustand'

interface ErrorsStoreInterface {
  errors: string[]
  setErrors: (errors: string[]) => void
}
export const useErrorsStore = create<ErrorsStoreInterface>((set) => ({
  errors: [],
  setErrors: (errors: string[]) => { set(() => ({ errors })) }
}))
