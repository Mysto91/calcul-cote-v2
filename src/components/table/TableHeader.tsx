import React, { type ReactElement } from 'react'
import { type ReactElementPropsInterface } from '../../interfaces/ReactElementPropsInterface'

export default function TableHeader ({ children, className }: ReactElementPropsInterface): ReactElement {
  return (
    <th className={`
        p-2
        bg-violet-100
        sm:whitespace-nowrap
        ${className}
    `}
    >
        { children }
    </th>
  )
}
