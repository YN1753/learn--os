'use client'

import React, { useState, useEffect, useCallback } from 'react'

type SyncType = 'mutex' | 'semaphore'

export default function MutexSemaphoreVisualization() {
  const [syncType, setSyncType] = useState<SyncType>('mutex')
  const [mutexLocked, setMutexLocked] = useState(false)
  const [mutexOwner, setMutexOwner] = useState<string | null>(null)
  const [semValue, setSemValue] = useState(3)
  const [threads, setThreads] = useState([
    { id: 'T1', state: 'idle' as 'idle' | 'waiting' | 'critical', color: '#3b82f6' },
    { id: 'T2', state: 'idle' as 'idle' | 'waiting' | 'critical', color: '#10b981' },
    { id: 'T3', state: 'idle' as 'idle' | 'waiting' | 'critical', color: '#f59e0b' },
  ])
  const [log, setLog] = useState<string[]>([])

  const reset = useCallback(() => {
    setMutexLocked(false)
    setMutexOwner(null)
    setSemValue(3)
    setThreads(prev => prev.map(t => ({ ...t, state: 'idle' as const })))
    setLog([])
  }, [])

  const mutexLock = (threadId: string) => {
    if (mutexLocked) {
      setThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, state: 'waiting' as const } : t
      ))
      setLog(prev => [...prev, `${threadId}: 等待获取锁（被 ${mutexOwner} 持有）`])
    } else {
      setMutexLocked(true)
      setMutexOwner(threadId)
      setThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, state: 'critical' as const } : t
      ))
      setLog(prev => [...prev, `${threadId}: 获取锁成功，进入临界区`])
    }
  }

  const mutexUnlock = (threadId: string) => {
    if (mutexOwner === threadId) {
      setMutexLocked(false)
      setMutexOwner(null)
      setThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, state: 'idle' as const } : t
      ))
      setLog(prev => [...prev, `${threadId}: 释放锁`])

      const waitingThread = threads.find(t => t.state === 'waiting')
      if (waitingThread) {
        setTimeout(() => mutexLock(waitingThread.id), 500)
      }
    }
  }

  const semWait = (threadId: string) => {
    if (semValue <= 0) {
      setThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, state: 'waiting' as const } : t
      ))
      setLog(prev => [...prev, `${threadId}: P操作失败（信号量=0），阻塞等待`])
    } else {
      setSemValue(v => v - 1)
      setThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, state: 'critical' as const } : t
      ))
      setLog(prev => [...prev, `${threadId}: P操作成功（信号量=${semValue - 1}），进入临界区`])
    }
  }

  const semPost = (threadId: string) => {
    const thread = threads.find(t => t.id === threadId)
    if (thread?.state === 'critical') {
      setSemValue(v => v + 1)
      setThreads(prev => prev.map(t =>
        t.id === threadId ? { ...t, state: 'idle' as const } : t
      ))
      setLog(prev => [...prev, `${threadId}: V操作（信号量=${semValue + 1}），离开临界区`])

      const waitingThread = threads.find(t => t.state === 'waiting')
      if (waitingThread) {
        setTimeout(() => semWait(waitingThread.id), 500)
      }
    }
  }

  const stateColors = {
    idle: 'bg-gray-100 dark:bg-gray-800',
    waiting: 'bg-yellow-100 dark:bg-yellow-900',
    critical: 'bg-green-100 dark:bg-green-900',
  }

  const stateLabels = {
    idle: '空闲',
    waiting: '等待',
    critical: '临界区',
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">互斥锁与信号量可视化</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setSyncType('mutex'); reset() }}
          className={`px-3 py-1 rounded text-sm transition-colors ${syncType === 'mutex'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          互斥锁
        </button>
        <button
          onClick={() => { setSyncType('semaphore'); reset() }}
          className={`px-3 py-1 rounded text-sm transition-colors ${syncType === 'semaphore'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          信号量
        </button>
      </div>

      {syncType === 'mutex' && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm">
            互斥锁状态: <strong>{mutexLocked ? `被 ${mutexOwner} 持有` : '未锁定'}</strong>
          </div>
        </div>
      )}

      {syncType === 'semaphore' && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm">
            信号量值: <strong>{semValue}</strong>
            <span className="ml-2 text-gray-500">（允许多个线程同时进入临界区）</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {threads.map(thread => (
          <div
            key={thread.id}
            className={`p-4 rounded-lg border-2 transition-all ${stateColors[thread.state]} ${thread.state === 'critical'
                ? 'border-green-500 dark:border-green-400'
                : thread.state === 'waiting'
                  ? 'border-yellow-500 dark:border-yellow-400'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
          >
            <div className="text-center mb-3">
              <div className="font-semibold" style={{ color: thread.color }}>{thread.id}</div>
              <div className="text-xs text-gray-500">{stateLabels[thread.state]}</div>
            </div>
            <div className="flex gap-1">
              {syncType === 'mutex' ? (
                <>
                  <button
                    onClick={() => mutexLock(thread.id)}
                    disabled={thread.state !== 'idle'}
                    className="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Lock
                  </button>
                  <button
                    onClick={() => mutexUnlock(thread.id)}
                    disabled={thread.state !== 'critical'}
                    className="flex-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    Unlock
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => semWait(thread.id)}
                    disabled={thread.state !== 'idle'}
                    className="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    P
                  </button>
                  <button
                    onClick={() => semPost(thread.id)}
                    disabled={thread.state !== 'critical'}
                    className="flex-1 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    V
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">操作日志</div>
        <div className="h-32 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {log.length === 0 ? (
            <div className="text-sm text-gray-400">点击按钮操作...</div>
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

      <button
        onClick={reset}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
      >
        重置
      </button>
    </div>
  )
}
