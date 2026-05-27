'use client'

import React, { useState } from 'react'

const commands = [
  { cmd: 'ls', desc: '列出文件', example: 'ls -la' },
  { cmd: 'cd', desc: '切换目录', example: 'cd /home' },
  { cmd: 'mkdir', desc: '创建目录', example: 'mkdir newdir' },
  { cmd: 'rm', desc: '删除文件', example: 'rm file.txt' },
  { cmd: 'cp', desc: '复制文件', example: 'cp src dst' },
  { cmd: 'mv', desc: '移动/重命名', example: 'mv old new' },
  { cmd: 'cat', desc: '查看文件内容', example: 'cat file.txt' },
  { cmd: 'grep', desc: '搜索文本', example: 'grep "pattern" file' },
  { cmd: 'chmod', desc: '修改权限', example: 'chmod 755 file' },
  { cmd: 'ps', desc: '查看进程', example: 'ps aux' },
  { cmd: 'kill', desc: '终止进程', example: 'kill -9 PID' },
  { cmd: 'echo', desc: '输出文本', example: 'echo "hello"' },
]

export default function ShellVisualization() {
  const [selected, setSelected] = useState<number | null>(null)
  const [input, setInput] = useState('')

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Shell命令速查</h3>

      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="输入命令搜索..."
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {commands
          .filter(c => input === '' || c.cmd.includes(input.toLowerCase()) || c.desc.includes(input))
          .map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              className={`p-2 rounded-lg text-left text-sm transition-all ${selected === i ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'} border`}
            >
              <code className="font-mono text-blue-600 dark:text-blue-400">{c.cmd}</code>
              <div className="text-xs text-gray-500 mt-1">{c.desc}</div>
            </button>
          ))}
      </div>

      {selected !== null && selected < commands.length && (
        <div className="p-3 rounded-lg bg-gray-900 text-green-400 font-mono text-sm">
          <div className="text-gray-500">$ {commands[selected].example}</div>
          <div className="text-gray-400 mt-1"># {commands[selected].desc}</div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        点击命令查看详细用法和示例
      </div>
    </div>
  )
}
