'use client'

import React, { useState, useEffect } from 'react'

interface BootStep {
  label: string
  desc: string
  duration: string
}

const steps: BootStep[] = [
  { label: '按下电源', desc: '电源按钮触发电源启动', duration: '0s' },
  { label: 'CPU复位', desc: 'CPU从0xFFFF0开始执行', duration: '0.1s' },
  { label: 'BIOS/UEFI', desc: '加载并执行固件程序', duration: '0.5s' },
  { label: 'POST自检', desc: '检查CPU、内存、显卡等', duration: '1-3s' },
  { label: '查找引导设备', desc: '按顺序查找可引导设备', duration: '0.5s' },
  { label: '读取引导扇区', desc: '读取MBR/GPT', duration: '0.1s' },
  { label: '引导加载程序', desc: 'GRUB/BOOTMGR加载', duration: '1-2s' },
  { label: '加载内核', desc: '操作系统内核加载到内存', duration: '2-5s' },
  { label: '内核初始化', desc: '初始化硬件和驱动', duration: '3-10s' },
  { label: '启动init', desc: '启动第一个进程(PID 1)', duration: '0.5s' },
  { label: '系统服务', desc: '启动网络、图形界面等', duration: '5-15s' },
  { label: '用户登录', desc: '显示登录界面', duration: '1-2s' },
]

export default function BootProcessVisualization() {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1500)

  useEffect(() => {
    if (!playing || step >= steps.length - 1) {
      if (step >= steps.length - 1) setPlaying(false)
      return
    }
    const timer = setTimeout(() => setStep(s => s + 1), speed)
    return () => clearTimeout(timer)
  }, [playing, step, speed])

  const progress = step >= 0 ? ((step + 1) / steps.length) * 100 : 0

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">操作系统启动过程</h3>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>启动进度</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => { setStep(0); setPlaying(true) }}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '启动中...' : '模拟启动'}
        </button>
        <button
          onClick={() => { setStep(-1); setPlaying(false) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          重置
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span>速度</span>
          <input type="range" min={500} max={3000} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-24" />
        </div>
      </div>

      {step >= 0 && step < steps.length && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-sm mb-4">
          <div className="font-medium">{steps[step].label}</div>
          <div className="text-gray-600 dark:text-gray-400">{steps[step].desc}</div>
          <div className="text-xs text-gray-500 mt-1">预计耗时: {steps[step].duration}</div>
        </div>
      )}

      <div className="space-y-1">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-xs p-1.5 rounded transition-all duration-200 ${
              i < step ? 'text-green-600 dark:text-green-400' :
              i === step ? 'bg-blue-100 dark:bg-blue-900 font-medium' :
              'text-gray-400'
            }`}
          >
            <span className="w-4 text-center">{i < step ? '✓' : i + 1}</span>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  )
}
