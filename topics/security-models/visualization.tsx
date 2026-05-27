'use client'

import React, { useState } from 'react'

type Model = 'DAC' | 'MAC' | 'RBAC'

export default function SecurityModelsVisualization() {
  const [model, setModel] = useState<Model>('DAC')

  const models = {
    DAC: {
      name: '自主访问控制 (DAC)',
      description: '资源所有者决定谁能访问',
      example: 'Unix文件权限：所有者设置rwx',
      pros: ['灵活', '简单'],
      cons: ['安全性依赖用户', '容易误配置'],
    },
    MAC: {
      name: '强制访问控制 (MAC)',
      description: '系统强制执行安全策略',
      example: 'SELinux：进程只能访问允许的资源',
      pros: ['更安全', '策略统一'],
      cons: ['配置复杂', '不够灵活'],
    },
    RBAC: {
      name: '基于角色的访问控制 (RBAC)',
      description: '根据角色分配权限',
      example: '管理员、普通用户、访客',
      pros: ['易于管理', '权限清晰'],
      cons: ['角色设计复杂', '粒度粗'],
    },
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">安全模型可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['DAC', 'MAC', 'RBAC'] as const).map(m => (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`px-3 py-1 rounded text-sm transition-colors ${model === m
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
        <div className="font-medium mb-2">{models[model].name}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {models[model].description}
        </div>
        <div className="text-sm mb-3">
          <span className="font-medium">示例: </span>
          {models[model].example}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-green-600 mb-1">优点</div>
            <ul className="text-sm space-y-1">
              {models[model].pros.map((pro, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <span className="text-green-500">✓</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-medium text-red-600 mb-1">缺点</div>
            <ul className="text-sm space-y-1">
              {models[model].cons.map((con, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <span className="text-red-500">✗</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
