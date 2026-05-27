'use client'

import React, { useState, useEffect } from 'react'

interface Thread {
  id: number
  name: string
  holds: number[]
  waiting: number | null
  color: string
}

interface Resource {
  id: number
  name: string
  heldBy: number | null
}

export default function DeadlockVisualization() {
  const [threads, setThreads] = useState<Thread[]>([
    { id: 1, name: '线程A', holds: [], waiting: null, color: '#3b82f6' },
    { id: 2, name: '线程B', holds: [], waiting: null, color: '#8b5cf6' },
  ])
  const [resources] = useState<Resource[]>([
    { id: 1, name: '资源1（筷子）', heldBy: null },
    { id: 2, name: '资源2（碗）', heldBy: null },
  ])
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [deadlock, setDeadlock] = useState(false)
  const [speed, setSpeed] = useState(1500)

  const scenario = [
    { action: '线程A 请求资源1', thread: 1, resource: 1, type: 'acquire' },
    { action: '线程A 获得资源1', thread: 1, resource: 1, type: 'hold' },
    { action: '线程B 请求资源2', thread: 2, resource: 2, type: 'acquire' },
    { action: '线程B 获得资源2', thread: 2, resource: 2, type: 'hold' },
    { action: '线程A 请求资源2（被线程B持有）', thread: 1, resource: 2, type: 'wait' },
    { action: '线程A 等待资源2...', thread: 1, resource: 2, type: 'waiting' },
    { action: '线程B 请求资源1（被线程A持有）', thread: 2, resource: 1, type: 'wait' },
    { action: '死锁！两个线程互相等待', thread: 0, resource: 0, type: 'deadlock' },
  ]

  useEffect(() => {
    if (!playing || step >= scenario.length) {
      if (step >= scenario.length) setPlaying(false)
      return
    }

    const timer = setTimeout(() => {
      const s = scenario[step]
      setThreads(prev => {
        const next = prev.map(t => ({ ...t, holds: [...t.holds] }))
        if (s.type === 'hold') {
          const t = next.find(t => t.id === s.thread)!
          t.holds.push(s.resource)
          t.waiting = null
        } else if (s.type === 'wait' || s.type === 'waiting') {
          const t = next.find(t => t.id === s.thread)!
          t.waiting = s.resource
        } else if (s.type === 'deadlock') {
          setDeadlock(true)
        }
        return next
      })
      setStep(st => st + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [playing, step, speed])

  function handlePlay() {
    setThreads([
      { id: 1, name: '线程A', holds: [], waiting: null, color: '#3b82f6' },
      { id: 2, name: '线程B', holds: [], waiting: null, color: '#8b5cf6' },
    ])
    setStep(0)
    setDeadlock(false)
    setPlaying(true)
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">死锁模拟</h3>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400">线程</h4>
          {threads.map(t => (
            <div
              key={t.id}
              className="p-3 rounded-lg border mb-2 transition-all duration-300"
              style={{
                borderColor: deadlock ? '#ef4444' : t.color,
                backgroundColor: deadlock ? '#fef2f2' : 'transparent',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium" style={{ color: t.color }}>{t.name}</span>
                {t.waiting && <span className="text-xs text-red-500">等待资源{t.waiting}</span>}
              </div>
              <div className="text-xs text-gray-500">
                持有: {t.holds.length > 0 ? t.holds.map(r => `资源${r}`).join(', ') : '无'}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-gray-600 dark:text-gray-400">资源</h4>
          {resources.map(r => {
            const holder = threads.find(t => t.holds.includes(r.id))
            return (
              <div key={r.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 mb-2">
                <div className="font-medium text-sm">{r.name}</div>
                <div className="text-xs text-gray-500">
                  {holder ? `被 ${holder.name} 持有` : '空闲'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {deadlock && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 mb-4">
          <p className="text-red-600 dark:text-red-400 font-medium">死锁发生！</p>
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">
            线程A持有资源1等待资源2，线程B持有资源2等待资源1，形成循环等待。
          </p>
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlay}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '模拟中...' : '开始模拟'}
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
            min={500}
            max={3000}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      {step > 0 && step <= scenario.length && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          步骤 {step}/{scenario.length}：{scenario[step - 1].action}
        </div>
      )}
    </div>
  )
}
