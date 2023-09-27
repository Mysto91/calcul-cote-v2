import React from 'react'
import { type JSXElementPropsInterface } from '../../interfaces/JSXElementPropsInterface'

export default function TableHeader ({ children, className }: JSXElementPropsInterface): JSX.Element {
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
