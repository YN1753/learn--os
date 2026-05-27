'use client'

import React, { useState } from 'react'

export default function NetworkProtocolsVisualization() {
  const [mode, setMode] = useState<'tcp' | 'udp'>('tcp')
  const [step, setStep] = useState(0)

  const tcpSteps = [
    { from: '客户端', to: '服务器', msg: 'SYN (seq=x)', desc: '客户端发起连接请求' },
    { from: '服务器', to: '客户端', msg: 'SYN+ACK (seq=y, ack=x+1)', desc: '服务器确认并回应' },
    { from: '客户端', to: '服务器', msg: 'ACK (ack=y+1)', desc: '客户端确认连接建立' },
    { from: '客户端', to: '服务器', msg: 'DATA', desc: '开始传输数据' },
  ]

  const udpSteps = [
    { from: '客户端', to: '服务器', msg: '数据报1', desc: '直接发送' },
    { from: '客户端', to: '服务器', msg: '数据报2', desc: '直接发送' },
    { from: '客户端', to: '服务器', msg: '数据报3', desc: '可能丢失' },
    { from: '服务器', to: '客户端', msg: '响应', desc: '直接回复' },
  ]

  const steps = mode === 'tcp' ? tcpSteps : udpSteps

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">网络协议可视化</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode('tcp'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm ${mode === 'tcp' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          TCP
        </button>
        <button
          onClick={() => { setMode('udp'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm ${mode === 'udp' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          UDP
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300">客户端</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
          <div className="text-sm font-medium text-green-700 dark:text-green-300">服务器</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">
          {mode === 'tcp' ? 'TCP三次握手' : 'UDP传输'}
        </div>
        <div className="space-y-2">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all ${step >= idx
                ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-50'
              }`}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              <span className="font-medium">{s.from}</span>
              <span className="mx-1">→</span>
              <span className="font-medium">{s.to}</span>
              <span className="ml-2 font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">{s.msg}</span>
              <span className="ml-2 text-gray-500">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4 text-sm">
        <div className="font-medium mb-1">{mode === 'tcp' ? 'TCP' : 'UDP'}特点</div>
        <div className="text-gray-600 dark:text-gray-400">
          {mode === 'tcp'
            ? '可靠传输、面向连接、有序、流量控制、拥塞控制'
            : '无连接、不可保靠、高效、支持广播、头部开销小'}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          下一步
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
