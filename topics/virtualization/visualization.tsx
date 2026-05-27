'use client'

import React, { useState } from 'react'

type ViewMode = 'vm' | 'container'

export default function VirtualizationVisualization() {
  const [mode, setMode] = useState<ViewMode>('vm')

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">虚拟机 vs 容器</h3>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('vm')}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            mode === 'vm'
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          虚拟机
        </button>
        <button
          onClick={() => setMode('container')}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            mode === 'container'
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          容器
        </button>
      </div>

      {mode === 'vm' ? (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-center text-sm font-medium">
            硬件 (CPU / 内存 / 磁盘)
          </div>
          <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900 text-center text-sm font-medium text-orange-700 dark:text-orange-300">
            Hypervisor (虚拟机管理程序)
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['VM 1', 'VM 2', 'VM 3'].map((vm, i) => (
              <div key={i} className="border-2 border-blue-300 dark:border-blue-700 rounded-lg overflow-hidden">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 text-center text-xs font-medium text-blue-700 dark:text-blue-300">
                  Guest OS
                </div>
                <div className="p-2 bg-blue-50 dark:bg-blue-950 text-center text-xs">
                  应用 + 依赖
                </div>
                <div className="p-1 text-center text-xs font-medium">{vm}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 text-center">
            每个VM有独立的操作系统，完全隔离
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-center text-sm font-medium">
            硬件 (CPU / 内存 / 磁盘)
          </div>
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 text-center text-sm font-medium text-green-700 dark:text-green-300">
            宿主机操作系统 + 容器运行时
          </div>
          <div className="p-2 bg-green-50 dark:bg-green-950 text-center text-xs text-green-600 dark:text-green-400">
            共享内核
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['容器 1', '容器 2', '容器 3'].map((c, i) => (
              <div key={i} className="border-2 border-green-300 dark:border-green-700 rounded-lg overflow-hidden">
                <div className="p-2 bg-green-50 dark:bg-green-950 text-center text-xs">
                  应用 + 依赖
                </div>
                <div className="p-1 text-center text-xs font-medium">{c}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 text-center">
            容器共享宿主机内核，更轻量
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
          <div className="font-medium mb-1">虚拟机</div>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>启动: 分钟级</li>
            <li>隔离: 强（独立内核）</li>
            <li>资源: 占用大</li>
            <li>适用: 需要不同OS</li>
          </ul>
        </div>
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
          <div className="font-medium mb-1">容器</div>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>启动: 秒级</li>
            <li>隔离: 较弱（共享内核）</li>
            <li>资源: 占用小</li>
            <li>适用: 应用隔离部署</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
