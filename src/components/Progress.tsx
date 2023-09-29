import React from 'react'
import { type JSXElementPropsInterface } from '../interfaces/JSXElementPropsInterface'

interface ProgressProps extends JSXElementPropsInterface {
  value: number
}

export default function Progress ({ value }: ProgressProps): JSX.Element {
  return (
      <div
          className="
            w-full
            bg-gray-200
            rounded-full
          "
      >
          <div
              className={'p-0.5 h-full rounded-full bg-violet-500 text-center text-sm text-white'}
              style={{ width: `${value}%` }}
          >
              { value }%
          </div>
      </div>
  )
}
