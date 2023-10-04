import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL, type StorageReference, type UploadResult } from 'firebase/storage'

interface FirebaseConfig {
  projectId: string
  privateKey: string
  clientEmail: string
}

function getFirebaseStorageRef (fileName: string): StorageReference {
  const firebaseApp: FirebaseApp = firebaseInit()

  const storage = getStorage(firebaseApp, process.env.REACT_APP_FIREBASE_BUCKET)

  return ref(storage, `${process.env.REACT_APP_APP_ENV}/${fileName}`)
}

// TODO voir pour initialiser qu'une seule fois
export function firebaseInit (): FirebaseApp {
  const firebaseConfig: FirebaseConfig = {
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
    privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY as string,
    clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL as string
  }

  return initializeApp(firebaseConfig)
}

export async function storeImage (image: Blob, fileName: string): Promise<UploadResult | null> {
  const storageRef = getFirebaseStorageRef(fileName)

  try {
    const response = await uploadBytes(storageRef, image)
    console.log('Le fichier a été enregistré sur firebase!')

    return response
  } catch (e) {
    // TODO gérer l'erreur
    console.log(e)
  }

  return null
}

export async function getImage (fileName: string): Promise<string | null> {
  const fileNameRef = getFirebaseStorageRef(fileName)

  try {
    return await getDownloadURL(fileNameRef)
  } catch (e: any) {
    // TODO gérer les erreurs
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (e.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break
      case 'storage/canceled':
        // User canceled the upload
        break
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break
    }

    return null
  }
}
