'use client'

import React, { useState } from 'react'

export default function DistributedAlgorithmsVisualization() {
  const [step, setStep] = useState(0)
  const [nodes, setNodes] = useState([
    { id: 1, role: 'Follower', voted: false, color: '#3b82f6' },
    { id: 2, role: 'Follower', voted: false, color: '#3b82f6' },
    { id: 3, role: 'Follower', voted: false, color: '#3b82f6' },
    { id: 4, role: 'Follower', voted: false, color: '#3b82f6' },
    { id: 5, role: 'Follower', voted: false, color: '#3b82f6' },
  ])

  const electionSteps = [
    { desc: '初始状态', detail: '所有节点都是Follower', action: () => setNodes(nodes.map(n => ({ ...n, role: 'Follower', color: '#3b82f6' }))) },
    { desc: '超时触发', detail: 'Node 1超时，变为Candidate', action: () => setNodes(nodes.map(n => n.id === 1 ? { ...n, role: 'Candidate', color: '#f59e0b' } : n)) },
    { desc: '发起投票', detail: 'Node 1请求其他节点投票', action: () => setNodes(nodes.map(n => n.id === 1 ? n : { ...n, voted: true })) },
    { desc: '获得多数票', detail: 'Node 1获得3票，成为Leader', action: () => setNodes(nodes.map(n => n.id === 1 ? { ...n, role: 'Leader', color: '#10b981' } : { ...n, voted: false })) },
    { desc: '心跳维持', detail: 'Leader定期发送心跳', action: () => {} },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Raft选举算法可视化</h3>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">集群节点</div>
        <div className="flex justify-center gap-4">
          {nodes.map(node => (
            <div
              key={node.id}
              className="w-20 h-20 rounded-lg flex flex-col items-center justify-center text-white transition-all"
              style={{ backgroundColor: node.color }}
            >
              <div className="text-lg font-bold">N{node.id}</div>
              <div className="text-xs">{node.role}</div>
              {node.voted && <div className="text-xs">已投票</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">选举过程</div>
        <div className="space-y-2">
          {electionSteps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all cursor-pointer ${step >= idx
                ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-800 opacity-50'
              }`}
              onClick={() => { setStep(idx); s.action() }}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              <span className="font-medium">{s.desc}</span>
              {step >= idx && (
                <span className="ml-2 text-gray-500">{s.detail}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            const next = Math.min(step + 1, electionSteps.length - 1)
            setStep(next)
            electionSteps[next].action()
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          下一步
        </button>
        <button
          onClick={() => {
            setStep(0)
            setNodes(nodes.map(n => ({ ...n, role: 'Follower', color: '#3b82f6', voted: false })))
          }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
