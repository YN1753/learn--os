/**
 * 进程调度算法演示
 *
 * 演示几种常见的进程调度算法：
 * 1. 先来先服务 (FCFS)
 * 2. 短作业优先 (SJF)
 * 3. 时间片轮转 (RR)
 */

interface Task {
  id: number
  name: string
  arrivalTime: number
  burstTime: number
  startTime?: number
  finishTime?: number
}

function calculateFCFS(tasks: Task[]) {
  console.log('=== 先来先服务调度 (FCFS) ===\n')

  const sorted = [...tasks].sort((a, b) => a.arrivalTime - b.arrivalTime)
  let currentTime = 0

  for (const task of sorted) {
    if (currentTime < task.arrivalTime) {
      currentTime = task.arrivalTime
    }
    task.startTime = currentTime
    task.finishTime = currentTime + task.burstTime
    currentTime = task.finishTime

    console.log(`进程${task.id} (${task.name}): 开始=${task.startTime}, 结束=${task.finishTime}, 等待=${task.startTime - task.arrivalTime}`)
  }

  const avgWait = sorted.reduce((sum, t) => sum + (t.startTime! - t.arrivalTime), 0) / sorted.length
  console.log(`\n平均等待时间: ${avgWait.toFixed(1)}`)
}

function calculateSJF(tasks: Task[]) {
  console.log('\n=== 短作业优先调度 (SJF) ===\n')

  const remaining = tasks.map(t => ({ ...t, remaining: t.burstTime }))
  let currentTime = 0
  const completed: Task[] = []

  while (remaining.length > 0) {
    const available = remaining.filter(t => t.arrivalTime <= currentTime)

    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(t => t.arrivalTime))
      continue
    }

    available.sort((a, b) => a.remaining - b.remaining)
    const task = available[0]

    task.startTime = currentTime
    task.finishTime = currentTime + task.burstTime
    currentTime = task.finishTime

    console.log(`进程${task.id} (${task.name}): 开始=${task.startTime}, 结束=${task.finishTime}, 等待=${task.startTime - task.arrivalTime}`)

    completed.push(task as any)
    remaining.splice(remaining.indexOf(task as any), 1)
  }

  const avgWait = completed.reduce((sum, t) => sum + (t.startTime! - t.arrivalTime), 0) / completed.length
  console.log(`\n平均等待时间: ${avgWait.toFixed(1)}`)
}

function calculateRR(tasks: Task[], quantum: number) {
  console.log(`\n=== 时间片轮转调度 (RR, 时间片=${quantum}) ===\n`)

  const queue: (Task & { remaining: number })[] = tasks.map(t => ({ ...t, remaining: t.burstTime }))
  let currentTime = 0
  const completed: Task[] = []
  const readyQueue: typeof queue = []

  // 按到达时间排序并加入就绪队列
  const sorted = [...queue].sort((a, b) => a.arrivalTime - b.arrivalTime)
  let idx = 0

  while (idx < sorted.length && sorted[idx].arrivalTime <= currentTime) {
    readyQueue.push(sorted[idx])
    idx++
  }

  while (readyQueue.length > 0 || idx < sorted.length) {
    if (readyQueue.length === 0) {
      currentTime = sorted[idx].arrivalTime
      while (idx < sorted.length && sorted[idx].arrivalTime <= currentTime) {
        readyQueue.push(sorted[idx])
        idx++
      }
      continue
    }

    const task = readyQueue.shift()!
    const executeTime = Math.min(quantum, task.remaining)

    if (task.startTime === undefined) {
      task.startTime = currentTime
    }

    console.log(`时间${currentTime}: 进程${task.id}执行${executeTime}单位`)
    currentTime += executeTime
    task.remaining -= executeTime

    // 新到达的进程加入就绪队列
    while (idx < sorted.length && sorted[idx].arrivalTime <= currentTime) {
      readyQueue.push(sorted[idx])
      idx++
    }

    if (task.remaining > 0) {
      readyQueue.push(task)
    } else {
      task.finishTime = currentTime
      completed.push(task)
      console.log(`  进程${task.id}完成, 等待=${task.finishTime - task.arrivalTime - task.burstTime}`)
    }
  }

  const avgWait = completed.reduce((sum, t) => sum + (t.finishTime! - t.arrivalTime - t.burstTime), 0) / completed.length
  console.log(`\n平均等待时间: ${avgWait.toFixed(1)}`)
}

export function runAllDemos() {
  const tasks: Task[] = [
    { id: 1, name: '浏览器', arrivalTime: 0, burstTime: 6 },
    { id: 2, name: '编辑器', arrivalTime: 1, burstTime: 3 },
    { id: 3, name: '音乐', arrivalTime: 2, burstTime: 2 },
  ]

  console.log('进程列表:')
  for (const t of tasks) {
    console.log(`  进程${t.id} (${t.name}): 到达=${t.arrivalTime}, 执行=${t.burstTime}`)
  }
  console.log()

  calculateFCFS(tasks.map(t => ({ ...t })))
  calculateSJF(tasks.map(t => ({ ...t })))
  calculateRR(tasks.map(t => ({ ...t })), 2)
}
