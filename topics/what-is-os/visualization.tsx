'use client'

import React, { useState, useEffect } from 'react'

const layers = [
  { name: '用户', color: '#3b82f6', desc: '你！使用鼠标和键盘操作电脑' },
  { name: '应用程序', color: '#8b5cf6', desc: '浏览器、编辑器、游戏等' },
  { name: '系统调用接口', color: '#06b6d4', desc: '程序使用 OS 功能的接口' },
  { name: '操作系统内核', color: '#f59e0b', desc: '管理硬件的核心程序' },
  { name: '硬件', color: '#ef4444', desc: 'CPU、内存、磁盘、键盘等' },
]

export default function OSVisualization() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)

  const steps = [
    { layer: 0, desc: '用户双击浏览器图标' },
    { layer: 3, desc: '操作系统接收到请求' },
    { layer: 4, desc: '从磁盘读取浏览器程序' },
    { layer: 3, desc: '操作系统为浏览器创建进程' },
    { layer: 3, desc: '操作系统分配内存空间' },
    { layer: 1, desc: '浏览器开始运行' },
    { layer: 0, desc: '用户看到浏览器界面' },
  ]

  useEffect(() => {
    if (!playing) return
    if (step >= steps.length) { setPlaying(false); return }

    const timer = setTimeout(() => {
      setActiveLayer(steps[step].layer)
      setStep(s => s + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [playing, step, speed])

  function handlePlay() {
    setStep(0)
    setActiveLayer(null)
    setPlaying(true)
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">操作系统层次结构</h3>

      <div className="space-y-2 mb-6">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer transition-all duration-300"
            onClick={() => setActiveLayer(idx === activeLayer ? null : idx)}
          >
            <div
              className="p-4 rounded-lg text-white font-medium transition-all duration-300"
              style={{
                backgroundColor: layer.color,
                opacity: activeLayer === null || activeLayer === idx ? 1 : 0.3,
                transform: activeLayer === idx ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {layer.name}
            </div>
            {activeLayer === idx && (
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-64 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-sm z-10">
                {layer.desc}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlay}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '演示中...' : '演示：打开浏览器'}
        </button>
        <button
          onClick={() => { setPlaying(false); setStep(0); setActiveLayer(null) }}
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

      {step > 0 && step <= steps.length && (
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-sm">
          步骤 {step}/{steps.length}：{steps[step - 1].desc}
        </div>
      )}
    </div>
  )
}
