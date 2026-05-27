'use client'

import React, { useState } from 'react'

export default function DebuggingVisualization() {
  const [step, setStep] = useState(0)
  const [activeTab, setActiveTab] = useState<'gdb' | 'strace'>('gdb')

  const gdbSteps = [
    { cmd: '$ gdb ./myprogram', output: 'GNU gdb (Ubuntu 12.1)', desc: '启动GDB' },
    { cmd: '(gdb) break main', output: 'Breakpoint 1 at 0x401136', desc: '设置断点' },
    { cmd: '(gdb) run', output: 'Starting program...', desc: '运行程序' },
    { cmd: '(gdb) print x', output: '$1 = 42', desc: '查看变量值' },
    { cmd: '(gdb) next', output: 'y = x * 2', desc: '单步执行' },
    { cmd: '(gdb) backtrace', output: '#0 main() at test.c:10', desc: '查看调用栈' },
  ]

  const straceSteps = [
    { cmd: '$ strace ./myprogram', output: 'execve("./myprogram", ...)', desc: '追踪系统调用' },
    { cmd: '', output: 'open("/etc/passwd", O_RDONLY) = 3', desc: '打开文件' },
    { cmd: '', output: 'read(3, "root:x:0:0:...", 4096) = 1234', desc: '读取文件' },
    { cmd: '', output: 'write(1, "Hello\\n", 6) = 6', desc: '标准输出' },
    { cmd: '', output: 'close(3) = 0', desc: '关闭文件' },
    { cmd: '', output: 'exit_group(0) = ?', desc: '程序退出' },
  ]

  const steps = activeTab === 'gdb' ? gdbSteps : straceSteps

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">系统调试可视化</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setActiveTab('gdb'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'gdb' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          GDB调试
        </button>
        <button
          onClick={() => { setActiveTab('strace'); setStep(0) }}
          className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'strace' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          strace追踪
        </button>
      </div>

      <div className="mb-4 p-4 bg-gray-900 rounded-lg font-mono text-sm">
        <div className="text-green-400 mb-2">
          {activeTab === 'gdb' ? 'GDB调试会话' : 'strace系统调用追踪'}
        </div>
        {steps.map((s, idx) => (
          <div
            key={idx}
            className={`transition-all ${step >= idx ? 'opacity-100' : 'opacity-30'}`}
          >
            {s.cmd && <div className="text-white">{s.cmd}</div>}
            <div className="text-gray-400 pl-2">{s.output}</div>
            {step >= idx && (
              <div className="text-yellow-500 text-xs pl-4">← {s.desc}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          下一步
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
        >
          重置
        </button>
      </div>
    </div>
  )
}
