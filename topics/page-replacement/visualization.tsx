'use client'

import React, { useState, useEffect, useCallback } from 'react'

const algorithms = ['FIFO', 'LRU', 'Clock', 'OPT'] as const
type Algorithm = typeof algorithms[number]

interface PageFrame {
  page: number | null
  accessBit?: boolean
}

export default function PageReplacementVisualization() {
  const [algorithm, setAlgorithm] = useState<Algorithm>('FIFO')
  const [frames, setFrames] = useState<PageFrame[]>([
    { page: null }, { page: null }, { page: null }
  ])
  const [referenceString] = useState([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [faults, setFaults] = useState(0)
  const [hits, setHits] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(800)
  const [history, setHistory] = useState<Array<{ page: number, fault: boolean, frames: number[] }>>([])

  const frameCount = 3

  const reset = useCallback(() => {
    setFrames(Array.from({ length: frameCount }, () => ({ page: null, accessBit: false })))
    setCurrentIdx(0)
    setFaults(0)
    setHits(0)
    setPlaying(false)
    setHistory([])
  }, [])

  const simulateStep = useCallback(() => {
    if (currentIdx >= referenceString.length) {
      setPlaying(false)
      return
    }

    const page = referenceString[currentIdx]
    const currentPages = frames.map(f => f.page)
    const isHit = currentPages.includes(page)

    if (isHit) {
      setHits(h => h + 1)
      if (algorithm === 'LRU') {
        const idx = currentPages.indexOf(page)
        setFrames(prev => {
          const next = [...prev]
          next[idx] = { ...next[idx], page }
          return next
        })
      }
      if (algorithm === 'Clock') {
        const idx = currentPages.indexOf(page)
        setFrames(prev => {
          const next = [...prev]
          next[idx] = { ...next[idx], accessBit: true }
          return next
        })
      }
      setHistory(h => [...h, { page, fault: false, frames: currentPages as number[] }])
    } else {
      setFaults(f => f + 1)
      let replaceIdx = -1

      if (algorithm === 'FIFO') {
        const emptyIdx = currentPages.indexOf(null)
        if (emptyIdx !== -1) {
          replaceIdx = emptyIdx
        } else {
          replaceIdx = 0
        }
      } else if (algorithm === 'LRU') {
        const emptyIdx = currentPages.indexOf(null)
        if (emptyIdx !== -1) {
          replaceIdx = emptyIdx
        } else {
          replaceIdx = 0
        }
      } else if (algorithm === 'Clock') {
        const emptyIdx = currentPages.indexOf(null)
        if (emptyIdx !== -1) {
          replaceIdx = emptyIdx
        } else {
          let ptr = 0
          while (true) {
            if (!frames[ptr].accessBit) {
              replaceIdx = ptr
              break
            }
            setFrames(prev => {
              const next = [...prev]
              next[ptr] = { ...next[ptr], accessBit: false }
              return next
            })
            ptr = (ptr + 1) % frameCount
          }
        }
      } else if (algorithm === 'OPT') {
        const emptyIdx = currentPages.indexOf(null)
        if (emptyIdx !== -1) {
          replaceIdx = emptyIdx
        } else {
          let farthest = -1
          for (let i = 0; i < frameCount; i++) {
            const nextUse = referenceString.indexOf(currentPages[i]!, currentIdx + 1)
            if (nextUse === -1) {
              replaceIdx = i
              break
            }
            if (nextUse > farthest) {
              farthest = nextUse
              replaceIdx = i
            }
          }
          if (replaceIdx === -1) replaceIdx = 0
        }
      }

      setFrames(prev => {
        const next = [...prev]
        next[replaceIdx] = { page, accessBit: true }
        return next
      })
      setHistory(h => [...h, { page, fault: true, frames: currentPages.map((p, i) => i === replaceIdx ? page : p) as number[] }])
    }

    setCurrentIdx(i => i + 1)
  }, [currentIdx, frames, algorithm, referenceString])

  useEffect(() => {
    if (!playing) return
    if (currentIdx >= referenceString.length) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(simulateStep, speed)
    return () => clearTimeout(timer)
  }, [playing, currentIdx, speed, simulateStep, referenceString.length])

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">页面置换算法可视化</h3>

      <div className="flex gap-2 mb-4">
        {algorithms.map(algo => (
          <button
            key={algo}
            onClick={() => { setAlgorithm(algo); reset() }}
            className={`px-3 py-1 rounded text-sm transition-colors ${algorithm === algo
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {algo}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">引用串</div>
        <div className="flex flex-wrap gap-1">
          {referenceString.map((page, idx) => (
            <span
              key={idx}
              className={`w-8 h-8 flex items-center justify-center rounded text-sm font-mono ${idx === currentIdx - 1
                  ? 'bg-blue-600 text-white'
                  : idx < currentIdx
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
            >
              {page}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">物理帧</div>
          <div className="flex gap-2">
            {frames.map((frame, idx) => (
              <div
                key={idx}
                className="w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 transition-all duration-300"
              >
                <span className="text-2xl font-bold">
                  {frame.page !== null ? frame.page : '-'}
                </span>
                {algorithm === 'Clock' && frame.page !== null && (
                  <span className="text-xs text-gray-500">
                    {frame.accessBit ? '1' : '0'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setPlaying(!playing)}
          disabled={currentIdx >= referenceString.length}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '暂停' : '播放'}
        </button>
        <button
          onClick={simulateStep}
          disabled={playing || currentIdx >= referenceString.length}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors text-sm"
        >
          单步
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          重置
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span>速度</span>
          <input
            type="range"
            min={200}
            max={2000}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      <div className="flex gap-6 text-sm mb-4">
        <span>缺页: <strong className="text-red-600">{faults}</strong></span>
        <span>命中: <strong className="text-green-600">{hits}</strong></span>
        <span>缺页率: <strong>{currentIdx > 0 ? ((faults / currentIdx) * 100).toFixed(1) : 0}%</strong></span>
      </div>

      {history.length > 0 && (
        <div className="max-h-40 overflow-y-auto">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">历史记录</div>
          <div className="space-y-1">
            {history.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="w-6 text-center">{h.page}</span>
                <span className={h.fault ? 'text-red-600' : 'text-green-600'}>
                  {h.fault ? '缺页' : '命中'}
                </span>
                <span className="text-gray-500">
                  [{h.frames.map(f => f === null ? '-' : f).join(', ')}]
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
