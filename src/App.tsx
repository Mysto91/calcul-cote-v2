/* eslint-disable react-hooks/exhaustive-deps */
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
import { Nullable } from './interfaces/nullableType'
import { getEnv } from './services/env'
import InputInfoMessage from './components/InputInfoMessage'
import { formatNumber } from './utils/formatNumber'

function App (): ReactElement {
  const betContainerRef = useRef(null)
  const messengerButtonRef = useRef<Nullable<HTMLButtonElement>>(null)

  const [showManualShareButton, setShowManualShareButton] = useState<boolean>(false)

  const {
    quotationOne,
    quotationTwo,
    betValue,
    boostedBetEnabled,
    setIsCalculating,
    isCalculating,
  } = useBetContext()

  const { flashMessage, clearMessage } = useFlashMessageContext()
  const { errors, setErrors } = useErrorContext()

  const {
    screenshotUrl,
    firebaseImageUrl,
    screenshotInProgress,
    handleShareButtonClick,
    handleShare,
    shareManually,
  } = useScreenshot(betContainerRef)

  useEffect(() => {
    setShowManualShareButton(false)

    void handleValidation({
      params: { quotationOne, quotationTwo, betValue, boostedBetEnabled },
      setIsLoading: setIsCalculating,
      setErrors,
    })
  }, [quotationOne, quotationTwo, betValue, boostedBetEnabled])

  useEffect(() => {
    if (!screenshotUrl) {
      return
    }

    let imageName = `betValue_${formatNumber(betValue)}_q1_${formatNumber(quotationOne)}_q2_${formatNumber(quotationTwo)}`

    if (boostedBetEnabled) {
      imageName += '_boostedBetEnabled'
    }

    void handleShare(`${imageName}.png`, setShowManualShareButton)
  }, [screenshotUrl])

  useEffect(() => {
    if (!firebaseImageUrl) {
      return
    }

    if (navigatorCanShare()) {
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
        className="absolute top-1/2 -translate-y-1/2 py-5 w-full flex items-center justify-center font-mono"
      >
        <div className="w-full">
          <div className="hidden md:flex md:justify-center">
            {
              !showManualShareButton &&
              <ShareButton
                id="share-button"
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
                onClick={() => shareManually(firebaseImageUrl)}
              >
                <IconRocket className="w-6 w-6" />
              </Button>
            }

            {
              getEnv().VITE_APP_FACEBOOK_APP_ID && (
                <FacebookMessengerShareButton
                  hidden
                  ref={messengerButtonRef}
                  appId={getEnv().VITE_APP_FACEBOOK_APP_ID}
                  url={firebaseImageUrl as string}
                >
                  <FacebookMessengerIcon />
                </FacebookMessengerShareButton>
              )
            }
          </div>

          <BetForm />

          <div className="mt-20 lg:mt-10 flex justify-center">
            {
              errors.length === 0 && !isCalculating ? <Table /> : <InputInfoMessage id='input-info-message' className="mx-10" />
            }
          </div>

        </div>
      </div>

      <div className="fixed bottom-0 mb-5 w-full flex md:hidden justify-center">
        {
          !showManualShareButton &&
          <ShareButton
            id="share-button"
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
            onClick={() => shareManually(firebaseImageUrl)}
          >
            <IconRocket className="w-6 w-6" />
          </Button>
        }
      </div>
    </>
  )
}

export default App
