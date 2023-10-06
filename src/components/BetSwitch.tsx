import React, { type ReactElement } from 'react'
import { type ReactElementPropsInterface } from '../interfaces/ReactElementPropsInterface'
import clsx from 'clsx'

interface BetSwitchProps extends ReactElementPropsInterface {
  id: string
  isActive: boolean
  setIsActive: (isActive: boolean) => void
}

export default function BetSwitch ({ id, isActive, setIsActive, children }: BetSwitchProps): ReactElement {
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
         onClick={() => { setIsActive(!isActive) }}
    >
        { isActive }
        <label
            htmlFor="toggle"
            className={clsx(
              'absolute',
              'w-6 h-6',
              'bg-white',
              'rounded-full shadow-md',
              'flex items-center justify-center',
              'transition ease-in-out',
              isActive && 'translate-x-full'
            )}>
            <span className={`
                    w-3 h-3
                    rounded-full
                    ${isActive ? 'bg-violet-500' : 'bg-violet-300'}
                `}
            />
        </label>
        <span className={clsx(
          'absolute',
          'top-10 lg:top-auto -left-[40%] lg:left-16',
          'whitespace-nowrap',
          isActive && 'text-violet-500'
        )}>
            { children }
        </span>
        <input
            id="toggle"
            type="checkbox"
            className="absolute h-0 w-0 overflow-hidden"
            value={Number(isActive)}
        />
    </div>
  )
}
