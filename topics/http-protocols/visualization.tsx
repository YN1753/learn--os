'use client'

import React, { useState } from 'react'

export default function HttpProtocolsVisualization() {
  const [step, setStep] = useState(0)
  const [method, setMethod] = useState('GET')

  const requestFlow = [
    { from: '客户端', to: 'DNS', desc: '解析域名获取IP' },
    { from: '客户端', to: '服务器', desc: `发送 ${method} 请求`, detail: `${method} /api/data HTTP/1.1` },
    { from: '服务器', to: '服务器', desc: '处理请求' },
    { from: '服务器', to: '客户端', desc: '返回响应', detail: 'HTTP/1.1 200 OK' },
  ]

  const statusCodes = [
    { code: '200', desc: 'OK - 请求成功', color: '#10b981' },
    { code: '301', desc: 'Moved Permanently - 永久重定向', color: '#3b82f6' },
    { code: '400', desc: 'Bad Request - 请求错误', color: '#f59e0b' },
    { code: '404', desc: 'Not Found - 未找到', color: '#ef4444' },
    { code: '500', desc: 'Internal Server Error - 服务器错误', color: '#ef4444' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">HTTP协议可视化</h3>

      <div className="flex gap-2 mb-4">
        {['GET', 'POST', 'PUT', 'DELETE'].map(m => (
          <button
            key={m}
            onClick={() => { setMethod(m); setStep(0) }}
            className={`px-3 py-1 rounded text-sm ${method === m ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">请求流程</div>
        <div className="space-y-2">
          {requestFlow.map((s, idx) => (
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
              {step >= idx && s.detail && (
                <div className="mt-1 font-mono text-xs bg-gray-200 dark:bg-gray-700 p-1 rounded">
                  {s.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">常见状态码</div>
        <div className="grid grid-cols-1 gap-1">
          {statusCodes.map(s => (
            <div
              key={s.code}
              className="flex items-center gap-2 p-2 rounded text-sm"
              style={{ borderLeft: `4px solid ${s.color}` }}
            >
              <span className="font-mono font-bold" style={{ color: s.color }}>{s.code}</span>
              <span className="text-gray-600 dark:text-gray-400">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, requestFlow.length - 1))}
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
