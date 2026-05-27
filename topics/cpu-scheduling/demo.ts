/**
 * CPU调度算法对比演示
 *
 * 对比不同调度算法的性能指标
 */

interface Process {
  id: number
  name: string
  arrival: number
  burst: number
}

const processes: Process[] = [
  { id: 1, name: 'P1', arrival: 0, burst: 6 },
  { id: 2, name: 'P2', arrival: 1, burst: 3 },
  { id: 3, name: 'P3', arrival: 2, burst: 2 },
  { id: 4, name: 'P4', arrival: 3, burst: 4 },
]

interface Result {
  name: string
  finish: number
  turnaround: number
  waiting: number
}

function runFCFS(procs: Process[]): Result[] {
  const sorted = [...procs].sort((a, b) => a.arrival - b.arrival)
  let time = 0
  return sorted.map(p => {
    if (time < p.arrival) time = p.arrival
    const finish = time + p.burst
    time = finish
    return {
      name: p.name,
      finish,
      turnaround: finish - p.arrival,
      waiting: finish - p.arrival - p.burst,
    }
  })
}

function runSJF(procs: Process[]): Result[] {
  const remaining = procs.map(p => ({ ...p, remaining: p.burst }))
  const results: Result[] = []
  let time = 0

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrival <= time)
    if (available.length === 0) {
      time = Math.min(...remaining.map(p => p.arrival))
      continue
    }
    available.sort((a, b) => a.remaining - b.remaining)
    const p = available[0]
    const finish = time + p.burst
    results.push({
      name: p.name,
      finish,
      turnaround: finish - p.arrival,
      waiting: finish - p.arrival - p.burst,
    })
    time = finish
    remaining.splice(remaining.indexOf(p), 1)
  }
  return results
}

function runRR(procs: Process[], quantum: number): Result[] {
  const queue = procs.map(p => ({ ...p, remaining: p.burst }))
  const results: Result[] = []
  let time = 0
  const ready: typeof queue = []
  const sorted = [...queue].sort((a, b) => a.arrival - b.arrival)
  let idx = 0
  const finishMap: Record<number, number> = {}

  while (idx < sorted.length && sorted[idx].arrival <= time) {
    ready.push(sorted[idx])
    idx++
  }

  while (ready.length > 0 || idx < sorted.length) {
    if (ready.length === 0) {
      time = sorted[idx].arrival
      while (idx < sorted.length && sorted[idx].arrival <= time) {
        ready.push(sorted[idx])
        idx++
      }
    }
    const p = ready.shift()!
    const exec = Math.min(quantum, p.remaining)
    time += exec
    p.remaining -= exec
    while (idx < sorted.length && sorted[idx].arrival <= time) {
      ready.push(sorted[idx])
      idx++
    }
    if (p.remaining > 0) {
      ready.push(p)
    } else {
      finishMap[p.id] = time
    }
  }

  return procs.map(p => ({
    name: p.name,
    finish: finishMap[p.id],
    turnaround: finishMap[p.id] - p.arrival,
    waiting: finishMap[p.id] - p.arrival - p.burst,
  }))
}

function printResults(title: string, results: Result[]) {
  console.log(`\n${title}:`)
  console.log('进程 | 完成时间 | 周转时间 | 等待时间')
  console.log('-'.repeat(40))
  let totalTurnaround = 0
  let totalWaiting = 0
  for (const r of results) {
    console.log(`${r.name}   | ${r.finish}        | ${r.turnaround}        | ${r.waiting}`)
    totalTurnaround += r.turnaround
    totalWaiting += r.waiting
  }
  console.log(`平均周转时间: ${(totalTurnaround / results.length).toFixed(1)}`)
  console.log(`平均等待时间: ${(totalWaiting / results.length).toFixed(1)}`)
}

export function runAllDemos() {
  console.log('=== CPU调度算法性能对比 ===\n')
  console.log('进程列表:')
  for (const p of processes) {
    console.log(`  ${p.name}: 到达=${p.arrival}, 执行=${p.burst}`)
  }

  printResults('先来先服务 (FCFS)', runFCFS(processes))
  printResults('短作业优先 (SJF)', runSJF(processes))
  printResults('时间片轮转 (RR, q=2)', runRR(processes, 2))
}
