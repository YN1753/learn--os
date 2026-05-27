// 磁盘调度算法演示

function fcfs(requests: number[], start: number): number[] {
  return [start, ...requests]
}

function sstf(requests: number[], start: number): number[] {
  const seq = [start]
  const remaining = [...requests]
  let pos = start

  while (remaining.length > 0) {
    let minDist = Infinity
    let minIdx = 0
    for (let i = 0; i < remaining.length; i++) {
      const dist = Math.abs(remaining[i] - pos)
      if (dist < minDist) {
        minDist = dist
        minIdx = i
      }
    }
    pos = remaining[minIdx]
    seq.push(pos)
    remaining.splice(minIdx, 1)
  }

  return seq
}

function scan(requests: number[], start: number): number[] {
  const sorted = [...requests].sort((a, b) => a - b)
  const left = sorted.filter(r => r < start).reverse()
  const right = sorted.filter(r => r >= start)
  return [start, ...right, ...left]
}

function cscan(requests: number[], start: number): number[] {
  const sorted = [...requests].sort((a, b) => a - b)
  const right = sorted.filter(r => r >= start)
  const left = sorted.filter(r => r < start)
  return [start, ...right, ...left]
}

function totalMovement(seq: number[]): number {
  let total = 0
  for (let i = 1; i < seq.length; i++) {
    total += Math.abs(seq[i] - seq[i - 1])
  }
  return total
}

export function runDemo() {
  const requests = [98, 183, 37, 122, 14, 124, 65, 67]
  const start = 53

  console.log('磁盘调度算法演示')
  console.log('请求队列:', requests.join(', '))
  console.log('初始位置:', start)
  console.log('---')

  const algorithms = [
    { name: 'FCFS', fn: fcfs },
    { name: 'SSTF', fn: sstf },
    { name: 'SCAN', fn: scan },
    { name: 'C-SCAN', fn: cscan },
  ]

  for (const algo of algorithms) {
    const seq = algo.fn(requests, start)
    const movement = totalMovement(seq)
    console.log(`${algo.name}:`)
    console.log(`  访问序列: ${seq.join(' → ')}`)
    console.log(`  总移动距离: ${movement}`)
  }
}
