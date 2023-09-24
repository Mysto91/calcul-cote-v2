import React from 'react'

interface TableHeaderProps {
  children: string
}
export default function TableHeader ({ children }: TableHeaderProps): JSX.Element {
  return (
    <th>
        { children }
    </th>
  )
}
