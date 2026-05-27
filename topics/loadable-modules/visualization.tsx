'use client'

import React, { useState } from 'react'

interface Module {
  name: string
  status: 'loaded' | 'unloaded' | 'loading'
  description: string
}

export default function LoadableModulesVisualization() {
  const [modules, setModules] = useState<Module[]>([
    { name: 'ext4', status: 'loaded', description: 'ext4文件系统支持' },
    { name: 'usb_storage', status: 'loaded', description: 'USB存储设备驱动' },
    { name: 'nvidia', status: 'unloaded', description: 'NVIDIA显卡驱动' },
    { name: 'vboxdrv', status: 'unloaded', description: 'VirtualBox虚拟化模块' },
  ])
  const [log, setLog] = useState<string[]>([])

  const loadModule = (name: string) => {
    setModules(prev => prev.map(m =>
      m.name === name ? { ...m, status: 'loading' as const } : m
    ))
    setLog(prev => [...prev, `正在加载模块 ${name}...`])

    setTimeout(() => {
      setModules(prev => prev.map(m =>
        m.name === name ? { ...m, status: 'loaded' as const } : m
      ))
      setLog(prev => [...prev, `模块 ${name} 加载成功`])
    }, 500)
  }

  const unloadModule = (name: string) => {
    setModules(prev => prev.map(m =>
      m.name === name ? { ...m, status: 'unloaded' as const } : m
    ))
    setLog(prev => [...prev, `模块 ${name} 已卸载`])
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">可加载内核模块可视化</h3>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">内核空间</div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center text-sm font-medium mb-2">Linux 内核</div>
          <div className="grid grid-cols-2 gap-2">
            {modules.filter(m => m.status === 'loaded').map(m => (
              <div
                key={m.name}
                className="p-2 bg-green-200 dark:bg-green-800 rounded text-center text-xs cursor-pointer hover:bg-green-300 dark:hover-green-700"
                onClick={() => unloadModule(m.name)}
              >
                {m.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">可用模块</div>
        <div className="space-y-2">
          {modules.filter(m => m.status !== 'loaded').map(m => (
            <div
              key={m.name}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <div className="font-mono text-sm">{m.name}</div>
                <div className="text-xs text-gray-500">{m.description}</div>
              </div>
              <button
                onClick={() => loadModule(m.name)}
                disabled={m.status === 'loading'}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-xs"
              >
                {m.status === 'loading' ? '加载中...' : 'insmod'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">系统日志</div>
        <div className="h-24 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-xs">
          {log.length === 0 ? (
            <div className="text-gray-400">点击加载模块...</div>
          ) : (
            log.map((entry, idx) => (
              <div key={idx}>{entry}</div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
