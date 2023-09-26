import React, { useState } from 'react'

interface BetSwitchProps {
  id: string
  defaultStatus?: boolean
  children: string
  handleOnChange: (inputId: string, newValue: boolean) => void
}
export default function BetSwitch ({ id, defaultStatus, children, handleOnChange }: BetSwitchProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(defaultStatus ?? false)

  function updateIsActive (): void {
    setIsActive(!isActive)
    handleOnChange(id, isActive)
  }

  return (
    <div
        id={id}
        className={`
            relative
            ml-auto mr-auto
            w-14 h-8
            px-1
            flex items-center
            rounded-full
            cursor-pointer
            drop-shadow-lg
            ${isActive ? 'bg-violet-500' : 'bg-violet-300'}
        `}
         onClick={updateIsActive}
    >
        { isActive }
        <label
            htmlFor="toggle"
            className={`
                absolute
                w-6 h-6
                bg-white
                rounded-full shadow-md
                flex items-center justify-center
                transition ease-in-out ${isActive ? 'translate-x-full' : ''}
            `}
        >
            <span className={`
                    w-3 h-3
                    rounded-full
                    ${isActive ? 'bg-violet-500' : 'bg-violet-300'}
                `}
            />
        </label>
        <span className={`
                absolute 
                top-10 lg:top-auto -left-[40%] lg:left-16 
                whitespace-nowrap
                ${isActive ? 'text-violet-500' : ''}
            `}
        >
            { children }
        </span>
        <input
            id="toggle"
            type="checkbox"
            className="absolute h-0 w-0 overflow-hidden"
            value={isActive ? 1 : 0}
        />
    </div>
  )
}
