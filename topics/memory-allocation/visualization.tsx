'use client'

import React, { useState } from 'react'

type Strategy = 'first-fit' | 'best-fit' | 'worst-fit'

interface Block {
  id: number
  size: number
  allocated: boolean
  process: string | null
}

export default function MemoryAllocationVisualization() {
  const [strategy, setStrategy] = useState<Strategy>('first-fit')
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, size: 100, allocated: false, process: null },
    { id: 2, size: 50, allocated: true, process: 'P1' },
    { id: 3, size: 200, allocated: false, process: null },
    { id: 4, size: 30, allocated: true, process: 'P2' },
    { id: 5, size: 150, allocated: false, process: null },
  ])
  const [processSize, setProcessSize] = useState(80)
  const [log, setLog] = useState<string[]>([])

  const allocate = () => {
    let idx = -1

    if (strategy === 'first-fit') {
      idx = blocks.findIndex(b => !b.allocated && b.size >= processSize)
    } else if (strategy === 'best-fit') {
      let minDiff = Infinity
      blocks.forEach((b, i) => {
        if (!b.allocated && b.size >= processSize) {
          const diff = b.size - processSize
          if (diff < minDiff) {
            minDiff = diff
            idx = i
          }
        }
      })
    } else if (strategy === 'worst-fit') {
      let maxSize = 0
      blocks.forEach((b, i) => {
        if (!b.allocated && b.size >= processSize && b.size > maxSize) {
          maxSize = b.size
          idx = i
        }
      })
    }

    if (idx === -1) {
      setLog(prev => [...prev, `分配失败：没有足够大的空闲块（需要 ${processSize}）`])
      return
    }

    const newBlocks = [...blocks]
    const block = newBlocks[idx]

    if (block.size > processSize + 10) {
      newBlocks.splice(idx + 1, 0, {
        id: Date.now(),
        size: block.size - processSize,
        allocated: false,
        process: null,
      })
    }

    block.size = Math.max(block.size, processSize)
    block.allocated = true
    block.process = `P${Date.now() % 100}`

    setBlocks(newBlocks)
    setLog(prev => [...prev, `分配成功：${processSize}KB 到块 ${block.id}（剩余 ${block.size - processSize}KB）`])
  }

  const deallocate = (id: number) => {
    const newBlocks = blocks.map(b =>
      b.id === id ? { ...b, allocated: false, process: null } : b
    )
    setBlocks(newBlocks)
    setLog(prev => [...prev, `释放块 ${id}`])
  }

  const compact = () => {
    const allocated = blocks.filter(b => b.allocated)
    const totalFree = blocks.filter(b => !b.allocated).reduce((s, b) => s + b.size, 0)
    const newBlocks = [
      ...allocated,
      { id: Date.now(), size: totalFree, allocated: false, process: null },
    ]
    setBlocks(newBlocks)
    setLog(prev => [...prev, `紧凑完成：合并所有空闲区为 ${totalFree}KB`])
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">内存分配策略可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['first-fit', 'best-fit', 'worst-fit'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStrategy(s)}
            className={`px-3 py-1 rounded text-sm transition-colors ${strategy === s
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {s === 'first-fit' ? '首次适应' : s === 'best-fit' ? '最佳适应' : '最坏适应'}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">内存布局</div>
        <div className="flex gap-1 h-20">
          {blocks.map(block => (
            <div
              key={block.id}
              className={`flex-1 flex items-center justify-center rounded text-xs font-mono cursor-pointer transition-all ${block.allocated
                  ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              onClick={() => block.allocated && deallocate(block.id)}
              title={block.allocated ? `点击释放 ${block.process}` : '空闲'}
            >
              <div className="text-center">
                <div>{block.size}KB</div>
                {block.process && <div className="text-xs">{block.process}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">进程大小:</span>
          <input
            type="number"
            min={10}
            max={200}
            value={processSize}
            onChange={e => setProcessSize(Number(e.target.value))}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          />
          <span className="text-sm">KB</span>
        </div>
        <button
          onClick={allocate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          分配
        </button>
        <button
          onClick={compact}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          紧凑
        </button>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">操作日志</div>
        <div className="h-24 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {log.length === 0 ? (
            <div className="text-sm text-gray-400">点击分配按钮...</div>
          ) : (
            <div className="space-y-1">
              {log.map((entry, idx) => (
                <div key={idx} className="text-sm">{entry}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
