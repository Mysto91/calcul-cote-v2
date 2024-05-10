import React, { type ReactElement, createContext, useState, type ReactNode } from 'react'
import { type FlashMessage } from '../interfaces/flashMessageInterface'
import { StatusEnums } from '../enums/statusEnums'

export interface FlashMessageContextInterface {
  flashMessage: FlashMessage | null
  addErrorMessage: (message: string, duration?: number) => void
  addSuccessMessage: (message: string, duration?: number) => void
  addInfoMessage: (message: string, duration?: number) => void
  clearMessage: () => void
}

export const FlashMessageContext = createContext<FlashMessageContextInterface>({
  flashMessage: null,
  addErrorMessage: () => {},
  addSuccessMessage: () => {},
  addInfoMessage: () => {},
  clearMessage: () => {}
})

export function FlashMessageContextProvider ({ children }: { children: ReactNode }): ReactElement {
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null)

  const defaultDuration = 5000

  function addErrorMessage (message: string, duration: number = defaultDuration): void {
    setTemporaryMessage(message, StatusEnums.ERROR, duration)
  }

  function addSuccessMessage (message: string, duration: number = defaultDuration): void {
    setTemporaryMessage(message, StatusEnums.SUCCESS, duration)
  }

  function addInfoMessage (message: string, duration: number = defaultDuration): void {
    setTemporaryMessage(message, StatusEnums.INFO, duration)
  }

  function setTemporaryMessage (message: string, status: StatusEnums, duration: number = 5000): void {
    setFlashMessage({ status, message })
    clearMessageWithDelay(duration)
  }

  function clearMessageWithDelay (duration: number): void {
    setTimeout(() => {
      setFlashMessage(null)
    }, duration)
  }

  return (
    <FlashMessageContext.Provider value={{
      flashMessage,
      addErrorMessage,
      addInfoMessage,
      addSuccessMessage,
      clearMessage: () => { setFlashMessage(null) }
    }}>
      {children}
    </FlashMessageContext.Provider>
  )
}
