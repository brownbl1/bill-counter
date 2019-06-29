import React from 'react'
import { DenomMap, count, sum } from './billCounter'

const style: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const Items: React.FC<{ items: DenomMap }> = ({ items }) => {
  return (
    <div style={{ width: '170px', marginTop: 15 }}>
      {Object.entries(items)
        .reverse()
        .map(([key, val]) => (
          <div key={key} style={style}>
            <span>{key}s</span>
            <span>{val}</span>
          </div>
        ))}
      <div style={{ ...style, borderTop: '1px solid white' }}>
        <span>${sum(items)}</span>
        <span>{count(items)}</span>
      </div>
    </div>
  )
}
