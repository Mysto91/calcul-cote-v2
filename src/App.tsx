import React, { type ReactElement, useEffect, useRef, useState } from 'react'
import './App.css'
import Table from './components/table/Table'
import BetInput from './components/BetInput'
import BetSwitch from './components/BetSwitch'
import { InputEnum } from './enums/inputEnums'
import { useBetStore } from './stores/useBetStore'
import inputSchema, { type BetSchemaInterface } from './validators/schemas/inputSchema'
import { useErrorsStore } from './stores/useErrorsStore'
import type * as yup from 'yup'
import { type InputError } from './interfaces/errorInterface'
import ShareButton from './components/ShareButton'
import { useScreenshot } from './hooks/useScreenshot'
import { dataURLtoBlob } from './utils/dataURLtoBlob'
import { getFirebaseBlob, storeImage } from './services/useFirebase'

function App (): ReactElement {
  const betContainerRef = useRef(null)

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

  const {
    errors,
    setErrors
  } = useErrorsStore()

  async function validateSchema (params: BetSchemaInterface): Promise<yup.ValidationError | null> {
    try {
      await inputSchema().validate(params, { abortEarly: false })
      return null
    } catch (error: any) {
      return error
    }
  }

  useEffect(() => {
    setIsLoading(true)

    void validateSchema(
      {
        quotationOne,
        quotationTwo,
        betValue
      }
    ).then((error) => {
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

  const {
    screenshotUrl,
    setScreenshotUrl,
    captureScreenshot
  } = useScreenshot(betContainerRef)

  const [screenshotInProgress, setScreenshotInProgress] = useState<boolean>(false)

  async function shareScreenshot (): Promise<void> {
    try {
      if (screenshotUrl === null) {
        return
      }

      const image = dataURLtoBlob(screenshotUrl)

      const fileName = `betValue_${betValue}_q1_${quotationOne}_q2_${quotationTwo}.png`

      await storeImage(image, fileName)

      const imageBlob = await getFirebaseBlob(fileName)

      if (imageBlob === null) {
        return
      }

      if (navigator.share !== undefined) {
        await navigator.share({
          files: [
            new File([imageBlob], fileName)
          ]
        })
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': imageBlob })
        ])

        console.log('Image copiée dans le clipboard!')
      }
    } catch (error) {
      console.error('Erreur lors du partage :', error)
    }

    setScreenshotUrl(null)
    setScreenshotInProgress(false)
  }

  useEffect(() => { void shareScreenshot() }, [screenshotUrl])

  function handleShareButtonClick (): void {
    setScreenshotInProgress(true)
    void captureScreenshot()
  }

  return (
      <>
          { /* TODO ajouter des flash messages pour indiquer que l'image a bien été ajoutée au clipboard ou des erreurs */ }
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
