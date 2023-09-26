import React from 'react'
import './App.css'
import Table from './components/table/Table'
import BetInput from './components/BetInput'
import BetSwitch from './components/BetSwitch'
import { InputEnum } from './components/enums/inputEnums'
import { useBetStore } from './stores/useBetStore'

function App (): JSX.Element {
  const {
    setBetValue,
    setQuotationOne,
    setQuotationTwo,
    setBoostedBetEnabled
  } = useBetStore()

  function setStoreValue (inputId: string, newValue: string | boolean): void {
    // TODO : Validation préalable
    switch (inputId) {
      case InputEnum.BET:
        console.log('bet')
        setBetValue(Number(newValue))
        break
      case InputEnum.QUOTATION_ONE:
        console.log('quotation one')
        setQuotationOne(Number(newValue))
        break
      case InputEnum.QUOTATION_TWO:
        console.log('quotation two')
        setQuotationTwo(Number(newValue))
        break
      case InputEnum.BET_BOOSTED:
        console.log('bet boosted enabled')
        setBoostedBetEnabled(newValue as boolean)
        break
      default:
        // TODO throw exception
        console.log('invalid valeur : ' + inputId)
        break
    }
  }

  return (
    <div className="
        absolute top-1/2 -translate-y-1/2
        w-full
        flex items-center justify-center
        font-mono"
    >
        <div className="w-full">
            <div className="
                lg:flex lg:items-center lg:justify-center
                space-y-4 lg:space-y-0 lg:space-x-4"
            >
                <BetInput
                    id={InputEnum.BET}
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
            </div>

            <div className="flex justify-center">
                <Table className="mt-20 lg:mt-10" />
            </div>
        </div>
    </div>
  )
}

export default App
