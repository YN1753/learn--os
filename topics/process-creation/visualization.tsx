'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface Process {
  id: number
  name: string
  parentId: number | null
  state: 'new' | 'running' | 'ready' | 'blocked' | 'zombie'
  children: number[]
}

export default function ProcessCreationVisualization() {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, name: 'init', parentId: null, state: 'running', children: [] }
  ])
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)
  const [nextId, setNextId] = useState(2)

  const steps = [
    { action: 'fork', desc: 'init 调用 fork() 创建子进程' },
    { action: 'exec', desc: '子进程调用 exec("shell") 替换为 shell' },
    { action: 'fork', desc: 'shell 调用 fork() 创建子进程' },
    { action: 'exec', desc: '子进程调用 exec("ls") 执行 ls 命令' },
    { action: 'exit', desc: 'ls 进程执行完毕，调用 exit()' },
    { action: 'wait', desc: 'shell 调用 wait() 回收 ls 子进程' },
  ]

  const reset = useCallback(() => {
    setProcesses([{ id: 1, name: 'init', parentId: null, state: 'running', children: [] }])
    setStep(-1)
    setPlaying(false)
    setNextId(2)
  }, [])

  useEffect(() => {
    if (!playing) return
    if (step >= steps.length - 1) {
      setPlaying(false)
      return
    }

    const timer = setTimeout(() => {
      const nextStep = step + 1
      setStep(nextStep)
      const action = steps[nextStep].action

      if (action === 'fork') {
        const parent = processes.find(p => p.state === 'running')!
        const newProcess: Process = {
          id: nextId,
          name: `P${nextId}`,
          parentId: parent.id,
          state: 'new',
          children: [],
        }
        setProcesses(prev => prev.map(p =>
          p.id === parent.id
            ? { ...p, children: [...p.children, nextId] }
            : p
        ).concat(newProcess))
        setNextId(id => id + 1)
      } else if (action === 'exec') {
        setProcesses(prev => prev.map(p =>
          p.state === 'new' ? { ...p, name: nextStep === 1 ? 'shell' : 'ls', state: 'running' as const } : p
        ))
      } else if (action === 'exit') {
        setProcesses(prev => prev.map(p =>
          p.name === 'ls' ? { ...p, state: 'zombie' as const } : p
        ))
      } else if (action === 'wait') {
        setProcesses(prev => prev.filter(p => p.state !== 'zombie'))
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [playing, step, speed, processes, nextId, steps])

  const stateColors = {
    new: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    running: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    ready: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    blocked: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
    zombie: 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300',
  }

  const stateLabels = {
    new: '新建',
    running: '运行',
    ready: '就绪',
    blocked: '阻塞',
    zombie: '僵尸',
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">进程创建可视化</h3>

      <div className="mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">进程树</div>
        <div className="space-y-2">
          {processes.map(proc => (
            <div
              key={proc.id}
              className="flex items-center gap-2"
              style={{ marginLeft: proc.parentId ? '2rem' : 0 }}
            >
              {proc.parentId && <span className="text-gray-400">└─</span>}
              <div className={`px-3 py-1 rounded ${stateColors[proc.state]}`}>
                <span className="font-mono text-sm">{proc.name}</span>
                <span className="ml-2 text-xs">({stateLabels[proc.state]})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">执行步骤</div>
        <div className="space-y-2">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all duration-300 ${step >= idx
                  ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-50'
                }`}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              {s.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setPlaying(!playing)}
          disabled={step >= steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '暂停' : '播放'}
        </button>
        <button
          onClick={() => {
            if (step < steps.length - 1) {
              const nextStep = step + 1
              setStep(nextStep)
            }
          }}
          disabled={playing || step >= steps.length - 1}
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
            min={300}
            max={2000}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}
