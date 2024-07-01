import React from 'react'
import { type ReactElement } from 'react'
import IconShareFromSquare from './icons/IconShareFromSquare'
import IconSpinner from './icons/IconSpinner'
import { type ReactElementProps } from '../interfaces/ReactElementPropsInterface'
import Button from './Button'

interface ShareButtonProps extends ReactElementProps {
  disabled?: boolean
  onClick: () => void
  isLoading: boolean
}

export default function ShareButton ({ onClick, disabled, isLoading, className }: ShareButtonProps): ReactElement {
  return (
    <Button
      onClick={onClick}
      className={className}
      disabled={disabled === true || isLoading}
    >
      { isLoading ? <IconSpinner className="fill-white" /> : <IconShareFromSquare /> }
    </Button>
  )
}
