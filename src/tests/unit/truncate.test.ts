import { truncate } from '../../utils/truncate'

it('test with float having 3 decimals returns float with 2 decimals', () => {
  expect(truncate(2.556)).toEqual(2.56)
})

it('test with float having 4 decimals and asking for 3 decimals returns float with 3 decimals', () => {
  expect(truncate(3.5556, 3)).toEqual(3.556)
})

it('test with float having multiple decimals returns float with 2 decimals', () => {
  expect(truncate(57.999999)).toEqual(58)
})
