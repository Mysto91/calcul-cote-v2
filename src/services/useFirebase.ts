import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

interface FirebaseConfig {
  projectId: string
  privateKey: string
  clientEmail: string
}

export function firebaseInit (): FirebaseApp {
  const firebaseConfig: FirebaseConfig = {
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
    privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY as string,
    clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL as string
  }

  return initializeApp(firebaseConfig)
}

export function storeImage (image: Blob, title: string): void {
  const firebaseApp: FirebaseApp = firebaseInit()

  const storage = getStorage(firebaseApp, process.env.REACT_APP_FIREBASE_BUCKET)

  console.log(storage, process.env)

  const storageRef = ref(storage, `${process.env.REACT_APP_APP_ENV}/${title}`)

  uploadBytes(storageRef, image).then(() => {
    console.log('Uploaded a blob or file!')
  }).catch((error) => {
    console.log(error)
  })
}
