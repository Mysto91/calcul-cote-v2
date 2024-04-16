import React, { type ReactElement, createContext, useState, useReducer } from 'react'
import { InputEnum } from '../enums/inputEnums'

interface BetState {
  betValue: number | null
  quotationOne: number | null
  quotationTwo: number | null
  boostedBetEnabled: boolean
  isCalculating: boolean
}

interface BetContextInterface extends BetState {
  setIsCalculating: (newValue: boolean) => void
  setBetStoreValue: (inputType: InputEnum, newValue: number | boolean) => void
}

export const BetContext = createContext<BetContextInterface>({
  betValue: null,
  quotationOne: null,
  quotationTwo: null,
  boostedBetEnabled: true,
  isCalculating: true,
  setIsCalculating: () => {},
  setBetStoreValue: () => {}
})

interface Action {
  type: InputEnum
  newValue: number | boolean
}

function betReducer (betState: BetState, action: Action): BetState {
  const { type, newValue } = action

  const actionHandlers = new Map<InputEnum, (value: any) => BetState>([
    [InputEnum.BET_BOOSTED, (value) => ({ ...betState, boostedBetEnabled: value })],
    [InputEnum.BET_VALUE, (value) => ({ ...betState, betValue: value })],
    [InputEnum.QUOTATION_ONE, (value) => ({ ...betState, quotationOne: value })],
    [InputEnum.QUOTATION_TWO, (value) => ({ ...betState, quotationTwo: value })]
  ])

  const handler = actionHandlers.get(type)

  if (handler !== undefined) {
    return handler(newValue)
  }

  return betState
}

export function BetContextProvider ({ children }: React.PropsWithChildren): ReactElement {
  const [isCalculating, setIsCalculating] = useState<boolean>(true)

  const [state, dispatch] = useReducer(betReducer, {
    betValue: 10,
    quotationOne: 2,
    quotationTwo: null,
    boostedBetEnabled: true,
    isCalculating: true
  })

  return (
    <BetContext.Provider value={{
      ...state,
      isCalculating,
      setIsCalculating,
      setBetStoreValue: (inputType: InputEnum, newValue: number | boolean) => { dispatch({ type: inputType, newValue }) }
    }}>
      {children}
    </BetContext.Provider>
  )
}
