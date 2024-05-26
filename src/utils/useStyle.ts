import { type Nullable } from '../interfaces/nullableType'

export interface Style {
  textColor?: Nullable<string>
  borderColor?: Nullable<string>
  ringColor?: Nullable<string>
}

export function useStyle (style: Style): {
  textColorClass?: Nullable<string>
  borderColorClass?: Nullable<string>
  ringColorClass?: Nullable<string>
} {
  const { textColor, borderColor, ringColor } = style

  const textColorClass = textColor && `text-${textColor}`
  const borderColorClass = borderColor && `border-${borderColor}`
  const ringColorClass = ringColor && `ring-${ringColor}`

  return {
    textColorClass,
    borderColorClass,
    ringColorClass,
  }
}
