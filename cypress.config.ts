import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000',
    env: {
      firebaseBaseUrl: 'https://firebasestorage.googleapis.com/v0/b/calcul-cote-v2.appspot.com',
    },
  },
})
