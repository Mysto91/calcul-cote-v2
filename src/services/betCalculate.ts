import { type BetInterface } from '../interfaces/betInterface'

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
    betOne: trunc(bet1),
    betTwo: trunc(bet2),
    quotation: trunc(quotation),
    profit: trunc(mise * quotation),
    netProfit: trunc(mise * quotation - mise),
    probability: trunc(probability < 1 ? probability : 1)
  }

  if (reverse && !boosted) {
    betInterface.betOne = trunc(bet2)
    betInterface.betTwo = trunc(bet1)
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
    betOne: trunc(bet1),
    betTwo: trunc(bet2),
    quotation: trunc(quotation),
    profit: trunc(mise * quotation),
    netProfit: trunc(mise * quotation - mise),
    probability: trunc(probability < 1 ? probability : 1)
  }
}

export function trunc (value: number, digit: number = 2): number {
  return !isNaN(value) && value % 1 !== 0 ? Number(value.toFixed(digit)) : value
}
