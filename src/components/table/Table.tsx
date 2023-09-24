import React from 'react'
import TableHeader from './TableHeader'
import { type BetInterface } from '../../interfaces/BetInterface'
import TableRow from './TableRow'

interface TableHeaderProps {
  className: string
}
export default function Table ({ className }: TableHeaderProps): JSX.Element {
  const headers: string[] = [
    'Pari',
    'Cote',
    'Mise 1',
    'Mise 2',
    'Gain',
    'Gain net'
  ]

  //probabilité dans un dropdown

  const bet: BetInterface = {
    title: '1 r 2',
    betOne: 10,
    betTwo: 6.45,
    quotation: 1.92,
    profit: 20,
    netProfit: 2.5
  }
 const bet2: BetInterface = {
    title: '2 r 1',
    betOne: 10,
    betTwo: 6.45,
    quotation: 1.92,
    profit: 20,
    netProfit: -2.5
  }
 const bet3: BetInterface = {
    title: '1 ou 2',
    betOne: 10,
    betTwo: 6.45,
    quotation: 1.92,
    profit: 20,
    netProfit: -2.5
  }

  return (
    <table className={className}>
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
