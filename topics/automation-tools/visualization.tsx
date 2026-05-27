'use client'

import React, { useState } from 'react'

export default function AutomationToolsVisualization() {
  const [step, setStep] = useState(0)

  const steps = [
    { desc: '定义Inventory', detail: '列出要管理的服务器', icon: '📋' },
    { desc: '编写Playbook', detail: '定义任务和配置', icon: '📝' },
    { desc: '执行Playbook', detail: 'ansible-playbook site.yml', icon: '▶️' },
    { desc: 'SSH连接服务器', detail: '通过SSH连接目标机器', icon: '🔗' },
    { desc: '执行任务', detail: '安装软件、配置服务', icon: '⚙️' },
    { desc: '返回结果', detail: '报告执行状态', icon: '✅' },
  ]

  const playbook = `---
- hosts: webservers
  become: yes
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present

    - name: Start nginx
      service:
        name: nginx
        state: started`

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Ansible自动化可视化</h3>

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
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.icon}</span>
                <span className="font-medium">{s.desc}</span>
              </div>
              {step >= idx && (
                <div className="mt-1 ml-8 text-xs text-gray-500">{s.detail}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-900 rounded-lg font-mono text-xs">
        <div className="text-green-400 mb-1"># Playbook示例</div>
        {playbook.split('\n').map((line, idx) => (
          <div key={idx} className="text-gray-300">{line}</div>
        ))}
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
