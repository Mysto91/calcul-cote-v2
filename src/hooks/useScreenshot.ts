import { useState, type MutableRefObject } from 'react'
import { EXCLUDE_FROM_SCREENSHOT } from '../constants/screenshotConstants'
import html2canvas from 'html2canvas'
import { getFirebaseBlob, getFirebaseImageUrl, storeImage } from '../services/useFirebase'
import { clipboardWrite, hasNavigatorClipboard, hasNavigatorShare, share } from '../services/useNavigator'
import { dataURLtoBlob } from '../utils/dataURLtoBlob'
import { useFlashMessageStore } from '../stores/useFlashMessageStore'

interface ScreenshotHook {
  firebaseImageUrl: string | null
  screenshotUrl: string | null
  captureScreenshot: () => Promise<void>
  setScreenshotUrl: (screenshotUrl: string | null) => void
  shareScreenshot: (fileName: string) => Promise<void>
  screenshotInProgress: boolean
  setScreenshotInProgress: (screenshotInProgress: boolean) => void
}

export function useScreenshot (screenshotRef: MutableRefObject<HTMLElement | null>): ScreenshotHook {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [firebaseImageUrl, setFirebaseImageUrl] = useState<string | null>(null)
  const [screenshotInProgress, setScreenshotInProgress] = useState<boolean>(false)

  async function captureScreenshot (): Promise<void> {
    const element = screenshotRef.current

    if (element !== null) {
      void (async () => {
        const options: any = {
          ignoreElements: (element: any) => element.classList.contains(EXCLUDE_FROM_SCREENSHOT)
        }

        const canvas = await html2canvas(element, options)
        setScreenshotUrl(canvas.toDataURL('image/png'))
      })()
    }
  }

  const {
    setInfoMessage,
    setErrorMessage
  } = useFlashMessageStore()

  async function getScreenshotImageBlob (fileName: string): Promise<Blob | null> {
    const image = dataURLtoBlob(screenshotUrl as string)

    await storeImage(image, fileName)

    return await getFirebaseBlob(fileName)
  }

  async function shareScreenshot (fileName: string): Promise<void> {
    try {
      const imageBlob = await getScreenshotImageBlob(fileName)

      setFirebaseImageUrl(await getFirebaseImageUrl(fileName))

      if (imageBlob === null) {
        return
      }

      if (hasNavigatorShare()) {
        await share(imageBlob, fileName)

        return
      }

      if (hasNavigatorClipboard()) {
        // TODO voir ce qu'il se passe réellement et comment on peut exploiter
        await clipboardWrite(imageBlob)

        setInfoMessage('Image copiée dans le clipboard!')

        return
      }

      setErrorMessage('Impossible de partager')
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors du partage")
      console.error(error)
    }
  }

  return {
    firebaseImageUrl,
    screenshotUrl,
    setScreenshotUrl,
    captureScreenshot,
    shareScreenshot,
    screenshotInProgress,
    setScreenshotInProgress
  }
}
