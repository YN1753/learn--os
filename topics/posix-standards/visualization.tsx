'use client'

import React, { useState } from 'react'

export default function PosixStandardsVisualization() {
  const [selectedCategory, setSelectedCategory] = useState('process')

  const categories: Record<string, { name: string; color: string; apis: { name: string; desc: string }[] }> = {
    process: {
      name: '进程管理',
      color: '#3b82f6',
      apis: [
        { name: 'fork()', desc: '创建子进程' },
        { name: 'exec()', desc: '执行新程序' },
        { name: 'wait()', desc: '等待子进程结束' },
        { name: 'exit()', desc: '终止进程' },
        { name: 'getpid()', desc: '获取进程ID' },
      ]
    },
    file: {
      name: '文件操作',
      color: '#10b981',
      apis: [
        { name: 'open()', desc: '打开文件' },
        { name: 'read()', desc: '读取文件' },
        { name: 'write()', desc: '写入文件' },
        { name: 'close()', desc: '关闭文件' },
        { name: 'lseek()', desc: '移动文件指针' },
      ]
    },
    thread: {
      name: '线程管理',
      color: '#f59e0b',
      apis: [
        { name: 'pthread_create()', desc: '创建线程' },
        { name: 'pthread_join()', desc: '等待线程结束' },
        { name: 'pthread_mutex_lock()', desc: '互斥锁加锁' },
        { name: 'pthread_cond_wait()', desc: '条件变量等待' },
        { name: 'pthread_exit()', desc: '终止线程' },
      ]
    },
    io: {
      name: 'I/O操作',
      color: '#8b5cf6',
      apis: [
        { name: 'select()', desc: 'I/O多路复用' },
        { name: 'poll()', desc: 'I/O轮询' },
        { name: 'epoll()', desc: '高效I/O多路复用' },
        { name: 'socket()', desc: '创建套接字' },
        { name: 'pipe()', desc: '创建管道' },
      ]
    }
  }

  const compatibility = [
    { os: 'Linux', level: '高度兼容', color: '#10b981' },
    { os: 'macOS', level: 'POSIX认证', color: '#3b82f6' },
    { os: 'FreeBSD', level: '高度兼容', color: '#10b981' },
    { os: 'Windows', level: '有限支持', color: '#f59e0b' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">POSIX标准可视化</h3>

      <div className="flex gap-2 mb-4">
        {Object.entries(categories).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === key
              ? 'text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={selectedCategory === key ? { backgroundColor: cat.color } : undefined}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">{categories[selectedCategory].name} API</div>
          <div className="space-y-2">
            {categories[selectedCategory].apis.map((api, idx) => (
              <div
                key={idx}
                className="p-2 bg-white dark:bg-gray-700 rounded text-sm"
                style={{ borderLeft: `4px solid ${categories[selectedCategory].color}` }}
              >
                <div className="font-mono font-medium">{api.name}</div>
                <div className="text-gray-500 text-xs">{api.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm font-medium mb-2">系统兼容性</div>
          <div className="space-y-2">
            {compatibility.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded text-sm"
              >
                <span>{c.os}</span>
                <span
                  className="px-2 py-0.5 rounded text-xs text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {c.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
        <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">POSIX代码示例</div>
        <div className="font-mono text-xs text-blue-600 dark:text-blue-400">
          pid_t pid = fork();<br/>
          if (pid == 0) {'{'}<br/>
          &nbsp;&nbsp;execvp("ls", args);<br/>
          {'}'} else {'{'}<br/>
          &nbsp;&nbsp;wait(NULL);<br/>
          {'}'}
        </div>
      </div>
    </div>
  )
}
