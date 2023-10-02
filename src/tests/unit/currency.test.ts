import { formatToEuroCurrency } from '../../utils/currency'

it('test with float returns string with euro symbol', () => {
  expect(formatToEuroCurrency(2.54)).toEqual('2.54 €')
})

it('test with integer returns string with euro symbol', () => {
  expect(formatToEuroCurrency(15)).toEqual('15 €')
})
