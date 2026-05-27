'use client'

import React, { useState } from 'react'

export default function NetworkingStackVisualization() {
  const [step, setStep] = useState(0)

  const layers = [
    { name: '应用层', protocols: ['HTTP', 'FTP', 'SMTP', 'DNS'], color: '#3b82f6' },
    { name: '传输层', protocols: ['TCP', 'UDP'], color: '#10b981' },
    { name: '网络层', protocols: ['IP', 'ICMP', 'ARP'], color: '#f59e0b' },
    { name: '链路层', protocols: ['以太网', 'WiFi'], color: '#ef4444' },
  ]

  const encapsulation = [
    '应用数据',
    'TCP段 (加TCP头)',
    'IP包 (加IP头)',
    '以太网帧 (加帧头)',
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">TCP/IP协议栈可视化</h3>

      <div className="space-y-2 mb-6">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg text-white transition-all"
            style={{ backgroundColor: layer.color }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{layer.name}</span>
              <span className="text-sm opacity-80">{layer.protocols.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">数据封装过程</div>
        <div className="space-y-2">
          {encapsulation.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all ${step >= idx
                  ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-50'
                }`}
            >
              {idx + 1}. {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, encapsulation.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          下一步
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
