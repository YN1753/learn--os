'use client'

import React, { useState } from 'react'

export default function MemoryLeakDetectionVisualization() {
  const [step, setStep] = useState(0)
  const [memory, setMemory] = useState<{ id: number; size: number; freed: boolean }[]>([])

  const leakSteps = [
    { action: 'malloc(100)', desc: '分配100字节', leaked: false },
    { action: 'malloc(200)', desc: '分配200字节', leaked: false },
    { action: 'ptr = malloc(50)', desc: '分配50字节', leaked: false },
    { action: 'ptr = NULL', desc: '指针置空，原内存泄漏!', leaked: true },
    { action: 'malloc(150)', desc: '继续分配', leaked: false },
  ]

  const simulateStep = (idx: number) => {
    if (idx === 0) setMemory([{ id: 1, size: 100, freed: false }])
    else if (idx === 1) setMemory(prev => [...prev, { id: 2, size: 200, freed: false }])
    else if (idx === 2) setMemory(prev => [...prev, { id: 3, size: 50, freed: false }])
    else if (idx === 3) setMemory(prev => prev.map(m => m.id === 3 ? { ...m, freed: true } : m))
    else if (idx === 4) setMemory(prev => [...prev, { id: 4, size: 150, freed: false }])
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">内存泄漏检测可视化</h3>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">代码执行</div>
        <div className="space-y-2">
          {leakSteps.map((s, idx) => (
            <div
              key={idx}
              onClick={() => { setStep(idx); simulateStep(idx) }}
              className={`p-3 rounded-lg text-sm cursor-pointer transition-all ${step >= idx
                ? s.leaked
                  ? 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                  : 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-800 opacity-50'
              }`}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              <span className="font-mono">{s.action}</span>
              {step >= idx && (
                <span className={`ml-2 text-xs ${s.leaked ? 'text-red-500' : 'text-gray-500'}`}>
                  {s.desc}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">内存状态</div>
        <div className="flex gap-2 flex-wrap">
          {memory.map(m => (
            <div
              key={m.id}
              className={`p-2 rounded text-xs ${m.freed
                ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300 line-through'
                : 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
              }`}
            >
              {m.size}B {m.freed ? '(泄漏!)' : '(使用中)'}
            </div>
          ))}
          {memory.length === 0 && (
            <div className="text-sm text-gray-400">点击代码步骤查看内存变化</div>
          )}
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-900 rounded-lg font-mono text-sm">
        <div className="text-green-400">$ valgrind --leak-check=full ./program</div>
        {step >= 3 && (
          <div className="text-red-400 mt-1">
            ==12345== 50 bytes in 1 blocks are definitely lost
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setStep(s => Math.min(s + 1, leakSteps.length - 1)); simulateStep(Math.min(step + 1, leakSteps.length - 1)) }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          下一步
        </button>
        <button
          onClick={() => { setStep(0); setMemory([]) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
