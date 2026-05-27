// 实时系统演示

interface RealTimeTask {
  id: string
  period: number
  execution: number
  deadline: number
}

function rmsSchedule(tasks: RealTimeTask[], duration: number): string[] {
  const schedule: string[] = []
  const ready: RealTimeTask[] = []
  let time = 0

  const nextArrival = tasks.map(t => ({ ...t, nextArrival: 0 }))

  while (time < duration) {
    for (const t of nextArrival) {
      if (time === t.nextArrival) {
        ready.push(t)
        t.nextArrival += t.period
      }
    }

    if (ready.length === 0) {
      schedule.push('空闲')
    } else {
      ready.sort((a, b) => a.period - b.period)
      const task = ready[0]
      schedule.push(task.id)
      task.execution--
      if (task.execution === 0) {
        const idx = ready.indexOf(task)
        ready.splice(idx, 1)
      }
    }
    time++
  }

  return schedule
}

export function runDemo() {
  console.log('实时系统调度演示')
  console.log('---')

  const tasks: RealTimeTask[] = [
    { id: 'T1', period: 5, execution: 2, deadline: 5 },
    { id: 'T2', period: 10, execution: 3, deadline: 10 },
    { id: 'T3', period: 20, execution: 4, deadline: 20 },
  ]

  console.log('任务信息:')
  for (const t of tasks) {
    console.log(`  ${t.id}: 周期=${t.period}, 执行=${t.execution}, CPU利用率=${((t.execution / t.period) * 100).toFixed(1)}%`)
  }
  console.log(`  总CPU利用率: ${(tasks.reduce((s, t) => s + t.execution / t.period, 0) * 100).toFixed(1)}%`)
  console.log(`  RMS理论上限: 69%`)

  console.log()
  console.log('RMS 调度结果 (前30个时间单位):')
  const schedule = rmsSchedule(tasks, 30)
  console.log(`  ${schedule.join(' ')}`)
}
