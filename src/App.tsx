import React from 'react'
import './App.css'
import Table from './components/Table'
import BetInput from './components/BetInput'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App () {
  return (
    <div className="mt-10 flex space-x-10">
        <BetInput id="bet" label="Mise cote boostée"/>
        <BetInput id="quotation-1" label="Cote 1 boostée"/>
        <BetInput id="quotation-2" label="Cote 2"/>
        <Table />
    </div>
  )
}

export default App
