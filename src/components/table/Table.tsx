import React from 'react'
import { type BetInterface } from '../../interfaces/betInterface'
import { calculateNoBet, calculateOneOrTwo } from '../../services/betCalculate'
import { useBetStore } from '../../stores/useBetStore'
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

  const {
    betValue,
    quotationOne,
    quotationTwo,
    boostedBetEnabled
  } = useBetStore()

  // probabilité dans un dropdown

  const bets: BetInterface[] = [
    calculateNoBet(betValue as number, quotationOne as number, quotationTwo as number, boostedBetEnabled),
    calculateNoBet(betValue as number, quotationOne as number, quotationTwo as number, boostedBetEnabled, true),
    calculateOneOrTwo(betValue as number, quotationOne as number, quotationTwo as number, boostedBetEnabled)
  ]

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
        {
          bets.map((bet, index) => <TableRow key={index} bet={bet} />)
        }
      </tbody>
    </table>
  )
}
