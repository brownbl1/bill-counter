import React, { useState, useEffect } from 'react'
import './App.css'
import { DenomMap, countBillsList } from './billCounter'

const App: React.FC = () => {
  const [list, setList] = useState('500')
  const [items, setItems] = useState<DenomMap>()

  useEffect(() => {
    const budgets = list.endsWith(',') ? list.slice(0, -1) : list
    const bills = countBillsList(budgets.split(',').map(v => parseInt(v)))
    setItems(bills)
  }, [list])

  function onChange(value: string) {
    if (/^(\d+(,\d+)*)?,{0,1}$/.test(value)) {
      setList(value)
    }
  }

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

const Items: React.FC<{ items: DenomMap }> = ({ items }) => {
  return (
    <div style={{ width: '170px' }}>
      {Object.entries(items)
        .reverse()
        .map(([key, val]) => (
          <div
            key={key}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{key}s:</span>
            <span>{val}</span>
          </div>
        ))}
    </div>
  )
}

export default App
