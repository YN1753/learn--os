'use client'

import React, { useState } from 'react'

export default function NFSVisualization() {
  const [mounted, setMounted] = useState(false)
  const [files, setFiles] = useState(['file1.txt', 'file2.txt', 'documents/'])

  const mountNFS = () => {
    setMounted(true)
  }

  const unmountNFS = () => {
    setMounted(false)
  }

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">NFS网络文件系统可视化</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">NFS服务器</div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded">
            <div className="text-sm font-medium mb-1">/shared</div>
            <div className="space-y-1 text-sm text-gray-500">
              {files.map((f, idx) => (
                <div key={idx}>📄 {f}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
          <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">客户端</div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded">
            <div className="text-sm font-medium mb-1">/mnt/nfs</div>
            {mounted ? (
              <div className="space-y-1 text-sm text-gray-500">
                {files.map((f, idx) => (
                  <div key={idx}>📄 {f}</div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400">未挂载</div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
        <div className="font-medium mb-1">配置示例</div>
        <div className="font-mono text-xs">
          # 服务器 /etc/exports<br />
          /shared 192.168.1.0/24(rw,sync,no_root_squash)
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={mounted ? unmountNFS : mountNFS}
          className={`px-4 py-2 rounded-lg text-white text-sm ${mounted ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {mounted ? 'umount' : 'mount'}
        </button>
      </div>
    </div>
  )
}
