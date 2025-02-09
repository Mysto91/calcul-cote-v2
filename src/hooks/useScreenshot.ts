import { useState, type MutableRefObject } from 'react'
import { EXCLUDE_FROM_SCREENSHOT } from '../constants/screenshotConstants'
import html2canvas, { type Options } from 'html2canvas-pro'
import { getFirebaseBlob, getFirebaseImageUrl, storeImage } from '../services/firebase'
import {
  hasNavigatorShare,
  navigatorCanShare,
  shareUrl,
  shareBlob,
} from '../services/navigator'
import { dataURLtoBlob } from '../utils/dataURLtoBlob'
import { ExceptionEnums } from '../enums/exceptionEnums'
import { useFlashMessageContext } from '../contexts/context'
import { Nullable } from '../interfaces/nullableType'

interface ScreenshotHook {
  firebaseImageUrl: Nullable<string>
  screenshotUrl: Nullable<string>
  handleShare: (fileName: string, showManualShareButton: (show: boolean) => void) => Promise<void>
  screenshotInProgress: boolean
  shareManually: (imageUrl: string) => void
  handleShareButtonClick: () => void
}

/* TODO : séparer le share et le screenshot */
export function useScreenshot (screenshotRef: MutableRefObject<Nullable<HTMLElement>>): ScreenshotHook {
  const [screenshotUrl, setScreenshotUrl] = useState<Nullable<string>>(null)
  const [firebaseImageUrl, setFirebaseImageUrl] = useState<Nullable<string>>(null)
  const [screenshotInProgress, setScreenshotInProgress] = useState<boolean>(false)

  async function captureScreenshot (): Promise<void> {
    const element = screenshotRef.current

    if (element === null) {
      return
    }

    const options: Partial<Options> = {
      ignoreElements: (element: Element) =>
        element.classList.contains(EXCLUDE_FROM_SCREENSHOT),
    }

    const canvas = await html2canvas(element, options)

    setScreenshotUrl(canvas.toDataURL('image/png'))
  }

  const { addErrorMessage, addInfoMessage } = useFlashMessageContext()

  async function getScreenshotImageBlob (fileName: string): Promise<Nullable<Blob>> {
    if (screenshotUrl === null) {
      return null
    }

    const image = dataURLtoBlob(screenshotUrl)

    await storeImage(image, fileName)

    return await getFirebaseBlob(fileName)
  }

  async function shareScreenshot (fileName: string, showManualShareButton: (show: boolean) => void): Promise<void> {
    try {
      const imageBlob = await getScreenshotImageBlob(fileName)

      setFirebaseImageUrl(await getFirebaseImageUrl(fileName))

      if (imageBlob === null) {
        return
      }

      if (hasNavigatorShare()) {
        await shareBlob(imageBlob, fileName)

        return
      }

      addInfoMessage('La fonction de partage du navigateur n\'est pas disponible')
    } catch (error) {
      if (error instanceof DOMException && error.name === ExceptionEnums.NOT_ALLOWED) {
        addInfoMessage('Cliquez sur la fusée pour partager')
        showManualShareButton(true)
        return
      }

      addErrorMessage('Une erreur s\'est produite lors du partage')
      console.error(error)
    }
  }

  function shareManually (imageUrl: string): void {
    async function handle (): Promise<void> {
      if (!navigatorCanShare()) {
        return
      }

      try {
        await shareUrl(imageUrl)
      } catch (error) {
        console.error(error)
        addErrorMessage('Une erreur s\'est produite lors du partage')
      }
    }

    void handle()
  }

  async function handleShare (fileName: string, showManualShareButton: (show: boolean) => void): Promise<void> {
    if (screenshotUrl === null) {
      return
    }

    await shareScreenshot(fileName, showManualShareButton)

    setScreenshotInProgress(false)
    setScreenshotUrl(null)
  }

  function handleShareButtonClick (): void {
    setScreenshotInProgress(true)

    void captureScreenshot()
  }

  return {
    firebaseImageUrl,
    screenshotUrl,
    screenshotInProgress,
    handleShare,
    shareManually,
    handleShareButtonClick,
  }
}
