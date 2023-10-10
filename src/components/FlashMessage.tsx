import React, { type ReactElement } from 'react'
import { type FlashMessage as FlashMessageInterface } from '../hooks/useFlashMessage'
import { type ReactElementPropsInterface } from '../interfaces/ReactElementPropsInterface'
import { StatusEnums } from '../enums/statusEnums'

interface FlashMessageProps extends ReactElementPropsInterface {
  flashMessage: FlashMessageInterface
}

export default function FlashMessage ({ flashMessage }: FlashMessageProps): ReactElement {
  const colorStyle = flashMessage.status === StatusEnums.ERROR ? 'bg-red-100 border-red-400' : 'bg-green-100 border-green-400'

  return (
        <div className={`
            w-3/4 max-w-[500px]
            h-16
            border-2 rounded-lg drop-shadow-2xl
            flex items-center justify-center
            ${colorStyle}
            text-black text-center`
        }>
            <p>{ flashMessage.message }</p>
        </div>
  )
}
