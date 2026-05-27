'use client'

import React, { useState } from 'react'

type OSType = 'batch' | 'timesharing' | 'realtime' | 'embedded'

export default function OSTypesVisualization() {
  const [type, setType] = useState<OSType>('batch')

  const configs = {
    batch: {
      name: '批处理系统',
      features: ['无交互性', '作业成批处理', 'CPU利用率高'],
      pros: ['适合大规模计算', 'CPU利用率高'],
      cons: ['无交互性', '周转时间长'],
      examples: ['大型机', '科学计算', '批量报表'],
    },
    timesharing: {
      name: '分时系统',
      features: ['多用户共享', '交互性好', '响应时间短'],
      pros: ['多用户支持', '交互性好'],
      cons: ['CPU利用率不如批处理', '上下文切换开销'],
      examples: ['Unix服务器', '大型机终端', '多用户系统'],
    },
    realtime: {
      name: '实时系统',
      features: ['时间约束严格', '可预测性高', '可靠性高'],
      pros: ['响应时间可预测', '可靠性高'],
      cons: ['资源利用率可能不高', '开发复杂'],
      examples: ['工业控制', '汽车电子', '医疗设备'],
    },
    embedded: {
      name: '嵌入式系统',
      features: ['专用设备', '资源受限', '低功耗'],
      pros: ['针对性强', '效率高'],
      cons: ['功能有限', '扩展性差'],
      examples: ['智能手机', '物联网', '家用电器'],
    },
  }

  const config = configs[type]

  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">操作系统类型</h3>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['batch', 'timesharing', 'realtime', 'embedded'] as const).map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${type === t ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600'}`}
          >
            {configs[t].name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">特点</h4>
          <div className="flex gap-2 flex-wrap">
            {config.features.map((f, i) => (
              <span key={i} className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950">
            <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">优点</div>
            <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
              {config.pros.map((p, i) => <li key={i}>- {p}</li>)}
            </ul>
          </div>
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950">
            <div className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">缺点</div>
            <ul className="text-xs text-red-600 dark:text-red-400 space-y-1">
              {config.cons.map((c, i) => <li key={i}>- {c}</li>)}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">应用场景</h4>
          <div className="flex gap-2 flex-wrap">
            {config.examples.map((e, i) => (
              <span key={i} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
