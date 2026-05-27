/**
 * 内存管理演示
 *
 * 演示分页管理和页面置换算法：
 * 1. 分页地址转换
 * 2. FIFO 页面置换
 * 3. LRU 页面置换
 */

interface PageTableEntry {
  pageNum: number
  frameNum: number | null
  valid: boolean
  accessTime: number
}

function demonstratePaging() {
  console.log('=== 分页地址转换演示 ===\n')
  console.log('页面大小: 4KB (4096 字节)')
  console.log('虚拟地址空间: 16KB (4 页)')
  console.log('物理内存: 32KB (8 页框)\n')

  const pageTable: PageTableEntry[] = [
    { pageNum: 0, frameNum: 3, valid: true, accessTime: 0 },
    { pageNum: 1, frameNum: 7, valid: true, accessTime: 0 },
    { pageNum: 2, frameNum: null, valid: false, accessTime: 0 },
    { pageNum: 3, frameNum: 1, valid: true, accessTime: 0 },
  ]

  console.log('页表:')
  console.log('虚拟页号 -> 物理页框 | 有效位')
  for (const entry of pageTable) {
    const frame = entry.valid ? entry.frameNum : '磁盘'
    console.log(`  页${entry.pageNum} -> ${frame} | ${entry.valid ? '有效' : '无效'}`)
  }

  const addresses = [0x0000, 0x1500, 0x2000, 0x3800]

  console.log('\n地址转换:')
  for (const addr of addresses) {
    const pageSize = 4096
    const pageNum = Math.floor(addr / pageSize)
    const offset = addr % pageSize
    const entry = pageTable[pageNum]

    if (entry.valid) {
      const physicalAddr = entry.frameNum! * pageSize + offset
      console.log(`  虚拟地址 0x${addr.toString(16).padStart(4, '0')} -> 物理地址 0x${physicalAddr.toString(16).padStart(4, '0')} (页${pageNum}, 偏移${offset})`)
    } else {
      console.log(`  虚拟地址 0x${addr.toString(16).padStart(4, '0')} -> 缺页中断！页${pageNum}不在内存中`)
    }
  }
}

function demonstrateFIFO() {
  console.log('\n=== FIFO 页面置换算法 ===\n')

  const frameCount = 3
  const referenceString = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]

  const frames: number[] = []
  let faults = 0
  let pointer = 0

  console.log(`页框数: ${frameCount}`)
  console.log(`访问序列: ${referenceString.join(', ')}\n`)

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i]

    if (!frames.includes(page)) {
      faults++
      if (frames.length < frameCount) {
        frames.push(page)
      } else {
        frames[pointer] = page
        pointer = (pointer + 1) % frameCount
      }
      console.log(`访问页${page}: 缺页! 页框: [${frames.join(', ')}]`)
    } else {
      console.log(`访问页${page}: 命中   页框: [${frames.join(', ')}]`)
    }
  }

  console.log(`\n总缺页次数: ${faults}`)
  console.log(`缺页率: ${(faults / referenceString.length * 100).toFixed(1)}%`)
}

function demonstrateLRU() {
  console.log('\n=== LRU 页面置换算法 ===\n')

  const frameCount = 3
  const referenceString = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]

  const frames: number[] = []
  let faults = 0

  console.log(`页框数: ${frameCount}`)
  console.log(`访问序列: ${referenceString.join(', ')}\n`)

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i]

    if (!frames.includes(page)) {
      faults++
      if (frames.length < frameCount) {
        frames.push(page)
      } else {
        // 找到最近最少使用的页
        let lruIndex = 0
        let lruTime = Infinity
        for (let j = 0; j < frames.length; j++) {
          const lastAccess = referenceString.lastIndexOf(frames[j], i - 1)
          if (lastAccess < lruTime) {
            lruTime = lastAccess
            lruIndex = j
          }
        }
        frames[lruIndex] = page
      }
      console.log(`访问页${page}: 缺页! 页框: [${frames.join(', ')}]`)
    } else {
      console.log(`访问页${page}: 命中   页框: [${frames.join(', ')}]`)
    }
  }

  console.log(`\n总缺页次数: ${faults}`)
  console.log(`缺页率: ${(faults / referenceString.length * 100).toFixed(1)}%`)
}

export function runAllDemos() {
  demonstratePaging()
  console.log('\n' + '='.repeat(50) + '\n')
  demonstrateFIFO()
  console.log('\n' + '='.repeat(50) + '\n')
  demonstrateLRU()
}
