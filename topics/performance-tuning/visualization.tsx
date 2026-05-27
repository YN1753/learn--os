'use client'

import React, { useState, useEffect } from 'react'

export default function PerformanceTuningVisualization() {
  const [bottleneck, setBottleneck] = useState<'cpu' | 'memory' | 'io' | 'network'>('cpu')
  const [metrics, setMetrics] = useState({
    cpu: 85,
    memory: 60,
    io: 40,
    network: 30
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        io: Math.max(0, Math.min(100, prev.io + (Math.random() - 0.5) * 15)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 8)),
      }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const bottleneckInfo = {
    cpu: { title: 'CPU瓶颈', solutions: ['优化算法', '减少计算量', '使用多线程', '升级CPU'] },
    memory: { title: '内存瓶颈', solutions: ['减少内存使用', '修复内存泄漏', '增加swap', '增加内存'] },
    io: { title: 'I/O瓶颈', solutions: ['使用缓存', '优化查询', '使用SSD', 'RAID配置'] },
    network: { title: '网络瓶颈', solutions: ['压缩数据', '使用CDN', '优化协议', '增加带宽'] },
  }

  const GaugeBar = ({ label, value, color, onClick }: { label: string; value: number; color: string; onClick: () => void }) => (
    <div onClick={onClick} className="cursor-pointer mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: value > 80 ? '#ef4444' : value > 60 ? '#f59e0b' : color }}
        />
      </div>
    </div>
  )

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">性能调优可视化</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">系统资源监控</div>
          <GaugeBar label="CPU" value={metrics.cpu} color="#3b82f6" onClick={() => setBottleneck('cpu')} />
          <GaugeBar label="内存" value={metrics.memory} color="#10b981" onClick={() => setBottleneck('memory')} />
          <GaugeBar label="磁盘I/O" value={metrics.io} color="#f59e0b" onClick={() => setBottleneck('io')} />
          <GaugeBar label="网络" value={metrics.network} color="#8b5cf6" onClick={() => setBottleneck('network')} />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">{bottleneckInfo[bottleneck].title}优化建议</div>
          <div className="space-y-2">
            {bottleneckInfo[bottleneck].solutions.map((s, idx) => (
              <div
                key={idx}
                className="p-2 bg-white dark:bg-gray-700 rounded text-sm"
              >
                {idx + 1}. {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
        <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">性能分析步骤</div>
        <div className="text-blue-600 dark:text-blue-400">
          1. 建立基准 → 2. 监控指标 → 3. 找到瓶颈 → 4. 针对性优化 → 5. 验证效果
        </div>
      </div>
    </div>
  )
}
