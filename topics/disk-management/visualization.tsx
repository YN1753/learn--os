'use client'

import React, { useState } from 'react'

type PartitionScheme = 'MBR' | 'GPT'

export default function DiskManagementVisualization() {
  const [scheme, setScheme] = useState<PartitionScheme>('MBR')
  const [partitions, setPartitions] = useState([
    { name: '分区1', size: 25, type: '主分区', fs: 'ext4' },
    { name: '分区2', size: 35, type: '主分区', fs: 'xfs' },
    { name: '分区3', size: 40, type: '主分区', fs: 'ntfs' },
  ])

  const addPartition = () => {
    if (scheme === 'MBR' && partitions.length >= 4) return
    const newPart = {
      name: `分区${partitions.length + 1}`,
      size: 20,
      type: '主分区',
      fs: 'ext4',
    }
    setPartitions([...partitions, newPart])
  }

  const removePartition = (idx: number) => {
    setPartitions(partitions.filter((_, i) => i !== idx))
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">磁盘管理可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['MBR', 'GPT'] as const).map(s => (
          <button
            key={s}
            onClick={() => setScheme(s)}
            className={`px-3 py-1 rounded text-sm transition-colors ${scheme === s
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
        {scheme === 'MBR'
          ? 'MBR: 最多4个主分区，最大2TB，传统BIOS'
          : 'GPT: 理论无限分区，支持>2TB，需要UEFI'
        }
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">磁盘分区</div>
        <div className="flex gap-1 h-16">
          <div className="w-8 bg-yellow-200 dark:bg-yellow-800 rounded flex items-center justify-center text-xs">
            MBR
          </div>
          {partitions.map((part, idx) => {
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
            return (
              <div
                key={idx}
                className="flex-1 rounded flex items-center justify-center text-white text-xs cursor-pointer hover:opacity-80"
                style={{ backgroundColor: colors[idx % colors.length] }}
                onClick={() => removePartition(idx)}
                title="点击删除"
              >
                {part.name}
              </div>
            )
          })}
          {scheme === 'MBR' && partitions.length < 4 && (
            <button
              onClick={addPartition}
              className="w-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              +
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">分区详情</div>
        <div className="space-y-1">
          {partitions.map((part, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
              <span>{part.name}</span>
              <span>{part.size}GB</span>
              <span>{part.type}</span>
              <span>{part.fs}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
