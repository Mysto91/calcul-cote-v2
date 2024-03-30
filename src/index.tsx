import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ErrorContextProvider } from './contexts/ErrorContext'
import { FlashMessageContextProvider } from './contexts/FlashMessageContext'

if (process.env.REACT_APP_APP_ENV === 'prod') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <ErrorContextProvider>
      <FlashMessageContextProvider>
        <App />
      </FlashMessageContextProvider>
    </ErrorContextProvider>
  </React.StrictMode>
)
