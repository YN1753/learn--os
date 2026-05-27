// 分布式系统基础演示

interface Node {
  id: number
  data: Record<string, string>
}

export function runDemo() {
  console.log('分布式系统基础演示')
  console.log('---')

  console.log('CAP 定理:')
  console.log('  C (一致性): 所有节点看到相同数据')
  console.log('  A (可用性): 每个请求都能得到响应')
  console.log('  P (分区容错): 网络分区时系统仍能工作')
  console.log('  最多只能同时满足两个')
  console.log()

  console.log('一致性模型:')
  console.log('  强一致性: 写入后立即可读')
  console.log('  最终一致性: 经过一段时间后所有节点一致')
  console.log('  因果一致性: 有因果关系的操作保持顺序')
  console.log()

  console.log('常见架构模式:')
  console.log('  1. 客户端-服务器: 最简单的分布式架构')
  console.log('  2. 主从复制: 一个主节点处理写入，多个从节点处理读取')
  console.log('  3. 对等网络: 所有节点平等，无中心节点')
  console.log('  4. 微服务: 将应用拆分为独立的服务')

  console.log()
  console.log('示例: 主从复制')
  const master: Node = { id: 1, data: { key1: 'value1' } }
  const slaves: Node[] = [
    { id: 2, data: { key1: 'value1' } },
    { id: 3, data: { key1: 'value1' } },
  ]
  console.log(`  主节点: ${JSON.stringify(master.data)}`)
  console.log(`  从节点1: ${JSON.stringify(slaves[0].data)}`)
  console.log(`  从节点2: ${JSON.stringify(slaves[1].data)}`)
}
