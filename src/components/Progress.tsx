import React, { type ReactElement } from 'react'
import { type ReactElementProps } from '../interfaces/ReactElementPropsInterface'

interface ProgressProps extends ReactElementProps {
  value: number
}

export default function Progress ({ value }: ProgressProps): ReactElement {
  return (
      <div className="
            w-full
            bg-gray-200
            rounded-full
          "
      >
          <div
              className={'p-px h-full rounded-full bg-violet-500 text-center text-sm text-white'}
              style={{ width: `${value}%` }}
          >
              { value }%
          </div>
      </div>
  )
}
