import { type BetInterface } from '../interfaces/betInterface'
import { truncate } from '../utils/truncate'

// TODO refacto les params
export function calculateNoBet (
  title: string,
  mise: number,
  q1: number,
  q2: number,
  boosted: boolean,
  reverse: boolean = false
): BetInterface {
  let bet1: number, bet2: number, quotationRef: number

  if (boosted) {
    bet1 = mise !== 0 ? mise : 10
    bet2 = reverse ? bet1 * (q2 - 1) : bet1 / (q2 - 1)
    mise = bet1 + bet2
    quotationRef = (reverse ? bet2 : bet1) * Number(q1)
  } else {
    bet2 = mise / q2
    bet1 = mise - bet2
    quotationRef = (bet1 * Number(q1))
  }

  const quotation = quotationRef / mise
  const probability = 1 / quotation

  const betInterface: BetInterface = {
    title,
    betOne: truncate(bet1),
    betTwo: truncate(bet2),
    quotation: truncate(quotation),
    profit: truncate(mise * quotation),
    netProfit: truncate(mise * quotation - mise),
    probability: truncate(probability < 1 ? probability : 1)
  }

  if (reverse && !boosted) {
    betInterface.betOne = truncate(bet2)
    betInterface.betTwo = truncate(bet1)
  }

  return betInterface
}

export function calculateOneOrTwo (
  title: string,
  mise: number,
  q1: number,
  q2: number,
  boosted: boolean = false): BetInterface {
  let bet1: number, bet2: number

  if (boosted) {
    bet1 = mise !== 0 ? mise : 10
    mise = bet1 * (q1 + q2) / q2
    bet2 = mise - bet1
  } else {
    bet2 = (q1 * mise) / (q1 + q2)
    bet1 = mise - bet2
  }

  const quotation = (q1 * q2) / (q1 + q2)
  const probability = 1 / quotation

  return {
    title,
    betOne: truncate(bet1),
    betTwo: truncate(bet2),
    quotation: truncate(quotation),
    profit: truncate(mise * quotation),
    netProfit: truncate(mise * quotation - mise),
    probability: truncate(probability < 1 ? probability : 1)
  }
}
