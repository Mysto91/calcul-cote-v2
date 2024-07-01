import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getBlob, getDownloadURL, type StorageReference, type UploadResult } from 'firebase/storage'
import { Nullable } from '../interfaces/nullableType'
import { getEnv } from './env'

interface FirebaseConfig {
  projectId: string
  privateKey: string
  clientEmail: string
}

function getFirebaseStorageRef (fileName: string): StorageReference {
  const firebaseApp: FirebaseApp = firebaseInit()

  const storage = getStorage(firebaseApp, getEnv().VITE_APP_FIREBASE_BUCKET)

  return ref(storage, `${getEnv().VITE_APP_APP_ENV}/${fileName}`)
}

// TODO voir pour initialiser qu'une seule fois
export function firebaseInit (): FirebaseApp {
  const firebaseConfig: FirebaseConfig = {
    projectId: getEnv().VITE_APP_FIREBASE_PROJECT_ID ?? '',
    privateKey: getEnv().VITE_APP_FIREBASE_PRIVATE_KEY ?? '',
    clientEmail: getEnv().VITE_APP_FIREBASE_CLIENT_EMAIL ?? '',
  }

  return initializeApp(firebaseConfig)
}

export async function storeImage (image: Blob, fileName: string): Promise<Nullable<UploadResult>> {
  const storageRef = getFirebaseStorageRef(fileName)

  try {
    return await uploadBytes(storageRef, image)
  } catch (e) {
    // TODO gérer l'erreur
    console.log(e)
  }

  return null
}

export async function getFirebaseImageUrl (fileName: string): Promise<Nullable<string>> {
  const fileNameRef = getFirebaseStorageRef(fileName)

  try {
    return await getDownloadURL(fileNameRef)
  } catch (e: unknown) {
    // TODO gérer les erreurs
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    return null
  }
}

export async function getFirebaseBlob (fileName: string): Promise<Nullable<Blob>> {
  const fileNameRef = getFirebaseStorageRef(fileName)

  try {
    return await getBlob(fileNameRef)
  } catch (e) {
    // TODO gérer les erreurs
    console.log(e)
  }

  return null
}
