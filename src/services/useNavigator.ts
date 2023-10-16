export function hasNavigatorShare (): boolean {
  return navigator.share !== undefined
}

export function hasNavigatorClipboard (): boolean {
  return navigator.clipboard !== undefined
}

export function navigatorCanShare (): boolean {
  return hasNavigatorShare() || hasNavigatorClipboard()
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

export async function clipboardWrite (imageBlob: Blob): Promise<void> {
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': imageBlob })
  ])
}
