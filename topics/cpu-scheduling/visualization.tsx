'use client'

import React, { useState } from 'react'

interface Task {
  id: number
  name: string
  arrival: number
  burst: number
  color: string
}

const tasks: Task[] = [
  { id: 1, name: 'P1', arrival: 0, burst: 6, color: '#3b82f6' },
  { id: 2, name: 'P2', arrival: 1, burst: 3, color: '#8b5cf6' },
  { id: 3, name: 'P3', arrival: 2, burst: 2, color: '#10b981' },
  { id: 4, name: 'P4', arrival: 3, burst: 4, color: '#f59e0b' },
]

type Algorithm = 'fcfs' | 'sjf' | 'rr'

interface GanttItem {
  task: string
  start: number
  end: number
  color: string
}

function scheduleFCFS(tasks: Task[]): GanttItem[] {
  const sorted = [...tasks].sort((a, b) => a.arrival - b.arrival)
  const result: GanttItem[] = []
  let time = 0
  for (const t of sorted) {
    if (time < t.arrival) time = t.arrival
    result.push({ task: t.name, start: time, end: time + t.burst, color: t.color })
    time += t.burst
  }
  return result
}

function scheduleSJF(tasks: Task[]): GanttItem[] {
  const remaining = tasks.map(t => ({ ...t, remaining: t.burst }))
  const result: GanttItem[] = []
  let time = 0

  while (remaining.length > 0) {
    const available = remaining.filter(t => t.arrival <= time)
    if (available.length === 0) {
      time = Math.min(...remaining.map(t => t.arrival))
      continue
    }
    available.sort((a, b) => a.remaining - b.remaining)
    const task = available[0]
    result.push({ task: task.name, start: time, end: time + task.burst, color: task.color })
    time += task.burst
    remaining.splice(remaining.indexOf(task), 1)
  }
  return result
}

function scheduleRR(tasks: Task[], quantum: number): GanttItem[] {
  const queue = tasks.map(t => ({ ...t, remaining: t.burst }))
  const result: GanttItem[] = []
  let time = 0
  const ready: typeof queue = []
  const sorted = [...queue].sort((a, b) => a.arrival - b.arrival)
  let idx = 0

  while (idx < sorted.length && sorted[idx].arrival <= time) {
    ready.push(sorted[idx])
    idx++
  }

  while (ready.length > 0 || idx < sorted.length) {
    if (ready.length === 0) {
      time = sorted[idx].arrival
      while (idx < sorted.length && sorted[idx].arrival <= time) {
        ready.push(sorted[idx])
        idx++
      }
    }
    const task = ready.shift()!
    const exec = Math.min(quantum, task.remaining)
    result.push({ task: task.name, start: time, end: time + exec, color: task.color })
    time += exec
    task.remaining -= exec
    while (idx < sorted.length && sorted[idx].arrival <= time) {
      ready.push(sorted[idx])
      idx++
    }
    if (task.remaining > 0) ready.push(task)
  }
  return result
}

export default function CPUSchedulingVisualization() {
  const [algorithm, setAlgorithm] = useState<Algorithm>('fcfs')
  const [quantum, setQuantum] = useState(2)

  const gantt = algorithm === 'fcfs'
    ? scheduleFCFS(tasks)
    : algorithm === 'sjf'
    ? scheduleSJF(tasks)
    : scheduleRR(tasks, quantum)

  const maxTime = Math.max(...gantt.map(g => g.end))

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">CPU调度算法可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['fcfs', 'sjf', 'rr'] as const).map(algo => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              algorithm === algo
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {algo === 'fcfs' ? '先来先服务' : algo === 'sjf' ? '短作业优先' : '时间片轮转'}
          </button>
        ))}
      </div>

      {algorithm === 'rr' && (
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span>时间片:</span>
          <input
            type="range"
            min={1}
            max={4}
            value={quantum}
            onChange={e => setQuantum(Number(e.target.value))}
            className="w-24"
          />
          <span>{quantum}</span>
        </div>
      )}

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">进程信息</h4>
        <div className="grid grid-cols-4 gap-2">
          {tasks.map(t => (
            <div key={t.id} className="p-2 rounded border border-gray-200 dark:border-gray-700 text-sm">
              <div className="font-medium" style={{ color: t.color }}>{t.name}</div>
              <div className="text-xs text-gray-500">到达: {t.arrival} | 执行: {t.burst}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">甘特图</h4>
        <div className="relative h-16 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
          {gantt.map((item, idx) => (
            <div
              key={idx}
              className="absolute top-0 h-full flex items-center justify-center text-white text-xs font-medium transition-all duration-300"
              style={{
                left: `${(item.start / maxTime) * 100}%`,
                width: `${((item.end - item.start) / maxTime) * 100}%`,
                backgroundColor: item.color,
              }}
            >
              {item.task}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {Array.from({ length: maxTime + 1 }, (_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
