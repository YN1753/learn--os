'use client'

import React, { useState, useEffect, useCallback } from 'react'

export default function ProducerConsumerVisualization() {
  const [buffer, setBuffer] = useState<(number | null)[]>(Array(5).fill(null))
  const [inPtr, setInPtr] = useState(0)
  const [outPtr, setOutPtr] = useState(0)
  const [empty, setEmpty] = useState(5)
  const [full, setFull] = useState(0)
  const [produced, setProduced] = useState(0)
  const [consumed, setConsumed] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)
  const [autoMode, setAutoMode] = useState<'producer' | 'consumer' | 'both'>('both')

  const bufferSize = 5

  const reset = useCallback(() => {
    setBuffer(Array(bufferSize).fill(null))
    setInPtr(0)
    setOutPtr(0)
    setEmpty(bufferSize)
    setFull(0)
    setProduced(0)
    setConsumed(0)
    setLog([])
    setPlaying(false)
  }, [])

  const produce = useCallback(() => {
    if (empty <= 0) {
      setLog(prev => [...prev, '生产者: 缓冲区满，等待...'])
      return false
    }

    const item = produced + 1
    const newBuffer = [...buffer]
    newBuffer[inPtr] = item
    setBuffer(newBuffer)
    setInPtr((inPtr + 1) % bufferSize)
    setEmpty(e => e - 1)
    setFull(f => f + 1)
    setProduced(p => p + 1)
    setLog(prev => [...prev, `生产者: 生产物品 ${item}，放入位置 ${inPtr}`])
    return true
  }, [buffer, empty, inPtr, produced])

  const consume = useCallback(() => {
    if (full <= 0) {
      setLog(prev => [...prev, '消费者: 缓冲区空，等待...'])
      return false
    }

    const item = buffer[outPtr]
    const newBuffer = [...buffer]
    newBuffer[outPtr] = null
    setBuffer(newBuffer)
    setOutPtr((outPtr + 1) % bufferSize)
    setEmpty(e => e + 1)
    setFull(f => f - 1)
    setConsumed(c => c + 1)
    setLog(prev => [...prev, `消费者: 消费物品 ${item}，取出位置 ${outPtr}`])
    return true
  }, [buffer, full, outPtr])

  useEffect(() => {
    if (!playing) return

    const timer = setTimeout(() => {
      if (autoMode === 'producer' || autoMode === 'both') {
        produce()
      }
      if (autoMode === 'consumer' || autoMode === 'both') {
        setTimeout(() => consume(), 500)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [playing, speed, autoMode, produce, consume])

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">生产者消费者可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['producer', 'consumer', 'both'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => { setAutoMode(mode); reset() }}
            className={`px-3 py-1 rounded text-sm transition-colors ${autoMode === mode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {mode === 'producer' ? '仅生产者' : mode === 'consumer' ? '仅消费者' : '两者'}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">环形缓冲区</div>
        <div className="flex gap-2 justify-center">
          {buffer.map((item, idx) => (
            <div
              key={idx}
              className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all ${item !== null
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                }`}
            >
              {item !== null ? (
                <span className="text-lg font-bold">{item}</span>
              ) : (
                <span className="text-gray-400">空</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>in →</span>
          <span>← out</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 text-center">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-500">空槽</div>
          <div className="text-xl font-bold">{empty}</div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-500">满槽</div>
          <div className="text-xl font-bold">{full}</div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-500">已生产</div>
          <div className="text-xl font-bold">{produced}</div>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-500">已消费</div>
          <div className="text-xl font-bold">{consumed}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setPlaying(!playing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          {playing ? '暂停' : '自动运行'}
        </button>
        <button
          onClick={produce}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          生产
        </button>
        <button
          onClick={consume}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
        >
          消费
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          重置
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span>速度</span>
          <input
            type="range"
            min={300}
            max={2000}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">操作日志</div>
        <div className="h-32 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {log.length === 0 ? (
            <div className="text-sm text-gray-400">点击按钮或自动运行...</div>
          ) : (
            <div className="space-y-1">
              {log.map((entry, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-gray-400 font-mono mr-2">{idx + 1}.</span>
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
