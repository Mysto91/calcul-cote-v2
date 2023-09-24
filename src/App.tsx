import React from 'react'
import './App.css'
import Table from './components/Table'
import BetInput from './components/BetInput'
import BetSwitch from './components/BetSwitch'

function App (): JSX.Element {
  return (
    <div className="mt-10 flex items-center space-x-10 font-mono">
        <BetInput id="bet" label="Mise cote boostée"/>
        <BetInput id="quotation-1" label="Cote 1 boostée"/>
        <BetInput id="quotation-2" label="Cote 2"/>
        <BetSwitch defaultStatus={true} />
        <Table />
    </div>
  )
}

export default App
