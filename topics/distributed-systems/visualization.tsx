'use client'

import React, { useState } from 'react'

type Property = 'C' | 'A' | 'P'

export default function DistributedSystemsVisualization() {
  const [selected, setSelected] = useState<Property[]>(['P'])
  const [system, setSystem] = useState<string>('')

  const toggleProperty = (prop: Property) => {
    setSelected(prev => {
      if (prev.includes(prop)) {
        return prev.filter(p => p !== prop)
      }
      if (prev.length >= 2) {
        return [prev[1], prop]
      }
      return [...prev, prop]
    })
  }

  const getSystem = () => {
    const props = selected.sort().join('')
    switch (props) {
      case 'CA': return '单机数据库（如MySQL单机）'
      case 'CP': return '分布式数据库（如ZooKeeper、HBase）'
      case 'AP': return '分布式缓存（如Cassandra、DynamoDB）'
      default: return '请选择2个属性'
    }
  }

  const nodes = [
    { id: 1, x: 100, y: 80 },
    { id: 2, x: 250, y: 40 },
    { id: 3, x: 250, y: 120 },
    { id: 4, x: 400, y: 80 },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">分布式系统 CAP 定理</h3>

      <div className="flex gap-2 mb-4">
        {(['C', 'A', 'P'] as const).map(prop => (
          <button
            key={prop}
            onClick={() => toggleProperty(prop)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selected.includes(prop)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {prop === 'C' ? '一致性 (C)' : prop === 'A' ? '可用性 (A)' : '分区容错 (P)'}
          </button>
        ))}
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">选择的属性</div>
        <div className="text-lg font-semibold">
          {selected.length === 0 ? '请选择属性' : selected.join(' + ')}
        </div>
        <div className="text-sm text-gray-500 mt-1">{getSystem()}</div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">分布式节点</div>
        <svg width="500" height="160" className="w-full">
          {nodes.map((node, i) => (
            nodes.slice(i + 1).map(other => (
              <line
                key={`${node.id}-${other.id}`}
                x1={node.x}
                y1={node.y}
                x2={other.x}
                y2={other.y}
                stroke="#d1d5db"
                strokeWidth="2"
              />
            ))
          ))}
          {nodes.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill="#3b82f6"
                stroke="#2563eb"
                strokeWidth="2"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                N{node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        CAP定理：分布式系统最多只能同时满足C、A、P中的两个
      </div>
    </div>
  )
}
