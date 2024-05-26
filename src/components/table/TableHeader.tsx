import React, { type ReactElement } from 'react'
import { type ReactElementProps } from '../../interfaces/ReactElementPropsInterface'

export default function TableHeader ({ children, className }: ReactElementProps): ReactElement {
  return (
    <th className={`p-2 bg-violet-100 sm:whitespace-nowrap ${className}`}>
      { children }
    </th>
  )
}
