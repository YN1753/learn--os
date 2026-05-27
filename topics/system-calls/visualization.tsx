'use client'

import React, { useState, useEffect } from 'react'

interface Step {
  label: string
  desc: string
  mode: 'user' | 'kernel'
}

const steps: Step[] = [
  { label: '用户程序调用read()', desc: '程序调用C库的read函数', mode: 'user' },
  { label: '库函数准备参数', desc: '将系统调用号和参数放入寄存器', mode: 'user' },
  { label: '触发陷阱中断', desc: '执行int 0x80指令', mode: 'user' },
  { label: '切换到内核态', desc: 'CPU从用户态切换到内核态', mode: 'kernel' },
  { label: '查找系统调用表', desc: '根据系统调用号找到处理函数', mode: 'kernel' },
  { label: '执行read处理程序', desc: '内核读取文件数据', mode: 'kernel' },
  { label: '返回结果', desc: '将读取的数据和返回值放入寄存器', mode: 'kernel' },
  { label: '切换回用户态', desc: 'CPU从内核态切换回用户态', mode: 'user' },
  { label: '库函数返回', desc: 'read()返回给用户程序', mode: 'user' },
]

export default function SystemCallsVisualization() {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1200)

  useEffect(() => {
    if (!playing || step >= steps.length - 1) {
      if (step >= steps.length - 1) setPlaying(false)
      return
    }
    const timer = setTimeout(() => setStep(s => s + 1), speed)
    return () => clearTimeout(timer)
  }, [playing, step, speed])

  const current = step >= 0 ? steps[step] : null

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">系统调用执行过程</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${current?.mode === 'user' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-700'}`}>
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">用户态</div>
          <div className="text-xs text-gray-500">用户程序、C库</div>
          {current?.mode === 'user' && <div className="text-xs text-blue-500 mt-2">当前执行位置</div>}
        </div>
        <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${current?.mode === 'kernel' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950' : 'border-gray-200 dark:border-gray-700'}`}>
          <div className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">内核态</div>
          <div className="text-xs text-gray-500">系统调用处理、设备驱动</div>
          {current?.mode === 'kernel' && <div className="text-xs text-orange-500 mt-2">当前执行位置</div>}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => { setStep(0); setPlaying(true) }}
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
          <input type="range" min={400} max={2500} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-24" />
        </div>
      </div>

      {current && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-sm">
          <span className="font-medium">步骤 {step + 1}/{steps.length}：{current.label}</span>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{current.desc}</p>
        </div>
      )}

      <div className="mt-4 space-y-1">
        {steps.map((s, i) => (
          <div key={i} className={`text-xs p-1.5 rounded transition-all duration-200 ${i === step ? 'bg-blue-100 dark:bg-blue-900 font-medium' : 'text-gray-500'}`}>
            {i + 1}. {s.label}
          </div>
        ))}
      </div>
    </div>
  )
}
