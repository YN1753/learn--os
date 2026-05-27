// 文件分配策略演示

interface DiskBlock {
  id: number
  content: string | null
  next: number | null
}

function contiguousAllocate(blocks: DiskBlock[], fileName: string, size: number): number[] {
  let start = -1
  let count = 0
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].content === null) {
      if (start === -1) start = i
      count++
      if (count === size) break
    } else {
      start = -1
      count = 0
    }
  }
  if (count < size) return []
  for (let i = start; i < start + size; i++) {
    blocks[i].content = fileName
  }
  return Array.from({ length: size }, (_, i) => start + i)
}

function linkedAllocate(blocks: DiskBlock[], fileName: string, size: number): number[] {
  const freeBlocks = blocks.filter(b => b.content === null)
  if (freeBlocks.length < size) return []
  const allocated: number[] = []
  let prevIdx = -1
  for (let i = 0; i < size; i++) {
    const block = freeBlocks[i]
    const idx = blocks.findIndex(b => b.id === block.id)
    blocks[idx].content = fileName
    allocated.push(idx)
    if (prevIdx !== -1) blocks[prevIdx].next = idx
    prevIdx = idx
  }
  return allocated
}

function indexedAllocate(blocks: DiskBlock[], fileName: string, size: number): number[] {
  const freeBlocks = blocks.filter(b => b.content === null)
  if (freeBlocks.length < size + 1) return []
  const indexIdx = blocks.findIndex(b => b.id === freeBlocks[0].id)
  blocks[indexIdx].content = `${fileName}-索引`
  const allocated = [indexIdx]
  for (let i = 1; i <= size; i++) {
    const idx = blocks.findIndex(b => b.id === freeBlocks[i].id)
    blocks[idx].content = fileName
    allocated.push(idx)
  }
  return allocated
}

export function runDemo() {
  const methods = [
    { name: '连续分配', fn: contiguousAllocate },
    { name: '链接分配', fn: linkedAllocate },
    { name: '索引分配', fn: indexedAllocate },
  ]

  for (const method of methods) {
    console.log(`${method.name}:`)
    const blocks: DiskBlock[] = Array.from({ length: 16 }, (_, i) => ({
      id: i, content: null, next: null,
    }))

    const fileA = method.fn(blocks, 'A', 3)
    const fileB = method.fn(blocks, 'B', 2)
    const fileC = method.fn(blocks, 'C', 4)

    console.log(`  文件A: 块 ${fileA.join(' → ')}`)
    console.log(`  文件B: 块 ${fileB.join(' → ')}`)
    console.log(`  文件C: 块 ${fileC.join(' → ')}`)
    console.log()
  }
}
