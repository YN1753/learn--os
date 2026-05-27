'use client'

import React, { useState } from 'react'

interface PageTableEntry {
  virtualPage: number
  physicalFrame: number | null
  present: boolean
}

export default function VirtualMemoryVisualization() {
  const [virtualAddr, setVirtualAddr] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [step, setStep] = useState(0)
  const [pageTable] = useState<PageTableEntry[]>([
    { virtualPage: 0, physicalFrame: 3, present: true },
    { virtualPage: 1, physicalFrame: 7, present: true },
    { virtualPage: 2, physicalFrame: null, present: false },
    { virtualPage: 3, physicalFrame: 1, present: true },
    { virtualPage: 4, physicalFrame: 5, present: true },
    { virtualPage: 5, physicalFrame: null, present: false },
    { virtualPage: 6, physicalFrame: 2, present: true },
    { virtualPage: 7, physicalFrame: 9, present: true },
  ])

  const pageSize = 1024
  const bits = 10

  const translate = () => {
    const addr = parseInt(virtualAddr)
    if (isNaN(addr) || addr < 0) {
      setResult('请输入有效的虚拟地址')
      return
    }

    const virtualPage = Math.floor(addr / pageSize)
    const offset = addr % pageSize

    if (virtualPage >= pageTable.length) {
      setResult(`页号 ${virtualPage} 超出页表范围`)
      return
    }

    const entry = pageTable[virtualPage]
    setStep(1)

    if (!entry.present) {
      setResult(`页号 ${virtualPage} 不在内存中，触发缺页中断！`)
      return
    }

    const physicalAddr = entry.physicalFrame! * pageSize + offset
    setResult(`虚拟地址 ${addr} → 物理地址 ${physicalAddr}`)
  }

  const steps = [
    { label: '分解虚拟地址', desc: `页号 = 地址 / ${pageSize}，偏移 = 地址 % ${pageSize}` },
    { label: '查找页表', desc: '用页号作为索引查找页表项' },
    { label: '检查存在位', desc: '如果页面不在内存中，触发缺页中断' },
    { label: '计算物理地址', desc: '物理地址 = 物理帧号 × 页大小 + 偏移' },
  ]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">虚拟地址转换可视化</h3>

      <div className="mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          页大小: {pageSize} 字节 ({bits} 位偏移)
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={virtualAddr}
            onChange={e => setVirtualAddr(e.target.value)}
            placeholder="输入虚拟地址 (如 3076)"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
          <button
            onClick={translate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            转换
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-sm font-medium mb-2">页表</div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-3 py-2 text-left">页号</th>
                  <th className="px-3 py-2 text-left">帧号</th>
                  <th className="px-3 py-2 text-left">存在</th>
                </tr>
              </thead>
              <tbody>
                {pageTable.map((entry, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-3 py-2">{entry.virtualPage}</td>
                    <td className="px-3 py-2">{entry.physicalFrame ?? '-'}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${entry.present
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        }`}>
                        {entry.present ? '是' : '否'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">转换步骤</div>
          <div className="space-y-2">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg text-sm ${step > idx
                    ? 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
                    : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
              >
                <div className="font-medium">{s.label}</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
          <div className="text-sm font-medium mb-1">转换结果</div>
          <div className="text-lg">{result}</div>
        </div>
      )}
    </div>
  )
}
