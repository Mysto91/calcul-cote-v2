import React from 'react'
import { type ReactElement } from 'react'
import { EXCLUDE_FROM_SCREENSHOT } from './constants/screenshotConstants'
import IconShareFromSquare from './icons/IconShareFromSquare'
import { type ReactElementPropsInterface } from '../interfaces/ReactElementPropsInterface'

interface ShareButtonProps extends ReactElementPropsInterface {
  onClick: () => void
}

export default function ShareButton ({ onClick }: ShareButtonProps): ReactElement {
  return (
      <button
          className={`
              py-3 px-6 md:py-2 md:px-4
              bg-violet-500 hover:bg-violet-600
              fill-white
              shadow-2xl
              rounded-full
              transition ease-in-out duration-200
              ${EXCLUDE_FROM_SCREENSHOT}
              `
          }
          onClick={onClick}
      >
          <IconShareFromSquare />
      </button>
  )
}
