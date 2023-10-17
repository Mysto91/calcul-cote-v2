export function hasNavigatorShare (): boolean {
  return navigator.share !== undefined
}

export function navigatorCanShare (): boolean {
  return hasNavigatorShare()
}

export async function shareBlob (imageBlob: Blob, fileName: string): Promise<void> {
  await navigator.share({
    files: [
      new File([imageBlob], fileName)
    ]
  })
}

export async function shareUrl (url: string): Promise<void> {
  await navigator.share({ url })
}
