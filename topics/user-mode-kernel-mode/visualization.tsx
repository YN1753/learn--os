'use client'

import React, { useState, useEffect, useCallback } from 'react'

export default function UserKernelModeVisualization() {
  const [mode, setMode] = useState<'user' | 'kernel'>('user')
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000)
  const [syscallType, setSyscallType] = useState<'read' | 'write' | 'fork'>('read')

  const syscallSteps = {
    read: [
      { mode: 'user' as const, desc: '用户程序调用 read() 函数' },
      { mode: 'user' as const, desc: '执行 syscall 指令' },
      { mode: 'kernel' as const, desc: 'CPU 切换到内核态 (Ring 0)' },
      { mode: 'kernel' as const, desc: '保存用户态寄存器' },
      { mode: 'kernel' as const, desc: '查找系统调用表，找到 read 处理函数' },
      { mode: 'kernel' as const, desc: '执行 read 系统调用（从磁盘读取数据）' },
      { mode: 'kernel' as const, desc: '将数据复制到用户空间缓冲区' },
      { mode: 'kernel' as const, desc: '恢复用户态寄存器' },
      { mode: 'user' as const, desc: 'CPU 切换回用户态 (Ring 3)' },
      { mode: 'user' as const, desc: '用户程序继续执行，获得数据' },
    ],
    write: [
      { mode: 'user' as const, desc: '用户程序调用 write() 函数' },
      { mode: 'user' as const, desc: '执行 syscall 指令' },
      { mode: 'kernel' as const, desc: 'CPU 切换到内核态 (Ring 0)' },
      { mode: 'kernel' as const, desc: '保存用户态寄存器' },
      { mode: 'kernel' as const, desc: '查找系统调用表，找到 write 处理函数' },
      { mode: 'kernel' as const, desc: '验证用户缓冲区地址是否合法' },
      { mode: 'kernel' as const, desc: '将数据从用户空间复制到内核缓冲区' },
      { mode: 'kernel' as const, desc: '发起磁盘写入操作' },
      { mode: 'kernel' as const, desc: '恢复用户态寄存器' },
      { mode: 'user' as const, desc: 'CPU 切换回用户态 (Ring 3)' },
    ],
    fork: [
      { mode: 'user' as const, desc: '用户程序调用 fork() 函数' },
      { mode: 'user' as const, desc: '执行 syscall 指令' },
      { mode: 'kernel' as const, desc: 'CPU 切换到内核态 (Ring 0)' },
      { mode: 'kernel' as const, desc: '保存用户态寄存器' },
      { mode: 'kernel' as const, desc: '为子进程分配新的 PID' },
      { mode: 'kernel' as const, desc: '复制父进程的 PCB' },
      { mode: 'kernel' as const, desc: '复制父进程的地址空间（写时复制）' },
      { mode: 'kernel' as const, desc: '设置子进程的返回值为 0' },
      { mode: 'kernel' as const, desc: '将子进程加入就绪队列' },
      { mode: 'user' as const, desc: '返回用户态，父进程获得子进程 PID' },
    ],
  }

  const steps = syscallSteps[syscallType]

  const reset = useCallback(() => {
    setMode('user')
    setStep(-1)
    setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing) return
    if (step >= steps.length - 1) {
      setPlaying(false)
      return
    }

    const timer = setTimeout(() => {
      const nextStep = step + 1
      setStep(nextStep)
      setMode(steps[nextStep].mode)
    }, speed)

    return () => clearTimeout(timer)
  }, [playing, step, speed, steps])

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">用户态与内核态切换可视化</h3>

      <div className="flex gap-2 mb-4">
        {(['read', 'write', 'fork'] as const).map(type => (
          <button
            key={type}
            onClick={() => { setSyscallType(type); reset() }}
            className={`px-3 py-1 rounded text-sm transition-colors ${syscallType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {type}()
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className={`p-6 rounded-lg border-2 transition-all duration-300 ${mode === 'user'
              ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950'
              : 'border-gray-200 dark:border-gray-700 opacity-50'
            }`}
        >
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">用户态 (Ring 3)</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {mode === 'user' ? '运行中' : '等待'}
            </div>
            <div className="text-sm text-gray-500 mt-2">权限受限</div>
          </div>
        </div>
        <div
          className={`p-6 rounded-lg border-2 transition-all duration-300 ${mode === 'kernel'
              ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950'
              : 'border-gray-200 dark:border-gray-700 opacity-50'
            }`}
        >
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">内核态 (Ring 0)</div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {mode === 'kernel' ? '运行中' : '等待'}
            </div>
            <div className="text-sm text-gray-500 mt-2">最高权限</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium mb-2">执行步骤</div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-sm transition-all duration-300 ${step >= idx
                  ? s.mode === 'kernel'
                    ? 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                    : 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-50'
                }`}
            >
              <span className="font-mono text-gray-400 mr-2">{idx + 1}.</span>
              <span className={`px-1.5 py-0.5 rounded text-xs mr-2 ${s.mode === 'kernel'
                  ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300'
                  : 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                }`}>
                {s.mode === 'kernel' ? '内核' : '用户'}
              </span>
              {s.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setPlaying(!playing)}
          disabled={step >= steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm"
        >
          {playing ? '暂停' : '播放'}
        </button>
        <button
          onClick={() => {
            if (step < steps.length - 1) {
              const nextStep = step + 1
              setStep(nextStep)
              setMode(steps[nextStep].mode)
            }
          }}
          disabled={playing || step >= steps.length - 1}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors text-sm"
        >
          单步
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
    </div>
  )
}
