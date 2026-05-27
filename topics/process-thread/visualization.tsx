'use client'

import React, { useState, useEffect } from 'react'

interface Process {
  id: number
  name: string
  state: 'ready' | 'running' | 'blocked' | 'done'
  progress: number
  color: string
}

export default function ProcessVisualization() {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, name: '浏览器', state: 'ready', progress: 0, color: '#3b82f6' },
    { id: 2, name: '编辑器', state: 'ready', progress: 0, color: '#8b5cf6' },
    { id: 3, name: '音乐播放器', state: 'ready', progress: 0, color: '#10b981' },
  ])
  const [runningId, setRunningId] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(0)
  const [speed, setSpeed] = useState(800)
  const [quantum, setQuantum] = useState(3)

  const schedule = [
    { run: 1, steps: 3 },
    { run: 2, steps: 3 },
    { run: 3, steps: 3 },
    { run: 1, steps: 3 },
    { run: 2, steps: 3 },
    { run: 3, steps: 2 },
  ]

  useEffect(() => {
    if (!playing) return

    const timer = setTimeout(() => {
      setProcesses(prev => {
        const next = prev.map(p => ({ ...p }))
        const running = next.find(p => p.state === 'running')
        if (running) {
          running.progress += 1
          if (running.progress >= 10) {
            running.state = 'done'
            setRunningId(null)
          } else {
            running.state = 'ready'
            setRunningId(null)
          }
        }

        const schedIdx = step % schedule.length
        const { run } = schedule[schedIdx]
        const target = next.find(p => p.id === run && p.state === 'ready')
        if (target) {
          target.state = 'running'
          setRunningId(target.id)
        }

        setStep(s => s + 1)
        return next
      })
    }, speed)

    return () => clearTimeout(timer)
  }, [playing, step, speed])

  function handlePlay() {
    setProcesses([
      { id: 1, name: '浏览器', state: 'ready', progress: 0, color: '#3b82f6' },
      { id: 2, name: '编辑器', state: 'ready', progress: 0, color: '#8b5cf6' },
      { id: 3, name: '音乐播放器', state: 'ready', progress: 0, color: '#10b981' },
    ])
    setStep(0)
    setRunningId(null)
    setPlaying(true)
  }

  const stateColors: Record<string, string> = {
    ready: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    running: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    blocked: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    done: 'bg-gray-100 dark:bg-gray-800 text-gray-500',
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">进程调度模拟（时间片轮转）</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {processes.map(p => (
          <div key={p.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{p.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${stateColors[p.state]}`}>
                {p.state === 'ready' ? '就绪' : p.state === 'running' ? '运行中' : p.state === 'blocked' ? '阻塞' : '完成'}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: `${p.progress * 10}%`, backgroundColor: p.color }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">进度: {p.progress}/10</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlay}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '运行中...' : '开始调度'}
        </button>
        <button
          onClick={() => setPlaying(false)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          暂停
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

      <div className="text-sm text-gray-600 dark:text-gray-400">
        当前时间片轮转：浏览器 → 编辑器 → 音乐播放器，每个进程执行 3 个时间单位后切换。
      </div>
    </div>
  )
}
