import { type BetInterface } from '../interfaces/betInterface'

export function calculateNoBet (
  betValue: number,
  quotationOne: number,
  quotationTwo: number,
  boosted: boolean,
  reverse: boolean = false
): BetInterface {
  let betOne: number, betTwo: number, quotationRef: number

  console.log(betValue, quotationOne, quotationTwo)

  if (boosted) {
    betOne = betValue !== 0 ? betValue : 10
    betTwo = reverse ? betOne * (quotationTwo - 1) : betOne / (quotationTwo - 1)
    betValue = betOne + betTwo
    quotationRef = (reverse ? betTwo : betOne) * Number(quotationOne)
  } else {
    betTwo = betValue / quotationTwo
    betOne = betValue - betTwo
    quotationRef = (betOne * Number(quotationOne))
  }

  const quotation = quotationRef / betValue
  const probability = 1 / quotation

  const betInterface: BetInterface = {
    title: 'test',
    betOne: trunc(betOne),
    betTwo: trunc(betTwo),
    quotation: trunc(quotation),
    profit: trunc(betValue * quotation),
    netProfit: trunc(betValue * quotation - betValue),
    probability: trunc(probability < 1 ? probability : 1)
  }

  if (reverse && !boosted) {
    betInterface.betOne = trunc(betTwo)
    betInterface.betTwo = trunc(betOne)
  }

  return betInterface
}

export function calculateOneOrTwo (betValue: number, quotationOne: number, quotationTwo: number, boosted: boolean = false): BetInterface {
  let betOne: number, betTwo: number

  if (boosted) {
    betOne = betValue !== 0 ? betValue : 10
    betValue = betOne * (quotationOne + quotationTwo) / quotationTwo
    betTwo = betValue - betOne
    console.log(betValue, betOne, betTwo)
  } else {
    betTwo = (quotationOne * betValue) / (quotationOne + quotationTwo)
    betOne = betValue - betTwo
  }

  const quotation = (quotationOne * quotationTwo) / (quotationOne + quotationTwo)
  const probability = 1 / quotation

  return {
    title: 'test',
    betOne: trunc(betOne),
    betTwo: trunc(betTwo),
    quotation: trunc(quotation),
    profit: trunc(betValue * quotation),
    netProfit: trunc(betValue * quotation - betValue),
    probability: trunc(probability < 1 ? probability : 1)
  }
};

export function trunc (value: number, digit = 2): number {
  return !isNaN(value) && value % 1 !== 0 ? Number(value.toFixed(digit)) : value
}
