import React, { type ReactElement } from 'react'
import BetInput from './BetInput'
import { InputEnum } from '../../enums/inputEnums'
import { useBetStore } from '../../stores/useBetStore'
import BetSwitch from './BetSwitch'

export default function BetForm (): ReactElement {
  const {
    setBoostedBetEnabled,
    setBetStoreValue,
    quotationOne,
    quotationTwo,
    betValue,
    boostedBetEnabled
  } = useBetStore()

  return (
    <form className="
          md:mt-6
          lg:flex lg:items-center lg:justify-center
          space-y-4 lg:space-y-0 lg:space-x-4"
    >
        <BetInput
            id={InputEnum.BET_VALUE}
            textValue={betValue}
            setTextValue={ ({ target }) => { setBetStoreValue(InputEnum.BET_VALUE, target.value) }}
            unit="€"
        >
            { boostedBetEnabled ? ' Mise cote boostée' : 'Mise' }
        </BetInput>

        <BetInput
            id={InputEnum.QUOTATION_ONE}
            textValue={quotationOne}
            setTextValue={ ({ target }) => { setBetStoreValue(InputEnum.QUOTATION_ONE, target.value) }}
        >
            { boostedBetEnabled ? 'Cote 1 boostée' : 'Cote 1' }
        </BetInput>

        <BetInput
            id={InputEnum.QUOTATION_TWO}
            textValue={quotationTwo}
            setTextValue={ ({ target }) => { setBetStoreValue(InputEnum.QUOTATION_TWO, target.value) }}
        >
            Cote 2
        </BetInput>

        <BetSwitch
            id={InputEnum.BET_BOOSTED}
            isActive={boostedBetEnabled}
            setIsActive={setBoostedBetEnabled}
        >
            Cote boostée
        </BetSwitch>
    </form>
  )
}
