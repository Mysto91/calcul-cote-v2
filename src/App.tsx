import React, { useEffect } from 'react'
import './App.css'
import Table from './components/table/Table'
import BetInput from './components/BetInput'
import BetSwitch from './components/BetSwitch'
import { InputEnum } from './components/enums/inputEnums'
import { useBetStore } from './stores/useBetStore'
import inputSchema, { type BetSchemaInterface } from './validators/schemas/inputSchema'

function App (): JSX.Element {
  const {
    setBetValue,
    setQuotationOne,
    setQuotationTwo,
    setBoostedBetEnabled,
    quotationOne,
    quotationTwo,
    betValue
  } = useBetStore()

  function setStoreValue (inputId: string, newValue: string | boolean): void {
    switch (inputId) {
      case InputEnum.BET_VALUE:
        setBetValue(Number(newValue))
        break
      case InputEnum.QUOTATION_ONE:
        setQuotationOne(Number(newValue))
        break
      case InputEnum.QUOTATION_TWO:
        setQuotationTwo(Number(newValue))
        break
      case InputEnum.BET_BOOSTED:
        setBoostedBetEnabled(newValue as boolean)
        break
      default:
        // TODO throw exception
        console.log('invalid valeur : ' + inputId)
        break
    }
  }

  async function validateSchema (params: BetSchemaInterface): Promise<void> {
    try {
      await inputSchema().validate(params)
    } catch (error: any) {
      // TODO gérer les erreurs
      console.error(error)
    }
  }

  useEffect(() => {
    void validateSchema(
      {
        quotationOne,
        quotationTwo,
        betValue
      }
    )
  }, [quotationOne, quotationTwo, betValue])

  return (
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
                    defaultValue="10"
                    handleOnChange={setStoreValue}
                >
                    Mise cote boostée
                </BetInput>

                <BetInput
                    id={InputEnum.QUOTATION_ONE}
                    handleOnChange={setStoreValue}
                >
                    Cote 1 boostée
                </BetInput>

                <BetInput
                    id={InputEnum.QUOTATION_TWO}
                    handleOnChange={setStoreValue}
                >
                    Cote 2
                </BetInput>

                <BetSwitch
                    id={InputEnum.BET_BOOSTED}
                    defaultStatus={true}
                    handleOnChange={setStoreValue}
                >
                    Cote boostée
                </BetSwitch>
            </form>

            <div className="flex justify-center">
                <Table className="mt-20 lg:mt-10" />
            </div>
        </div>
    </div>
  )
}

export default App
