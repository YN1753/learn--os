'use client'

import React, { useState } from 'react'

export default function ShellScriptingVisualization() {
  const [step, setStep] = useState(0)
  const [script] = useState([
    { line: '#!/bin/bash', desc: '指定bash解释器' },
    { line: 'name="Linux"', desc: '定义变量name' },
    { line: 'echo "Hello, $name"', desc: '输出变量值' },
    { line: 'for i in 1 2 3', desc: '循环开始' },
    { line: '  echo "第 $i 次"', desc: '循环体' },
    { line: 'done', desc: '循环结束' },
  ])
  const [pipeStep, setPipeStep] = useState(0)

  const pipeExample = [
    { cmd: 'cat access.log', output: '1000行日志', desc: '读取日志文件' },
    { cmd: 'grep "ERROR"', output: '50行错误', desc: '过滤错误行' },
    { cmd: 'awk \'{print $4}\'', output: '50个时间', desc: '提取时间字段' },
    { cmd: 'sort | uniq -c', output: '错误统计', desc: '统计错误次数' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Shell脚本可视化</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">脚本执行</div>
          <div className="font-mono text-xs space-y-1">
            {script.map((s, idx) => (
              <div
                key={idx}
                className={`p-2 rounded transition-all ${step >= idx
                  ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500'
                  : 'bg-gray-100 dark:bg-gray-700 opacity-50'
                }`}
              >
                <div className="text-gray-800 dark:text-gray-200">{s.line}</div>
                {step >= idx && (
                  <div className="text-gray-500 text-xs mt-1">{s.desc}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">管道操作</div>
          <div className="space-y-2">
            {pipeExample.map((p, idx) => (
              <div
                key={idx}
                className={`p-2 rounded text-sm transition-all ${pipeStep >= idx
                  ? 'bg-green-100 dark:bg-green-900 border-l-4 border-green-500'
                  : 'bg-gray-100 dark:bg-gray-700 opacity-50'
                }`}
              >
                <div className="font-mono text-xs text-gray-800 dark:text-gray-200">
                  {p.cmd}
                </div>
                {pipeStep >= idx && (
                  <div className="text-xs text-gray-500 mt-1">
                    {p.desc} → {p.output}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            数据流向: 日志 → 过滤 → 提取 → 统计
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, script.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          脚本: 下一步
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          脚本: 重置
        </button>
        <button
          onClick={() => setPipeStep(s => Math.min(s + 1, pipeExample.length - 1))}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
        >
          管道: 下一步
        </button>
        <button
          onClick={() => setPipeStep(0)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          管道: 重置
        </button>
      </div>
    </div>
  )
}
