'use client'

import React, { useState } from 'react'

export default function CachingStrategiesVisualization() {
  const [strategy, setStrategy] = useState<'lru' | 'fifo' | 'ttl'>('lru')
  const [cache, setCache] = useState<{ key: string; value: string; time: number }[]>([])
  const [inputKey, setInputKey] = useState('')

  const maxSize = 3

  const addToCache = () => {
    if (!inputKey) return
    const now = Date.now()

    if (strategy === 'lru') {
      setCache(prev => {
        const filtered = prev.filter(item => item.key !== inputKey)
        const newCache = [...filtered, { key: inputKey, value: `data_${inputKey}`, time: now }]
        return newCache.slice(-maxSize)
      })
    } else if (strategy === 'fifo') {
      setCache(prev => {
        if (prev.length >= maxSize) {
          return [...prev.slice(1), { key: inputKey, value: `data_${inputKey}`, time: now }]
        }
        return [...prev, { key: inputKey, value: `data_${inputKey}`, time: now }]
      })
    } else {
      setCache(prev => {
        const newCache = prev.filter(item => now - item.time < 5000)
        if (newCache.length >= maxSize) {
          return [...newCache.slice(1), { key: inputKey, value: `data_${inputKey}`, time: now }]
        }
        return [...newCache, { key: inputKey, value: `data_${inputKey}`, time: now }]
      })
    }
    setInputKey('')
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">缓存策略可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['lru', 'fifo', 'ttl'] as const).map(s => (
          <button
            key={s}
            onClick={() => { setStrategy(s); setCache([]) }}
            className={`px-4 py-2 rounded-lg text-sm ${strategy === s ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {s === 'lru' ? 'LRU' : s === 'fifo' ? 'FIFO' : 'TTL'}
          </button>
        ))}
      </div>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium mb-2">缓存状态 (容量: {maxSize})</div>
        <div className="flex gap-2 flex-wrap">
          {cache.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-green-100 dark:bg-green-900 rounded-lg text-sm"
            >
              <div className="font-mono font-bold">{item.key}</div>
              <div className="text-xs text-gray-500">{item.value}</div>
            </div>
          ))}
          {cache.length === 0 && (
            <div className="text-sm text-gray-400">缓存为空</div>
          )}
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          value={inputKey}
          onChange={e => setInputKey(e.target.value)}
          placeholder="输入缓存key"
          className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-sm"
        />
        <button
          onClick={addToCache}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          添加
        </button>
        <button
          onClick={() => setCache([])}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          清空
        </button>
      </div>

      <div className="p-3 bg-gray-900 rounded-lg text-sm">
        <div className="text-green-400 mb-1">策略说明</div>
        <div className="text-gray-300 text-xs">
          {strategy === 'lru' && 'LRU: 淘汰最近最少使用的数据。访问数据时将其移到最前面。'}
          {strategy === 'fifo' && 'FIFO: 先进先出，最早进入缓存的数据最先被淘汰。'}
          {strategy === 'ttl' && 'TTL: 设置过期时间，超过5秒的数据自动失效。'}
        </div>
      </div>
    </div>
  )
}
