import { calculateNoBet } from '../../services/betCalculate'
import { type Bet } from '../../interfaces/betInterface'

it('test with boosted bet enabled', () => {
  const betParams = {
    betValue: 10,
    q1: 2,
    q2: 2.5,
    boostedBetEnabled: true
  }

  const bet: Bet = calculateNoBet(betParams)

  const expected: Bet = {
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
  const betParams = {
    betValue: 10,
    q1: 2.25,
    q2: 2.10,
    boostedBetEnabled: false
  }

  const bet: Bet = calculateNoBet(betParams)

  const expected: Bet = {
    quotation: 1.18,
    betOne: 5.24,
    betTwo: 4.76,
    probability: 0.85,
    profit: 11.79,
    netProfit: 1.79
  }

  expect(bet).toEqual(expected)
})

it("test with boosted bet enabled and reverse", () => {
  const betParams = {
    betValue: 10,
    q1: 2,
    q2: 2.45,
    boostedBetEnabled: true,
  };

  const bet: Bet = calculateNoBet(betParams, true);

  const expected: Bet = {
    quotation: 1.23,
    betOne: 10,
    betTwo: 10,
    probability: 0.82,
    profit: 24.5,
    netProfit: 4.5,
  };

  expect(bet).toEqual(expected);
});

it("test with boosted bet enabled and reverse with bet value over 10€", () => {
  const betParams = {
    betValue: 15,
    q1: 2.5,
    q2: 2.3,
    boostedBetEnabled: true,
  };

  const bet: Bet = calculateNoBet(betParams, true);

  const expected: Bet = {
    quotation: 1.38,
    betOne: 15,
    betTwo: 22.5,
    probability: 0.72,
    profit: 51.75,
    netProfit: 14.25,
  };

  expect(bet).toEqual(expected);
});

it('test with boosted bet disabled and reverse', () => {
  const betParams = {
    betValue: 5,
    q1: 2,
    q2: 2.25,
    boostedBetEnabled: false
  }

  const bet: Bet = calculateNoBet(betParams, true)

  const expected = {
    quotation: 1.11,
    betOne: 2.22,
    betTwo: 2.78,
    probability: 0.9,
    profit: 5.56,
    netProfit: 0.56
  }

  expect(bet).toEqual(expected)
})
