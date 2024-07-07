import React, { type ReactElement, useState } from 'react'
import { formatToEuroCurrency } from '../../utils/currency'
import IconDownArrow from '../icons/IconDownArrow'
import { type ReactElementProps } from '../../interfaces/ReactElementPropsInterface'
import TableRowExpansion from './TableRowExpansion'
import Progress from '../Progress'
import { type TableRow as TableRowInterface } from '../../interfaces/tableRowInterface'
import clsx from 'clsx'
import { useBetContext } from '../../contexts/context'

interface TableRowProps extends ReactElementProps {
  tableRow: TableRowInterface
}

export default function TableRow ({ tableRow, className }: TableRowProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false)

  const { boostedBetEnabled } = useBetContext()

  const { title, bet, description } = tableRow

  return (
    <>
      <tr
        className={clsx('text-center', 'md:whitespace-nowrap', 'cursor-pointer', className)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="w-4">
          <button
            className="p-2 md:p-3"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className={clsx(
              'block',
              'h-7 w-7',
              'flex items-center justify-center',
              'rounded-full',
              'bg-violet-100',
              'transition ease-in-out duration-300',
              isExpanded && 'rotate-180',
            )}>
              <IconDownArrow className="fill-violet-500" />
            </span>
          </button>
        </td>
        <td>
          { title }
        </td>
        <td>
          {bet.quotation.toFixed(2)}
        </td>
        <td className={clsx(boostedBetEnabled && 'text-amber-500')}>
          {formatToEuroCurrency(bet.betOne)}
        </td>
        <td>
          {formatToEuroCurrency(bet.betTwo)}
        </td>
        <td>
          {formatToEuroCurrency(bet.profit)}
        </td>
        <td className={`${bet.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {bet.netProfit > 0 ? '+' : ''}{formatToEuroCurrency(bet.netProfit)}
        </td>
      </tr>

      <TableRowExpansion isExpanded={isExpanded} close={() => setIsExpanded(false)}>
        <div className="p-3 space-y-2">
          <div>
            <p>Explication</p>
            <p className="text-gray-500 text-sm md:text-md">{description}</p>
          </div>

          <div>
            <p>Probabilité</p>
            <Progress value={bet.probability} />
          </div>
        </div>
      </TableRowExpansion>
    </>
  )
}
