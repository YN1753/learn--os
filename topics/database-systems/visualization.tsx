'use client'

import React, { useState } from 'react'

export default function DatabaseSystemsVisualization() {
  const [step, setStep] = useState(0)
  const [query, setQuery] = useState('SELECT')

  const selectSteps = [
    { desc: '解析SQL', detail: 'SELECT name, age FROM users WHERE age > 18' },
    { desc: '查询优化', detail: '选择最优执行计划' },
    { desc: '索引查找', detail: '使用age索引快速定位' },
    { desc: '数据读取', detail: '从磁盘读取数据页' },
    { desc: '返回结果', detail: '返回匹配的记录集' },
  ]

  const transactionSteps = [
    { desc: 'BEGIN', detail: '开始事务' },
    { desc: 'UPDATE', detail: '修改数据（在缓冲区）' },
    { desc: '验证约束', detail: '检查数据完整性' },
    { desc: 'COMMIT', detail: '写入日志，提交事务' },
    { desc: '持久化', detail: '数据写入磁盘' },
  ]

  const steps = query === 'SELECT' ? selectSteps : transactionSteps

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">数据库系统可视化</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setQuery('SELECT'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm ${query === 'SELECT' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          SELECT查询
        </button>
        <button
          onClick={() => { setQuery('TRANSACTION'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm ${query === 'TRANSACTION' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          事务处理
        </button>
      </div>

      <div className="mb-4 p-3 bg-gray-900 rounded-lg font-mono text-sm">
        {query === 'SELECT' ? (
          <div className="text-green-400">SELECT name, age FROM users WHERE age &gt; 18;</div>
        ) : (
          <div className="text-green-400">BEGIN; UPDATE accounts SET balance = balance - 100; COMMIT;</div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">执行流程</div>
        <div className="space-y-2">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all ${step >= idx
                ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-800 opacity-50'
              }`}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              <span className="font-medium">{s.desc}</span>
              {step >= idx && (
                <div className="mt-1 ml-6 text-xs text-gray-500">{s.detail}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">数据表示例</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left p-1">ID</th>
              <th className="text-left p-1">Name</th>
              <th className="text-left p-1">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-gray-700"><td className="p-1">1</td><td className="p-1">Alice</td><td className="p-1">25</td></tr>
            <tr className="border-b dark:border-gray-700"><td className="p-1">2</td><td className="p-1">Bob</td><td className="p-1">17</td></tr>
            <tr><td className="p-1">3</td><td className="p-1">Charlie</td><td className="p-1">30</td></tr>
          </tbody>
        </table>
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
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
