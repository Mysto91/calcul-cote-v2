import { create } from 'zustand'

interface BetStoreInterface {
  betValue: number | null
  quotationOne: number | null
  quotationTwo: number | null
  boostedBetEnabled: boolean
  setBetValue: (newBetValue: number) => void
  setQuotationOne: (newBetValue: number) => void
  setQuotationTwo: (newBetValue: number) => void
}

export const useBetStore = create<BetStoreInterface>((set) => ({
  betValue: null,
  quotationOne: null,
  quotationTwo: null,
  boostedBetEnabled: true,
  setBetValue: (newBetValue: number) => { set(() => ({ betValue: newBetValue })) },
  setQuotationOne: (newQuotationOne: number) => { set(() => ({ quotationOne: newQuotationOne })) },
  setQuotationTwo: (newQuotationTwo: number) => { set(() => ({ quotationTwo: newQuotationTwo })) }
}))
