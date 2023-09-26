import { create } from 'zustand'

interface BetStoreInterface {
  betValue: number | null
  quotationOne: number | null
  quotationTwo: number | null
  boostedBetEnabled: boolean
  setBetValue: (newValue: number) => void
  setQuotationOne: (newValue: number) => void
  setQuotationTwo: (newValue: number) => void
  setBoostedBetEnabled: (newValue: boolean) => void
}

export const useBetStore = create<BetStoreInterface>((set) => ({
  betValue: 10,
  quotationOne: null,
  quotationTwo: null,
  boostedBetEnabled: true,
  setBetValue: (newBetValue: number) => { set(() => ({ betValue: newBetValue })) },
  setQuotationOne: (newQuotationOne: number) => { set(() => ({ quotationOne: newQuotationOne })) },
  setQuotationTwo: (newQuotationTwo: number) => { set(() => ({ quotationTwo: newQuotationTwo })) },
  setBoostedBetEnabled: (newBoostedBetEnabled: boolean) => { set(() => ({ boostedBetEnabled: newBoostedBetEnabled })) }
}))
