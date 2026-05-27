'use client'

import React, { useState, useEffect, useCallback } from 'react'

const algorithms = ['FCFS', 'SSTF', 'SCAN', 'C-SCAN', 'LOOK'] as const
type Algorithm = typeof algorithms[number]

export default function DiskSchedulingVisualization() {
  const [algorithm, setAlgorithm] = useState<Algorithm>('SCAN')
  const [requests] = useState([98, 183, 37, 122, 14, 124, 65, 67])
  const [head, setHead] = useState(53)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [sequence, setSequence] = useState<number[]>([53])
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(600)
  const [totalMovement, setTotalMovement] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('up')

  const reset = useCallback(() => {
    setHead(53)
    setCurrentIdx(0)
    setSequence([53])
    setPlaying(false)
    setTotalMovement(0)
    setDirection('up')
  }, [])

  const getFullSequence = useCallback((): number[] => {
    const reqs = [...requests]
    let pos = 53
    const seq = [pos]

    if (algorithm === 'FCFS') {
      for (const r of reqs) {
        seq.push(r)
      }
    } else if (algorithm === 'SSTF') {
      const remaining = [...reqs]
      while (remaining.length > 0) {
        let minDist = Infinity
        let minIdx = 0
        for (let i = 0; i < remaining.length; i++) {
          const dist = Math.abs(remaining[i] - pos)
          if (dist < minDist) {
            minDist = dist
            minIdx = i
          }
        }
        pos = remaining[minIdx]
        seq.push(pos)
        remaining.splice(minIdx, 1)
      }
    } else if (algorithm === 'SCAN') {
      const sorted = [...reqs].sort((a, b) => a - b)
      const left = sorted.filter(r => r < pos).reverse()
      const right = sorted.filter(r => r >= pos)
      for (const r of right) {
        seq.push(r)
      }
      for (const r of left) {
        seq.push(r)
      }
    } else if (algorithm === 'C-SCAN') {
      const sorted = [...reqs].sort((a, b) => a - b)
      const right = sorted.filter(r => r >= pos)
      const left = sorted.filter(r => r < pos)
      for (const r of right) {
        seq.push(r)
      }
      for (const r of left) {
        seq.push(r)
      }
    } else if (algorithm === 'LOOK') {
      const sorted = [...reqs].sort((a, b) => a - b)
      const left = sorted.filter(r => r < pos).reverse()
      const right = sorted.filter(r => r >= pos)
      for (const r of right) {
        seq.push(r)
      }
      for (const r of left) {
        seq.push(r)
      }
    }

    return seq
  }, [algorithm, requests])

  const simulateStep = useCallback(() => {
    const fullSeq = getFullSequence()
    if (currentIdx + 1 >= fullSeq.length) {
      setPlaying(false)
      return
    }

    const nextPos = fullSeq[currentIdx + 1]
    setTotalMovement(m => m + Math.abs(nextPos - sequence[sequence.length - 1]))
    setHead(nextPos)
    setSequence(s => [...s, nextPos])
    setCurrentIdx(i => i + 1)
  }, [currentIdx, getFullSequence, sequence])

  useEffect(() => {
    if (!playing) return
    const fullSeq = getFullSequence()
    if (currentIdx + 1 >= fullSeq.length) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(simulateStep, speed)
    return () => clearTimeout(timer)
  }, [playing, currentIdx, speed, simulateStep, getFullSequence])

  const fullSeq = getFullSequence()

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">磁盘调度算法可视化</h3>

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
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          请求队列: [{requests.join(', ')}] | 初始位置: {head}
        </div>
      </div>

      <div className="relative h-12 mb-6">
        <div className="absolute inset-x-0 top-1/2 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
        {requests.map((req, idx) => (
          <div
            key={idx}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500"
            style={{ left: `${(req / 200) * 100}%` }}
            title={`请求 ${req}`}
          />
        ))}
        {sequence.map((pos, idx) => (
          <div
            key={idx}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"
            style={{ left: `${(pos / 200) * 100}%`, opacity: idx === sequence.length - 1 ? 1 : 0.3 }}
          />
        ))}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-white dark:border-gray-900 transition-all duration-300"
          style={{ left: `${(head / 200) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setPlaying(!playing)}
          disabled={currentIdx + 1 >= fullSeq.length}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '暂停' : '播放'}
        </button>
        <button
          onClick={simulateStep}
          disabled={playing || currentIdx + 1 >= fullSeq.length}
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
        <span>总移动距离: <strong>{totalMovement}</strong></span>
        <span>当前位置: <strong>{head}</strong></span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        访问序列: {sequence.join(' → ')}
      </div>
    </div>
  )
}
