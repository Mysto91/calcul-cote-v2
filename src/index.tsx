import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ErrorContextProvider } from './contexts/ErrorContext'
import { FlashMessageContextProvider } from './contexts/FlashMessageContext'
import { BetContextProvider } from './contexts/BetContext'
import { getEnv } from './services/env'

if (getEnv().VITE_APP_APP_ENV === 'prod') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

root.render(
  <React.StrictMode>
    <BetContextProvider>
      <ErrorContextProvider>
        <FlashMessageContextProvider>
          <App />
        </FlashMessageContextProvider>
      </ErrorContextProvider>
    </BetContextProvider>
  </React.StrictMode>,
)
