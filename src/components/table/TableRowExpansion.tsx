import React from 'react'
import { type JSXElementPropsInterface } from '../../interfaces/JSXElementPropsInterface'

interface TableRowExpansionProps extends JSXElementPropsInterface {
  isExpanded: boolean
}

export default function TableRowExpansion ({ isExpanded, children }: TableRowExpansionProps): JSX.Element {
  if (!isExpanded) {
    return (<></>)
  }

  return (
        <tr className="border border-violet-100">
            <td colSpan={6}>
                { children }
            </td>
        </tr>
  )
}
