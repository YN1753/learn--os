'use client'

import React, { useState } from 'react'

interface Rule {
  id: number
  action: 'ACCEPT' | 'DROP'
  protocol: string
  port: string
  source: string
}

export default function FirewallVisualization() {
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, action: 'ACCEPT', protocol: 'tcp', port: '22', source: '0.0.0.0/0' },
    { id: 2, action: 'ACCEPT', protocol: 'tcp', port: '80', source: '0.0.0.0/0' },
    { id: 3, action: 'DROP', protocol: 'all', port: 'all', source: '0.0.0.0/0' },
  ])
  const [testPacket, setTestPacket] = useState({ protocol: 'tcp', port: '22', source: '192.168.1.1' })
  const [result, setResult] = useState<string | null>(null)

  const testFirewall = () => {
    for (const rule of rules) {
      const protocolMatch = rule.protocol === 'all' || rule.protocol === testPacket.protocol
      const portMatch = rule.port === 'all' || rule.port === testPacket.port

      if (protocolMatch && portMatch) {
        setResult(rule.action === 'ACCEPT' ? '允许通过' : '拒绝')
        return
      }
    }
    setResult('无匹配规则，默认拒绝')
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">防火墙可视化</h3>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">防火墙规则</div>
        <div className="space-y-2">
          {rules.map(rule => (
            <div
              key={rule.id}
              className={`p-3 rounded-lg text-sm ${rule.action === 'ACCEPT'
                  ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                }`}
            >
              <span className={`px-2 py-0.5 rounded text-xs ${rule.action === 'ACCEPT'
                  ? 'bg-green-200 dark:bg-green-800'
                  : 'bg-red-200 dark:bg-red-800'
                }`}>
                {rule.action}
              </span>
              <span className="ml-2">{rule.protocol} : {rule.port} from {rule.source}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">测试数据包</div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs text-gray-500">协议</label>
            <select
              value={testPacket.protocol}
              onChange={e => setTestPacket(p => ({ ...p, protocol: e.target.value }))}
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-sm"
            >
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">端口</label>
            <input
              value={testPacket.port}
              onChange={e => setTestPacket(p => ({ ...p, port: e.target.value }))}
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">来源IP</label>
            <input
              value={testPacket.source}
              onChange={e => setTestPacket(p => ({ ...p, source: e.target.value }))}
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={testFirewall}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          测试
        </button>
        {result && (
          <span className={`px-3 py-1 rounded text-sm ${result === '允许通过'
              ? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
              : 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300'
            }`}>
            {result}
          </span>
        )}
      </div>
    </div>
  )
}
