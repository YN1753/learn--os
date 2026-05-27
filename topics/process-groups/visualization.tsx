'use client'

import React, { useState } from 'react'

interface Process {
  pid: number
  pgid: number
  name: string
  state: 'running' | 'stopped' | 'background'
}

export default function ProcessGroupsVisualization() {
  const [processes, setProcesses] = useState<Process[]>([
    { pid: 100, pgid: 100, name: 'bash', state: 'running' },
    { pid: 101, pgid: 101, name: 'sleep 100', state: 'running' },
    { pid: 102, pgid: 101, name: 'sleep 200', state: 'running' },
  ])
  const [fgGroup, setFgGroup] = useState(100)

  const sendSignal = (signal: string) => {
    if (signal === 'SIGINT') {
      setProcesses(prev => prev.filter(p => p.pgid !== fgGroup || p.pgid === 100))
    } else if (signal === 'SIGTSTP') {
      setProcesses(prev => prev.map(p =>
        p.pgid === fgGroup ? { ...p, state: 'stopped' as const } : p
      ))
    }
  }

  const bringToFg = (pgid: number) => {
    setFgGroup(pgid)
    setProcesses(prev => prev.map(p =>
      p.pgid === pgid ? { ...p, state: 'running' as const } : p
    ))
  }

  const groups = [...new Set(processes.map(p => p.pgid))]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">进程组与作业控制</h3>

      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">进程组</div>
        <div className="space-y-2">
          {groups.map(pgid => {
            const groupProcs = processes.filter(p => p.pgid === pgid)
            const isFg = pgid === fgGroup
            return (
              <div
                key={pgid}
                className={`p-3 rounded-lg border-2 transition-all ${isFg
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-gray-200 dark:border-gray-700'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    PGID: {pgid} {isFg && '(前台)'}
                  </span>
                  {!isFg && (
                    <button
                      onClick={() => bringToFg(pgid)}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      fg
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {groupProcs.map(p => (
                    <div key={p.pid} className="flex items-center gap-2 text-sm">
                      <span className="font-mono">PID: {p.pid}</span>
                      <span>{p.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs ${p.state === 'running'
                          ? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
                          : 'bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300'
                        }`}>
                        {p.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => sendSignal('SIGINT')}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          Ctrl+C (SIGINT)
        </button>
        <button
          onClick={() => sendSignal('SIGTSTP')}
          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
        >
          Ctrl+Z (SIGTSTP)
        </button>
      </div>
    </div>
  )
}
