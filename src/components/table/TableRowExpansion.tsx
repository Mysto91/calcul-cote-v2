import React, { type ReactElement } from 'react'
import { type ReactElementProps } from '../../interfaces/ReactElementPropsInterface'

interface TableRowExpansionProps extends ReactElementProps {
  isExpanded: boolean
}

export default function TableRowExpansion ({ isExpanded, children }: TableRowExpansionProps): ReactElement {
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
