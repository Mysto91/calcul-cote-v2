import React, { type ReactElement } from 'react'
import BetInput from './BetInput'
import { InputEnum } from '../../enums/inputEnums'
import BetSwitch from './BetSwitch'
import { useBetContext } from '../../contexts/context'

export default function BetForm (): ReactElement {
  const {
    setBetStoreValue,
    quotationOne,
    quotationTwo,
    betValue,
    boostedBetEnabled
  } = useBetContext()

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
            style={{
              textColor: boostedBetEnabled ? 'amber-500' : null,
              borderColor: boostedBetEnabled ? 'amber-500' : null,
              ringColor: boostedBetEnabled ? 'amber-300' : null
            }}
            unit="€"
            incrementValue={1}
        >
            { boostedBetEnabled ? 'Mise cote boostée' : 'Mise' }
        </BetInput>

        <BetInput
            id={InputEnum.QUOTATION_ONE}
            textValue={quotationOne}
            setTextValue={ ({ target }) => { setBetStoreValue(InputEnum.QUOTATION_ONE, target.value) }}
            minValue={1}
        >
            { boostedBetEnabled ? 'Cote 1 boostée' : 'Cote 1' }
        </BetInput>

        <BetInput
            id={InputEnum.QUOTATION_TWO}
            textValue={quotationTwo}
            setTextValue={ ({ target }) => { setBetStoreValue(InputEnum.QUOTATION_TWO, target.value) }}
            minValue={1}
        >
            Cote 2
        </BetInput>

        <BetSwitch
            id={InputEnum.BET_BOOSTED}
            isActive={boostedBetEnabled}
            setIsActive={ (newValue) => { setBetStoreValue(InputEnum.BET_BOOSTED, newValue) }}
        >
            Cote boostée
        </BetSwitch>
    </form>
  )
}
