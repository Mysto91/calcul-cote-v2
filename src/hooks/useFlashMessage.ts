import { useState } from 'react'

interface FlashMessageHook {
  flashMessage: string | null
  setErrorMessage: (message: string) => void
  setInfoMessage: (message: string) => void
}

export function useFlashMessage (duration: number = 5000): FlashMessageHook {
  const [flashMessage, setFlashMessage] = useState<string | null>(null)

  setTimeout(() => {
    setFlashMessage(null)
  }, duration)

  function setErrorMessage (message: string): void {
    setFlashMessage(message)
  }

  function setInfoMessage (message: string): void {
    setFlashMessage(message)
  }

  return {
    flashMessage,
    setInfoMessage,
    setErrorMessage
  }
}
