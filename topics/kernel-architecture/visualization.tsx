'use client'

import React, { useState } from 'react'

type KernelType = 'monolithic' | 'micro' | 'hybrid'

export default function KernelArchitectureVisualization() {
  const [type, setType] = useState<KernelType>('monolithic')

  const configs = {
    monolithic: {
      name: '单内核',
      kernel: ['进程管理', '内存管理', '文件系统', '设备驱动', '网络协议'],
      user: ['应用程序'],
    },
    micro: {
      name: '微内核',
      kernel: ['进程调度', 'IPC', '基本内存管理'],
      user: ['文件系统', '设备驱动', '网络协议', '应用程序'],
    },
    hybrid: {
      name: '混合内核',
      kernel: ['进程管理', '内存管理', '核心驱动'],
      user: ['文件系统', '部分驱动', '网络协议', '应用程序'],
    },
  }

  const config = configs[type]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">内核架构对比</h3>

      <div className="flex gap-2 mb-6">
        {(['monolithic', 'micro', 'hybrid'] as const).map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${type === t ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600'}`}
          >
            {configs[t].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
          <div className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">内核空间</div>
          <div className="space-y-1">
            {config.kernel.map((m, i) => (
              <div key={i} className="p-2 rounded bg-orange-100 dark:bg-orange-900 text-xs text-orange-700 dark:text-orange-300 text-center">
                {m}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">用户空间</div>
          <div className="space-y-1">
            {config.user.map((m, i) => (
              <div key={i} className="p-2 rounded bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-300 text-center">
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        {type === 'monolithic' && '单内核：所有功能在内核空间，性能好但稳定性差'}
        {type === 'micro' && '微内核：只有基本功能在内核空间，稳定性好但性能差'}
        {type === 'hybrid' && '混合内核：核心功能在内核空间，平衡性能和稳定性'}
      </div>
    </div>
  )
}
