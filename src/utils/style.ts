import { type Nullable } from '../interfaces/nullableType'

export interface Style {
  textColor?: Nullable<string>
  borderColor?: Nullable<string>
  ringColor?: Nullable<string>
}

export function useStyle (style: Style): {
  textColorClass: Nullable<string>
  borderColorClass: Nullable<string>
  ringColorClass: Nullable<string>
} {
  const { textColor, borderColor, ringColor } = style

  const textColorClass = textColor ? `text-${textColor}` : null
  const borderColorClass = borderColor ? `border-${borderColor}` : null
  const ringColorClass = ringColor ? `ring-${ringColor}` : null

  return {
    textColorClass,
    borderColorClass,
    ringColorClass
  }
}
