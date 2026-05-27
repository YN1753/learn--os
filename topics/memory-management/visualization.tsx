'use client'

import React, { useState } from 'react'

interface Page {
  id: number
  processId: number | null
  color: string
}

export default function MemoryVisualization() {
  const totalPages = 16
  const [pages, setPages] = useState<Page[]>(
    Array.from({ length: totalPages }, (_, i) => ({
      id: i,
      processId: null,
      color: '#e5e7eb',
    }))
  )
  const [nextProc, setNextProc] = useState(1)

  const processColors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']

  function allocateMemory(procId: number, count: number) {
    setPages(prev => {
      const free = prev.filter(p => p.processId === null)
      if (free.length < count) return prev

      const next = prev.map(p => ({ ...p }))
      let allocated = 0
      for (const page of next) {
        if (page.processId === null && allocated < count) {
          page.processId = procId
          page.color = processColors[(procId - 1) % processColors.length]
          allocated++
        }
      }
      return next
    })
  }

  function freeMemory(procId: number) {
    setPages(prev =>
      prev.map(p =>
        p.processId === procId
          ? { ...p, processId: null, color: '#e5e7eb' }
          : p
      )
    )
  }

  function handleAllocate() {
    const count = Math.floor(Math.random() * 3) + 2
    allocateMemory(nextProc, count)
    setNextProc(n => n + 1)
  }

  const usedPages = pages.filter(p => p.processId !== null).length
  const freePages = totalPages - usedPages

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">内存分页管理模拟</h3>

      <div className="mb-4 text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          已用: {usedPages} 页 | 空闲: {freePages} 页 | 总计: {totalPages} 页
        </span>
      </div>

      <div className="grid grid-cols-8 gap-2 mb-6">
        {pages.map(page => (
          <div
            key={page.id}
            className="aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: page.color,
              color: page.processId ? 'white' : '#9ca3af',
            }}
            onClick={() => page.processId && freeMemory(page.processId)}
            title={page.processId ? `进程 ${page.processId} - 点击释放` : '空闲页框'}
          >
            {page.processId ? `P${page.processId}` : page.id}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handleAllocate}
          disabled={freePages === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          分配内存给新进程
        </button>
        <button
          onClick={() => setPages(prev => prev.map(p => ({ ...p, processId: null, color: '#e5e7eb' })))}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          清空所有
        </button>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        每个方块代表一个页框（4KB）。点击"分配内存"为新进程分配随机数量的页框，点击已分配的页框可以释放。
      </div>
    </div>
  )
}
