'use client'

import React, { useState, useEffect } from 'react'

export default function MessageQueueVisualization() {
  const [messages, setMessages] = useState<{ id: number; content: string; status: string }[]>([])
  const [producing, setProducing] = useState(false)
  const [consuming, setConsuming] = useState(false)

  const produce = () => {
    const newMsg = { id: Date.now(), content: `消息${messages.length + 1}`, status: 'pending' }
    setMessages(prev => [...prev, newMsg])
    setProducing(true)
    setTimeout(() => setProducing(false), 500)
  }

  const consume = () => {
    if (messages.length === 0) return
    setConsuming(true)
    setMessages(prev => prev.map((m, idx) =>
      idx === 0 ? { ...m, status: 'consumed' } : m
    ))
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.status !== 'consumed'))
      setConsuming(false)
    }, 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length > 0 && !consuming) {
        consume()
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [messages, consuming])

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">消息队列可视化</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className={`p-4 rounded-lg text-center transition-all ${producing ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
          <div className="text-sm font-medium">生产者</div>
          <div className="text-xs text-gray-500">发送消息</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">消息队列</div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`p-1 text-xs rounded transition-all ${msg.status === 'consumed'
                  ? 'bg-red-200 dark:bg-red-800 line-through'
                  : 'bg-blue-100 dark:bg-blue-900'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-xs text-gray-400">队列为空</div>
            )}
          </div>
        </div>
        <div className={`p-4 rounded-lg text-center transition-all ${consuming ? 'bg-yellow-200 dark:bg-yellow-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
          <div className="text-sm font-medium">消费者</div>
          <div className="text-xs text-gray-500">接收消息</div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-1">队列状态</div>
        <div className="text-xs text-gray-500">
          待处理: {messages.filter(m => m.status === 'pending').length} |
          总数: {messages.length}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={produce}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
        >
          生产消息
        </button>
        <button
          onClick={consume}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          消费消息
        </button>
        <button
          onClick={() => setMessages([])}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          清空
        </button>
      </div>
    </div>
  )
}
