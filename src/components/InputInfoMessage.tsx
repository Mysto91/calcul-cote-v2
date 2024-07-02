import React, { type ReactElement } from 'react'
import { ReactElementProps } from '../interfaces/ReactElementPropsInterface'
import clsx from 'clsx'

export default function InputInfoMessage ({ id, className }: ReactElementProps): ReactElement {
  return (
    <div id={id} className={clsx('flex flex-col md:items-center', className)}>
      <h2 className="md:text-lg text-md font-bold text-violet-500">
        Parier c'est bien, gagner c'est mieux <span>&#129297;</span>
      </h2>
  
      <p className="md:text-sm text-xs text-gray-500">
        Pour initier ton chemin vers la victoire, renseigne les cotes.
      </p>
    </div>
  )
}
