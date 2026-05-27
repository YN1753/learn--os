'use client'

import React, { useState } from 'react'

type LogLevel = 'EMERG' | 'ALERT' | 'CRIT' | 'ERR' | 'WARN' | 'NOTICE' | 'INFO' | 'DEBUG'

interface LogEntry {
  timestamp: string
  level: LogLevel
  source: string
  message: string
}

export default function LogManagementVisualization() {
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'ALL'>('ALL')
  const [logs] = useState<LogEntry[]>([
    { timestamp: '2024-01-15 10:00:01', level: 'INFO', source: 'nginx', message: 'GET /api/users 200' },
    { timestamp: '2024-01-15 10:00:02', level: 'WARN', source: 'mysql', message: 'Slow query: 2.5s' },
    { timestamp: '2024-01-15 10:00:03', level: 'ERR', source: 'app', message: 'Connection timeout' },
    { timestamp: '2024-01-15 10:00:04', level: 'INFO', source: 'nginx', message: 'GET /api/orders 200' },
    { timestamp: '2024-01-15 10:00:05', level: 'CRIT', source: 'kernel', message: 'Out of memory' },
    { timestamp: '2024-01-15 10:00:06', level: 'DEBUG', source: 'app', message: 'Cache hit ratio: 85%' },
    { timestamp: '2024-01-15 10:00:07', level: 'NOTICE', source: 'sshd', message: 'Login from 192.168.1.1' },
    { timestamp: '2024-01-15 10:00:08', level: 'ERR', source: 'app', message: 'File not found' },
  ])

  const levelColors: Record<LogLevel, string> = {
    EMERG: 'bg-red-900 text-white',
    ALERT: 'bg-red-800 text-white',
    CRIT: 'bg-red-700 text-white',
    ERR: 'bg-red-600 text-white',
    WARN: 'bg-yellow-500 text-black',
    NOTICE: 'bg-blue-500 text-white',
    INFO: 'bg-green-500 text-white',
    DEBUG: 'bg-gray-500 text-white',
  }

  const filteredLogs = filterLevel === 'ALL'
    ? logs
    : logs.filter(l => l.level === filterLevel)

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">日志管理可视化</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterLevel('ALL')}
          className={`px-3 py-1 rounded text-sm transition-colors ${filterLevel === 'ALL'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          全部
        </button>
        {(['EMERG', 'CRIT', 'ERR', 'WARN', 'INFO', 'DEBUG'] as const).map(level => (
          <button
            key={level}
            onClick={() => setFilterLevel(level)}
            className={`px-3 py-1 rounded text-sm transition-colors ${filterLevel === level
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-3 py-2 text-left">时间</th>
              <th className="px-3 py-2 text-left">级别</th>
              <th className="px-3 py-2 text-left">来源</th>
              <th className="px-3 py-2 text-left">消息</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2 font-mono text-xs">{log.timestamp}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${levelColors[log.level]}`}>
                    {log.level}
                  </span>
                </td>
                <td className="px-3 py-2">{log.source}</td>
                <td className="px-3 py-2">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        显示 {filteredLogs.length} / {logs.length} 条日志
      </div>
    </div>
  )
}
