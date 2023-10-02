import { calculateNoBet } from '../../services/betCalculate'
import { type BetInterface } from '../../interfaces/betInterface'

it('test with boosted bet enabled', () => {
  const bet: BetInterface = calculateNoBet('test', 10, 2, 2.5, true)

  const expected: BetInterface = {
    title: 'test',
    quotation: 1.2,
    betOne: 10,
    betTwo: 6.67,
    probability: 0.83,
    profit: 20,
    netProfit: 3.33
  }

  expect(bet).toEqual(expected)
})

it('test with boosted bet disabled', () => {
  const bet: BetInterface = calculateNoBet('test', 10, 2.25, 2.10, false)

  const expected: BetInterface = {
    title: 'test',
    quotation: 1.18,
    betOne: 5.24,
    betTwo: 4.76,
    probability: 0.85,
    profit: 11.79,
    netProfit: 1.79
  }

  expect(bet).toEqual(expected)
})

it('test with boosted bet enabled and reverse', () => {
  const bet: BetInterface = calculateNoBet('test', 15, 2.5, 2.3, true, true)

  const expected: BetInterface = {
    title: 'test',
    quotation: 1.41,
    betOne: 15,
    betTwo: 19.5,
    probability: 0.71,
    profit: 48.75,
    netProfit: 14.25
  }
  expect(bet).toEqual(expected)
})

it('test with boosted bet disabled and reverse', () => {
  const bet: BetInterface = calculateNoBet('test', 5, 2, 2.25, false, true)

  const expected = {
    title: 'test',
    quotation: 1.11,
    betOne: 2.22,
    betTwo: 2.78,
    probability: 0.9,
    profit: 5.56,
    netProfit: 0.56
  }

  expect(bet).toEqual(expected)
})
