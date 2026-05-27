/**
 * 并发编程模型演示
 */

export function runAllDemos() {
  console.log('=== 并发 vs 并行 ===\n')
  console.log('并发(Concurrency): 多个任务交替执行，单核也能实现')
  console.log('并行(Parallelism): 多个任务同时执行，需要多核\n')

  console.log('=== 并发模型对比 ===\n')
  const models = [
    { name: '多进程', pros: '隔离性好', cons: '开销大', scene: '需要隔离' },
    { name: '多线程', pros: '共享内存', cons: '竞态条件', scene: 'CPU密集型' },
    { name: '线程池', pros: '减少开销', cons: '配置复杂', scene: '批量任务' },
    { name: '协程', pros: '轻量高效', cons: '不能并行', scene: 'IO密集型' },
    { name: '异步IO', pros: '非阻塞', cons: '回调地狱', scene: '高并发IO' },
    { name: '事件驱动', pros: '高并发', cons: '调试难', scene: '网络服务器' },
  ]

  console.log('模型'.padEnd(10) + '优点'.padEnd(14) + '缺点'.padEnd(14) + '适用场景')
  console.log('-'.repeat(55))
  for (const m of models) {
    console.log(m.name.padEnd(10) + m.pros.padEnd(14) + m.cons.padEnd(14) + m.scene)
  }

  console.log('\n=== 线程池参数 ===\n')
  console.log('核心线程数: 始终存活的线程数')
  console.log('最大线程数: 线程池最大容量')
  console.log('任务队列: 存放等待执行的任务')
  console.log('拒绝策略: 队列满时的处理方式')

  console.log('\n=== 协程 vs 线程 ===\n')
  console.log('特性'.padEnd(12) + '线程'.padEnd(14) + '协程')
  console.log('-'.repeat(40))
  console.log('调度'.padEnd(12) + '操作系统'.padEnd(14) + '程序自己')
  console.log('切换开销'.padEnd(12) + '大(内核态)'.padEnd(14) + '小(用户态)')
  console.log('内存占用'.padEnd(12) + 'MB级'.padEnd(14) + 'KB级')
  console.log('数量限制'.padEnd(12) + '百级'.padEnd(14) + '万级')
  console.log('并行能力'.padEnd(12) + '可真并行'.padEnd(14) + '单线程并发')

  console.log('\n=== Go语言并发模型 ===\n')
  console.log('Goroutine: 轻量级协程，由Go运行时调度')
  console.log('Channel: 用于goroutine之间通信')
  console.log('select: 同时等待多个channel操作')
  console.log('特点: 简单、高效、安全')
}
