'use client'

import React, { useState, useEffect } from 'react'

type Model = 'threadpool' | 'coroutine' | 'async'

export default function ConcurrencyModelsVisualization() {
  const [model, setModel] = useState<Model>('threadpool')
  const [tasks, setTasks] = useState<{ id: number; status: 'waiting' | 'running' | 'done'; worker?: number }[]>([])
  const [workers, setWorkers] = useState<{ id: number; busy: boolean; taskId?: number }[]>([])
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(0)

  const workerCount = model === 'threadpool' ? 3 : model === 'coroutine' ? 1 : 1
  const taskCount = 8

  useEffect(() => {
    setTasks(Array.from({ length: taskCount }, (_, i) => ({ id: i + 1, status: 'waiting' })))
    setWorkers(Array.from({ length: workerCount }, (_, i) => ({ id: i + 1, busy: false })))
    setStep(0)
    setPlaying(false)
  }, [model])

  useEffect(() => {
    if (!playing) return

    const timer = setTimeout(() => {
      setTasks(prev => {
        const next = prev.map(t => ({ ...t }))
        const nextWorkers = workers.map(w => ({ ...w }))

        // 完成正在运行的任务
        for (const w of nextWorkers) {
          if (w.busy && w.taskId) {
            const task = next.find(t => t.id === w.taskId)
            if (task && Math.random() > 0.5) {
              task.status = 'done'
              w.busy = false
              w.taskId = undefined
            }
          }
        }

        // 分配新任务
        for (const task of next) {
          if (task.status === 'waiting') {
            const freeWorker = nextWorkers.find(w => !w.busy)
            if (freeWorker) {
              task.status = 'running'
              task.worker = freeWorker.id
              freeWorker.busy = true
              freeWorker.taskId = task.id
            }
          }
        }

        setWorkers(nextWorkers)
        return next
      })
      setStep(s => s + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [playing, step, workers])

  const statusColors = {
    waiting: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    running: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    done: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">并发编程模型对比</h3>

      <div className="flex gap-2 mb-6">
        {(['threadpool', 'coroutine', 'async'] as const).map(m => (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${model === m ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600'}`}
          >
            {m === 'threadpool' ? '线程池' : m === 'coroutine' ? '协程' : '异步IO'}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
          {model === 'threadpool' ? '线程池 (3个线程)' : model === 'coroutine' ? '协程 (单线程)' : '异步IO (单线程)'}
        </h4>
        <div className="flex gap-2">
          {workers.map(w => (
            <div key={w.id} className={`flex-1 p-2 rounded-lg text-center text-xs font-medium transition-all duration-300 ${w.busy ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
              {model === 'threadpool' ? `线程${w.id}` : model === 'coroutine' ? '协程调度器' : '事件循环'}
              {w.busy && <div className="text-xs mt-1">任务{w.taskId}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">任务队列</h4>
        <div className="grid grid-cols-4 gap-2">
          {tasks.map(t => (
            <div key={t.id} className={`p-2 rounded-lg text-center text-xs font-medium transition-all duration-300 ${statusColors[t.status]}`}>
              任务{t.id}
              {t.status === 'running' && <div className="text-xs mt-0.5">→ 工作者{t.worker}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setPlaying(true)}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '运行中...' : '开始运行'}
        </button>
        <button
          onClick={() => { setPlaying(false); setTasks(Array.from({ length: taskCount }, (_, i) => ({ id: i + 1, status: 'waiting' }))); setWorkers(Array.from({ length: workerCount }, (_, i) => ({ id: i + 1, busy: false }))); setStep(0) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          重置
        </button>
      </div>

      <div className="text-xs text-gray-500">
        {model === 'threadpool' && '线程池：多个线程并行处理任务，适合CPU密集型'}
        {model === 'coroutine' && '协程：单线程内多个协程交替执行，IO时切换，适合IO密集型'}
        {model === 'async' && '异步IO：事件驱动，IO完成后回调，非阻塞'}
      </div>
    </div>
  )
}
