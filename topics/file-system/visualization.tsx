'use client'

import React, { useState } from 'react'

interface FileNode {
  name: string
  type: 'file' | 'dir'
  children?: FileNode[]
  size?: string
  expanded?: boolean
}

const initialTree: FileNode = {
  name: '/',
  type: 'dir',
  expanded: true,
  children: [
    {
      name: 'home',
      type: 'dir',
      expanded: false,
      children: [
        {
          name: 'user1',
          type: 'dir',
          expanded: false,
          children: [
            { name: 'documents', type: 'dir', expanded: false, children: [
              { name: 'report.txt', type: 'file', size: '2.5KB' },
              { name: 'notes.md', type: 'file', size: '1.2KB' },
            ]},
            { name: 'photos', type: 'dir', expanded: false, children: [
              { name: 'vacation.jpg', type: 'file', size: '3.2MB' },
              { name: 'family.jpg', type: 'file', size: '2.8MB' },
            ]},
            { name: '.bashrc', type: 'file', size: '0.5KB' },
          ],
        },
      ],
    },
    {
      name: 'etc',
      type: 'dir',
      expanded: false,
      children: [
        { name: 'hosts', type: 'file', size: '0.2KB' },
        { name: 'passwd', type: 'file', size: '1.1KB' },
      ],
    },
    {
      name: 'var',
      type: 'dir',
      expanded: false,
      children: [
        { name: 'log', type: 'dir', expanded: false, children: [
          { name: 'syslog', type: 'file', size: '15.3MB' },
        ]},
      ],
    },
    { name: 'tmp', type: 'dir', expanded: false, children: [] },
  ],
}

function TreeNode({ node, depth }: { node: FileNode; depth: number }) {
  const [expanded, setExpanded] = useState(node.expanded ?? false)

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={() => node.type === 'dir' && setExpanded(!expanded)}
      >
        {node.type === 'dir' ? (
          <span className="text-yellow-500">{expanded ? '📂' : '📁'}</span>
        ) : (
          <span className="text-blue-500">📄</span>
        )}
        <span className="text-sm">{node.name}</span>
        {node.size && (
          <span className="text-xs text-gray-400 ml-auto">{node.size}</span>
        )}
      </div>
      {expanded && node.children?.map((child, idx) => (
        <TreeNode key={idx} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function FileSystemVisualization() {
  const [path, setPath] = useState('/home/user1/documents')

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">文件系统目录结构</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">目录树</h4>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 max-h-80 overflow-auto">
            <TreeNode node={initialTree} depth={0} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">路径示例</h4>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm">
              <div className="text-xs text-gray-500 mb-1">绝对路径</div>
              <code className="text-blue-600 dark:text-blue-400">/home/user1/documents/report.txt</code>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm">
              <div className="text-xs text-gray-500 mb-1">相对路径（从 /home/user1）</div>
              <code className="text-green-600 dark:text-green-400">documents/report.txt</code>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm">
              <div className="text-xs text-gray-500 mb-1">父目录</div>
              <code className="text-purple-600 dark:text-purple-400">../photos/vacation.jpg</code>
            </div>
          </div>

          <h4 className="text-sm font-medium mt-4 mb-2 text-gray-600 dark:text-gray-400">文件操作</h4>
          <div className="grid grid-cols-2 gap-2">
            {['创建', '读取', '写入', '删除'].map(op => (
              <div key={op} className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-center text-sm">
                {op}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        点击文件夹可以展开/折叠。文件系统用树形结构组织文件，每个文件都有唯一的路径。
      </div>
    </div>
  )
}
