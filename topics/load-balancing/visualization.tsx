'use client'

import React, { useState, useEffect } from 'react'

export default function LoadBalancingVisualization() {
  const [algorithm, setAlgorithm] = useState<'roundrobin' | 'leastconn' | 'iphash'>('roundrobin')
  const [requestCount, setRequestCount] = useState(0)
  const [servers, setServers] = useState([
    { id: 1, name: 'Server A', connections: 0, weight: 1, color: '#3b82f6' },
    { id: 2, name: 'Server B', connections: 0, weight: 2, color: '#10b981' },
    { id: 3, name: 'Server C', connections: 0, weight: 1, color: '#f59e0b' },
  ])

  const getNextServer = () => {
    if (algorithm === 'roundrobin') {
      return requestCount % servers.length
    } else if (algorithm === 'leastconn') {
      return servers.reduce((minIdx, s, idx) =>
        s.connections < servers[minIdx].connections ? idx : minIdx, 0)
    } else {
      return Math.floor(Math.random() * servers.length)
    }
  }

  const sendRequest = () => {
    const idx = getNextServer()
    setServers(prev => prev.map((s, i) =>
      i === idx ? { ...s, connections: s.connections + 1 } : s
    ))
    setRequestCount(prev => prev + 1)
  }

  const reset = () => {
    setServers(prev => prev.map(s => ({ ...s, connections: 0 })))
    setRequestCount(0)
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">负载均衡可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['roundrobin', 'leastconn', 'iphash'] as const).map(algo => (
          <button
            key={algo}
            onClick={() => { setAlgorithm(algo); reset() }}
            className={`px-4 py-2 rounded-lg text-sm ${algorithm === algo ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {algo === 'roundrobin' ? '轮询' : algo === 'leastconn' ? '最少连接' : 'IP哈希'}
          </button>
        ))}
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">服务器状态</div>
        <div className="flex justify-center gap-4">
          {servers.map(server => (
            <div
              key={server.id}
              className="w-32 p-4 rounded-lg text-center text-white transition-all"
              style={{ backgroundColor: server.color }}
            >
              <div className="font-medium">{server.name}</div>
              <div className="text-2xl font-bold">{server.connections}</div>
              <div className="text-xs opacity-80">连接数</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-900 rounded-lg text-center">
        <div className="text-white text-sm">总请求数: {requestCount}</div>
        <div className="text-gray-400 text-xs mt-1">
          当前算法: {algorithm === 'roundrobin' ? '轮询' : algorithm === 'leastconn' ? '最少连接' : 'IP哈希'}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={sendRequest}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          发送请求
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
