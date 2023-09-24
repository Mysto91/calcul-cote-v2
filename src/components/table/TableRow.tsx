import React from 'react'
import { type BetInterface } from '../../interfaces/BetInterface'
import { formatToEuroCurrency } from '../../utils/Currency'

interface TableRowProps {
  bet: BetInterface
}
export default function TableRow ({ bet }: TableRowProps): JSX.Element {
  return (
      <tr className="
        even:bg-slate-100
        border border-violet-100
        text-center"
      >
          <td>
              {bet.title}
          </td>
          <td>
              {bet.quotation}
          </td>
          <td>
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
  )
}
