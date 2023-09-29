import { create } from 'zustand'

interface BetStoreInterface {
  betValue: number | null
  quotationOne: number | null
  quotationTwo: number | null
  boostedBetEnabled: boolean
  isLoading: boolean
  setBetValue: (newValue: number) => void
  setQuotationOne: (newValue: number) => void
  setQuotationTwo: (newValue: number) => void
  setBoostedBetEnabled: (newValue: boolean) => void
  setIsLoading: (newValue: boolean) => void
}

export const useBetStore = create<BetStoreInterface>((set) => ({
  betValue: 10,
  quotationOne: 2,
  quotationTwo: null,
  boostedBetEnabled: true,
  isLoading: true,
  setBetValue: (newBetValue: number) => { set(() => ({ betValue: newBetValue })) },
  setQuotationOne: (newQuotationOne: number) => { set(() => ({ quotationOne: newQuotationOne })) },
  setQuotationTwo: (newQuotationTwo: number) => { set(() => ({ quotationTwo: newQuotationTwo })) },
  setBoostedBetEnabled: (newBoostedBetEnabled: boolean) => { set(() => ({ boostedBetEnabled: newBoostedBetEnabled })) },
  setIsLoading: (newIsLoading: boolean) => { set(() => ({ isLoading: newIsLoading })) }
}))
