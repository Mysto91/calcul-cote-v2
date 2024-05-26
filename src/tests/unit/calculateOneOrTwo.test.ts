import { calculateOneOrTwo } from '../../services/betCalculate'
import { type Bet } from '../../interfaces/betInterface'

it('test with boosted bet enabled', () => {
  const betParams = {
    betValue: 10,
    q1: 2,
    q2: 2.5,
    boostedBetEnabled: true,
  }

  const bet: Bet = calculateOneOrTwo(betParams)

  const expected: Bet = {
    quotation: 1.11,
    betOne: 10,
    betTwo: 8,
    probability: 0.9,
    profit: 20,
    netProfit: 2,
  }

  expect(bet).toEqual(expected)
})

it('test with boosted bet disabled', () => {
  const betParams = {
    betValue: 10,
    q1: 2,
    q2: 2.2,
    boostedBetEnabled: false,
  }

  const bet: Bet = calculateOneOrTwo(betParams)

  const expected: Bet = {
    quotation: 1.05,
    betOne: 5.24,
    betTwo: 4.76,
    probability: 0.95,
    profit: 10.48,
    netProfit: 0.48,
  }

  expect(bet).toEqual(expected)
})
