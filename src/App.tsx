import React, { useState, useEffect, useCallback } from 'react'
import { DenomMap, withdrawalLists, sum, count } from './billCounter'
import { Items } from './Items'
import './App.css'

const App: React.FC = () => {
  const [list, setList] = useState('500,12,28')
  const [items, setItems] = useState<DenomMap[]>()

  useEffect(() => {
    const budgets = list.endsWith(',') ? list.slice(0, -1) : list
    const bills = withdrawalLists(
      budgets.split(',').map(v => parseInt(v)),
      40,
      800
    )
    setItems(bills)
  }, [list])

  const onChange = useCallback(
    (value: string) => /^(\d+(,\d+)*)?,{0,1}$/.test(value) && setList(value),
    []
  )

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={list}
          onChange={e => onChange(e.target.value)}
        />
        {items && items.length > 1 && (
          <>
            <div>
              Grand Total:{' $'}
              {items && items.reduce((prev, curr) => prev + sum(curr), 0)}
            </div>
            <div>
              Bill Count:{' '}
              {items && items.reduce((prev, curr) => prev + count(curr), 0)}
            </div>
          </>
        )}
        {items && items.map((item, i) => <Items key={i} items={item} />)}
      </header>
    </div>
  )
}

export default App
