'use client'

import React, { useState } from 'react'

type IOMethod = 'traditional' | 'mmap'

export default function MemoryMappedIOVisualization() {
  const [method, setMethod] = useState<IOMethod>('traditional')
  const [step, setStep] = useState(0)

  const traditionalSteps = [
    { desc: '用户程序调用 read()', mode: 'user' },
    { desc: '进入内核态', mode: 'kernel' },
    { desc: '内核从磁盘读取数据到内核缓冲区', mode: 'kernel' },
    { desc: '将数据从内核缓冲区拷贝到用户缓冲区', mode: 'kernel' },
    { desc: '返回用户态', mode: 'user' },
    { desc: '用户程序访问数据', mode: 'user' },
  ]

  const mmapSteps = [
    { desc: '用户程序调用 mmap()', mode: 'user' },
    { desc: '进入内核态', mode: 'kernel' },
    { desc: '建立文件到内存的映射', mode: 'kernel' },
    { desc: '返回用户态', mode: 'user' },
    { desc: '用户程序直接访问映射内存', mode: 'user' },
    { desc: '访问时触发缺页，从磁盘加载', mode: 'kernel' },
  ]

  const steps = method === 'traditional' ? traditionalSteps : mmapSteps

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">内存映射IO可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['traditional', 'mmap'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMethod(m); setStep(0) }}
            className={`px-3 py-1 rounded text-sm transition-colors ${method === m
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {m === 'traditional' ? '传统IO' : 'mmap'}
          </button>
        ))}
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
        {method === 'traditional'
          ? '传统IO：需要两次数据拷贝（内核缓冲区→用户缓冲区）'
          : 'mmap：零拷贝，直接访问映射内存'}
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">执行步骤</div>
        <div className="space-y-2">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all ${step >= idx
                  ? s.mode === 'kernel'
                    ? 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                    : 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-50'
                }`}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              {s.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          下一步
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
