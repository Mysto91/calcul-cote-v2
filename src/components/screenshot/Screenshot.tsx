import ScreenshotButton from './ScreenshotButton'
import IconCamera from '../icons/IconCamera'
import Modal from '../Modal'
import React, { type ReactElement, type RefObject, useState } from 'react'
import { type ReactElementPropsInterface } from '../../interfaces/ReactElementPropsInterface'

interface ScreenshotProps extends ReactElementPropsInterface {
  screenshotRef: RefObject<HTMLElement>
}
export default function Screenshot ({ screenshotRef }: ScreenshotProps): ReactElement {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [screenshotModalIsOpen, setScreenshotModalIsOpen] = useState<boolean>(false)

  return (
        <div className="flex justify-center">
            <ScreenshotButton
                screenshotRef={screenshotRef}
                setScreenshotUrl={setScreenshotUrl}
                setScreenshotModalIsOpen={setScreenshotModalIsOpen}
            >
                <IconCamera className="fill-white" />
            </ScreenshotButton>

            {
                screenshotUrl !== null && screenshotModalIsOpen &&
                <Modal setIsOpen={setScreenshotModalIsOpen}>
                    <img src={screenshotUrl} alt="screenshot"/>
                </Modal>
            }
        </div>
  )
}
