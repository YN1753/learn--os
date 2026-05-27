'use client'

import React, { useState } from 'react'

export default function DNSVisualization() {
  const [step, setStep] = useState(0)
  const [domain] = useState('www.example.com')

  const steps = [
    { from: '浏览器', to: '浏览器缓存', desc: '检查浏览器缓存' },
    { from: '浏览器', to: '操作系统缓存', desc: '检查操作系统DNS缓存' },
    { from: '操作系统', to: '本地DNS服务器', desc: '查询本地DNS服务器' },
    { from: '本地DNS', to: '根DNS服务器', desc: '查询根DNS服务器' },
    { from: '根DNS', to: '顶级域名服务器', desc: '查询.com顶级域名服务器' },
    { from: '顶级域名', to: '权威DNS服务器', desc: '查询example.com权威DNS' },
    { from: '权威DNS', to: '本地DNS', desc: '返回IP地址' },
    { from: '本地DNS', to: '操作系统', desc: '返回IP地址给客户端' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">DNS解析可视化</h3>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium">查询域名: {domain}</div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">解析步骤</div>
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
              <span className="ml-2 text-gray-500">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {step >= steps.length - 1 && (
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg mb-4">
          <div className="text-sm font-medium text-green-700 dark:text-green-300">
            解析完成: www.example.com → 93.184.216.34
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
