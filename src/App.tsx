import React, { type ReactElement, useEffect, useRef, useState } from 'react'
import './App.css'
import Table from './components/table/Table'
import ShareButton from './components/ShareButton'
import { useScreenshot } from './hooks/useScreenshot'
import FlashMessage from './components/FlashMessage'
import { navigatorCanShare } from './services/navigator'
import { FacebookMessengerIcon, FacebookMessengerShareButton } from 'react-share'
import { handleValidation } from './services/validation'
import IconRocket from './components/icons/IconRocket'
import Button from './components/Button'
import BetForm from './components/inputs/BetForm'
import { useBetContext, useErrorContext, useFlashMessageContext } from './contexts/context'

function App (): ReactElement {
  const betContainerRef = useRef(null)
  const messengerButtonRef = useRef<HTMLButtonElement | null>(null)

  const [showManualShareButton, setShowManualShareButton] = useState<boolean>(false)

  const {
    quotationOne,
    quotationTwo,
    betValue,
    boostedBetEnabled,
    setIsCalculating
  } = useBetContext()

  const { flashMessage, clearMessage } = useFlashMessageContext()
  const { errors, setErrors } = useErrorContext()

  const {
    screenshotUrl,
    firebaseImageUrl,
    screenshotInProgress,
    handleShareButtonClick,
    handleShare,
    shareManually
  } = useScreenshot(betContainerRef)

  useEffect(() => {
    setShowManualShareButton(false)
    void handleValidation({
      params: { quotationOne, quotationTwo, betValue, boostedBetEnabled },
      setIsLoading: setIsCalculating,
      setErrors
    })
  }, [quotationOne, quotationTwo, betValue, boostedBetEnabled])

  useEffect(() => {
    void handleShare(`betValue_${betValue}_q1_${quotationOne}_q2_${quotationTwo}.png`, setShowManualShareButton)
  }, [screenshotUrl])

  useEffect(() => {
    if (navigatorCanShare()) {
      return
    }

    if (firebaseImageUrl === null || firebaseImageUrl === undefined) {
      return
    }

    messengerButtonRef.current?.click()
  }, [firebaseImageUrl])

  return (
      <>
          <div className="mt-4 flex justify-center">
            <FlashMessage flashMessage={flashMessage} clearMessage={clearMessage} />
          </div>

          <div
              ref={betContainerRef}
              className="
                absolute top-1/2 -translate-y-1/2
                py-5
                w-full
                flex items-center justify-center
                font-mono"
          >
              <div className="w-full">
                  <div className="hidden md:flex md:justify-center">
                      {
                          !showManualShareButton &&
                          <ShareButton
                              className="w-16 h-10"
                              disabled={errors.length > 0}
                              onClick={handleShareButtonClick}
                              isLoading={screenshotInProgress}
                          />
                      }

                      {
                          showManualShareButton && (firebaseImageUrl !== null) &&
                          <Button
                              className="w-16 h-10"
                              onClick={() => { shareManually(firebaseImageUrl) }}
                          >
                              <IconRocket className="w-6 w-6" />
                          </Button>
                      }

                      <FacebookMessengerShareButton
                          hidden
                          ref={messengerButtonRef}
                          appId={process.env.REACT_APP_FACEBOOK_APP_ID as string}
                          url={firebaseImageUrl as string}
                      >
                          <FacebookMessengerIcon />
                      </FacebookMessengerShareButton>
                  </div>

                  <BetForm />

                  <div className="flex justify-center">
                      <Table className="mt-20 lg:mt-10" />
                  </div>
              </div>
          </div>

          <div className="
                fixed bottom-0
                mb-5
                w-full
                flex md:hidden justify-center
              "
          >
              {
                  !showManualShareButton &&
                  <ShareButton
                      className="w-16 h-10"
                      disabled={errors.length > 0}
                      onClick={handleShareButtonClick}
                      isLoading={screenshotInProgress}
                  />
              }

              {
                  showManualShareButton && (firebaseImageUrl !== null) &&
                  <Button
                      className="w-16 h-10"
                      onClick={() => { shareManually(firebaseImageUrl) }}
                  >
                      <IconRocket className="w-6 w-6" />
                  </Button>
              }
          </div>
      </>
  )
}

export default App
