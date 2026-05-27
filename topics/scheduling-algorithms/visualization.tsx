'use client'

import React, { useState } from 'react'

interface Process {
  id: string
  arrival: number
  burst: number
  priority: number
  remaining: number
  waiting: number
  turnaround: number
  completion: number
}

const algorithms = ['FCFS', 'SJF', 'SRTF', 'RR', 'Priority'] as const
type Algorithm = typeof algorithms[number]

export default function SchedulingAlgorithmsVisualization() {
  const [algorithm, setAlgorithm] = useState<Algorithm>('FCFS')
  const [timeQuantum, setTimeQuantum] = useState(2)
  const [processes] = useState<Process[]>([
    { id: 'P1', arrival: 0, burst: 6, priority: 3, remaining: 6, waiting: 0, turnaround: 0, completion: 0 },
    { id: 'P2', arrival: 1, burst: 4, priority: 1, remaining: 4, waiting: 0, turnaround: 0, completion: 0 },
    { id: 'P3', arrival: 2, burst: 2, priority: 4, remaining: 2, waiting: 0, turnaround: 0, completion: 0 },
    { id: 'P4', arrival: 3, burst: 3, priority: 2, remaining: 3, waiting: 0, turnaround: 0, completion: 0 },
  ])

  const [gantt, setGantt] = useState<Array<{ id: string; start: number; end: number }>>([])
  const [results, setResults] = useState<Process[]>([])

  const simulate = () => {
    const procs = processes.map(p => ({ ...p, remaining: p.burst, waiting: 0, turnaround: 0, completion: 0 }))
    const timeline: Array<{ id: string; start: number; end: number }> = []
    let time = 0
    let completed = 0
    const n = procs.length

    if (algorithm === 'FCFS') {
      const sorted = [...procs].sort((a, b) => a.arrival - b.arrival)
      for (const p of sorted) {
        if (time < p.arrival) time = p.arrival
        timeline.push({ id: p.id, start: time, end: time + p.burst })
        time += p.burst
        p.completion = time
        p.turnaround = time - p.arrival
        p.waiting = p.turnaround - p.burst
      }
    } else if (algorithm === 'SJF') {
      const remaining = [...procs]
      while (completed < n) {
        const available = remaining.filter(p => p.arrival <= time && p.remaining > 0)
        if (available.length === 0) {
          time++
          continue
        }
        available.sort((a, b) => a.burst - b.burst)
        const p = available[0]
        timeline.push({ id: p.id, start: time, end: time + p.burst })
        time += p.burst
        p.completion = time
        p.turnaround = time - p.arrival
        p.waiting = p.turnaround - p.burst
        p.remaining = 0
        completed++
      }
    } else if (algorithm === 'SRTF') {
      const remaining = procs.map(p => ({ ...p }))
      while (completed < n) {
        const available = remaining.filter(p => p.arrival <= time && p.remaining > 0)
        if (available.length === 0) {
          time++
          continue
        }
        available.sort((a, b) => a.remaining - b.remaining)
        const p = available[0]
        const last = timeline[timeline.length - 1]
        if (last && last.id === p.id && last.end === time) {
          last.end++
        } else {
          timeline.push({ id: p.id, start: time, end: time + 1 })
        }
        p.remaining--
        time++
        if (p.remaining === 0) {
          p.completion = time
          p.turnaround = time - p.arrival
          p.waiting = p.turnaround - p.burst
          completed++
        }
      }
    } else if (algorithm === 'RR') {
      const queue: number[] = []
      const remaining = procs.map(p => ({ ...p }))
      const visited = new Set<number>()

      if (remaining[0].arrival <= time) {
        queue.push(0)
        visited.add(0)
      }

      while (completed < n) {
        if (queue.length === 0) {
          time++
          for (let i = 0; i < n; i++) {
            if (!visited.has(i) && remaining[i].arrival <= time && remaining[i].remaining > 0) {
              queue.push(i)
              visited.add(i)
            }
          }
          continue
        }

        const idx = queue.shift()!
        const p = remaining[idx]
        const execTime = Math.min(timeQuantum, p.remaining)
        timeline.push({ id: p.id, start: time, end: time + execTime })
        time += execTime
        p.remaining -= execTime

        for (let i = 0; i < n; i++) {
          if (!visited.has(i) && remaining[i].arrival <= time && remaining[i].remaining > 0) {
            queue.push(i)
            visited.add(i)
          }
        }

        if (p.remaining > 0) {
          queue.push(idx)
        } else {
          p.completion = time
          p.turnaround = time - p.arrival
          p.waiting = p.turnaround - p.burst
          completed++
        }
      }
    } else if (algorithm === 'Priority') {
      const remaining = procs.map(p => ({ ...p }))
      while (completed < n) {
        const available = remaining.filter(p => p.arrival <= time && p.remaining > 0)
        if (available.length === 0) {
          time++
          continue
        }
        available.sort((a, b) => a.priority - b.priority)
        const p = available[0]
        timeline.push({ id: p.id, start: time, end: time + p.burst })
        time += p.burst
        p.completion = time
        p.turnaround = time - p.arrival
        p.waiting = p.turnaround - p.burst
        p.remaining = 0
        completed++
      }
    }

    setGantt(timeline)
    setResults(procs)
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">调度算法可视化</h3>

      <div className="flex gap-2 mb-4">
        {algorithms.map(algo => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            className={`px-3 py-1 rounded text-sm transition-colors ${algorithm === algo
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {algo}
          </button>
        ))}
      </div>

      {algorithm === 'RR' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm">时间片:</span>
          <input
            type="number"
            min={1}
            max={10}
            value={timeQuantum}
            onChange={e => setTimeQuantum(Number(e.target.value))}
            className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
          />
        </div>
      )}

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">进程信息</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-3 py-2 text-left">进程</th>
                <th className="px-3 py-2 text-left">到达</th>
                <th className="px-3 py-2 text-left">执行</th>
                <th className="px-3 py-2 text-left">优先级</th>
              </tr>
            </thead>
            <tbody>
              {processes.map(p => (
                <tr key={p.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2 font-mono">{p.id}</td>
                  <td className="px-3 py-2">{p.arrival}</td>
                  <td className="px-3 py-2">{p.burst}</td>
                  <td className="px-3 py-2">{p.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={simulate}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        模拟调度
      </button>

      {gantt.length > 0 && (
        <div className="mb-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">甘特图</div>
          <div className="flex gap-0 overflow-x-auto">
            {gantt.map((g, idx) => {
              const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
              const procIdx = processes.findIndex(p => p.id === g.id)
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500">{g.start}</div>
                  <div
                    className="px-3 py-2 text-white text-sm font-mono"
                    style={{ backgroundColor: colors[procIdx % colors.length] }}
                  >
                    {g.id}
                  </div>
                </div>
              )
            })}
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500">{gantt[gantt.length - 1].end}</div>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">结果</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-3 py-2 text-left">进程</th>
                <th className="px-3 py-2 text-left">完成</th>
                <th className="px-3 py-2 text-left">周转</th>
                <th className="px-3 py-2 text-left">等待</th>
              </tr>
            </thead>
            <tbody>
              {results.map(p => (
                <tr key={p.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2 font-mono">{p.id}</td>
                  <td className="px-3 py-2">{p.completion}</td>
                  <td className="px-3 py-2">{p.turnaround}</td>
                  <td className="px-3 py-2">{p.waiting}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            平均等待: {(results.reduce((s, p) => s + p.waiting, 0) / results.length).toFixed(2)} |
            平均周转: {(results.reduce((s, p) => s + p.turnaround, 0) / results.length).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  )
}
