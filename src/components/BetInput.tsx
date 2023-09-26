import React, { useState } from 'react'

interface BetInputProps {
  id: string
  children: string
  textValue: any
  setTextValue: (newTextValue: any) => void
}

export default function BetInput ({ id, children, textValue, setTextValue }: BetInputProps): JSX.Element {
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false)

  function inputIsFocusedOrHasTextValue (): boolean {
    return inputIsFocused || (textValue !== '' && textValue !== null)
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
            px-2
            transition ease-in-out
            ${inputIsFocusedOrHasTextValue() ? '-translate-y-5 bg-white text-xs text-violet-500' : 'text-base'}
          `}
          htmlFor={`${id}-input`}
      >
          {children}
      </label>
      <input
          id={`${id}-input`}
          className={`
            relative
            ${inputIsFocusedOrHasTextValue() ? 'z-1' : 'z-20'}
            px-1
            w-2/3 md:w-1/3 lg:w-full h-full
            rounded-md border border-violet-300 outline-violet-500
            bg-transparent
            text-base text-center
            caret-violet-500
            `}
          type="text"
          name={`${id}-input`}
          value={textValue ?? ''}
          onFocus={() => { setInputIsFocused(true) }}
          onBlur={() => { setInputIsFocused(false) }}
          onChange={({ target }) => { setTextValue(target.value) }}
      />
    </div>
  )
}
