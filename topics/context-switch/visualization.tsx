'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface Process {
  id: number
  name: string
  color: string
  state: 'running' | 'ready' | 'blocked'
  pc: number
  registers: { sp: number; ax: number; bx: number }
}

export default function ContextSwitchVisualization() {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, name: 'P1', color: '#3b82f6', state: 'running', pc: 100, registers: { sp: 1000, ax: 0, bx: 0 } },
    { id: 2, name: 'P2', color: '#10b981', state: 'ready', pc: 200, registers: { sp: 2000, ax: 0, bx: 0 } },
    { id: 3, name: 'P3', color: '#f59e0b', state: 'ready', pc: 300, registers: { sp: 3000, ax: 0, bx: 0 } },
  ])
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)

  const switchSteps = [
    { desc: 'P1 时间片用完，触发切换', from: 0, to: null },
    { desc: '保存 P1 的寄存器到 PCB', from: 0, to: null },
    { desc: 'P1 状态: 运行 → 就绪', from: 0, to: null },
    { desc: '调度器选择 P2', from: null, to: 1 },
    { desc: 'P2 状态: 就绪 → 运行', from: null, to: 1 },
    { desc: '从 PCB 恢复 P2 的寄存器', from: null, to: 1 },
    { desc: '跳转到 P2 的 PC=200 继续执行', from: null, to: 1 },
  ]

  const reset = useCallback(() => {
    setProcesses([
      { id: 1, name: 'P1', color: '#3b82f6', state: 'running', pc: 100, registers: { sp: 1000, ax: 0, bx: 0 } },
      { id: 2, name: 'P2', color: '#10b981', state: 'ready', pc: 200, registers: { sp: 2000, ax: 0, bx: 0 } },
      { id: 3, name: 'P3', color: '#f59e0b', state: 'ready', pc: 300, registers: { sp: 3000, ax: 0, bx: 0 } },
    ])
    setStep(-1)
    setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing) return
    if (step >= switchSteps.length - 1) {
      setPlaying(false)
      return
    }

    const timer = setTimeout(() => {
      const nextStep = step + 1
      setStep(nextStep)

      if (nextStep === 2) {
        setProcesses(prev => prev.map((p, i) =>
          i === 0 ? { ...p, state: 'ready' as const } : p
        ))
      }
      if (nextStep === 4) {
        setProcesses(prev => prev.map((p, i) =>
          i === 1 ? { ...p, state: 'running' as const } : p
        ))
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [playing, step, speed, switchSteps.length])

  const stateColors = {
    running: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    ready: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    blocked: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  }

  const stateLabels = {
    running: '运行',
    ready: '就绪',
    blocked: '阻塞',
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">上下文切换可视化</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {processes.map((proc) => (
          <div
            key={proc.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${proc.state === 'running'
                ? 'border-green-500 dark:border-green-400'
                : 'border-gray-200 dark:border-gray-700'
              }`}
            style={{ borderLeftColor: proc.color, borderLeftWidth: '4px' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{proc.name}</span>
              <span className={`px-2 py-0.5 rounded text-xs ${stateColors[proc.state]}`}>
                {stateLabels[proc.state]}
              </span>
            </div>
            <div className="text-sm space-y-1">
              <div>PC: {proc.pc}</div>
              <div>SP: {proc.registers.sp}</div>
              <div>AX: {proc.registers.ax}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">切换步骤</div>
        <div className="space-y-2">
          {switchSteps.map((s, idx) => (
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
          disabled={step >= switchSteps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '暂停' : '播放'}
        </button>
        <button
          onClick={() => {
            if (step < switchSteps.length - 1) {
              const nextStep = step + 1
              setStep(nextStep)
              if (nextStep === 2) {
                setProcesses(prev => prev.map((p, i) =>
                  i === 0 ? { ...p, state: 'ready' as const } : p
                ))
              }
              if (nextStep === 4) {
                setProcesses(prev => prev.map((p, i) =>
                  i === 1 ? { ...p, state: 'running' as const } : p
                ))
              }
            }
          }}
          disabled={playing || step >= switchSteps.length - 1}
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
