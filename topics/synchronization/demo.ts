/**
 * 同步与互斥演示
 *
 * 演示信号量和经典同步问题
 */

export function runAllDemos() {
  console.log('=== 互斥锁演示 ===\n')

  let counter = 0
  const iterations = 100000

  console.log('无互斥保护的并发计数:')
  console.log(`  预期结果: ${iterations * 2}`)
  console.log(`  实际结果: 可能小于预期（竞态条件）\n`)

  console.log('有互斥保护的并发计数:')
  console.log(`  预期结果: ${iterations * 2}`)
  console.log(`  实际结果: 总是等于预期\n`)

  console.log('=== 生产者-消费者演示 ===\n')

  const bufferSize = 4
  const buffer: number[] = []
  let produced = 0
  let consumed = 0
  const totalItems = 10

  console.log(`缓冲区大小: ${bufferSize}`)
  console.log(`总生产数量: ${totalItems}\n`)

  for (let i = 0; i < totalItems * 2; i++) {
    if (i % 2 === 0) {
      if (buffer.length < bufferSize) {
        produced++
        buffer.push(produced)
        console.log(`生产: ${produced} | 缓冲区: [${buffer.join(',')}]`)
      } else {
        console.log('生产等待: 缓冲区满')
      }
    } else {
      if (buffer.length > 0) {
        const item = buffer.shift()!
        consumed = item
        console.log(`消费: ${item} | 缓冲区: [${buffer.join(',')}]`)
      } else {
        console.log('消费等待: 缓冲区空')
      }
    }
  }

  console.log('\n=== 信号量操作演示 ===\n')

  let semaphore = 1

  function wait() {
    if (semaphore <= 0) {
      console.log('  P操作: 等待...')
      return false
    }
    semaphore--
    console.log(`  P操作: 信号量 ${semaphore + 1} -> ${semaphore}`)
    return true
  }

  function signal() {
    semaphore++
    console.log(`  V操作: 信号量 ${semaphore - 1} -> ${semaphore}`)
  }

  console.log('初始信号量: 1\n')
  console.log('进程A尝试进入临界区:')
  wait()
  console.log('进程A在临界区中...')
  console.log('进程B尝试进入临界区:')
  wait()
  console.log('进程A离开临界区:')
  signal()
  console.log('进程B进入临界区:')
  wait()

  console.log('\n=== 哲学家就餐问题 ===\n')
  console.log('5个哲学家，5根筷子')
  console.log('每人需要左右两根筷子才能吃饭')
  console.log()
  console.log('解决方案1: 最多允许4人同时拿筷子')
  console.log('解决方案2: 拿筷子前检查两边都可用')
  console.log('解决方案3: 按编号顺序拿筷子')
}
