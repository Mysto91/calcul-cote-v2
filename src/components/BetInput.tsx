import React, { useState } from 'react'
interface BetInputProps {
  id: string
  label: string
}
export default function BetInput ({ id, label }: BetInputProps): JSX.Element {
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false)
  const [textValue, setTextValue] = useState<string>('')

  function inputIsFocusedOrHasTextValue (): boolean {
    return inputIsFocused || textValue !== ''
  }

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
            p-2
            transition ease-in-out
            ${inputIsFocusedOrHasTextValue() ? '-translate-y-5 bg-white text-xs text-blue-500' : 'text-base'}
          `}
          htmlFor={label}
      >
          {label}
      </label>
      <input
          id={id}
          className={`
            relative
            ${inputIsFocusedOrHasTextValue() ? 'z-1' : 'z-20'}
            px-1
            w-full h-full
            rounded-md border border-blue-300 outline-blue-500
            bg-transparent
            text-base text-center
            caret-blue-500
            `}
          type="text"
          name={label}
          onFocus={() => { setInputIsFocused(true) }}
          onBlur={() => { setInputIsFocused(false) }}
          onChange={(event) => { setTextValue(event.target.value) }}
      />
    </div>
  )
}
