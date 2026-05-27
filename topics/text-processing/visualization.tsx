'use client'

import React, { useState } from 'react'

export default function TextProcessingVisualization() {
  const [tool, setTool] = useState<'grep' | 'sed' | 'awk'>('grep')
  const [step, setStep] = useState(0)

  const sampleData = [
    '2024-01-15 ERROR: Connection failed',
    '2024-01-15 INFO: User login',
    '2024-01-15 ERROR: Timeout',
    '2024-01-15 INFO: Data saved',
    '2024-01-15 ERROR: Permission denied',
  ]

  const grepSteps = [
    { cmd: 'grep "ERROR" log.txt', desc: '搜索包含ERROR的行' },
    { result: sampleData.filter(l => l.includes('ERROR')) },
  ]

  const sedSteps = [
    { cmd: 'sed \'s/ERROR/WARNING/g\' log.txt', desc: '将ERROR替换为WARNING' },
    { result: sampleData.map(l => l.replace(/ERROR/g, 'WARNING')) },
  ]

  const awkSteps = [
    { cmd: 'awk \'{print $2}\' log.txt', desc: '提取第二列（日志级别）' },
    { result: sampleData.map(l => l.split(' ')[1]) },
  ]

  const steps = tool === 'grep' ? grepSteps : tool === 'sed' ? sedSteps : awkSteps

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">文本处理可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['grep', 'sed', 'awk'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setTool(t); setStep(0) }}
            className={`px-4 py-2 rounded-lg text-sm ${tool === t ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">输入数据</div>
          <div className="font-mono text-xs space-y-1">
            {sampleData.map((line, idx) => (
              <div key={idx} className="p-1 bg-white dark:bg-gray-700 rounded">
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">处理结果</div>
          {step >= 1 ? (
            <div className="font-mono text-xs space-y-1">
              {(steps[1] as { result: string[] }).result.map((line, idx) => (
                <div key={idx} className="p-1 bg-green-50 dark:bg-green-900 rounded">
                  {line}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-400">点击「执行」查看结果</div>
          )}
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-900 rounded-lg font-mono text-sm">
        <div className="text-green-400">$ {steps[0].cmd}</div>
        <div className="text-gray-400 text-xs mt-1">{steps[0].desc}</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          执行
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
