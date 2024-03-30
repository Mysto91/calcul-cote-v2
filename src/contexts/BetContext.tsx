import React, { type ReactElement, createContext, useState, type ReactNode, useReducer } from 'react'
import { InputEnum } from '../enums/inputEnums'

interface BetState {
  betValue: number | null
  quotationOne: number | null
  quotationTwo: number | null
  boostedBetEnabled: boolean
  isLoading: boolean
}

interface BetContextInterface extends BetState {
  setIsLoading: (newValue: boolean) => void
  setBetStoreValue: (inputType: InputEnum, newValue: number | boolean) => void
}

export const BetContext = createContext<BetContextInterface>({
  betValue: null,
  quotationOne: null,
  quotationTwo: null,
  boostedBetEnabled: true,
  isLoading: true,
  setIsLoading: () => {},
  setBetStoreValue: () => {}
})

interface Action {
  type: InputEnum
  newValue: any
}

function betReducer (betState: BetState, action: Action): BetState {
  switch (action.type) {
    case InputEnum.BET_VALUE:
      return { ...betState, betValue: action.newValue }
    case InputEnum.QUOTATION_ONE:
      return { ...betState, quotationOne: action.newValue }
    case InputEnum.QUOTATION_TWO:
      return { ...betState, quotationTwo: action.newValue }
    case InputEnum.BET_BOOSTED:
      return { ...betState, boostedBetEnabled: action.newValue }
    default:
      return betState
  }
}

export function BetContextProvider ({ children }: { children: ReactNode }): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [state, dispatch] = useReducer(betReducer, {
    betValue: 10,
    quotationOne: 2,
    quotationTwo: null,
    boostedBetEnabled: true,
    isLoading: true
  })

  return (
    <BetContext.Provider value={{
      ...state,
      isLoading,
      setIsLoading,
      setBetStoreValue: (inputType: InputEnum, newValue: number | boolean) => { dispatch({ type: inputType, newValue }) }
    }}>
      {children}
    </BetContext.Provider>
  )
}
