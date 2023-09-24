import React from 'react'

interface TableHeaderProps {
  children: string
}
export default function TableHeader ({ children }: TableHeaderProps): JSX.Element {
  return (
    <th className="
        p-2
        bg-violet-100
        whitespace-nowrap
      "
    >
        { children }
    </th>
  )
}
