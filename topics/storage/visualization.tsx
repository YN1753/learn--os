'use client'

import React, { useState } from 'react'

type RAIDType = 'raid0' | 'raid1' | 'raid5' | 'raid10'

export default function StorageVisualization() {
  const [raid, setRaid] = useState<RAIDType>('raid0')
  const [diskCount, setDiskCount] = useState(4)

  const raidConfigs: Record<RAIDType, { name: string; minDisks: number; desc: string; pros: string[]; cons: string[] }> = {
    raid0: { name: 'RAID 0 (条带化)', minDisks: 2, desc: '数据分散存储在多个磁盘', pros: ['读写性能好', '可用容量100%'], cons: ['无冗余', '一个磁盘坏全部丢失'] },
    raid1: { name: 'RAID 1 (镜像)', minDisks: 2, desc: '数据完全复制到两个磁盘', pros: ['高可靠性', '读性能好'], cons: ['可用容量50%', '写性能一般'] },
    raid5: { name: 'RAID 5 (奇偶校验)', minDisks: 3, desc: '数据和校验信息分散存储', pros: ['容错1个磁盘', '读性能好'], cons: ['写性能一般', '重建慢'] },
    raid10: { name: 'RAID 10 (镜像+条带)', minDisks: 4, desc: '先镜像再条带化', pros: ['高可靠性', '读写性能好'], cons: ['可用容量50%', '成本高'] },
  }

  const config = raidConfigs[raid]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">RAID技术可视化</h3>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(['raid0', 'raid1', 'raid5', 'raid10'] as const).map(r => (
          <button
            key={r}
            onClick={() => setRaid(r)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${raid === r ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600'}`}
          >
            {raidConfigs[r].name}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={`p-3 rounded-lg border-2 text-center text-sm transition-all duration-300 ${i < diskCount ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-700 opacity-30'}`}>
              <div className="font-medium">磁盘 {i + 1}</div>
              <div className="text-xs text-gray-500 mt-1">
                {raid === 'raid0' && `数据块 ${i + 1}`}
                {raid === 'raid1' && (i < 2 ? (i === 0 ? '数据副本A' : '数据副本B') : '未使用')}
                {raid === 'raid5' && (i < 3 ? (i === 2 ? '校验' : `数据块${i + 1}`) : '未使用')}
                {raid === 'raid10' && (i < 4 ? (i % 2 === 0 ? '镜像A' : '镜像B') : '未使用')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
          <div className="font-medium text-green-700 dark:text-green-300 mb-1">优点</div>
          <ul className="text-green-600 dark:text-green-400 text-xs space-y-1">
            {config.pros.map((p, i) => <li key={i}>- {p}</li>)}
          </ul>
        </div>
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950">
          <div className="font-medium text-red-700 dark:text-red-300 mb-1">缺点</div>
          <ul className="text-red-600 dark:text-red-400 text-xs space-y-1">
            {config.cons.map((c, i) => <li key={i}>- {c}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm">
        <div className="font-medium mb-1">描述</div>
        <div className="text-gray-600 dark:text-gray-400 text-xs">{config.desc}</div>
      </div>
    </div>
  )
}
