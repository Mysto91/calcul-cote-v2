import { Nullable } from '../interfaces/nullableType'

export function formatNumber (value: Nullable<number>): number {
  return Number(value?.toString().replace(',', '.'))
}
