// 虚拟内存地址转换演示

interface PageTableEntry {
  frame: number | null
  present: boolean
}

const PAGE_SIZE = 1024
const PAGE_BITS = 10

const pageTable: PageTableEntry[] = [
  { frame: 3, present: true },
  { frame: 7, present: true },
  { frame: null, present: false },
  { frame: 1, present: true },
  { frame: 5, present: true },
  { frame: null, present: false },
  { frame: 2, present: true },
  { frame: 9, present: true },
]

function translate(virtualAddr: number): { physicalAddr: number | null, error?: string } {
  const virtualPage = Math.floor(virtualAddr / PAGE_SIZE)
  const offset = virtualAddr % PAGE_SIZE

  if (virtualPage >= pageTable.length) {
    return { physicalAddr: null, error: `页号 ${virtualPage} 超出页表范围` }
  }

  const entry = pageTable[virtualPage]
  if (!entry.present) {
    return { physicalAddr: null, error: `页号 ${virtualPage} 不在内存中，触发缺页中断` }
  }

  const physicalAddr = entry.frame! * PAGE_SIZE + offset
  return { physicalAddr }
}

export function runDemo() {
  console.log('虚拟内存地址转换演示')
  console.log(`页大小: ${PAGE_SIZE} 字节 (${PAGE_BITS} 位偏移)`)
  console.log('---')

  const testAddresses = [0, 1024, 2048, 3076, 5000, 7168]

  for (const addr of testAddresses) {
    const result = translate(addr)
    if (result.physicalAddr !== null) {
      const page = Math.floor(addr / PAGE_SIZE)
      const offset = addr % PAGE_SIZE
      console.log(`虚拟地址 ${addr}:`)
      console.log(`  页号: ${page}, 偏移: ${offset}`)
      console.log(`  物理帧: ${pageTable[page].frame}`)
      console.log(`  物理地址: ${result.physicalAddr}`)
    } else {
      console.log(`虚拟地址 ${addr}: ${result.error}`)
    }
    console.log()
  }
}
