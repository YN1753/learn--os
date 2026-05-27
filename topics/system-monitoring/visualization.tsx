'use client'

import React, { useState, useEffect } from 'react'

export default function SystemMonitoringVisualization() {
  const [cpuUsage, setCpuUsage] = useState(45)
  const [memUsage, setMemUsage] = useState(62)
  const [diskIO, setDiskIO] = useState(30)
  const [networkIO, setNetworkIO] = useState(20)
  const [processes, setProcesses] = useState([
    { pid: 1, name: 'systemd', cpu: 0.1, mem: 0.5 },
    { pid: 1234, name: 'node', cpu: 12.3, mem: 4.2 },
    { pid: 2345, name: 'chrome', cpu: 25.6, mem: 15.8 },
    { pid: 3456, name: 'code', cpu: 8.7, mem: 12.1 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 20)))
      setMemUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)))
      setDiskIO(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15)))
      setNetworkIO(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const GaugeBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: value > 80 ? '#ef4444' : value > 60 ? '#f59e0b' : color }}
        />
      </div>
    </div>
  )

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">系统监控面板</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">资源使用</div>
          <GaugeBar label="CPU" value={cpuUsage} color="#3b82f6" />
          <GaugeBar label="内存" value={memUsage} color="#10b981" />
          <GaugeBar label="磁盘I/O" value={diskIO} color="#f59e0b" />
          <GaugeBar label="网络" value={networkIO} color="#8b5cf6" />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">系统信息</div>
          <div className="space-y-1 text-sm">
            <div>负载均值: {(cpuUsage / 25).toFixed(2)}</div>
            <div>运行进程: {processes.length}</div>
            <div>内存总量: 16 GB</div>
            <div>已用内存: {(16 * memUsage / 100).toFixed(1)} GB</div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">进程列表</div>
        <div className="text-xs">
          <div className="grid grid-cols-4 gap-2 font-medium text-gray-500 mb-1">
            <div>PID</div>
            <div>名称</div>
            <div>CPU%</div>
            <div>内存%</div>
          </div>
          {processes.map(p => (
            <div key={p.pid} className="grid grid-cols-4 gap-2 py-1 border-t border-gray-200 dark:border-gray-700">
              <div>{p.pid}</div>
              <div>{p.name}</div>
              <div className={p.cpu > 20 ? 'text-red-500' : ''}>{p.cpu}%</div>
              <div>{p.mem}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
