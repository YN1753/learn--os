'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface Task {
  id: string
  period: number
  execution: number
  deadline: number
  remaining: number
  nextArrival: number
  color: string
}

export default function RealTimeSystemsVisualization() {
  const [tasks] = useState<Task[]>([
    { id: 'T1', period: 5, execution: 2, deadline: 5, remaining: 0, nextArrival: 0, color: '#3b82f6' },
    { id: 'T2', period: 10, execution: 3, deadline: 10, remaining: 0, nextArrival: 0, color: '#10b981' },
    { id: 'T3', period: 20, execution: 4, deadline: 20, remaining: 0, nextArrival: 0, color: '#f59e0b' },
  ])
  const [time, setTime] = useState(0)
  const [schedule, setSchedule] = useState<string[]>([])
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [algorithm, setAlgorithm] = useState<'RMS' | 'EDF'>('RMS')

  const reset = useCallback(() => {
    setTime(0)
    setSchedule([])
    setPlaying(false)
    tasks.forEach(t => {
      t.remaining = 0
      t.nextArrival = 0
    })
  }, [tasks])

  const simulateStep = useCallback(() => {
    const readyTasks = tasks.filter(t => t.remaining > 0)

    if (readyTasks.length === 0) {
      setSchedule(prev => [...prev, '空闲'])
    } else {
      let selected: Task
      if (algorithm === 'RMS') {
        selected = readyTasks.reduce((a, b) => a.period < b.period ? a : b)
      } else {
        selected = readyTasks.reduce((a, b) => a.deadline < b.deadline ? a : b)
      }
      selected.remaining--
      setSchedule(prev => [...prev, selected.id])

      if (selected.remaining === 0) {
        selected.deadline = selected.nextArrival + selected.period
      }
    }

    tasks.forEach(t => {
      if (time === t.nextArrival) {
        t.remaining = t.execution
        t.nextArrival += t.period
        t.deadline = t.nextArrival
      }
    })

    setTime(t => t + 1)
  }, [time, tasks, algorithm])

  useEffect(() => {
    if (!playing) return
    if (time >= 40) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(simulateStep, speed)
    return () => clearTimeout(timer)
  }, [playing, time, speed, simulateStep])

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">实时系统调度可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['RMS', 'EDF'] as const).map(algo => (
          <button
            key={algo}
            onClick={() => { setAlgorithm(algo); reset() }}
            className={`px-3 py-1 rounded text-sm transition-colors ${algorithm === algo
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {algo === 'RMS' ? '速率单调 (RMS)' : '最早截止时间 (EDF)'}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">任务信息</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-3 py-2 text-left">任务</th>
                <th className="px-3 py-2 text-left">周期</th>
                <th className="px-3 py-2 text-left">执行时间</th>
                <th className="px-3 py-2 text-left">CPU利用率</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2 font-mono" style={{ color: t.color }}>{t.id}</td>
                  <td className="px-3 py-2">{t.period}</td>
                  <td className="px-3 py-2">{t.execution}</td>
                  <td className="px-3 py-2">{((t.execution / t.period) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            总CPU利用率: {(tasks.reduce((s, t) => s + t.execution / t.period, 0) * 100).toFixed(1)}%
            {algorithm === 'RMS' && tasks.reduce((s, t) => s + t.execution / t.period, 0) > 0.69 && (
              <span className="text-red-600 ml-2">（超过RMS理论上限69%）</span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">调度时间线</div>
        <div className="flex gap-0 overflow-x-auto">
          {schedule.map((task, idx) => (
            <div
              key={idx}
              className="w-6 h-8 flex items-center justify-center text-white text-xs font-mono"
              style={{
                backgroundColor: task === '空闲' ? '#6b7280' : tasks.find(t => t.id === task)?.color
              }}
              title={`时间 ${idx}: ${task}`}
            >
              {task === '空闲' ? '-' : task.charAt(1)}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500 mt-1">时间: {time}</div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setPlaying(!playing)}
          disabled={time >= 40}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '暂停' : '播放'}
        </button>
        <button
          onClick={simulateStep}
          disabled={playing || time >= 40}
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
            min={100}
            max={1000}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}
