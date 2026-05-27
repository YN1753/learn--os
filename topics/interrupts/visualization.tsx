'use client'

import React, { useState, useEffect } from 'react'

interface Step {
  label: string
  desc: string
  highlight: string[]
}

const steps: Step[] = [
  { label: 'CPU执行程序', desc: 'CPU正在执行用户程序', highlight: ['cpu', 'user'] },
  { label: '设备发送中断', desc: '键盘按键触发中断信号', highlight: ['device', 'interrupt'] },
  { label: '关中断', desc: 'CPU关闭中断，防止新中断干扰', highlight: ['cpu'] },
  { label: '保存断点', desc: '保存当前程序计数器(PC)和状态字(PSW)', highlight: ['cpu', 'stack'] },
  { label: '识别中断源', desc: '确定是键盘中断', highlight: ['interrupt'] },
  { label: '保存现场', desc: '保存寄存器到栈中', highlight: ['stack'] },
  { label: '执行中断服务', desc: '读取按键数据，放入缓冲区', highlight: ['cpu', 'device'] },
  { label: '恢复现场', desc: '从栈中恢复寄存器', highlight: ['stack'] },
  { label: '开中断', desc: '允许新的中断', highlight: ['cpu'] },
  { label: '返回断点', desc: '继续执行用户程序', highlight: ['cpu', 'user'] },
]

export default function InterruptsVisualization() {
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

  function handlePlay() {
    setStep(0)
    setPlaying(true)
  }

  const current = step >= 0 ? steps[step] : null

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">中断处理流程</h3>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { id: 'cpu', label: 'CPU', color: '#3b82f6' },
          { id: 'device', label: '设备', color: '#10b981' },
          { id: 'interrupt', label: '中断', color: '#f59e0b' },
          { id: 'stack', label: '栈', color: '#8b5cf6' },
        ].map(item => (
          <div
            key={item.id}
            className="p-3 rounded-lg text-center text-sm font-medium transition-all duration-300"
            style={{
              backgroundColor: current?.highlight.includes(item.id) ? item.color : '#f3f4f6',
              color: current?.highlight.includes(item.id) ? 'white' : '#6b7280',
            }}
          >
            {item.label}
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
