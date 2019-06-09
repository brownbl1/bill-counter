import React, { useState, useEffect, useCallback } from 'react'
import { DenomMap, countBillsList } from './billCounter'
import { Items } from './Items'
import './App.css'

const App: React.FC = () => {
  const [list, setList] = useState('500,26')
  const [items, setItems] = useState<DenomMap>()

  useEffect(() => {
    const budgets = list.endsWith(',') ? list.slice(0, -1) : list
    const bills = countBillsList(budgets.split(',').map(v => parseInt(v)))
    setItems(bills)
  }, [list])

  const onChange = useCallback(
    (value: string) => /^(\d+(,\d+)*)?,{0,1}$/.test(value) && setList(value),
    []
  )

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter comma-separated list of budget amounts to see denomination
          totals
        </p>
        <input
          type="text"
          value={list}
          onChange={e => onChange(e.target.value)}
        />
        {items && <Items items={items} />}
      </header>
    </div>
  )
}

export default App
