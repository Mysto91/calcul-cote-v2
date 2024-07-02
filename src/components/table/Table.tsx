import React, { type ReactElement } from 'react'
import { calculateNoBet, calculateOneOrTwo } from '../../services/betCalculate'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { type ReactElementProps } from '../../interfaces/ReactElementPropsInterface'
import { formatNumber } from '../../utils/formatNumber'
import { type TableRow as TableRowInterface } from '../../interfaces/tableRowInterface'
import clsx from 'clsx'
import { useBetContext } from '../../contexts/context'

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
  } = useBetContext()

  const headers: THeader[] = [
    { title: '' },
    { title: 'Pari' },
    { title: 'Cote' },
    { title: boostedBetEnabled ? 'Mise 1 boostée' : 'Mise 1', className: boostedBetEnabled ? 'text-amber-500' : undefined },
    { title: 'Mise 2' },
    { title: 'Gain' },
    { title: 'Gain net' },
  ]

  const betParams = {
    betValue: formatNumber(betValue),
    q1: formatNumber(quotationOne),
    q2: formatNumber(quotationTwo),
    boostedBetEnabled,
  }

  const tableRows: TableRowInterface[] = [
    { title: '1r2', bet: calculateNoBet(betParams), description: 'Le pari est gagnant si la cote 1 est validée et remboursé si c\'est la cote 2.' },
    { title: '2r1', bet: calculateNoBet(betParams, true), description: 'Le pari est gagnant si la cote 2 est validée et remboursé si c\'est la cote 1.' },
    { title: '1ou2', bet: calculateOneOrTwo(betParams), description: 'Le pari est gagnant si la cote 1 ou la cote 2 est validée.' },
  ]

  return (
    <table className={clsx(
      'mx-2 md:mx-auto md:w-3/4',
      'max-w-7xl',
      'shadow-2xl rounded-b-lg',
      className)
    }>
      <thead>
        <tr>
          {
            headers.map((header: THeader, index: number) => (
              <TableHeader
                key={index}
                className={clsx(
                  index === 0 && 'rounded-tl-lg',
                  index === headers.length - 1 && 'rounded-tr-lg',
                  header.className,
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
          tableRows.map((tableRow: TableRowInterface) => <TableRow key={tableRow.title} tableRow={tableRow} />)
        }
      </tbody>
    </table>
  )
}
