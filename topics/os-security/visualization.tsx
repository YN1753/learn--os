'use client'

import React, { useState } from 'react'

interface Permission {
  read: boolean
  write: boolean
  execute: boolean
}

interface FilePermissions {
  owner: Permission
  group: Permission
  others: Permission
}

export default function OSSecurityVisualization() {
  const [permissions, setPermissions] = useState<FilePermissions>({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: false },
  })
  const [currentUser, setCurrentUser] = useState<'owner' | 'group' | 'others'>('owner')

  function toggle(who: 'owner' | 'group' | 'others', perm: keyof Permission) {
    setPermissions(prev => ({
      ...prev,
      [who]: { ...prev[who], [perm]: !prev[who][perm] },
    }))
  }

  function formatPerm(p: Permission): string {
    return (p.read ? 'r' : '-') + (p.write ? 'w' : '-') + (p.execute ? 'x' : '-')
  }

  const octal = (p: Permission) => (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0)
  const octalStr = `${octal(permissions.owner)}${octal(permissions.group)}${octal(permissions.others)}`

  const currentPerms = permissions[currentUser]
  const canRead = currentPerms.read
  const canWrite = currentPerms.write
  const canExecute = currentPerms.execute

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">文件权限管理</h3>

      <div className="mb-4 p-3 rounded-lg bg-gray-900 text-green-400 font-mono text-sm">
        -{formatPerm(permissions.owner)}{formatPerm(permissions.group)}{formatPerm(permissions.others)} file.txt
        <span className="ml-4 text-gray-500">({octalStr})</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {(['owner', 'group', 'others'] as const).map(who => (
          <div key={who} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium mb-2">
              {who === 'owner' ? '所有者' : who === 'group' ? '组' : '其他'}
            </div>
            <div className="space-y-2">
              {(['read', 'write', 'execute'] as const).map(perm => (
                <label key={perm} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions[who][perm]}
                    onChange={() => toggle(who, perm)}
                    className="rounded"
                  />
                  {perm === 'read' ? '读 (r)' : perm === 'write' ? '写 (w)' : '执行 (x)'}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">模拟访问</h4>
        <div className="flex gap-2 mb-3">
          {(['owner', 'group', 'others'] as const).map(who => (
            <button
              key={who}
              onClick={() => setCurrentUser(who)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                currentUser === who
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 dark:border-gray-600'
              }`}
            >
              {who === 'owner' ? '所有者' : who === 'group' ? '组用户' : '其他用户'}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <div className={`p-2 rounded-lg text-sm ${canRead ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'}`}>
            {canRead ? '可以' : '无法'}读取文件
          </div>
          <div className={`p-2 rounded-lg text-sm ${canWrite ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'}`}>
            {canWrite ? '可以' : '无法'}修改文件
          </div>
          <div className={`p-2 rounded-lg text-sm ${canExecute ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'}`}>
            {canExecute ? '可以' : '无法'}执行文件
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Linux权限模型：每个文件有所有者、组、其他三类用户的权限，用rwx表示读、写、执行。
      </div>
    </div>
  )
}
