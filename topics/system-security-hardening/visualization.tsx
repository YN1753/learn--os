'use client'

import React, { useState } from 'react'

export default function SystemSecurityHardeningVisualization() {
  const [selectedLayer, setSelectedLayer] = useState('account')

  const layers: Record<string, { name: string; color: string; items: { check: string; status: string }[] }> = {
    account: {
      name: '账户安全',
      color: '#3b82f6',
      items: [
        { check: '禁用root远程登录', status: 'Pass' },
        { check: '密码复杂度策略', status: 'Pass' },
        { check: '密码过期策略', status: 'Warn' },
        { check: '账户锁定策略', status: 'Pass' },
      ]
    },
    file: {
      name: '文件权限',
      color: '#10b981',
      items: [
        { check: '/etc/passwd权限644', status: 'Pass' },
        { check: '/etc/shadow权限640', status: 'Pass' },
        { check: '关键目录权限', status: 'Warn' },
        { check: 'SUID文件审查', status: 'Pass' },
      ]
    },
    network: {
      name: '网络安全',
      color: '#f59e0b',
      items: [
        { check: '防火墙已启用', status: 'Pass' },
        { check: '关闭不必要端口', status: 'Pass' },
        { check: 'SSH端口已修改', status: 'Warn' },
        { check: 'IP白名单配置', status: 'Fail' },
      ]
    },
    service: {
      name: '服务安全',
      color: '#ef4444',
      items: [
        { check: '关闭telnet', status: 'Pass' },
        { check: '关闭ftp', status: 'Pass' },
        { check: '系统补丁更新', status: 'Warn' },
        { check: 'SELinux已启用', status: 'Pass' },
      ]
    }
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">系统安全加固可视化</h3>

      <div className="flex gap-2 mb-4">
        {Object.entries(layers).map(([key, layer]) => (
          <button
            key={key}
            onClick={() => setSelectedLayer(key)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedLayer === key
              ? 'text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={selectedLayer === key ? { backgroundColor: layer.color } : undefined}
          >
            {layer.name}
          </button>
        ))}
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">{layers[selectedLayer].name}检查项</div>
        <div className="space-y-2">
          {layers[selectedLayer].items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg"
            >
              <span className="text-sm">{item.check}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${
                item.status === 'Pass' ? 'bg-green-200 text-green-700' :
                item.status === 'Warn' ? 'bg-yellow-200 text-yellow-700' :
                'bg-red-200 text-red-700'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg text-center">
          <div className="text-lg font-bold text-green-600">
            {Object.values(layers).flatMap(l => l.items).filter(i => i.status === 'Pass').length}
          </div>
          <div className="text-xs text-green-500">通过</div>
        </div>
        <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg text-center">
          <div className="text-lg font-bold text-yellow-600">
            {Object.values(layers).flatMap(l => l.items).filter(i => i.status === 'Warn').length}
          </div>
          <div className="text-xs text-yellow-500">警告</div>
        </div>
        <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg text-center">
          <div className="text-lg font-bold text-red-600">
            {Object.values(layers).flatMap(l => l.items).filter(i => i.status === 'Fail').length}
          </div>
          <div className="text-xs text-red-500">失败</div>
        </div>
      </div>
    </div>
  )
}
