import React, { useState, useEffect, type ReactElement } from 'react'
import clsx from 'clsx'
import { type ReactElementProps } from '../../interfaces/ReactElementPropsInterface'

interface TableRowExpansionProps extends ReactElementProps {
  isExpanded: boolean
  close?: () => void
}

export default function TableRowExpansion ({ isExpanded, children, close }: TableRowExpansionProps): ReactElement {
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isExpanded) {
      timeoutId = setTimeout(() => { setShowChildren(true) }, 200)
      return
    }

    setShowChildren(false)

    return () => { clearTimeout(timeoutId) }
  }, [isExpanded])

  return (
    <tr
      className={clsx(
        'border border-violet-100',
        'transition-all ease-in-out duration-300',
        'cursor-pointer',
        isExpanded ? 'h-20' : 'h-0')
      }
      onClick={close}
    >
      <td colSpan={6} className={clsx(!showChildren && 'hidden')}>
        { children }
      </td>
    </tr>
  )
}
