import React from 'react'
import { type BetInterface } from '../../interfaces/betInterface'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

interface TableHeaderProps {
  className: string
}
export default function Table ({ className }: TableHeaderProps): JSX.Element {
  const headers: string[] = [
    '',
    'Pari',
    'Cote',
    'Mise 1',
    'Mise 2',
    'Gain',
    'Gain net'
  ]

  // probabilité dans un dropdown

  const bet: BetInterface = {
    title: '1r2',
    betOne: 10,
    betTwo: 6.45,
    quotation: 1.92,
    profit: 20,
    netProfit: 2.5
  }

  const bet2: BetInterface = {
    title: '2r1',
    betOne: 10,
    betTwo: 6.45,
    quotation: 1.92,
    profit: 20,
    netProfit: -2.5
  }

  const bet3: BetInterface = {
    title: '1ou2',
    betOne: 10,
    betTwo: 6.45,
    quotation: 1.92,
    profit: 20,
    netProfit: -2.5
  }

  return (
    <table className={`w-3/4 ${className}`}>
      <thead>
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
      <tbody>
        <TableRow bet={bet} />
        <TableRow bet={bet2} />
        <TableRow bet={bet3} />
      </tbody>
    </table>
  )
}
