// 磁盘管理演示

interface Partition {
  name: string
  size: number
  type: string
  filesystem: string
}

export function runDemo() {
  console.log('磁盘管理演示')
  console.log('---')

  console.log('磁盘结构:')
  console.log('  盘片: 存储数据的圆盘')
  console.log('  磁头: 读写数据')
  console.log('  磁道: 同心圆')
  console.log('  扇区: 磁道的一段，通常512字节')
  console.log()

  console.log('分区方案:')
  console.log('  MBR (主引导记录):')
  console.log('    - 最多4个主分区')
  console.log('    - 最大2TB')
  console.log('    - 传统BIOS')
  console.log('  GPT (GUID分区表):')
  console.log('    - 理论无限分区')
  console.log('    - 支持>2TB')
  console.log('    - 需要UEFI')
  console.log()

  const partitions: Partition[] = [
    { name: '/dev/sda1', size: 100, type: '主分区', filesystem: 'ext4' },
    { name: '/dev/sda2', size: 200, type: '主分区', filesystem: 'xfs' },
    { name: '/dev/sda3', size: 500, type: '主分区', filesystem: 'ntfs' },
  ]

  console.log('分区示例:')
  for (const p of partitions) {
    console.log(`  ${p.name}: ${p.size}GB, ${p.type}, ${p.filesystem}`)
  }

  console.log()
  console.log('常用命令:')
  console.log('  fdisk /dev/sda     # 分区工具')
  console.log('  mkfs.ext4 /dev/sda1 # 格式化')
  console.log('  mount /dev/sda1 /mnt # 挂载')
  console.log('  df -h              # 查看磁盘使用')
  console.log('  du -sh /path       # 查看目录大小')
}
