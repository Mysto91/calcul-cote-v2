import React, { useContext, type ReactElement } from 'react'
import { calculateNoBet, calculateOneOrTwo } from '../../services/betCalculate'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { type ReactElementProps } from '../../interfaces/ReactElementPropsInterface'
import { formatNumber } from '../../utils/formatNumber'
import { type TableRow as TableRowInterface } from '../../interfaces/tableRowInterface'
import clsx from 'clsx'
import { ErrorContext } from '../../contexts/ErrorContext'
import { BetContext } from '../../contexts/BetContext'

interface THeader {
  title: string
  className?: string
}

export default function Table ({ className }: ReactElementProps): ReactElement {
  const {
    betValue,
    quotationOne,
    quotationTwo,
    boostedBetEnabled,
    isCalculating
  } = useContext(BetContext)

  const headers: THeader[] = [
    { title: '' },
    { title: 'Pari' },
    { title: 'Cote' },
    { title: boostedBetEnabled ? 'Mise 1 boostée' : 'Mise 1', className: boostedBetEnabled ? 'text-amber-500' : undefined },
    { title: 'Mise 2' },
    { title: 'Gain' },
    { title: 'Gain net' }
  ]

  const { errors } = useContext(ErrorContext)

  let tableRows: TableRowInterface[] = []

  if (!isCalculating && errors.length === 0) {
    const betParams = {
      betValue: formatNumber(betValue),
      q1: formatNumber(quotationOne),
      q2: formatNumber(quotationTwo),
      boostedBetEnabled
    }

    tableRows = [
      { title: '1r2', bet: calculateNoBet(betParams) },
      { title: '2r1', bet: calculateNoBet(betParams, true) },
      { title: '1ou2', bet: calculateOneOrTwo(betParams) }
    ]
  }

  return (
    <table className={`mx-2 md:mx-auto md:w-3/4 max-w-7xl shadow-2xl rounded-b-lg ${className}`}>
      <thead>
        <tr>
            {
                headers.map((header: THeader, index: number) => (
                    <TableHeader
                        key={index}
                        className={clsx(
                          index === 0 && 'rounded-tl-lg',
                          index === headers.length - 1 && 'rounded-tr-lg',
                          header.className
                        )}
                    >
                        {header.title}
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
          tableRows.map((tableRow: TableRowInterface, index: number) => <TableRow key={index} title={tableRow.title} bet={tableRow.bet}/>)
        }
      </tbody>
    </table>
  )
}
