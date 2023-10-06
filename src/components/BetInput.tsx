import React, { type ReactElement, useState } from 'react'
import { type ReactElementPropsInterface } from '../interfaces/ReactElementPropsInterface'
import { useErrorsStore } from '../stores/useErrorsStore'
import { hasInputError } from '../services/hasInputError'
import { type InputEnum } from '../enums/inputEnums'
import IconCheck from './icons/IconCheck'

interface BetInputProps extends ReactElementPropsInterface {
  id: InputEnum
  textValue: any
  unit?: string
  setTextValue: (newTextValue: any) => void
}

export default function BetInput ({ id, children, textValue, setTextValue, unit }: BetInputProps): ReactElement {
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false)

  function inputIsFocusedOrHasTextValue (): boolean {
    return inputIsFocused || (textValue !== '' && textValue !== null)
  }
  function getUnitSpanClassWidth (): string {
    const textValueLength = textValue.length

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

  const { errors } = useErrorsStore()

  return (
    <div className="
          relative z-1
          flex items-center justify-center
          h-10
          rounded-md"
    >
      <label
          id={`${id}-label`}
          className={`
            absolute z-20
            px-2
            flex
            transition ease-in-out
            ${inputIsFocusedOrHasTextValue() ? '-translate-y-5 bg-white text-xs text-violet-500' : 'text-base'}
          `}
          htmlFor={`${id}-input`}
      >
          {children}
          { !hasInputError(errors, id) && <IconCheck className="ml-2 fill-green-500" /> }
      </label>
      <input
          id={`${id}-input`}
          className={`
            relative
            ${inputIsFocusedOrHasTextValue() ? 'z-10' : 'z-20'}
            px-1
            w-2/3 md:w-1/3 lg:w-full h-full
            rounded-md border-2 border-violet-300 focus-visible:border-violet-500
            outline-none focus-visible:ring-violet-300 focus:ring-2
            bg-transparent
            text-base text-center
            caret-violet-500
            `}
          type="text"
          name={`${id}-input`}
          value={textValue ?? ''}
          maxLength={8}
          onFocus={() => { setInputIsFocused(true) }}
          onBlur={() => { setInputIsFocused(false) }}
          onChange={({ target }) => { setTextValue(target.value) }}
          autoComplete="off"
      />
      {
          (textValue !== '' && textValue !== null) &&
            <div className="absolute flex">
              <span className={`z-0 ${getUnitSpanClassWidth()} bg-transparent`}>
              </span>
              <p className="mt-0.5">
                {unit}
              </p>
            </div>
      }
    </div>
  )
}
