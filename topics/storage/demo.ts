/**
 * 存储管理演示
 */

export function runAllDemos() {
  console.log('=== 存储层次结构 ===\n')

  const layers = [
    { name: '寄存器', speed: '<1ns', size: 'KB', cost: '最高' },
    { name: 'L1缓存', speed: '1-2ns', size: '64KB', cost: '很高' },
    { name: 'L2缓存', speed: '3-10ns', size: '256KB-1MB', cost: '高' },
    { name: 'L3缓存', speed: '10-20ns', size: '4-64MB', cost: '较高' },
    { name: '内存', speed: '50-100ns', size: 'GB', cost: '中' },
    { name: 'SSD', speed: '25-100us', size: 'GB-TB', cost: '较低' },
    { name: 'HDD', speed: '3-10ms', size: 'TB', cost: '低' },
    { name: '磁带', speed: '秒-分', size: 'TB+', cost: '最低' },
  ]

  console.log('层级'.padEnd(10) + '速度'.padEnd(12) + '容量'.padEnd(12) + '成本')
  console.log('-'.repeat(50))
  for (const l of layers) {
    console.log(l.name.padEnd(10) + l.speed.padEnd(12) + l.size.padEnd(12) + l.cost)
  }

  console.log('\n=== RAID对比 ===\n')
  const raids = [
    { name: 'RAID 0', disks: 2, fault: '无', read: '好', write: '好', capacity: '100%' },
    { name: 'RAID 1', disks: 2, fault: '1个', read: '好', write: '一般', capacity: '50%' },
    { name: 'RAID 5', disks: 3, fault: '1个', read: '好', write: '一般', capacity: '(n-1)/n' },
    { name: 'RAID 10', disks: 4, fault: '每组1个', read: '好', write: '好', capacity: '50%' },
  ]

  console.log('RAID'.padEnd(8) + '最少盘'.padEnd(8) + '容错'.padEnd(10) + '读'.padEnd(8) + '写'.padEnd(8) + '容量')
  console.log('-'.repeat(50))
  for (const r of raids) {
    console.log(r.name.padEnd(8) + String(r.disks).padEnd(8) + r.fault.padEnd(10) + r.read.padEnd(8) + r.write.padEnd(8) + r.capacity)
  }

  console.log('\n=== SSD vs HDD ===\n')
  console.log('特性'.padEnd(12) + 'SSD'.padEnd(16) + 'HDD')
  console.log('-'.repeat(40))
  console.log('速度'.padEnd(12) + '500-7000MB/s'.padEnd(16) + '100-200MB/s')
  console.log('噪音'.padEnd(12) + '无'.padEnd(16) + '有')
  console.log('抗震'.padEnd(12) + '好'.padEnd(16) + '差')
  console.log('寿命'.padEnd(12) + '写入次数有限'.padEnd(16) + '机械磨损')
  console.log('价格'.padEnd(12) + '较贵'.padEnd(16) + '便宜')

  console.log('\n=== 缓存原理 ===\n')
  console.log('时间局部性: 最近访问的数据可能再次被访问')
  console.log('空间局部性: 相邻的数据可能被一起访问')
  console.log('缓存命中: 数据在缓存中找到（快）')
  console.log('缓存缺失: 数据不在缓存中（慢）')
}
