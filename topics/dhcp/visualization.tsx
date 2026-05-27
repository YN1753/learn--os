'use client'

import React, { useState } from 'react'

export default function DHCPVisualization() {
  const [step, setStep] = useState(0)

  const steps = [
    { from: '客户端', to: '广播', desc: 'DHCP Discover - 客户端广播请求IP', color: '#3b82f6' },
    { from: '服务器', to: '客户端', desc: 'DHCP Offer - 服务器提供IP地址', color: '#10b981' },
    { from: '客户端', to: '服务器', desc: 'DHCP Request - 客户端请求该IP', color: '#f59e0b' },
    { from: '服务器', to: '客户端', desc: 'DHCP ACK - 服务器确认分配', color: '#8b5cf6' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">DHCP工作过程可视化</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300">客户端</div>
          <div className="text-xs text-gray-500">需要IP地址</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
          <div className="text-sm font-medium text-green-700 dark:text-green-300">DHCP服务器</div>
          <div className="text-xs text-gray-500">分配IP地址</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">四步过程</div>
        <div className="space-y-2">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all ${step >= idx
                  ? 'border-2'
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-50'
                }`}
              style={step >= idx ? { borderColor: s.color, backgroundColor: `${s.color}10` } : undefined}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              <span className="font-medium">{s.from}</span>
              <span className="mx-1">→</span>
              <span className="font-medium">{s.to}</span>
              <span className="ml-2 text-gray-500">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {step >= steps.length - 1 && (
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg mb-4">
          <div className="text-sm font-medium text-green-700 dark:text-green-300">
            IP分配完成: 192.168.1.100
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
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
