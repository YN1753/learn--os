'use client'

import React, { useState, useEffect } from 'react'

type IPCType = 'pipe' | 'shared-memory' | 'message-queue'

export default function IPCVisualization() {
  const [type, setType] = useState<IPCType>('pipe')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(0)

  const scenarios: Record<IPCType, string[]> = {
    pipe: ['进程A打开管道写端', '进程A写入数据', '数据通过管道传输', '进程B打开管道读端', '进程B读取数据'],
    'shared-memory': ['创建共享内存区域', '进程A附加共享内存', '进程A写入数据', '进程B附加共享内存', '进程B读取数据'],
    'message-queue': ['创建消息队列', '进程A发送消息', '消息进入队列', '进程B接收消息', '消息从队列移除'],
  }

  useEffect(() => {
    if (!playing || step >= scenarios[type].length) {
      if (step >= scenarios[type].length) setPlaying(false)
      return
    }
    const timer = setTimeout(() => {
      setMessages(m => [...m, scenarios[type][step]])
      setStep(s => s + 1)
    }, 1200)
    return () => clearTimeout(timer)
  }, [playing, step, type])

  function handlePlay() {
    setMessages([])
    setStep(0)
    setPlaying(true)
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">进程间通信方式</h3>

      <div className="flex gap-2 mb-6">
        {(['pipe', 'shared-memory', 'message-queue'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setType(t); setMessages([]); setStep(0); setPlaying(false) }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${type === t ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600'}`}
          >
            {t === 'pipe' ? '管道' : t === 'shared-memory' ? '共享内存' : '消息队列'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-center text-sm">
          <div className="font-medium text-blue-700 dark:text-blue-300">进程A</div>
          <div className="text-xs text-gray-500">发送方</div>
        </div>
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-center text-sm">
          <div className="font-medium">{type === 'pipe' ? '管道' : type === 'shared-memory' ? '共享内存' : '消息队列'}</div>
          <div className="text-xs text-gray-500">{type === 'pipe' ? '单向' : type === 'shared-memory' ? '共享区域' : 'FIFO'}</div>
        </div>
        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 text-center text-sm">
          <div className="font-medium text-green-700 dark:text-green-300">进程B</div>
          <div className="text-xs text-gray-500">接收方</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlay}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '演示中...' : '开始演示'}
        </button>
        <button
          onClick={() => { setMessages([]); setStep(0); setPlaying(false) }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          重置
        </button>
      </div>

      {messages.length > 0 && (
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 space-y-1">
          {messages.map((m, i) => (
            <div key={i} className="text-xs text-gray-600 dark:text-gray-400">
              {i + 1}. {m}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
