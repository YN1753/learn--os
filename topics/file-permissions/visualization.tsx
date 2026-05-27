'use client'

import React, { useState } from 'react'

export default function FilePermissionsVisualization() {
  const [owner, setOwner] = useState({ r: true, w: true, x: true })
  const [group, setGroup] = useState({ r: true, w: false, x: true })
  const [others, setOthers] = useState({ r: true, w: false, x: false })
  const [isDir, setIsDir] = useState(false)

  const getOctal = () => {
    const calc = (perms: { r: boolean; w: boolean; x: boolean }) =>
      (perms.r ? 4 : 0) + (perms.w ? 2 : 0) + (perms.x ? 1 : 0)
    return `${calc(owner)}${calc(group)}${calc(others)}`
  }

  const getString = () => {
    const p = (perms: { r: boolean; w: boolean; x: boolean }) =>
      `${perms.r ? 'r' : '-'}${perms.w ? 'w' : '-'}${perms.x ? 'x' : '-'}`
    return `${isDir ? 'd' : '-'}${p(owner)}${p(group)}${p(others)}`
  }

  const toggle = (user: 'owner' | 'group' | 'others', perm: 'r' | 'w' | 'x') => {
    const setter = user === 'owner' ? setOwner : user === 'group' ? setGroup : setOthers
    setter(prev => ({ ...prev, [perm]: !prev[perm] }))
  }

  const users = [
    { name: '所有者', perms: owner, key: 'owner' as const },
    { name: '组', perms: group, key: 'group' as const },
    { name: '其他', perms: others, key: 'others' as const },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">文件权限可视化</h3>

      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-lg text-center">
        {getString()}
      </div>

      <div className="mb-4 grid grid-cols-4 gap-2 text-center text-sm">
        <div></div>
        <div className="font-medium">读 (r)</div>
        <div className="font-medium">写 (w)</div>
        <div className="font-medium">执行 (x)</div>
        {users.map(user => (
          <React.Fragment key={user.key}>
            <div className="text-left font-medium">{user.name}</div>
            {(['r', 'w', 'x'] as const).map(perm => (
              <button
                key={perm}
                onClick={() => toggle(user.key, perm)}
                className={`p-2 rounded transition-colors ${user.perms[perm]
                    ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                    : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                  }`}
              >
                {user.perms[perm] ? '✓' : '✗'}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm">数字表示:</span>
        <span className="font-mono text-lg font-bold">{getOctal()}</span>
      </div>

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isDir}
            onChange={e => setIsDir(e.target.checked)}
            className="rounded"
          />
          是目录
        </label>
      </div>
    </div>
  )
}
