'use client'

import React, { useState, useEffect } from 'react'

export default function PerformanceMonitoringVisualization() {
  const [cpuUsage, setCpuUsage] = useState(45)
  const [memoryUsage, setMemoryUsage] = useState(62)
  const [diskIO, setDiskIO] = useState(30)
  const [networkIO, setNetworkIO] = useState(25)
  const [loadAvg, setLoadAvg] = useState([1.2, 1.5, 1.8])
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 20)))
      setMemoryUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)))
      setDiskIO(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15)))
      setNetworkIO(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 12)))
      setLoadAvg(prev => prev.map(v => Math.max(0, v + (Math.random() - 0.5) * 0.5)))
    }, 1000)
    return () => clearInterval(interval)
  }, [running])

  const getBarColor = (value: number) => {
    if (value > 80) return 'bg-red-500'
    if (value > 60) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">性能监控可视化</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">CPU 使用率</span>
            <span className="text-sm font-bold">{cpuUsage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${getBarColor(cpuUsage)}`}
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">内存使用率</span>
            <span className="text-sm font-bold">{memoryUsage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${getBarColor(memoryUsage)}`}
              style={{ width: `${memoryUsage}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">磁盘 IO</span>
            <span className="text-sm font-bold">{diskIO.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${getBarColor(diskIO)}`}
              style={{ width: `${diskIO}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">网络 IO</span>
            <span className="text-sm font-bold">{networkIO.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${getBarColor(networkIO)}`}
              style={{ width: `${networkIO}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">Load Average</div>
        <div className="flex gap-4">
          <span>1min: <strong>{loadAvg[0].toFixed(2)}</strong></span>
          <span>5min: <strong>{loadAvg[1].toFixed(2)}</strong></span>
          <span>15min: <strong>{loadAvg[2].toFixed(2)}</strong></span>
        </div>
      </div>

      <button
        onClick={() => setRunning(!running)}
        className={`px-4 py-2 rounded-lg text-white transition-colors ${running ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {running ? '停止监控' : '开始监控'}
      </button>
    </div>
  )
}
