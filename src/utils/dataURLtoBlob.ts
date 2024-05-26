export function dataURLtoBlob (dataURL: string): Blob {
  const parts = dataURL.split(',')
  const contentType = parts[0].split(':')[1].split(';')[0]
  const byteCharacters = atob(parts[1])
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)

  return new Blob([byteArray], { type: contentType })
}
