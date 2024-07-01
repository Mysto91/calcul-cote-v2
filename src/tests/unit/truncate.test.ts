import { truncate } from '../../utils/truncate'

it('test with float having 3 decimals returns float with 2 decimals', () => {
  expect(truncate(2.556)).toEqual(2.56)
})
