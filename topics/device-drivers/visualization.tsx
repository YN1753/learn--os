'use client'

import React, { useState } from 'react'

type DeviceType = 'char' | 'block' | 'network'

export default function DeviceDriversVisualization() {
  const [deviceType, setDeviceType] = useState<DeviceType>('char')
  const [step, setStep] = useState(0)

  const devices = {
    char: { name: '字符设备', examples: ['键盘', '鼠标', '串口'], icon: '⌨️' },
    block: { name: '块设备', examples: ['硬盘', 'U盘', '光驱'], icon: '💾' },
    network: { name: '网络设备', examples: ['网卡', 'WiFi', '蓝牙'], icon: '🌐' },
  }

  const layers = [
    { name: '用户程序', color: '#3b82f6' },
    { name: '系统调用', color: '#8b5cf6' },
    { name: '内核', color: '#f59e0b' },
    { name: '设备驱动', color: '#10b981' },
    { name: '硬件', color: '#ef4444' },
  ]

  const steps = [
    { from: 0, to: 1, desc: '用户程序发起IO请求' },
    { from: 1, to: 2, desc: '系统调用进入内核' },
    { from: 2, to: 3, desc: '内核调用设备驱动' },
    { from: 3, to: 4, desc: '驱动操作硬件' },
    { from: 4, to: 3, desc: '硬件返回数据' },
    { from: 3, to: 2, desc: '驱动返回内核' },
    { from: 2, to: 1, desc: '内核返回系统调用' },
    { from: 1, to: 0, desc: '用户程序获得数据' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">设备驱动可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['char', 'block', 'network'] as const).map(type => (
          <button
            key={type}
            onClick={() => { setDeviceType(type); setStep(0) }}
            className={`px-3 py-1 rounded text-sm transition-colors ${deviceType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {devices[type].icon} {devices[type].name}
          </button>
        ))}
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium">{devices[deviceType].name}</div>
        <div className="text-xs text-gray-500">
          示例: {devices[deviceType].examples.join(', ')}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg text-white text-sm font-medium transition-all duration-300 ${step >= 0 ? 'opacity-100' : 'opacity-50'
              }`}
            style={{ backgroundColor: layer.color }}
          >
            {layer.name}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">IO请求流程</div>
        <div className="space-y-1">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-2 rounded text-sm transition-all ${step >= idx
                  ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-800 opacity-50'
                }`}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              {s.desc}
            </div>
          ))}
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
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
