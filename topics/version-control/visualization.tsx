'use client'

import React, { useState } from 'react'

export default function VersionControlVisualization() {
  const [step, setStep] = useState(0)

  const workflow = [
    { action: '修改文件', area: '工作目录', cmd: 'edit file.txt', color: '#3b82f6' },
    { action: '添加到暂存区', area: '暂存区', cmd: 'git add file.txt', color: '#f59e0b' },
    { action: '提交到本地仓库', area: '本地仓库', cmd: 'git commit -m "msg"', color: '#10b981' },
    { action: '推送到远程仓库', area: '远程仓库', cmd: 'git push', color: '#8b5cf6' },
  ]

  const branches = [
    { name: 'main', commits: ['C1', 'C2', 'C5'], color: '#3b82f6' },
    { name: 'feature', commits: ['C3', 'C4'], color: '#10b981' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Git版本控制可视化</h3>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Git工作流程</div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {['工作目录', '暂存区', '本地仓库', '远程仓库'].map((area, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-center text-sm transition-all ${step >= idx
                ? 'text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}
              style={step >= idx ? { backgroundColor: workflow[idx].color } : undefined}
            >
              {area}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {workflow.map((w, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all ${step >= idx
                ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-800 opacity-50'
              }`}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              <span className="font-medium">{w.action}</span>
              <span className="ml-2 font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">{w.cmd}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">分支管理</div>
        <div className="space-y-2">
          {branches.map(b => (
            <div key={b.name} className="flex items-center gap-2">
              <span className="w-16 text-sm font-medium" style={{ color: b.color }}>{b.name}</span>
              <div className="flex gap-1">
                {b.commits.map((c, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white"
                    style={{ backgroundColor: b.color }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, workflow.length - 1))}
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
