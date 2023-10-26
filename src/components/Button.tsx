import React, { type ReactElement } from 'react'
import { type ReactElementProps } from '../interfaces/ReactElementPropsInterface'
import { EXCLUDE_FROM_SCREENSHOT } from '../constants/screenshotConstants'

interface ButtonProps extends ReactElementProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button ({ className, children, disabled = false, onClick }: ButtonProps): ReactElement {
  return (
      <button
          className={`
              flex items-center justify-center
              fill-white
              rounded-full
              transition ease-in-out duration-200
              ${(!disabled) ? 'bg-violet-500 hover:bg-violet-600' : 'bg-violet-300 cursor-default'}
              ${EXCLUDE_FROM_SCREENSHOT}
              ${className}
          `}
          onClick={(event) => { onClick(event) }}
          disabled={disabled}
      >
          { children }
      </button>
  )
}
