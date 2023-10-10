import { useState } from 'react'
import { StatusEnums } from '../enums/statusEnums'

interface FlashMessageHook {
  flashMessage: FlashMessage | null
  setErrorMessage: (message: string) => void
  setInfoMessage: (message: string) => void
}

export interface FlashMessage {
  status: StatusEnums
  message: string
}

export function useFlashMessage (duration: number = 7000): FlashMessageHook {
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<StatusEnums | null>(null)

  setTimeout(() => {
    setMessage(null)
  }, duration)

  function setErrorMessage (message: string): void {
    setStatus(StatusEnums.ERROR)
    setMessage(message)
  }

  function setInfoMessage (message: string): void {
    setStatus(StatusEnums.INFO)
    setMessage(message)
  }

  let flashMessage: FlashMessage | null = null

  if (message !== null && status !== null) {
    flashMessage = {
      message,
      status
    }
  }

  return {
    flashMessage,
    setInfoMessage,
    setErrorMessage
  }
}
