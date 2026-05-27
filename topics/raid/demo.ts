// RAID 存储技术演示

interface RAIDConfig {
  name: string
  description: string
  diskCount: number
  capacity: number
  faultTolerance: number
  readPerformance: string
  writePerformance: string
}

export function runDemo() {
  console.log('RAID 存储技术演示')
  console.log('---')

  const configs: RAIDConfig[] = [
    { name: 'RAID 0', description: '条带化', diskCount: 4, capacity: 4, faultTolerance: 0, readPerformance: '最好', writePerformance: '最好' },
    { name: 'RAID 1', description: '镜像', diskCount: 4, capacity: 2, faultTolerance: 2, readPerformance: '好', writePerformance: '一般' },
    { name: 'RAID 5', description: '分布式奇偶校验', diskCount: 4, capacity: 3, faultTolerance: 1, readPerformance: '好', writePerformance: '较差' },
    { name: 'RAID 6', description: '双校验', diskCount: 4, capacity: 2, faultTolerance: 2, readPerformance: '好', writePerformance: '差' },
    { name: 'RAID 10', description: '镜像+条带化', diskCount: 4, capacity: 2, faultTolerance: 2, readPerformance: '最好', writePerformance: '好' },
  ]

  console.log('各 RAID 级别比较 (4块磁盘，每块1TB):')
  console.log()
  console.log('级别'.padEnd(10), '容量'.padEnd(8), '容错'.padEnd(8), '读性能'.padEnd(10), '写性能')
  console.log('-'.repeat(50))

  for (const config of configs) {
    console.log(
      config.name.padEnd(10),
      `${config.capacity}TB`.padEnd(8),
      `${config.faultTolerance}盘`.padEnd(8),
      config.readPerformance.padEnd(10),
      config.writePerformance
    )
  }

  console.log()
  console.log('选择建议:')
  console.log('  RAID 0: 需要最大性能，数据不重要')
  console.log('  RAID 1: 需要最大可靠性')
  console.log('  RAID 5: 性能和可靠性的平衡')
  console.log('  RAID 10: 需要高性能和高可靠性')
}
