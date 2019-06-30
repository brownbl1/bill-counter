import React, { useState, useEffect, useCallback } from 'react'
import { DenomMap, withdrawalLists, sum, count } from './billCounter'
import { Items } from './Items'
import './App.css'

const aggregate = (op: Function) => (arr: any[]) =>
  arr.reduce((prev, curr) => prev + op(curr), 0)

const agSum = aggregate(sum)
const agCount = aggregate(count)

const MAX_WITHDRAWAL_DEFAULT = 800
const MAX_BILLS_DEFAULT = 40

const App: React.FC = () => {
  const [list, setList] = useState('500,12,28')
  const [items, setItems] = useState<DenomMap[]>()
  const [billCountText, setBillCountText] = useState(`${MAX_BILLS_DEFAULT}`)
  const [maxWText, setMaxWText] = useState(`${MAX_WITHDRAWAL_DEFAULT}`)
  const [billCount, setBillCount] = useState(MAX_BILLS_DEFAULT)
  const [maxW, setMaxW] = useState(MAX_WITHDRAWAL_DEFAULT)

  useEffect(() => {
    const budgets = list.endsWith(',') ? list.slice(0, -1) : list
    const bills = withdrawalLists(
      budgets.split(',').map(v => parseInt(v)),
      billCount,
      maxW
    )
    setItems(bills)
  }, [list, billCount, maxW])

  useEffect(() => {
    if (billCountText) {
      setBillCount(parseInt(billCountText))
      return
    }

    setBillCount(MAX_BILLS_DEFAULT)
  }, [billCountText])

  useEffect(() => {
    if (maxWText) {
      setMaxW(parseInt(maxWText))
      return
    }

    setMaxW(MAX_WITHDRAWAL_DEFAULT)
  }, [maxWText])

  const onListChange = useCallback(
    (value: string) => /^(\d+(,\d+)*)?,{0,1}$/.test(value) && setList(value),
    []
  )

  const onWithdrawalChange = useCallback(
    (value: string) => /(\d+)?/.test(value) && setMaxWText(value),
    []
  )

  const onBillCountTextChange = useCallback(
    (value: string) => /(\d+)?/.test(value) && setBillCountText(value),
    []
  )

  return (
    <div className="App">
      <header className="App-header">
        <input
          placeholder="budgets (comma separated)"
          type="text"
          value={list}
          onChange={e => onListChange(e.target.value)}
        />
        <div>
          <div>
            <input
              placeholder="Max withdrawal (800)"
              type="text"
              value={maxWText}
              onChange={e => onWithdrawalChange(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Max bill count (40)"
              type="text"
              value={billCountText}
              onChange={e => onBillCountTextChange(e.target.value)}
            />
          </div>
        </div>
        {items && items.length > 1 && (
          <>
            <div>Grand Total: ${agSum(items)}</div>
            <div>Bill Count: {agCount(items)}</div>
          </>
        )}
        {items && items.map((item, i) => <Items key={i} items={item} />)}
      </header>
    </div>
  )
}

export default App
