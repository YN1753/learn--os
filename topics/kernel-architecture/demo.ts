/**
 * 内核架构演示
 */

export function runAllDemos() {
  console.log('=== 内核架构对比 ===\n')

  const architectures = [
    {
      name: '单内核 (Monolithic)',
      kernel: ['进程管理', '内存管理', '文件系统', '设备驱动', '网络协议'],
      pros: ['性能好', '实现简单'],
      cons: ['稳定性差', '难以维护'],
      examples: ['Linux', 'Unix', 'MS-DOS'],
    },
    {
      name: '微内核 (Microkernel)',
      kernel: ['进程调度', 'IPC', '基本内存管理'],
      pros: ['稳定性好', '安全性高', '可扩展性好'],
      cons: ['性能差', '实现复杂'],
      examples: ['Minix', 'QNX', 'L4'],
    },
    {
      name: '混合内核 (Hybrid)',
      kernel: ['进程管理', '内存管理', '核心驱动'],
      pros: ['平衡性能和稳定性', '灵活性好'],
      cons: ['设计复杂', '边界不清晰'],
      examples: ['Windows NT', 'macOS (XNU)'],
    },
  ]

  for (const arch of architectures) {
    console.log(`【${arch.name}】`)
    console.log(`  内核功能: ${arch.kernel.join(', ')}`)
    console.log(`  优点: ${arch.pros.join(', ')}`)
    console.log(`  缺点: ${arch.cons.join(', ')}`)
    console.log(`  代表: ${arch.examples.join(', ')}`)
    console.log()
  }

  console.log('=== 特性对比 ===\n')
  console.log('特性'.padEnd(12) + '单内核'.padEnd(12) + '微内核'.padEnd(12) + '混合内核')
  console.log('-'.repeat(48))
  console.log('性能'.padEnd(12) + '好'.padEnd(12) + '差'.padEnd(12) + '中等')
  console.log('稳定性'.padEnd(12) + '差'.padEnd(12) + '好'.padEnd(12) + '中等')
  console.log('安全性'.padEnd(12) + '差'.padEnd(12) + '好'.padEnd(12) + '中等')
  console.log('可扩展性'.padEnd(10) + '差'.padEnd(12) + '好'.padEnd(12) + '好')
  console.log('实现难度'.padEnd(10) + '简单'.padEnd(12) + '复杂'.padEnd(12) + '复杂')

  console.log('\n=== Linux模块化 ===\n')
  console.log('Linux虽然是单内核，但支持可加载内核模块(LKM):')
  console.log('  - 模块可以在运行时加载和卸载')
  console.log('  - 不需要重启系统')
  console.log('  - 方便添加新功能')
  console.log()
  console.log('常用命令:')
  console.log('  sudo modprobe module_name  # 加载模块')
  console.log('  sudo modprobe -r module_name  # 卸载模块')
  console.log('  lsmod  # 查看已加载模块')
}
