import { type Bet } from '../interfaces/betInterface'

export function truncate (value: number, digit = 2): number {
  return !isNaN(value) && value % 1 !== 0 ? Number(value.toFixed(digit)) : value
}


export function truncateValues(bet: Bet): Bet {
  return {
    betOne: truncate(bet.betOne),
    betTwo: truncate(bet.betTwo),
    quotation: truncate(bet.quotation),
    profit: truncate(bet.profit),
    netProfit: truncate(bet.netProfit),
    probability: truncate(bet.probability),
  }
}
