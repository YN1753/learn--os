'use client'

import React, { useState, useEffect } from 'react'

interface ProducerConsumerState {
  buffer: number[]
  bufferSize: number
  produced: number
  consumed: number
  producerWaiting: boolean
  consumerWaiting: boolean
}

export default function SynchronizationVisualization() {
  const [state, setState] = useState<ProducerConsumerState>({
    buffer: [],
    bufferSize: 4,
    produced: 0,
    consumed: 0,
    producerWaiting: false,
    consumerWaiting: false,
  })
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(0)
  const [speed, setSpeed] = useState(1200)
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    if (!playing) return

    const timer = setTimeout(() => {
      setState(prev => {
        const next = { ...prev, buffer: [...prev.buffer] }
        const isProducerTurn = step % 2 === 0

        if (isProducerTurn) {
          if (next.buffer.length < next.bufferSize) {
            const item = next.produced + 1
            next.buffer.push(item)
            next.produced = item
            next.producerWaiting = false
            setLog(l => [...l, `生产者生产: ${item} | 缓冲区: [${next.buffer.join(',')}]`])
          } else {
            next.producerWaiting = true
            setLog(l => [...l, '生产者等待: 缓冲区已满'])
          }
        } else {
          if (next.buffer.length > 0) {
            const item = next.buffer.shift()!
            next.consumed = item
            next.consumerWaiting = false
            setLog(l => [...l, `消费者消费: ${item} | 缓冲区: [${next.buffer.join(',')}]`])
          } else {
            next.consumerWaiting = true
            setLog(l => [...l, '消费者等待: 缓冲区为空'])
          }
        }

        return next
      })

      setStep(s => s + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [playing, step, speed])

  function handlePlay() {
    setPlaying(true)
  }

  function handleReset() {
    setPlaying(false)
    setStep(0)
    setLog([])
    setState({
      buffer: [],
      bufferSize: 4,
      produced: 0,
      consumed: 0,
      producerWaiting: false,
      consumerWaiting: false,
    })
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">生产者-消费者问题</h3>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-blue-600">生产者</span>
            {state.producerWaiting && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">
                等待中
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            已生产: {state.produced} 个
          </div>
        </div>

        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-green-600">消费者</span>
            {state.consumerWaiting && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">
                等待中
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            已消费: {state.consumed} 个
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
          缓冲区 ({state.buffer.length}/{state.bufferSize})
        </h4>
        <div className="flex gap-2">
          {Array.from({ length: state.bufferSize }, (_, i) => (
            <div
              key={i}
              className="flex-1 h-12 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all duration-300"
              style={{
                borderColor: i < state.buffer.length ? '#3b82f6' : '#e5e7eb',
                backgroundColor: i < state.buffer.length ? '#eff6ff' : 'transparent',
              }}
            >
              {i < state.buffer.length ? state.buffer[i] : ''}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlay}
          disabled={playing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '运行中...' : '开始运行'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          重置
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span>速度</span>
          <input
            type="range"
            min={400}
            max={2500}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      {log.length > 0 && (
        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 max-h-32 overflow-auto">
          {log.slice(-6).map((entry, i) => (
            <div key={i} className="text-xs text-gray-600 dark:text-gray-400 py-0.5">
              {entry}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
