// 互斥锁与信号量演示

class Mutex {
  private locked = false
  private owner: string | null = null

  lock(threadId: string): boolean {
    if (this.locked) {
      console.log(`  ${threadId}: 等待获取锁（被 ${this.owner} 持有）`)
      return false
    }
    this.locked = true
    this.owner = threadId
    console.log(`  ${threadId}: 获取锁成功`)
    return true
  }

  unlock(threadId: string): boolean {
    if (this.owner !== threadId) {
      console.log(`  ${threadId}: 不是锁的持有者，无法释放`)
      return false
    }
    this.locked = false
    this.owner = null
    console.log(`  ${threadId}: 释放锁`)
    return true
  }
}

class Semaphore {
  private value: number

  constructor(initialValue: number) {
    this.value = initialValue
  }

  wait(threadId: string): boolean {
    if (this.value <= 0) {
      console.log(`  ${threadId}: P操作失败（信号量=${this.value}），阻塞`)
      return false
    }
    this.value--
    console.log(`  ${threadId}: P操作成功（信号量=${this.value}）`)
    return true
  }

  post(threadId: string): void {
    this.value++
    console.log(`  ${threadId}: V操作（信号量=${this.value}）`)
  }
}

export function runDemo() {
  console.log('互斥锁演示')
  console.log('---')

  const mutex = new Mutex()
  mutex.lock('T1')
  mutex.lock('T2')  // 会失败
  mutex.unlock('T1')
  mutex.lock('T2')  // 现在成功了
  mutex.unlock('T2')

  console.log()
  console.log('信号量演示')
  console.log('---')

  const sem = new Semaphore(2)
  sem.wait('T1')
  sem.wait('T2')
  sem.wait('T3')  // 会失败
  sem.post('T1')
  sem.wait('T3')  // 现在成功了
  sem.post('T2')
  sem.post('T3')
}
