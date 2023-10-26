import { type Bet } from '../interfaces/betInterface'

export function truncate (value: number, digit: number = 2): number {
  return !isNaN(value) && value % 1 !== 0 ? Number(value.toFixed(digit)) : value
}

export function truncateValues (object: any): Bet {
  const truncatedValues: any = {}

  for (const property in object) {
    truncatedValues[property] = truncate(object[property])
  }

  return truncatedValues
}
