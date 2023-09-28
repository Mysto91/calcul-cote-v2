import React, { useEffect } from 'react'
import './App.css'
import Table from './components/table/Table'
import BetInput from './components/BetInput'
import BetSwitch from './components/BetSwitch'
import { InputEnum } from './components/enums/inputEnums'
import { useBetStore } from './stores/useBetStore'
import inputSchema, { type BetSchemaInterface } from './validators/schemas/inputSchema'
import { useErrorsStore } from './stores/useErrorsStore'
import type * as yup from 'yup'

function App (): JSX.Element {
  const {
    setBetValue,
    setQuotationOne,
    setQuotationTwo,
    setBoostedBetEnabled,
    quotationOne,
    quotationTwo,
    betValue,
    boostedBetEnabled
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
    void validateSchema(
      {
        quotationOne,
        quotationTwo,
        betValue
      }
    ).then((error) => {
      if (error === null) {
        setErrors([])
        return
      }

      setErrors(error.errors)
    })
  }, [quotationOne, quotationTwo, betValue])

  return (
      <>
          <div>
              {
                   errors?.map((error: string, index: number) => <p key={index}>{ error }</p>)
              }
          </div>
          <div className="
                absolute top-1/2 -translate-y-1/2
                w-full
                flex items-center justify-center
                font-mono"
          >
              <div className="w-full">
                  <form className="
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
      </>
  )
}

export default App
