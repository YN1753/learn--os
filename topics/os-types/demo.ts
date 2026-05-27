/**
 * 操作系统类型演示
 */

export function runAllDemos() {
  console.log('=== 操作系统类型 ===\n')

  const types = [
    {
      name: '批处理系统',
      features: ['无交互性', '作业成批处理', 'CPU利用率高'],
      pros: ['适合大规模计算', 'CPU利用率高'],
      cons: ['无交互性', '周转时间长'],
      examples: ['大型机', '科学计算'],
    },
    {
      name: '分时系统',
      features: ['多用户共享', '交互性好', '响应时间短'],
      pros: ['多用户支持', '交互性好'],
      cons: ['CPU利用率不如批处理', '上下文切换开销'],
      examples: ['Unix服务器', '多用户系统'],
    },
    {
      name: '实时系统',
      features: ['时间约束严格', '可预测性高', '可靠性高'],
      pros: ['响应时间可预测', '可靠性高'],
      cons: ['资源利用率可能不高', '开发复杂'],
      examples: ['工业控制', '汽车电子', '医疗设备'],
    },
    {
      name: '网络操作系统',
      features: ['基于网络', '提供网络服务', '资源共享'],
      pros: ['资源共享', '集中管理'],
      cons: ['依赖网络', '安全风险'],
      examples: ['Windows Server', 'Linux服务器'],
    },
    {
      name: '分布式操作系统',
      features: ['多机协同', '对用户透明', '高可靠性'],
      pros: ['高性能', '高可靠性'],
      cons: ['复杂度高', '网络依赖'],
      examples: ['超级计算机', '云计算平台'],
    },
    {
      name: '嵌入式操作系统',
      features: ['专用设备', '资源受限', '低功耗'],
      pros: ['针对性强', '效率高'],
      cons: ['功能有限', '扩展性差'],
      examples: ['智能手机', '物联网', '家用电器'],
    },
    {
      name: '桌面操作系统',
      features: ['面向个人', '图形界面', '应用丰富'],
      pros: ['易于使用', '应用丰富'],
      cons: ['资源占用大', '安全性挑战'],
      examples: ['Windows', 'macOS', 'Linux桌面'],
    },
  ]

  for (const t of types) {
    console.log(`【${t.name}】`)
    console.log(`  特点: ${t.features.join(', ')}`)
    console.log(`  优点: ${t.pros.join(', ')}`)
    console.log(`  缺点: ${t.cons.join(', ')}`)
    console.log(`  应用: ${t.examples.join(', ')}`)
    console.log()
  }

  console.log('=== 硬实时 vs 软实时 ===\n')
  console.log('硬实时:')
  console.log('  - 必须在截止时间前完成')
  console.log('  - 超时就是失败')
  console.log('  - 例: 飞机控制系统、心脏起搏器')
  console.log()
  console.log('软实时:')
  console.log('  - 尽量在截止时间前完成')
  console.log('  - 超时可以接受')
  console.log('  - 例: 视频播放、游戏')
}
