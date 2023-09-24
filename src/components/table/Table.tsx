import React from 'react'
import TableHeader from './TableHeader'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Table (): JSX.Element {
  const headers: string[] = [
    'Pari',
    'Cote',
    'Mise 1',
    'Mise 2',
    'Probabilité',
    'Gain',
    'Gain net'
  ]

  return (
    <table>
      <thead className="
        border-2 border-black rounded-lg"
      >
        <tr>
            {
                headers.map((header: string, index: number) => (
                    <TableHeader key={index}>
                        {header}
                    </TableHeader>
                ))
            }
        </tr>
      </thead>
    </table>
  )
}
