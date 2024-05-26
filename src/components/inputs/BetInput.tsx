import React, { type ReactElement, useState } from 'react'
import { type ReactElementProps } from '../../interfaces/ReactElementPropsInterface'
import { hasInputError } from '../../services/hasInputError'
import { type InputEnum } from '../../enums/inputEnums'
import IconCheck from '../icons/IconCheck'
import { type Style, useStyle } from '../../utils/useStyle'
import { useErrorContext } from '../../contexts/context'
import { Nullable } from '../../interfaces/nullableType'
import clsx from 'clsx'

interface BetInputProps extends ReactElementProps {
  id: InputEnum
  textValue: Nullable<number | string>
  style?: Style
  unit?: string
  minValue?: number
  incrementValue?: number
  setTextValue: (newTextValue: Nullable<number | string>) => void
}

export default function BetInput ({
  id,
  children,
  textValue,
  setTextValue,
  unit,
  minValue = 0,
  incrementValue = 0.1,
  style = {},
}: BetInputProps): ReactElement {
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false)

  function inputIsFocusedOrHasTextValue (): boolean {
    return inputIsFocused || (textValue !== '' && textValue !== null)
  }

  function getUnitSpanClassWidth (): string {
    if (!textValue) {
      return 'w-12'
    }

    const textValueLength = typeof textValue === 'number' ? textValue.toString().length  : textValue.length

    if (textValueLength === 8) {
      return 'w-24'
    }

    if (textValueLength > 6) {
      return 'w-20'
    }

    if (textValueLength > 4) {
      return 'w-16'
    }

    if (textValueLength > 2) {
      return 'w-14'
    }

    return 'w-12'
  }

  const { textColorClass, borderColorClass, ringColorClass } = useStyle(style)

  const { errors } = useErrorContext()

  return (
    <div className="relative z-1 flex items-center justify-center h-10 rounded-md">
      <label
        id={`${id}-label`}
        className={clsx(
          'absolute z-20',
          'px-2',
          'flex',
          'transition ease-in-out',
          inputIsFocusedOrHasTextValue() ? `-translate-y-5 bg-white text-xs ${textColorClass ?? 'text-violet-500'}` : 'text-base',
        )}
        htmlFor={`${id}-input`}
      >
        {children}
        { !hasInputError(errors, id) && <IconCheck className="ml-2 fill-green-500" /> }
      </label>

      <input
        id={`${id}-input`}
        className={clsx(
          'relative',
          inputIsFocusedOrHasTextValue() ? 'z-10' : 'z-20',
          'px-1',
          'w-2/3 md:w-1/3 lg:w-full h-full',
          'rounded-md border-2',
          borderColorClass ? `${borderColorClass} focus-visible:${borderColorClass}` : 'border-violet-300 focus-visible:border-violet-500',
          'outline-none',
          borderColorClass ? `focus-visible:${ringColorClass}` : 'focus-visible:ring-violet-300',
          'focus:ring-2',
          'bg-transparent',
          'text-base text-center text-violet',
          'caret-violet-500',
          textColorClass,
          'transition ease-in-out',
        )}
        type="number"
        min={minValue}
        step={incrementValue}
        name={`${id}-input`}
        value={textValue ?? ''}
        maxLength={8}
        onFocus={() => {
          setInputIsFocused(true) 
        }}
        onBlur={() => {
          setInputIsFocused(false) 
        }}
        onChange={({ target }) => setTextValue(target.value)}
        autoComplete="off"
      />
      {
        (textValue !== '' && textValue !== null) &&
        <div className={`absolute flex ${textColorClass} transition ease-in-out`}>
          <span className={`z-0 ${getUnitSpanClassWidth()} bg-transparent`} />

          <p className="mt-0.5">{unit}</p>
        </div>
      }
    </div>
  )
}
