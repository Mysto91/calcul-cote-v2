import { useContext } from 'react'
import { ErrorContext, type ErrorContextInterface } from './ErrorContext'
import { BetContext, type BetContextInterface } from './BetContext'
import { FlashMessageContext, type FlashMessageContextInterface } from './FlashMessageContext'

export function useFlashMessageContext (): FlashMessageContextInterface {
  return useContext(FlashMessageContext)
}

export function useErrorContext (): ErrorContextInterface {
  return useContext(ErrorContext)
}

export function useBetContext (): BetContextInterface {
  return useContext(BetContext)
}
