import React from 'react'
interface BetInputProps {
  id: string
  label: string
}
export default function BetInput ({ id, label }: BetInputProps): JSX.Element {
  return (
    <div className="
        relative
        flex items-center justify-center
        h-10 w-32
        rounded-md
        bg-blue-200
        focus:outline-non"
    >
      <label
          id={`${id}-label`}
          className="absolute"
          htmlFor={label}
      >
          {label}
      </label>
      <input
          id={id}
          className="
            relative z-10
            w-full h-full
            rounded-md outline-blue-500
            bg-transparent"
          type="text"
          name={label}
      />
    </div>
  )
}
