import React, { type ReactElement } from 'react'
import { type ReactElementProps } from '../../interfaces/ReactElementPropsInterface'

export default function IconSuccess ({ className }: ReactElementProps): ReactElement {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      version="1.1"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          className="clr-i-outline clr-i-outline-path-1"
          d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z">
        </path>
        <path
          className="clr-i-outline clr-i-outline-path-2"
          d="M28,12.1a1,1,0,0,0-1.41,0L15.49,23.15l-6-6A1,1,0,0,0,8,18.53L15.49,26,28,13.52A1,1,0,0,0,28,12.1Z">
        </path>
        <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>
      </g>
    </svg>
  )
}
