import React, { useState } from 'react'
import { type BetInterface } from '../../interfaces/betInterface'
import { formatToEuroCurrency } from '../../utils/Currency'
import IconDownArrow from '../icons/IconDownArrow'
import { type JSXElementPropsInterface } from '../../interfaces/JSXElementPropsInterface'

interface TableRowProps extends JSXElementPropsInterface {
  bet: BetInterface
}
export default function TableRow ({ bet, className }: TableRowProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false)

  // TODO ajouter la probabilité dans le expanded

  return (
      <>
          <tr className={`
                even:bg-slate-100
                text-center
                ${className}
              `}
          >
              <td className="w-4">
                  <button
                      className="p-2 md:p-3"
                      onClick={() => { setIsExpanded(!isExpanded) }}
                  >
                      <span className={`
                            block
                            h-7 w-7
                            flex items-center justify-center
                            rounded-full
                            bg-violet-100
                            transition ease-in-out duration-300
                            ${isExpanded ? 'rotate-180' : ''}
                         `}
                      >
                          <IconDownArrow className="fill-violet-500" />
                      </span>
                  </button>
              </td>
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
          {
              isExpanded && (
                  <tr className="border border-violet-100">
                      <td colSpan={6}>
                          Contenu déroulé ici
                      </td>
                  </tr>
              )
          }
      </>

  )
}
