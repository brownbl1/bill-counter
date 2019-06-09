import React from 'react'
import { DenomMap } from './billCounter'

export const Items: React.FC<{ items: DenomMap }> = ({ items }) => {
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
            <span>{key}s</span>
            <span>{val}</span>
          </div>
        ))}
    </div>
  )
}
