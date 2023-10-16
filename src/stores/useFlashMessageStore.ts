import { create } from 'zustand'
import { StatusEnums } from '../enums/statusEnums'
import { type FlashMessage } from '../interfaces/flashMessageInterface'

interface FlashMessageInterface {
  flashMessage: FlashMessage | null
  setErrorMessage: (message: string, duration?: number) => void
  setSuccessMessage: (message: string, duration?: number) => void
  setInfoMessage: (message: string, duration?: number) => void
  clearMessage: () => void
}

export const useFlashMessageStore = create<FlashMessageInterface>((set) => ({
  flashMessage: null,
  setSuccessMessage: (message: string, duration: number = 5000) => {
    set(() => {
      const flashMessage: FlashMessage = {
        status: StatusEnums.SUCCESS,
        message
      }

      setTimeout(() => {
        set({ flashMessage: null })
      }, duration)

      return {
        flashMessage
      }
    }
    )
  },
  setInfoMessage: (message: string, duration: number = 5000) => {
    set(() => {
      const flashMessage: FlashMessage = {
        status: StatusEnums.INFO,
        message
      }

      setTimeout(() => {
        set({ flashMessage: null })
      }, duration)

      return {
        flashMessage
      }
    }
    )
  },
  setErrorMessage: (message: string, duration: number = 5000) => {
    set(() => {
      const flashMessage: FlashMessage = {
        status: StatusEnums.ERROR,
        message
      }

      setTimeout(() => {
        set({ flashMessage: null })
      }, duration)

      return {
        flashMessage
      }
    }
    )
  },
  clearMessage: () => { set(() => ({ flashMessage: null })) }
}))
