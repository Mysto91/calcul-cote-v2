import React, { type ReactElement } from 'react'
import { type ReactElementProps } from '../interfaces/ReactElementPropsInterface'
import { StatusEnums } from '../enums/statusEnums'
import IconClose from './icons/IconClose'
import IconSuccess from './icons/IconSuccess'
import IconError from './icons/IconError'
import { type FlashMessage as FlashMessageInterface } from '../interfaces/flashMessageInterface'
import IconInfo from './icons/IconInfo'
import { Nullable } from '../interfaces/nullableType'

interface FlashMessageProps extends ReactElementProps {
  flashMessage: Nullable<FlashMessageInterface>
  clearMessage: () => void
}

interface Style {
  bgColor?: string
  fillColor?: string
}

interface FlashMessageStyle extends Style {
  span: Style
  closeButton: Style
}

const statusMap = new Map<StatusEnums, { title: string, colorStyle: FlashMessageStyle, icon: ReactElement }>([
  [
    StatusEnums.ERROR,
    {
      title: 'Erreur',
      colorStyle: {
        bgColor: 'bg-red-100',
        span: {
          bgColor: 'bg-red-500',
        },
        closeButton: {
          fillColor: 'fill-red-500',
        },
      },
      icon: <IconError className="fill-red-500 h-8 w-8" />,
    },
  ],
  [
    StatusEnums.SUCCESS,
    {
      title: 'Succès',
      colorStyle: {
        bgColor: 'bg-green-100',
        span: {
          bgColor: 'bg-green-500',
        },
        closeButton: {
          fillColor: 'fill-green-500',
        },
      },
      icon: <IconSuccess className="fill-green-500 h-8 w-8" />,
    },
  ],
  [
    StatusEnums.INFO,
    {
      title: 'Info',
      colorStyle: {
        bgColor: 'bg-blue-100',
        span: {
          bgColor: 'bg-blue-500',
        },
        closeButton: {
          fillColor: 'fill-blue-500',
        },
      },
      icon: <IconInfo className="fill-blue-500 h-8 w-8" />,
    },
  ],
])

export default function FlashMessage ({ flashMessage, clearMessage }: FlashMessageProps): ReactElement {
  function getColorStyle (): Nullable<FlashMessageStyle> {
    if (flashMessage === null) {
      return null
    }

    return statusMap.get(flashMessage.status)?.colorStyle ?? null
  }

  function getTitle (): string {
    if (flashMessage === null) {
      return ''
    }

    return statusMap.get(flashMessage.status)?.title ?? ''
  }

  function getIcon (): ReactElement {
    if (flashMessage === null) {
      return <></>
    }

    return statusMap.get(flashMessage.status)?.icon ?? <></>
  }

  const colorStyle = getColorStyle()

  if (flashMessage === null) {
    return <></>
  }

  return (
    <div className={`
            w-3/4 max-w-[500px]
            rounded-lg drop-shadow-2xl
            flex
            ${colorStyle?.bgColor}
            transition ease-in-out duration-300
            text-black`
    }>
      <span className={`
                    w-3
                    ${colorStyle?.span.bgColor}
                    rounded-l-lg
                `}
      >
        &#8203;
      </span>
      <span className="w-14 flex items-center justify-center">
        { getIcon() }
      </span>
      <div className="ml-2 py-2 flex items-center">
        <div>
          <h1 className="font-semibold">{ getTitle() }</h1>
          <p className="text-gray-500">
            { flashMessage?.message }
          </p>
        </div>
      </div>
      <div className="flex grow items-center justify-end">
        <button
          className={`
                        mr-3
                        h-8 w-8
                        flex items-center justify-center
                        ${colorStyle?.closeButton.fillColor}
                    `}
          onClick={clearMessage}
        >
          <IconClose />
        </button>
      </div>
    </div>
  )
}
