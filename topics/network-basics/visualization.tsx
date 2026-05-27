'use client'

import React, { useState, useEffect } from 'react'

type Protocol = 'tcp' | 'udp'

export default function NetworkBasicsVisualization() {
  const [protocol, setProtocol] = useState<Protocol>('tcp')
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)

  const tcpSteps = [
    { from: 'client', to: 'server', label: 'SYN', desc: '客户端发起连接' },
    { from: 'server', to: 'client', label: 'SYN+ACK', desc: '服务器确认并回复' },
    { from: 'client', to: 'server', label: 'ACK', desc: '客户端确认，连接建立' },
    { from: 'client', to: 'server', label: 'DATA', desc: '发送数据' },
    { from: 'server', to: 'client', label: 'ACK', desc: '确认收到数据' },
  ]

  const udpSteps = [
    { from: 'client', to: 'server', label: 'DATA', desc: '直接发送数据' },
    { from: 'server', to: 'client', label: 'DATA', desc: '直接发送数据' },
  ]

  const steps = protocol === 'tcp' ? tcpSteps : udpSteps

  useEffect(() => {
    if (!playing || step >= steps.length - 1) {
      if (step >= steps.length - 1) setPlaying(false)
      return
    }
    const timer = setTimeout(() => setStep(s => s + 1), 1500)
    return () => clearTimeout(timer)
  }, [playing, step, steps.length])

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">网络协议对比</h3>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setProtocol('tcp'); setStep(-1); setPlaying(false) }}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${protocol === 'tcp' ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600'}`}
        >
          TCP
        </button>
        <button
          onClick={() => { setProtocol('udp'); setStep(-1); setPlaying(false) }}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${protocol === 'udp' ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600'}`}
        >
          UDP
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 text-center">
          <div className="font-medium text-blue-700 dark:text-blue-300">客户端</div>
        </div>
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 text-center">
          <div className="font-medium text-green-700 dark:text-green-300">服务器</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => { setStep(0); setPlaying(true) }}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '演示中...' : '开始演示'}
        </button>
        <button
          onClick={() => { setStep(-1); setPlaying(false) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          重置
        </button>
      </div>

      {step >= 0 && step < steps.length && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-sm mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">{steps[step].label}</span>
            <span className="text-gray-500">({steps[step].from === 'client' ? '客户端→服务器' : '服务器→客户端'})</span>
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-1">{steps[step].desc}</div>
        </div>
      )}

      <div className="space-y-1">
        {steps.map((s, i) => (
          <div key={i} className={`text-xs p-1.5 rounded transition-all duration-200 ${i === step ? 'bg-blue-100 dark:bg-blue-900 font-medium' : i < step ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
            {i < step ? '✓' : i + 1}. {s.label} - {s.desc}
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        {protocol === 'tcp' ? 'TCP：可靠传输，需要建立连接' : 'UDP：快速传输，无连接'}
      </div>
    </div>
  )
}
