import { type Bet } from '../interfaces/betInterface'
import { truncateValues } from '../utils/truncate'

interface BetParams {
  betValue: number
  q1: number
  q2: number
  boostedBetEnabled: boolean
}

export function calculateNoBet (betParams: BetParams, reverse = false): Bet {
  const { betValue, q1, q2, boostedBetEnabled } = betParams

  let betOne: number, betTwo: number, quotationRef: number

  let finalBetValue: number = betValue

  if (boostedBetEnabled) {
    betOne = betValue !== 0 ? betValue : 10
    betTwo = reverse ? betOne * (q1 - 1) : betOne / (q2 - 1)

    quotationRef = reverse ? betTwo * q2 : betOne * q1

    finalBetValue = betOne + betTwo
  } else {
    if (reverse) {
      betTwo = betValue / q1
      betOne = betValue - betTwo

      quotationRef = betOne * q2
    } else {
      betTwo = betValue / q2
      betOne = betValue - betTwo

      quotationRef = betOne * q1
    }
  }

  const quotation = quotationRef / finalBetValue
  const probability = 1 / quotation

  const bet: Bet = {
    betOne,
    betTwo,
    quotation,
    profit: finalBetValue * quotation,
    netProfit: finalBetValue * quotation - finalBetValue,
    probability: probability < 1 ? probability : 1,
  }

  if (reverse && !boostedBetEnabled) {
    bet.betOne = betTwo
    bet.betTwo = betOne
  }

  return truncateValues(bet)
}

export function calculateOneOrTwo (betParams: BetParams): Bet {
  const { betValue, q1, q2, boostedBetEnabled } = betParams

  let betOne: number, betTwo: number
  let finalBetValue: number = betValue

  if (boostedBetEnabled) {
    betOne = betValue !== 0 ? betValue : 10
    finalBetValue = betOne * (q1 + q2) / q2
    betTwo = finalBetValue - betOne
  } else {
    betTwo = (q1 * betValue) / (q1 + q2)
    betOne = betValue - betTwo
  }

  const quotation = (q1 * q2) / (q1 + q2)
  const probability = 1 / quotation

  const bet: Bet = {
    betOne,
    betTwo,
    quotation,
    profit: finalBetValue * quotation,
    netProfit: finalBetValue * quotation - finalBetValue,
    probability: probability < 1 ? probability : 1,
  }

  return truncateValues(bet)
}
