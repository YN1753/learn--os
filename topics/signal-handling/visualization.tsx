'use client'

import React, { useState } from 'react'

interface Signal {
  name: string
  number: number
  defaultAction: string
  canCatch: boolean
  description: string
}

const signals: Signal[] = [
  { name: 'SIGHUP', number: 1, defaultAction: '终止', canCatch: true, description: '终端挂起' },
  { name: 'SIGINT', number: 2, defaultAction: '终止', canCatch: true, description: 'Ctrl+C' },
  { name: 'SIGQUIT', number: 3, defaultAction: '终止+core', canCatch: true, description: 'Ctrl+\\' },
  { name: 'SIGKILL', number: 9, defaultAction: '终止', canCatch: false, description: '强制终止' },
  { name: 'SIGSEGV', number: 11, defaultAction: '终止+core', canCatch: true, description: '段错误' },
  { name: 'SIGTERM', number: 15, defaultAction: '终止', canCatch: true, description: '请求终止' },
  { name: 'SIGCHLD', number: 17, defaultAction: '忽略', canCatch: true, description: '子进程状态改变' },
  { name: 'SIGSTOP', number: 19, defaultAction: '暂停', canCatch: false, description: '暂停进程' },
  { name: 'SIGCONT', number: 18, defaultAction: '继续', canCatch: true, description: '继续执行' },
]

export default function SignalHandlingVisualization() {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null)
  const [processState, setProcessState] = useState<'running' | 'stopped' | 'terminated'>('running')
  const [log, setLog] = useState<string[]>([])

  const sendSignal = (signal: Signal) => {
    setSelectedSignal(signal)
    const newLog = [...log]

    if (signal.name === 'SIGKILL') {
      setProcessState('terminated')
      newLog.push(`收到 ${signal.name} - 强制终止（不可捕获）`)
    } else if (signal.name === 'SIGSTOP') {
      setProcessState('stopped')
      newLog.push(`收到 ${signal.name} - 进程暂停（不可捕获）`)
    } else if (signal.name === 'SIGCONT') {
      setProcessState('running')
      newLog.push(`收到 ${signal.name} - 进程继续执行`)
    } else if (signal.canCatch) {
      newLog.push(`收到 ${signal.name} - 执行自定义处理函数`)
      newLog.push(`处理完成，进程继续运行`)
    }

    setLog(newLog)
  }

  const reset = () => {
    setSelectedSignal(null)
    setProcessState('running')
    setLog([])
  }

  const stateColors = {
    running: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    stopped: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    terminated: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  }

  const stateLabels = {
    running: '运行中',
    stopped: '已暂停',
    terminated: '已终止',
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">信号处理可视化</h3>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-sm">进程状态:</div>
        <span className={`px-3 py-1 rounded ${stateColors[processState]}`}>
          {stateLabels[processState]}
        </span>
        <button
          onClick={reset}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          重置
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-sm font-medium mb-2">信号列表（点击发送信号）</div>
          <div className="space-y-2">
            {signals.map(signal => (
              <button
                key={signal.name}
                onClick={() => sendSignal(signal)}
                disabled={processState === 'terminated'}
                className={`w-full p-3 rounded-lg text-left text-sm transition-all ${selectedSignal?.name === signal.name
                    ? 'bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700'
                    : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } disabled:opacity-50`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-medium">{signal.name}</span>
                  <span className="text-xs text-gray-500">信号 {signal.number}</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {signal.description}
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700">
                    {signal.defaultAction}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${signal.canCatch
                      ? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
                      : 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300'
                    }`}>
                    {signal.canCatch ? '可捕获' : '不可捕获'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">处理日志</div>
          <div className="h-64 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {log.length === 0 ? (
              <div className="text-sm text-gray-400">点击信号发送...</div>
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
    </div>
  )
}
