import IconCamera from '../icons/IconCamera'
import Modal from 'react-modal'
import React, { type ReactElement, type RefObject, useState } from 'react'
import { type ReactElementPropsInterface } from '../../interfaces/ReactElementPropsInterface'
import IconClose from '../icons/IconClose'
import html2canvas from 'html2canvas'

interface ScreenshotProps extends ReactElementPropsInterface {
  screenshotRef: RefObject<HTMLElement>
}

export default function Screenshot ({ screenshotRef, className }: ScreenshotProps): ReactElement {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const captureScreen = (): void => {
    const element = screenshotRef.current

    if (element !== null) {
      void (async () => {
        const options: any = {
          ignoreElements: (element: any) => element.classList.contains('exclude-from-screenshot')
        }

        const canvas = await html2canvas(element, options)
        setScreenshotUrl(canvas.toDataURL('image/png'))
        openModal()
      })()
    }
  }

  function openModal (): void {
    setIsOpen(true)
  }

  function closeModal (): void {
    setIsOpen(false)
  }

  return (
        <div className={`${className}`}>
            <button
                className={`
                  py-3 px-6 md:py-2 md:px-4
                  bg-violet-500 hover:bg-violet-600
                  shadow-2xl
                  rounded-full
                  transition ease-in-out duration-200
                  `
                }
                onClick={captureScreen}
            >
                <IconCamera className="fill-white" />
            </button>

            {
                screenshotUrl !== null &&
                <Modal
                    isOpen={isOpen}
                    className={`
                        absolute top-1/2 -translate-y-1/2
                        max-w-7xl
                        rounded-md
                        border-8 border-violet-300
                    `}
                >
                    <div className="flex justify-end bg-white">
                        <button
                            className="p-4"
                            onClick={closeModal}
                        >
                            <IconClose className="fill-violet-500" />
                        </button>
                    </div>
                    <img src={screenshotUrl} alt="screenshot"/>
                </Modal>
            }
        </div>
  )
}
