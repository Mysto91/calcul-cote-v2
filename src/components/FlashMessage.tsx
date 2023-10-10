import React, { type ReactElement } from 'react'
import { type FlashMessage as FlashMessageInterface } from '../hooks/useFlashMessage'
import { type ReactElementPropsInterface } from '../interfaces/ReactElementPropsInterface'
import { StatusEnums } from '../enums/statusEnums'

interface FlashMessageProps extends ReactElementPropsInterface {
  flashMessage: FlashMessageInterface | null
}

export default function FlashMessage ({ flashMessage }: FlashMessageProps): ReactElement {
  function getColorStyle (): string {
    if (flashMessage === null) {
      return ''
    }

    switch (flashMessage.status) {
      case StatusEnums.ERROR:
        return 'bg-red-100 border-red-400'
      case StatusEnums.INFO:
        return 'bg-green-100 border-green-400'
      default:
        return ''
    }
  }

  return (
        <div className={`
            w-3/4 max-w-[500px]
            h-16
            border-2 rounded-lg drop-shadow-2xl
            flex items-center justify-center
            ${getColorStyle()}
            ${flashMessage !== null ? 'opacity-100' : 'opacity-0'}
            transition ease-in-out duration-300
            text-black text-center`
        }>
            <p>{ flashMessage?.message }</p>
        </div>
  )
}
