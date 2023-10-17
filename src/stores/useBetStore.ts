import { create } from 'zustand'
import { InputEnum } from '../enums/inputEnums'

interface BetStoreInterface {
  betValue: number | null
  quotationOne: number | null
  quotationTwo: number | null
  boostedBetEnabled: boolean
  isLoading: boolean
  setBoostedBetEnabled: (newValue: boolean) => void
  setIsLoading: (newValue: boolean) => void
  setBetStoreValue: (inputType: InputEnum, newValue: number) => void
}

export const useBetStore = create<BetStoreInterface>((set) => ({
  betValue: 10,
  quotationOne: 2,
  quotationTwo: null,
  boostedBetEnabled: true,
  isLoading: true,
  setBoostedBetEnabled: (newBoostedBetEnabled: boolean) => { set(() => ({ boostedBetEnabled: newBoostedBetEnabled })) },
  setIsLoading: (newIsLoading: boolean) => { set(() => ({ isLoading: newIsLoading })) },
  setBetStoreValue: (inputType: InputEnum, newValue: number) => {
    switch (inputType) {
      case InputEnum.QUOTATION_ONE:
        set(() => ({ quotationOne: newValue }))
        break
      case InputEnum.BET_VALUE:
        set(() => ({ betValue: newValue }))
        break
      case InputEnum.QUOTATION_TWO:
        set(() => ({ quotationTwo: newValue }))
        break
      default:
        break
    }
  }
}))
