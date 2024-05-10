import React, { type ReactElement } from 'react'
import { type ReactElementProps } from '../interfaces/ReactElementPropsInterface'
import clsx from 'clsx'

interface ProgressProps extends ReactElementProps {
  value: number
}

export default function Progress ({ value }: ProgressProps): ReactElement {
  return (
      <div className="w-full bg-gray-200 rounded-full ring-2 ring-gray-300">
          <div
              className={clsx(
                'p-px',
                'h-full',
                'rounded-full',
                'bg-violet-500',
                'text-center text-sm text-white',
                'ring-2 ring-violet-300'
              )}
              style={{ width: `${value}%` }}
          >
              { value }%
          </div>
      </div>
  )
}
