import React from 'react'
import { type ReactElement } from 'react'
import { EXCLUDE_FROM_SCREENSHOT } from '../constants/screenshotConstants'
import IconShareFromSquare from './icons/IconShareFromSquare'
import IconSpinner from './icons/IconSpinner'
import { type ReactElementPropsInterface } from '../interfaces/ReactElementPropsInterface'

interface ShareButtonProps extends ReactElementPropsInterface {
  disabled?: boolean
  onClick: () => void
  isLoading: boolean
}

export default function ShareButton ({ onClick, disabled, isLoading }: ShareButtonProps): ReactElement {
  return (
      <button
          className={`
              w-16 h-10
              flex items-center justify-center
              ${disabled !== true && !isLoading ? 'bg-violet-500 hover:bg-violet-600' : 'bg-violet-300 cursor-default'}
              fill-white
              shadow-2xl
              rounded-full
              transition ease-in-out duration-200
              ${EXCLUDE_FROM_SCREENSHOT}
              `
          }
          onClick={onClick}
          disabled={disabled}
      >
          { isLoading ? <IconSpinner className="fill-white" /> : <IconShareFromSquare /> }
      </button>
  )
}
