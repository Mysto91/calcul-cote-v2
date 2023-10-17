import React, { type ReactElement, useEffect, useRef, useState } from 'react'
import './App.css'
import Table from './components/table/Table'
import BetInput from './components/BetInput'
import BetSwitch from './components/BetSwitch'
import { InputEnum } from './enums/inputEnums'
import { useBetStore } from './stores/useBetStore'
import { useErrorsStore } from './stores/useErrorsStore'
import { type InputError } from './interfaces/errorInterface'
import ShareButton from './components/ShareButton'
import { useScreenshot } from './hooks/useScreenshot'
import FlashMessage from './components/FlashMessage'
import { navigatorCanShare } from './services/useNavigator'
import { FacebookMessengerIcon, FacebookMessengerShareButton } from 'react-share'
import { validateSchema } from './services/validateSchema'
import { useFlashMessageStore } from './stores/useFlashMessageStore'

function App (): ReactElement {
  const betContainerRef = useRef(null)
  const messengerButtonRef = useRef<HTMLButtonElement | null>(null)

  const [showManualShareButton, setShowManualShareButton] = useState<boolean>(false)

  const {
    setBetValue,
    setQuotationOne,
    setQuotationTwo,
    setBoostedBetEnabled,
    quotationOne,
    quotationTwo,
    betValue,
    boostedBetEnabled,
    setIsLoading
  } = useBetStore()

  const { errors, setErrors } = useErrorsStore()

  const { flashMessage, clearMessage } = useFlashMessageStore()

  const {
    screenshotUrl,
    setScreenshotUrl,
    captureScreenshot,
    firebaseImageUrl,
    shareScreenshot,
    screenshotInProgress,
    setScreenshotInProgress,
    shareManually
  } = useScreenshot(betContainerRef)

  useEffect(() => {
    setIsLoading(true)
    setShowManualShareButton(false)

    void validateSchema({ quotationOne, quotationTwo, betValue }).then((error) => {
      if (error === null) {
        setErrors([])
        setIsLoading(false)
        return
      }

      const inputErrors = error.inner.map((validationError): InputError => (
        {
          inputId: validationError.params?.path as InputEnum,
          message: validationError.message
        }
      ))

      setErrors(inputErrors)
      setIsLoading(false)
    })
  }, [quotationOne, quotationTwo, betValue])

  useEffect(() => {
    async function handleShare (): Promise<void> {
      if (screenshotUrl === null) {
        return
      }

      await shareScreenshot(`betValue_${betValue}_q1_${quotationOne}_q2_${quotationTwo}.png`, setShowManualShareButton)

      setScreenshotInProgress(false)
      setScreenshotUrl(null)
    }

    void handleShare()
  }, [screenshotUrl])

  useEffect(() => {
    if (navigatorCanShare()) {
      return
    }

    (messengerButtonRef.current as HTMLButtonElement).click()
  }, [firebaseImageUrl])

  function handleShareButtonClick (): void {
    setScreenshotInProgress(true)

    void captureScreenshot()
  }

  return (
      <>
          { /* TODO avoir plusieurs messages */ }
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
                      <ShareButton
                          disabled={errors.length > 0}
                          onClick={handleShareButtonClick}
                          isLoading={screenshotInProgress}
                      />

                      {/* TODO : Voir si on mets ça sous forme d'une modal ou autre */}
                      {
                          showManualShareButton && (firebaseImageUrl !== null) &&
                          <button onClick={() => { shareManually(firebaseImageUrl) }}>
                              Partager
                          </button>
                      }

                      { /* TODO voir s'il est possible de s'en passer et d'utiliser une API */ }
                      <FacebookMessengerShareButton
                          hidden
                          ref={messengerButtonRef}
                          appId={process.env.REACT_APP_FACEBOOK_APP_ID as string}
                          url={firebaseImageUrl as string}
                      >
                          <FacebookMessengerIcon />
                      </FacebookMessengerShareButton>
                  </div>
                  <form className="
                        md:mt-6
                        lg:flex lg:items-center lg:justify-center
                        space-y-4 lg:space-y-0 lg:space-x-4"
                  >
                      <BetInput
                          id={InputEnum.BET_VALUE}
                          textValue={betValue}
                          setTextValue={setBetValue}
                          unit="€"
                      >
                         { boostedBetEnabled ? ' Mise cote boostée' : 'Mise' }
                      </BetInput>

                      <BetInput
                          id={InputEnum.QUOTATION_ONE}
                          textValue={quotationOne}
                          setTextValue={setQuotationOne}
                      >
                          { boostedBetEnabled ? 'Cote 1 boostée' : 'Cote 1' }
                      </BetInput>

                      <BetInput
                          id={InputEnum.QUOTATION_TWO}
                          textValue={quotationTwo}
                          setTextValue={setQuotationTwo}
                      >
                          Cote 2
                      </BetInput>

                      <BetSwitch
                          id={InputEnum.BET_BOOSTED}
                          isActive={boostedBetEnabled}
                          setIsActive={setBoostedBetEnabled}
                      >
                          Cote boostée
                      </BetSwitch>
                  </form>

                  <div className="flex justify-center">
                      <Table className="mt-20 lg:mt-10" />
                  </div>
              </div>
          </div>
          <div className={`
                fixed bottom-0
                mb-5
                w-full
                flex md:hidden justify-center
              `}
          >
              <ShareButton
                  disabled={errors.length > 0}
                  onClick={handleShareButtonClick}
                  isLoading={screenshotInProgress}
              />
          </div>
      </>
  )
}

export default App
