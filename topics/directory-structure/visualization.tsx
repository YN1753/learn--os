'use client'

import React, { useState } from 'react'

interface TreeNode {
  name: string
  type: 'file' | 'dir'
  children?: TreeNode[]
}

const fileSystem: TreeNode = {
  name: '/',
  type: 'dir',
  children: [
    {
      name: 'bin',
      type: 'dir',
      children: [
        { name: 'ls', type: 'file' },
        { name: 'cp', type: 'file' },
        { name: 'mv', type: 'file' },
      ],
    },
    {
      name: 'etc',
      type: 'dir',
      children: [
        { name: 'hosts', type: 'file' },
        { name: 'passwd', type: 'file' },
      ],
    },
    {
      name: 'home',
      type: 'dir',
      children: [
        {
          name: 'user',
          type: 'dir',
          children: [
            { name: 'documents', type: 'dir' },
            { name: '.bashrc', type: 'file' },
          ],
        },
      ],
    },
    {
      name: 'var',
      type: 'dir',
      children: [
        {
          name: 'log',
          type: 'dir',
          children: [
            { name: 'syslog', type: 'file' },
          ],
        },
      ],
    },
  ],
}

export default function DirectoryStructureVisualization() {
  const [selected, setSelected] = useState<string>('/')
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['/']))

  const toggleExpand = (path: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  const renderNode = (node: TreeNode, path: string, depth: number) => {
    const fullPath = path === '/' ? `/${node.name}` : `${path}/${node.name}`
    const isExpanded = expanded.has(fullPath)
    const isSelected = selected === fullPath

    return (
      <div key={fullPath}>
        <div
          className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${isSelected
              ? 'bg-blue-100 dark:bg-blue-900'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          style={{ marginLeft: `${depth * 20}px` }}
          onClick={() => {
            setSelected(fullPath)
            if (node.type === 'dir') toggleExpand(fullPath)
          }}
        >
          <span className="w-4 text-center">
            {node.type === 'dir' ? (isExpanded ? '📂' : '📁') : '📄'}
          </span>
          <span className="text-sm">{node.name}</span>
        </div>
        {node.type === 'dir' && isExpanded && node.children?.map(child =>
          renderNode(child, fullPath, depth + 1)
        )}
      </div>
    )
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">目录结构可视化</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium mb-2">目录树</div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg h-64 overflow-y-auto">
            {renderNode(fileSystem, '', 0)}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">当前路径</div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
            {selected}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            点击目录展开/折叠，点击文件选中
          </div>
        </div>
      </div>
    </div>
  )
}
