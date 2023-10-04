import { useState, type MutableRefObject } from 'react'
import { EXCLUDE_FROM_SCREENSHOT } from '../constants/screenshotConstants'
import html2canvas from 'html2canvas'

interface ScreenshotHook {
  screenshotUrl: string | null
  captureScreenshot: () => Promise<void>
  setScreenshotUrl: (screenshotUrl: string | null) => void
}

export function useScreenshot (screenshotRef: MutableRefObject<HTMLElement | null>): ScreenshotHook {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)

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

  return {
    screenshotUrl,
    setScreenshotUrl,
    captureScreenshot
  }
}
