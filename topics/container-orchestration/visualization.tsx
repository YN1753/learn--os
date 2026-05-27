'use client'

import React, { useState } from 'react'

export default function ContainerOrchestrationVisualization() {
  const [step, setStep] = useState(0)
  const [pods, setPods] = useState([
    { name: 'web-1', status: 'Running', node: 'node-1', color: '#10b981' },
    { name: 'web-2', status: 'Running', node: 'node-2', color: '#10b981' },
    { name: 'api-1', status: 'Running', node: 'node-1', color: '#3b82f6' },
    { name: 'db-1', status: 'Pending', node: '-', color: '#f59e0b' },
  ])

  const steps = [
    { desc: '提交Deployment', detail: 'kubectl apply -f deployment.yml' },
    { desc: 'API Server接收', detail: '存储到etcd' },
    { desc: 'Scheduler调度', detail: '选择合适节点' },
    { desc: 'Kubelet创建Pod', detail: '拉取镜像，启动容器' },
    { desc: 'Service创建', detail: '配置负载均衡' },
    { desc: '应用运行', detail: 'Pod状态变为Running' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Kubernetes容器编排可视化</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Master节点</div>
          <div className="space-y-1 text-xs">
            <div className="p-1 bg-white dark:bg-gray-800 rounded">API Server</div>
            <div className="p-1 bg-white dark:bg-gray-800 rounded">Scheduler</div>
            <div className="p-1 bg-white dark:bg-gray-800 rounded">etcd</div>
          </div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
          <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Worker Node 1</div>
          <div className="space-y-1 text-xs">
            {pods.filter(p => p.node === 'node-1').map(p => (
              <div key={p.name} className="p-1 rounded" style={{ backgroundColor: `${p.color}20`, borderLeft: `3px solid ${p.color}` }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
          <div className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">Worker Node 2</div>
          <div className="space-y-1 text-xs">
            {pods.filter(p => p.node === 'node-2').map(p => (
              <div key={p.name} className="p-1 rounded" style={{ backgroundColor: `${p.color}20`, borderLeft: `3px solid ${p.color}` }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">部署流程</div>
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
                <div className="mt-1 ml-6 text-xs text-gray-500 font-mono">{s.detail}</div>
              )}
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
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
