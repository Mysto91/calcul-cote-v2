import React, { type ReactElement } from 'react'
import { type ReactElementPropsInterface } from '../interfaces/ReactElementPropsInterface'
import IconClose from './icons/IconClose'

interface ModalProps extends ReactElementPropsInterface {
  setIsOpen: (isOpen: boolean) => void
}
export default function Modal ({ children, className, setIsOpen }: ModalProps): ReactElement {
  return (
        <div className={`
                absolute z-50 mx-3
                bg-white
                border-8 border-violet-300 rounded-md
                shadow-2xl
                ${className}
            `}
        >
            <div className="flex justify-end">
                <button
                    className="p-4"
                    onClick={() => { setIsOpen(false) }}
                >
                    <IconClose className="fill-violet-500" />
                </button>
            </div>
            { children }
        </div>
  )
}
