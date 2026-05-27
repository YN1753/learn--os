// 页面置换算法演示

interface PageFrame {
  page: number | null
  accessBit: boolean
}

function fifo(referenceString: number[], frameCount: number): number {
  const frames: PageFrame[] = Array.from({ length: frameCount }, () => ({ page: null, accessBit: false }))
  let faults = 0
  let pointer = 0

  for (const page of referenceString) {
    const hit = frames.some(f => f.page === page)
    if (!hit) {
      frames[pointer] = { page, accessBit: true }
      pointer = (pointer + 1) % frameCount
      faults++
    }
  }

  return faults
}

function lru(referenceString: number[], frameCount: number): number {
  const frames: number[] = []
  let faults = 0

  for (const page of referenceString) {
    const idx = frames.indexOf(page)
    if (idx !== -1) {
      frames.splice(idx, 1)
      frames.push(page)
    } else {
      if (frames.length >= frameCount) {
        frames.shift()
      }
      frames.push(page)
      faults++
    }
  }

  return faults
}

function clock(referenceString: number[], frameCount: number): number {
  const frames: PageFrame[] = Array.from({ length: frameCount }, () => ({ page: null, accessBit: false }))
  let faults = 0
  let pointer = 0

  for (const page of referenceString) {
    const hitIdx = frames.findIndex(f => f.page === page)
    if (hitIdx !== -1) {
      frames[hitIdx].accessBit = true
    } else {
      while (true) {
        if (!frames[pointer].accessBit) {
          frames[pointer] = { page, accessBit: true }
          pointer = (pointer + 1) % frameCount
          break
        }
        frames[pointer].accessBit = false
        pointer = (pointer + 1) % frameCount
      }
      faults++
    }
  }

  return faults
}

export function runDemo() {
  const referenceString = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1]
  const frameCount = 3

  console.log('页面置换算法演示')
  console.log('引用串:', referenceString.join(', '))
  console.log('物理帧数:', frameCount)
  console.log('---')
  console.log('FIFO 缺页次数:', fifo(referenceString, frameCount))
  console.log('LRU 缺页次数:', lru(referenceString, frameCount))
  console.log('Clock 缺页次数:', clock(referenceString, frameCount))
}
