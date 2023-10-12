import React, { type ReactElement } from 'react'
import { type FlashMessage as FlashMessageInterface } from '../hooks/useFlashMessage'
import { type ReactElementPropsInterface } from '../interfaces/ReactElementPropsInterface'
import { StatusEnums } from '../enums/statusEnums'
import IconClose from './icons/IconClose'
import IconSuccess from './icons/IconSuccess'
import IconError from './icons/IconError'

interface FlashMessageProps extends ReactElementPropsInterface {
  flashMessage: FlashMessageInterface | null
}

interface Style {
  bgColor?: string
  fillColor?: string
}

interface FlashMessageStyle extends Style {
  span: Style
  closeButton: Style
}

export default function FlashMessage ({ flashMessage }: FlashMessageProps): ReactElement {
  function getColorStyle (): FlashMessageStyle | null {
    if (flashMessage === null) {
      return null
    }

    switch (flashMessage.status) {
      case StatusEnums.ERROR:
        return {
          bgColor: 'bg-red-100',
          span: {
            bgColor: 'bg-red-500'
          },
          closeButton: {
            fillColor: 'fill-red-500'
          }
        }
      case StatusEnums.INFO:
        return {
          bgColor: 'bg-green-100',
          span: {
            bgColor: 'bg-green-500'
          },
          closeButton: {
            fillColor: 'fill-green-500'
          }
        }
      default:
        return null
    }
  }

  function getTitle (): string {
    if (flashMessage === null) {
      return ''
    }

    switch (flashMessage.status) {
      case StatusEnums.ERROR:
        return 'Erreur'
      case StatusEnums.INFO:
        return 'Succès'
      default:
        return ''
    }
  }

  function getIcon (): ReactElement {
    if (flashMessage === null) {
      return <></>
    }

    switch (flashMessage.status) {
      case StatusEnums.ERROR:
        return <IconError className="fill-red-500 h-8 w-8" />
      case StatusEnums.INFO:
        return <IconSuccess className="fill-green-500 h-8 w-8" />
      default:
        return <></>
    }
  }

  const colorStyle: FlashMessageStyle | null = getColorStyle()

  if (flashMessage === null) {
    return <></>
  }

  return (
        <div className={`
            w-3/4 max-w-[500px]
            h-16
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
            <div className="flex items-center">
                <div>
                    <h1 className="font-semibold">{ getTitle() }</h1>
                    <p className="text-gray-500">
                        { flashMessage?.message }
                    </p>
                </div>
            </div>
            <div className="flex flex-grow items-center justify-end">
                <button
                    className={`
                        mr-3
                        h-8 w-8
                        flex items-center justify-center
                        fill-green-500
                        ${colorStyle?.closeButton.fillColor}
                    `}
                >
                    <IconClose />
                </button>
            </div>
        </div>
  )
}
