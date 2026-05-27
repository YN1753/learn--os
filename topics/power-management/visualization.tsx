'use client'

import React, { useState, useEffect } from 'react'

export default function PowerManagementVisualization() {
  const [powerState, setPowerState] = useState('S0')
  const [cpuFreq, setCpuFreq] = useState(100)
  const [load, setLoad] = useState(50)
  const [autoMode, setAutoMode] = useState(false)

  const states = [
    { id: 'S0', name: '工作', desc: '系统正常运行', color: '#10b981' },
    { id: 'S1', name: 'CPU停止', desc: 'CPU停止工作，内存保持', color: '#3b82f6' },
    { id: 'S3', name: '睡眠', desc: '挂起到内存', color: '#f59e0b' },
    { id: 'S4', name: '休眠', desc: '挂起到磁盘', color: '#ef4444' },
    { id: 'S5', name: '关机', desc: '软关机', color: '#6b7280' },
  ]

  useEffect(() => {
    if (!autoMode) return
    const interval = setInterval(() => {
      setCpuFreq(prev => {
        const target = load
        const diff = target - prev
        return Math.round(prev + diff * 0.3)
      })
    }, 500)
    return () => clearInterval(interval)
  }, [autoMode, load])

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">电源管理可视化</h3>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">电源状态</div>
        <div className="flex gap-2">
          {states.map(s => (
            <button
              key={s.id}
              onClick={() => setPowerState(s.id)}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${powerState === s.id
                ? 'text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              style={powerState === s.id ? { backgroundColor: s.color } : undefined}
            >
              {s.id}: {s.name}
            </button>
          ))}
        </div>
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
          {states.find(s => s.id === powerState)?.desc}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">CPU频率调节</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">系统负载: {load}%</label>
            <input
              type="range"
              min={0}
              max={100}
              value={load}
              onChange={e => setLoad(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">CPU频率: {cpuFreq}%</label>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${cpuFreq}%`,
                  backgroundColor: cpuFreq > 70 ? '#ef4444' : cpuFreq > 30 ? '#f59e0b' : '#10b981'
                }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => setAutoMode(!autoMode)}
          className={`mt-2 px-4 py-2 rounded-lg text-sm ${autoMode ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          {autoMode ? '自动调节: 开' : '自动调节: 关'}
        </button>
      </div>

      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
        <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">省电提示</div>
        <div className="text-blue-600 dark:text-blue-400">
          {cpuFreq < 30 ? '低功耗模式，电池续航最佳' :
           cpuFreq < 70 ? '平衡模式，性能与功耗均衡' :
           '高性能模式，功耗较高'}
        </div>
      </div>
    </div>
  )
}
