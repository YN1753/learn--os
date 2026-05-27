// 调度算法演示

interface Process {
  id: string
  arrival: number
  burst: number
  priority: number
}

function fcfs(processes: Process[]): void {
  console.log('FCFS (先来先服务):')
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival)
  let time = 0
  let totalWaiting = 0

  for (const p of sorted) {
    if (time < p.arrival) time = p.arrival
    const waiting = time - p.arrival
    totalWaiting += waiting
    console.log(`  ${p.id}: 开始=${time}, 完成=${time + p.burst}, 等待=${waiting}`)
    time += p.burst
  }
  console.log(`  平均等待时间: ${(totalWaiting / processes.length).toFixed(2)}`)
}

function sjf(processes: Process[]): void {
  console.log('SJF (最短作业优先):')
  const remaining = processes.map(p => ({ ...p, remaining: p.burst }))
  let time = 0
  let completed = 0
  let totalWaiting = 0

  while (completed < processes.length) {
    const available = remaining.filter(p => p.arrival <= time && p.remaining > 0)
    if (available.length === 0) {
      time++
      continue
    }
    available.sort((a, b) => a.burst - b.burst)
    const p = available[0]
    const waiting = time - p.arrival
    totalWaiting += waiting
    console.log(`  ${p.id}: 开始=${time}, 完成=${time + p.burst}, 等待=${waiting}`)
    time += p.burst
    p.remaining = 0
    completed++
  }
  console.log(`  平均等待时间: ${(totalWaiting / processes.length).toFixed(2)}`)
}

function rr(processes: Process[], quantum: number): void {
  console.log(`RR (时间片轮转, 时间片=${quantum}):`)
  const remaining = processes.map(p => ({ ...p, remaining: p.burst }))
  let time = 0
  let completed = 0
  const queue: number[] = []
  const visited = new Set<number>()
  let totalWaiting = 0

  while (completed < processes.length) {
    for (let i = 0; i < processes.length; i++) {
      if (!visited.has(i) && processes[i].arrival <= time && remaining[i].remaining > 0) {
        queue.push(i)
        visited.add(i)
      }
    }

    if (queue.length === 0) {
      time++
      continue
    }

    const idx = queue.shift()!
    const p = remaining[idx]
    const execTime = Math.min(quantum, p.remaining)

    if (p.remaining === p.burst) {
      // 第一次执行
    }

    console.log(`  ${p.id}: 执行 ${execTime} 单位 (${time}-${time + execTime})`)
    time += execTime
    p.remaining -= execTime

    for (let i = 0; i < processes.length; i++) {
      if (!visited.has(i) && processes[i].arrival <= time && remaining[i].remaining > 0) {
        queue.push(i)
        visited.add(i)
      }
    }

    if (p.remaining > 0) {
      queue.push(idx)
    } else {
      const waiting = time - processes[idx].arrival - processes[idx].burst
      totalWaiting += waiting
      completed++
    }
  }
  console.log(`  平均等待时间: ${(totalWaiting / processes.length).toFixed(2)}`)
}

export function runDemo() {
  const processes: Process[] = [
    { id: 'P1', arrival: 0, burst: 6, priority: 3 },
    { id: 'P2', arrival: 1, burst: 4, priority: 1 },
    { id: 'P3', arrival: 2, burst: 2, priority: 4 },
    { id: 'P4', arrival: 3, burst: 3, priority: 2 },
  ]

  console.log('调度算法演示')
  console.log('进程: P1(到达=0,执行=6), P2(1,4), P3(2,2), P4(3,3)')
  console.log('---')

  fcfs(processes)
  console.log()
  sjf(processes)
  console.log()
  rr(processes, 2)
}
