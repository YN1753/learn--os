// 生产者消费者问题演示

class BoundedBuffer {
  private buffer: number[]
  private in = 0
  private out = 0
  private count = 0
  private size: number

  constructor(size: number) {
    this.size = size
    this.buffer = new Array(size)
  }

  produce(item: number): boolean {
    if (this.count >= this.size) {
      console.log(`  生产者: 缓冲区满，无法生产`)
      return false
    }
    this.buffer[this.in] = item
    this.in = (this.in + 1) % this.size
    this.count++
    console.log(`  生产者: 生产物品 ${item}，缓冲区占用 ${this.count}/${this.size}`)
    return true
  }

  consume(): number | null {
    if (this.count <= 0) {
      console.log(`  消费者: 缓冲区空，无法消费`)
      return null
    }
    const item = this.buffer[this.out]
    this.out = (this.out + 1) % this.size
    this.count--
    console.log(`  消费者: 消费物品 ${item}，缓冲区占用 ${this.count}/${this.size}`)
    return item
  }

  getCount(): number {
    return this.count
  }
}

export function runDemo() {
  console.log('生产者消费者问题演示')
  console.log('缓冲区大小: 4')
  console.log('---')

  const buffer = new BoundedBuffer(4)

  console.log('阶段1: 生产者快速生产')
  for (let i = 1; i <= 5; i++) {
    buffer.produce(i)
  }

  console.log()
  console.log('阶段2: 消费者消费')
  for (let i = 0; i < 3; i++) {
    buffer.consume()
  }

  console.log()
  console.log('阶段3: 交替生产和消费')
  buffer.produce(6)
  buffer.consume()
  buffer.produce(7)
  buffer.consume()

  console.log()
  console.log('最终缓冲区占用:', buffer.getCount())
}
