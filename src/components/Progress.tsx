import React, { type ReactElement } from 'react'
import { type ReactElementProps } from '../interfaces/ReactElementPropsInterface'
import clsx from 'clsx'
import { truncate } from '../utils/truncate'
import { Nullable } from '../interfaces/nullableType'

interface ProgressProps extends ReactElementProps {
  value: number
}

export default function Progress ({ value }: ProgressProps): Nullable<ReactElement> {
  if (value < 0 || value > 1) {
    return null
  }

  return (
    <div className="w-full bg-gray-200 rounded-full ring-2 ring-gray-300">
      <div
        className={clsx(
          'p-px',
          'h-full',
          'rounded-full',
          'bg-violet-500',
          'text-center text-sm text-white',
          'ring-2 ring-violet-300',
        )}
        style={{ width: `${truncate(value) * 100}%` }}
      >
        { truncate(value) * 100 }%
      </div>
    </div>
  )
}
