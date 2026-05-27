'use client'

import React, { useState } from 'react'

type RaidLevel = 'RAID0' | 'RAID1' | 'RAID5'

export default function RAIDVisualization() {
  const [level, setLevel] = useState<RaidLevel>('RAID5')
  const [diskCount] = useState(4)
  const [failedDisk, setFailedDisk] = useState<number | null>(null)

  const getDataBlocks = () => {
    if (level === 'RAID0') {
      return [
        { disks: [0, 1, 2, 3], label: 'A', labels: undefined as string[] | undefined, type: 'data' },
        { disks: [0, 1, 2, 3], label: 'B', labels: undefined as string[] | undefined, type: 'data' },
      ]
    } else if (level === 'RAID1') {
      return [
        { disks: [0, 1], label: 'A', labels: undefined as string[] | undefined, type: 'mirror' },
        { disks: [2, 3], label: 'B', labels: undefined as string[] | undefined, type: 'mirror' },
      ]
    } else {
      return [
        { disks: [0, 1, 2, 3], label: '', labels: ['D0', 'D1', 'D2', 'P'], type: 'raid5' },
        { disks: [0, 1, 2, 3], label: '', labels: ['D3', 'D4', 'P', 'D5'], type: 'raid5' },
      ]
    }
  }

  const diskColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">RAID 存储可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['RAID0', 'RAID1', 'RAID5'] as const).map(l => (
          <button
            key={l}
            onClick={() => { setLevel(l); setFailedDisk(null) }}
            className={`px-3 py-1 rounded text-sm transition-colors ${level === l
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
        {level === 'RAID0' && '条带化：数据分散到所有磁盘，无冗余，性能最好'}
        {level === 'RAID1' && '镜像：数据完全复制，可靠性最高，容量减半'}
        {level === 'RAID5' && '分布式奇偶校验：校验信息分散存储，容错1个磁盘'}
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">磁盘阵列</div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: diskCount }, (_, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${failedDisk === i
                  ? 'border-red-500 bg-red-50 dark:bg-red-950 opacity-50'
                  : 'border-gray-300 dark:border-gray-600'
                }`}
              onClick={() => setFailedDisk(failedDisk === i ? null : i)}
            >
              <div className="text-center">
                <div className="text-sm font-medium" style={{ color: diskColors[i] }}>
                  磁盘 {i}
                </div>
                {failedDisk === i && (
                  <div className="text-xs text-red-600 mt-1">故障</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">数据分布</div>
        <div className="space-y-2">
          {getDataBlocks().map((block, idx) => (
            <div key={idx} className="flex gap-2">
              {level === 'RAID5' ? (
                block.labels?.map((label, i) => (
                  <div
                    key={i}
                    className={`flex-1 p-2 rounded text-center text-xs font-mono ${label === 'P'
                        ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                        : 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                      }`}
                  >
                    {label}
                  </div>
                ))
              ) : (
                block.disks.map((disk, i) => (
                  <div
                    key={i}
                    className="flex-1 p-2 rounded text-center text-xs font-mono bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                  >
                    {block.label}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      {failedDisk !== null && (
        <div className={`p-3 rounded-lg text-sm ${level === 'RAID0'
            ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
            : 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
          }`}>
          {level === 'RAID0'
            ? 'RAID 0 无冗余，数据丢失！'
            : `${level} 可以从其他磁盘重建数据`
          }
        </div>
      )}
    </div>
  )
}
