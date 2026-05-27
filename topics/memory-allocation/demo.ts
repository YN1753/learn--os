// 内存分配策略演示

interface MemoryBlock {
  size: number
  allocated: boolean
  process: string | null
}

function firstFit(blocks: MemoryBlock[], size: number): number {
  return blocks.findIndex(b => !b.allocated && b.size >= size)
}

function bestFit(blocks: MemoryBlock[], size: number): number {
  let bestIdx = -1
  let bestSize = Infinity
  blocks.forEach((b, i) => {
    if (!b.allocated && b.size >= size && b.size < bestSize) {
      bestSize = b.size
      bestIdx = i
    }
  })
  return bestIdx
}

function worstFit(blocks: MemoryBlock[], size: number): number {
  let worstIdx = -1
  let worstSize = 0
  blocks.forEach((b, i) => {
    if (!b.allocated && b.size >= size && b.size > worstSize) {
      worstSize = b.size
      worstIdx = i
    }
  })
  return worstIdx
}

function allocate(blocks: MemoryBlock[], size: number, strategy: string): boolean {
  let idx: number
  if (strategy === 'first-fit') idx = firstFit(blocks, size)
  else if (strategy === 'best-fit') idx = bestFit(blocks, size)
  else idx = worstFit(blocks, size)

  if (idx === -1) return false

  const block = blocks[idx]
  if (block.size > size + 10) {
    blocks.splice(idx + 1, 0, { size: block.size - size, allocated: false, process: null })
    block.size = size
  }
  block.allocated = true
  block.process = `P${Date.now() % 100}`
  return true
}

export function runDemo() {
  console.log('内存分配策略演示')
  console.log('---')

  const strategies = ['first-fit', 'best-fit', 'worst-fit']

  for (const strategy of strategies) {
    console.log(`策略: ${strategy}`)
    const blocks: MemoryBlock[] = [
      { size: 100, allocated: false, process: null },
      { size: 50, allocated: true, process: 'P1' },
      { size: 200, allocated: false, process: null },
      { size: 30, allocated: true, process: 'P2' },
      { size: 150, allocated: false, process: null },
    ]

    const sizes = [80, 60, 40]
    for (const size of sizes) {
      const success = allocate(blocks, size, strategy)
      console.log(`  分配 ${size}KB: ${success ? '成功' : '失败'}`)
    }
    console.log(`  最终布局: ${blocks.map(b => `${b.size}KB(${b.allocated ? '已分配' : '空闲'})`).join(', ')}`)
    console.log()
  }
}
