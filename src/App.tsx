import React from 'react'
import './App.css'
import Table from './components/table/Table'
import BetInput from './components/BetInput'
import BetSwitch from './components/BetSwitch'

function App (): JSX.Element {
  return (
    <div className="mt-10 font-mono">
        <div className="flex items-center space-x-10">
            <BetInput id="bet">
                Mise cote boostée
            </BetInput>
            <BetInput id="quotation-1">
                Cote 1 boostée
            </BetInput>
            <BetInput id="quotation-2">
                Cote 2
            </BetInput>
            <BetSwitch defaultStatus={true} />
        </div>
        <Table className="mt-10" />
    </div>
  )
}

export default App
