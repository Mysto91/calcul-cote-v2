import React from 'react'
import { type BetInterface } from '../../interfaces/betInterface'
import { calculateNoBet, calculateOneOrTwo } from '../../services/betCalculate'
import { useBetStore } from '../../stores/useBetStore'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { useErrorsStore } from '../../stores/useErrorsStore'
import { type JSXElementPropsInterface } from '../../interfaces/JSXElementPropsInterface'

export default function Table ({ className }: JSXElementPropsInterface): JSX.Element {
  const {
    betValue,
    quotationOne,
    quotationTwo,
    boostedBetEnabled
  } = useBetStore()

  const headers: string[] = [
    '',
    'Pari',
    'Cote',
    boostedBetEnabled ? 'Mise 1 boostée' : 'Mise 1',
    'Mise 2',
    'Gain',
    'Gain net'
  ]

  // probabilité dans un dropdown

  const { errors } = useErrorsStore()

  let bets: BetInterface[] = []

  if (errors.length === 0) {
    // TODO voir s'il y a mieux pour gérer les nombres
    // La validation est asynchrone et du coup on se retrouve à passer ici lors de l'init
    const bet = Number(betValue)
    const q1 = Number(quotationOne)
    const q2 = Number(quotationTwo)

    bets = [
      calculateNoBet('1r2', bet, q1, quotationTwo as number, boostedBetEnabled),
      calculateNoBet('2r1', bet, q2, q1, boostedBetEnabled, true),
      calculateOneOrTwo('1ou2', bet, q1, q2, boostedBetEnabled)
    ]
  }

  return (
    <table className={`w-3/4 shadow-2xl rounded-b-lg ${className}`}>
      <thead>
        <tr>
            {
                headers.map((header: string, index: number) => (
                    <TableHeader
                        key={index}
                        className={`
                            ${index === 0 ? ' rounded-tl-lg' : ''}
                            ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}
                        `}
                    >
                        {header}
                    </TableHeader>
                ))
            }
        </tr>
      </thead>
      <tbody>
        {
            errors.length > 0 &&
            <tr className="text-center">
              <td
                  className="py-3"
                  colSpan={7}
              >
                Donne les cotes
              </td>
            </tr>
        }
        {
          bets.map((bet: BetInterface, index: number) => <TableRow key={index} bet={bet}/>)
        }
      </tbody>
    </table>
  )
}
