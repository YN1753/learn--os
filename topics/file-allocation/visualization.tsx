'use client'

import React, { useState } from 'react'

type Method = 'contiguous' | 'linked' | 'indexed'

interface DiskBlock {
  id: number
  content: string | null
  nextBlock: number | null
  isIndex: boolean
}

export default function FileAllocationVisualization() {
  const [method, setMethod] = useState<Method>('contiguous')
  const [blocks, setBlocks] = useState<DiskBlock[]>([])
  const [files, setFiles] = useState<{ name: string; blocks: number[] }[]>([])

  const initBlocks = () => {
    const newBlocks: DiskBlock[] = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      content: null,
      nextBlock: null,
      isIndex: false,
    }))
    setBlocks(newBlocks)
    setFiles([])
  }

  const allocateFile = (name: string, size: number) => {
    if (blocks.length === 0) initBlocks()

    const newBlocks = [...blocks]
    const fileBlocks: number[] = []

    if (method === 'contiguous') {
      let start = -1
      let count = 0
      for (let i = 0; i < newBlocks.length; i++) {
        if (newBlocks[i].content === null) {
          if (start === -1) start = i
          count++
          if (count === size) break
        } else {
          start = -1
          count = 0
        }
      }

      if (count < size) return

      for (let i = start; i < start + size; i++) {
        newBlocks[i].content = name
        fileBlocks.push(i)
      }
    } else if (method === 'linked') {
      const freeBlocks = newBlocks.filter(b => b.content === null)
      if (freeBlocks.length < size) return

      let prevIdx = -1
      for (let i = 0; i < size; i++) {
        const block = freeBlocks[i]
        const idx = newBlocks.findIndex(b => b.id === block.id)
        newBlocks[idx].content = name
        fileBlocks.push(idx)

        if (prevIdx !== -1) {
          newBlocks[prevIdx].nextBlock = idx
        }
        prevIdx = idx
      }
    } else if (method === 'indexed') {
      const freeBlocks = newBlocks.filter(b => b.content === null)
      if (freeBlocks.length < size + 1) return

      const indexBlock = freeBlocks[0]
      const idx = newBlocks.findIndex(b => b.id === indexBlock.id)
      newBlocks[idx].content = `${name}-索引`
      newBlocks[idx].isIndex = true
      fileBlocks.push(idx)

      for (let i = 1; i <= size; i++) {
        const block = freeBlocks[i]
        const blockIdx = newBlocks.findIndex(b => b.id === block.id)
        newBlocks[blockIdx].content = name
        fileBlocks.push(blockIdx)
      }
    }

    setBlocks(newBlocks)
    setFiles(prev => [...prev, { name, blocks: fileBlocks }])
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">文件分配策略可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['contiguous', 'linked', 'indexed'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMethod(m); initBlocks() }}
            className={`px-3 py-1 rounded text-sm transition-colors ${method === m
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {m === 'contiguous' ? '连续分配' : m === 'linked' ? '链接分配' : '索引分配'}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">磁盘块</div>
        <div className="grid grid-cols-8 gap-2">
          {blocks.map(block => (
            <div
              key={block.id}
              className={`p-2 rounded text-center text-xs font-mono transition-all ${block.content
                  ? block.isIndex
                    ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                    : 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
            >
              <div>{block.id}</div>
              {block.content && <div className="truncate">{block.content}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => allocateFile('文件A', 3)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          创建文件A (3块)
        </button>
        <button
          onClick={() => allocateFile('文件B', 2)}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          创建文件B (2块)
        </button>
        <button
          onClick={() => allocateFile('文件C', 4)}
          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
        >
          创建文件C (4块)
        </button>
        <button
          onClick={initBlocks}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          重置
        </button>
      </div>

      {files.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">已分配文件</div>
          <div className="space-y-1">
            {files.map((f, idx) => (
              <div key={idx} className="text-sm">
                {f.name}: 块 {f.blocks.join(' → ')}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
