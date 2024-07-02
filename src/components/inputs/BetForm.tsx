import React, { type ReactElement } from 'react'
import BetInput from './BetInput'
import { InputEnum } from '../../enums/inputEnums'
import BetSwitch from './BetSwitch'
import { useBetContext } from '../../contexts/context'
import { type Style } from '../../utils/useStyle'

export default function BetForm (): ReactElement {
  const {
    setBetStoreValue,
    quotationOne,
    quotationTwo,
    betValue,
    boostedBetEnabled,
  } = useBetContext()

  function getBoostedBetInputStyle (): Style {
    return {
      textColor: boostedBetEnabled ? 'amber-500' : null,
      borderColor: boostedBetEnabled ? 'amber-500' : null,
      ringColor: boostedBetEnabled ? 'amber-300' : null,
    }
  }

  return (
    <form className="md:mt-6 lg:flex lg:items-center lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4">
      <BetInput
        id={InputEnum.BET_VALUE}
        textValue={betValue}
        setTextValue={(value) => setBetStoreValue(InputEnum.BET_VALUE, value as number)}
        style={getBoostedBetInputStyle()}
        unit="€"
      >
        { boostedBetEnabled ? 'Mise cote boostée' : 'Mise' }
      </BetInput>

      <BetInput
        id={InputEnum.QUOTATION_ONE}
        textValue={quotationOne}
        setTextValue={(value) => setBetStoreValue(InputEnum.QUOTATION_ONE, value as number)}
        style={getBoostedBetInputStyle()}
      >
        { boostedBetEnabled ? 'Cote 1 boostée' : 'Cote 1' }
      </BetInput>

      <BetInput
        id={InputEnum.QUOTATION_TWO}
        textValue={quotationTwo}
        setTextValue={(value) => setBetStoreValue(InputEnum.QUOTATION_TWO, value as number)}
      >
        Cote 2
      </BetInput>

      <BetSwitch
        id={InputEnum.BET_BOOSTED}
        isActive={boostedBetEnabled}
        setIsActive={(value) => setBetStoreValue(InputEnum.BET_BOOSTED, value as boolean)}
      >
        Cote boostée
      </BetSwitch>
    </form>
  )
}
