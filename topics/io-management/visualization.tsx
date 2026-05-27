'use client'

import React, { useState, useEffect } from 'react'

type IOMethod = 'programmed' | 'interrupt' | 'dma'

interface Step {
  label: string
  actor: 'cpu' | 'device' | 'dma' | 'memory'
  desc: string
}

const methods: Record<IOMethod, { name: string; steps: Step[] }> = {
  programmed: {
    name: '程序直接控制',
    steps: [
      { label: 'CPU发送命令', actor: 'cpu', desc: 'CPU向设备发送读取命令' },
      { label: 'CPU查询状态', actor: 'cpu', desc: 'CPU不断查询设备是否完成' },
      { label: '设备读取数据', actor: 'device', desc: '设备从磁盘读取数据' },
      { label: 'CPU查询状态', actor: 'cpu', desc: 'CPU继续查询...' },
      { label: 'CPU读取数据', actor: 'cpu', desc: 'CPU从设备读取数据到内存' },
    ],
  },
  interrupt: {
    name: '中断驱动',
    steps: [
      { label: 'CPU发送命令', actor: 'cpu', desc: 'CPU向设备发送读取命令' },
      { label: 'CPU执行其他任务', actor: 'cpu', desc: 'CPU去做其他事情' },
      { label: '设备读取数据', actor: 'device', desc: '设备从磁盘读取数据' },
      { label: '设备发送中断', actor: 'device', desc: '设备完成后发送中断信号' },
      { label: 'CPU处理中断', actor: 'cpu', desc: 'CPU响应中断，读取数据' },
    ],
  },
  dma: {
    name: 'DMA直接访问',
    steps: [
      { label: 'CPU设置DMA', actor: 'cpu', desc: 'CPU告诉DMA：从哪读、往哪写、传多少' },
      { label: 'CPU执行其他任务', actor: 'cpu', desc: 'CPU去做其他事情' },
      { label: 'DMA传输数据', actor: 'dma', desc: 'DMA直接在设备和内存间传输数据' },
      { label: 'DMA发送中断', actor: 'dma', desc: '传输完成后DMA向CPU发中断' },
      { label: 'CPU确认完成', actor: 'cpu', desc: 'CPU确认数据传输完成' },
    ],
  },
}

const actorColors: Record<string, string> = {
  cpu: '#3b82f6',
  device: '#10b981',
  dma: '#8b5cf6',
  memory: '#f59e0b',
}

export default function IOManagementVisualization() {
  const [method, setMethod] = useState<IOMethod>('programmed')
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1500)

  const current = methods[method]

  useEffect(() => {
    if (!playing || step >= current.steps.length - 1) {
      if (step >= current.steps.length - 1) setPlaying(false)
      return
    }
    const timer = setTimeout(() => setStep(s => s + 1), speed)
    return () => clearTimeout(timer)
  }, [playing, step, speed, current.steps.length])

  function handlePlay() {
    setStep(0)
    setPlaying(true)
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">I/O控制方式对比</h3>

      <div className="flex gap-2 mb-6">
        {(['programmed', 'interrupt', 'dma'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMethod(m); setStep(-1); setPlaying(false) }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              method === m
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {methods[m].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {['cpu', 'device', 'dma', 'memory'].map(actor => (
          <div
            key={actor}
            className="p-3 rounded-lg text-center text-sm font-medium transition-all duration-300"
            style={{
              backgroundColor: step >= 0 && current.steps[step]?.actor === actor
                ? actorColors[actor]
                : '#f3f4f6',
              color: step >= 0 && current.steps[step]?.actor === actor ? 'white' : '#6b7280',
            }}
          >
            {actor === 'cpu' ? 'CPU' : actor === 'device' ? '设备' : actor === 'dma' ? 'DMA' : '内存'}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlay}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '演示中...' : '开始演示'}
        </button>
        <button
          onClick={() => { setStep(-1); setPlaying(false) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          重置
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

      {step >= 0 && step < current.steps.length && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-sm">
          <span className="font-medium">步骤 {step + 1}/{current.steps.length}：</span>
          {current.steps[step].desc}
        </div>
      )}

      <div className="mt-4 space-y-1">
        {current.steps.map((s, i) => (
          <div
            key={i}
            className={`text-xs p-1.5 rounded transition-all duration-200 ${
              i === step ? 'bg-blue-100 dark:bg-blue-900 font-medium' : 'text-gray-500'
            }`}
          >
            {i + 1}. {s.label}
          </div>
        ))}
      </div>
    </div>
  )
}
