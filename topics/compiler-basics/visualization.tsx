'use client'

import React, { useState } from 'react'

export default function CompilerBasicsVisualization() {
  const [step, setStep] = useState(0)

  const stages = [
    { name: '词法分析', input: 'int x = 42;', output: '[INT] [ID:x] [ASSIGN] [NUM:42] [SEMI]', color: '#3b82f6' },
    { name: '语法分析', input: '[INT] [ID:x] [ASSIGN] [NUM:42] [SEMI]', output: 'AST: Declaration(type=int, name=x, value=42)', color: '#10b981' },
    { name: '语义分析', input: 'AST', output: '类型检查通过，符号表更新', color: '#f59e0b' },
    { name: '中间代码', input: 'AST', output: 't1 = 42\nx = t1', color: '#8b5cf6' },
    { name: '优化', input: 't1 = 42\nx = t1', output: 'x = 42', color: '#ef4444' },
    { name: '代码生成', input: 'x = 42', output: 'MOV [x], 42', color: '#6366f1' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">编译器工作流程可视化</h3>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">编译阶段</div>
        <div className="flex gap-1 mb-4">
          {stages.map((s, idx) => (
            <div
              key={idx}
              className={`flex-1 p-2 rounded text-center text-xs transition-all cursor-pointer ${step >= idx ? 'text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
              style={step >= idx ? { backgroundColor: s.color } : undefined}
              onClick={() => setStep(idx)}
            >
              {s.name}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">输入</div>
          <div className="font-mono text-xs p-2 bg-white dark:bg-gray-700 rounded">
            {stages[step].input}
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">输出</div>
          <div className="font-mono text-xs p-2 bg-white dark:bg-gray-700 rounded whitespace-pre">
            {stages[step].output}
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-900 rounded-lg">
        <div className="text-sm font-medium text-white mb-2">语法树示例 (x + y * z)</div>
        <div className="font-mono text-xs text-green-400">
          &nbsp;&nbsp;&nbsp;&nbsp;+<br/>
          &nbsp;&nbsp;&nbsp;/&nbsp;\<br/>
          &nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;*<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;\<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y&nbsp;&nbsp;&nbsp;z
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, stages.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          下一阶段
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
