import { calculateOneOrTwo } from '../../services/betCalculate'
import { type BetInterface } from '../../interfaces/betInterface'

it('test with boosted bet enabled', () => {
  const bet: BetInterface = calculateOneOrTwo('test', 10, 2, 2.5, true)

  const expected: BetInterface = {
    title: 'test',
    quotation: 1.11,
    betOne: 10,
    betTwo: 8,
    probability: 0.9,
    profit: 20,
    netProfit: 2
  }

  expect(bet).toEqual(expected)
})

it('test with boosted bet disabled', () => {
  const bet: BetInterface = calculateOneOrTwo('test', 10, 2.1, 2.3, false)

  const expected: BetInterface = {
    title: 'test',
    quotation: 1.10,
    betOne: 5.23,
    betTwo: 4.77,
    probability: 0.91,
    profit: 10.98,
    netProfit: 0.98
  }

  expect(bet).toEqual(expected)
})
