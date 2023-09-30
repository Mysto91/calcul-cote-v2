import React, { type RefObject } from 'react'
import html2canvas from 'html2canvas'
import { type JSXElementPropsInterface } from '../interfaces/JSXElementPropsInterface'

interface ScreenshotProps extends JSXElementPropsInterface {
  screenshotRef: RefObject<HTMLElement>
  setScreenshotUrl: (newScreenshotUrl: string | null) => void
  setScreenshotModalIsOpen: (isOpen: boolean) => void
}
export default function ScreenshotButton ({ screenshotRef, setScreenshotUrl, setScreenshotModalIsOpen, children, className }: ScreenshotProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const captureScreen = () => {
    const element = screenshotRef.current

    if (element !== null) {
      void (async () => {
        const options: any = {
          ignoreElements: (element: any) => element.classList.contains('exclude-from-screenshot')
        }

        const canvas = await html2canvas(element, options)
        setScreenshotUrl(canvas.toDataURL('image/png'))
        setScreenshotModalIsOpen(true)
      })()
    }
  }

  return (
        <button
            className={`
              py-2 px-4
              bg-violet-300 hover:bg-violet-500
              shadow-2xl
              rounded-md
              transition ease-in-out duration-200
              exclude-from-screenshot
              ${className}`
            }
            onClick={captureScreen}
        >
          { children }
        </button>
  )
}
