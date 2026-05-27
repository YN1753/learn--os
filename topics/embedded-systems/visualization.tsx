'use client'

import React, { useState, useEffect } from 'react'

export default function EmbeddedSystemsVisualization() {
  const [tasks, setTasks] = useState([
    { id: 1, name: '传感器采集', period: 100, priority: 1, color: '#ef4444' },
    { id: 2, name: '数据处理', period: 200, priority: 2, color: '#3b82f6' },
    { id: 3, name: '通信发送', period: 500, priority: 3, color: '#10b981' },
    { id: 4, name: '显示更新', period: 1000, priority: 4, color: '#f59e0b' },
  ])
  const [currentTime, setCurrentTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [selectedTask, setSelectedTask] = useState<number | null>(null)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setCurrentTime(t => t + 10)
    }, 100)
    return () => clearInterval(interval)
  }, [running])

  const isTaskActive = (task: typeof tasks[0]) => {
    return currentTime % task.period < task.period * 0.3
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">嵌入式实时任务调度</h3>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">系统资源</div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">64KB</div>
            <div className="text-xs text-gray-500">RAM</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">256KB</div>
            <div className="text-xs text-gray-500">Flash</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">72MHz</div>
            <div className="text-xs text-gray-500">CPU</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-600">3.3V</div>
            <div className="text-xs text-gray-500">电压</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">实时任务</div>
        <div className="space-y-2">
          {tasks.map(task => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task.id === selectedTask ? null : task.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${selectedTask === task.id ? 'ring-2 ring-blue-500' : ''}`}
              style={{
                backgroundColor: isTaskActive(task) ? `${task.color}20` : undefined,
                borderLeft: `4px solid ${task.color}`
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-sm">{task.name}</span>
                  <span className="ml-2 text-xs text-gray-500">周期: {task.period}ms</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs ${isTaskActive(task) ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                  {isTaskActive(task) ? '运行中' : '等待'}
                </span>
              </div>
              {selectedTask === task.id && (
                <div className="mt-2 text-xs text-gray-500">
                  优先级: {task.id} | 周期: {task.period}ms | 最坏执行时间: {Math.round(task.period * 0.3)}ms
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-1">时间线: {currentTime}ms</div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
          {tasks.map(task => (
            <div
              key={task.id}
              className="absolute h-2 rounded-full transition-all duration-100"
              style={{
                width: `${(task.period / 1000) * 100}%`,
                top: `${(task.id - 1) * 8}px`,
                backgroundColor: isTaskActive(task) ? task.color : 'transparent',
                opacity: 0.8
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className={`px-4 py-2 rounded-lg text-sm ${running ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}
        >
          {running ? '暂停' : '运行'}
        </button>
        <button
          onClick={() => { setCurrentTime(0); setRunning(false) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
