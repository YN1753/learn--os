/**
 * 系统调用演示
 */

export function runAllDemos() {
  console.log('=== 用户态 vs 内核态 ===\n')
  console.log('用户态:')
  console.log('  - 运行应用程序')
  console.log('  - 权限受限')
  console.log('  - 不能直接访问硬件')
  console.log('  - 不能执行特权指令\n')

  console.log('内核态:')
  console.log('  - 运行操作系统内核')
  console.log('  - 最高权限')
  console.log('  - 可以访问所有资源')
  console.log('  - 可以执行所有指令\n')

  console.log('=== 系统调用分类 ===\n')
  const categories = [
    { name: '进程管理', calls: ['fork()', 'exec()', 'exit()', 'wait()'] },
    { name: '文件操作', calls: ['open()', 'read()', 'write()', 'close()'] },
    { name: '内存管理', calls: ['mmap()', 'brk()', 'malloc()'] },
    { name: '设备管理', calls: ['ioctl()', 'read()', 'write()'] },
    { name: '网络通信', calls: ['socket()', 'bind()', 'listen()', 'accept()'] },
  ]

  for (const cat of categories) {
    console.log(`${cat.name}: ${cat.calls.join(', ')}`)
  }

  console.log('\n=== 系统调用执行过程 ===\n')
  const steps = [
    '用户程序调用库函数',
    '库函数将系统调用号放入寄存器',
    '触发软件中断(陷阱)',
    'CPU切换到内核态',
    '内核查找系统调用表',
    '执行系统调用处理程序',
    '将结果放入寄存器',
    '返回用户态',
    '库函数返回结果',
  ]
  steps.forEach((s, i) => console.log(`  ${i + 1}. ${s}`))

  console.log('\n=== 系统调用 vs 库函数 ===\n')
  console.log('特性'.padEnd(12) + '系统调用'.padEnd(14) + '库函数')
  console.log('-'.repeat(40))
  console.log('运行态'.padEnd(12) + '内核态'.padEnd(14) + '用户态')
  console.log('开销'.padEnd(12) + '大(切换)'.padEnd(14) + '小')
  console.log('功能'.padEnd(12) + '底层操作'.padEnd(14) + '封装功能')
  console.log('示例'.padEnd(12) + 'read()'.padEnd(14) + 'fread()')

  console.log('\n=== fork()示例 ===\n')
  console.log('调用fork()后:')
  console.log('  父进程: 返回子进程PID')
  console.log('  子进程: 返回0')
  console.log('  两个进程独立运行')
  console.log('  共享代码段，独立数据段')
}
