import React, { type ReactElement, createContext, useState, type ReactNode } from 'react'
import { InputEnum } from '../enums/inputEnums'

interface BetContextInterface {
  betValue: number | null
  quotationOne: number | null
  quotationTwo: number | null
  boostedBetEnabled: boolean
  isLoading: boolean
  setBoostedBetEnabled: (newValue: boolean) => void
  setIsLoading: (newValue: boolean) => void
  setBetStoreValue: (inputType: InputEnum, newValue: number) => void
}

export const BetContext = createContext<BetContextInterface>({
  betValue: null,
  quotationOne: null,
  quotationTwo: null,
  boostedBetEnabled: true,
  isLoading: true,
  setBoostedBetEnabled: () => {},
  setIsLoading: () => {},
  setBetStoreValue: () => {}
})

export function BetContextProvider ({ children }: { children: ReactNode }): ReactElement {
  const [betValue, setBetValue] = useState<number | null>(10)
  const [quotationOne, setQuotationOne] = useState<number | null>(2)
  const [quotationTwo, setQuotationTwo] = useState<number | null>(null)
  const [boostedBetEnabled, setBoostedBetEnabled] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  function setBetStoreValue (inputType: InputEnum, newValue: number): void {
    switch (inputType) {
      case InputEnum.QUOTATION_ONE:
        setQuotationOne(newValue)
        break
      case InputEnum.BET_VALUE:
        setBetValue(newValue)
        break
      case InputEnum.QUOTATION_TWO:
        setQuotationTwo(newValue)
        break
      default:
        break
    }
  }

  return (
    <BetContext.Provider value={{
      betValue,
      quotationOne,
      quotationTwo,
      boostedBetEnabled,
      isLoading,
      setIsLoading,
      setBoostedBetEnabled,
      setBetStoreValue
    }}>
      {children}
    </BetContext.Provider>
  )
}
