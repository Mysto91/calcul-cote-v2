import React from 'react'
import './App.css'
import Table from './components/table/Table'
import BetInput from './components/BetInput'
import BetSwitch from './components/BetSwitch'

function App (): JSX.Element {
  return (
    <div className="
        absolute top-1/2 -translate-y-1/2
        w-full
        flex items-center justify-center
        font-mono"
    >
        <div className="w-full">
            <div className="flex items-center justify-center space-x-4">
                <BetInput id="bet">
                    Mise cote boostée
                </BetInput>
                <BetInput id="quotation-1">
                    Cote 1 boostée
                </BetInput>
                <BetInput id="quotation-2">
                    Cote 2
                </BetInput>
                <BetSwitch defaultStatus={true}>
                    Cote boostée
                </BetSwitch>
            </div>
            <div className="flex justify-center">
                <Table className="mt-10" />
            </div>
        </div>
    </div>
  )
}

export default App
