// 进程创建与生命周期演示

interface Process {
  pid: number
  name: string
  state: 'running' | 'ready' | 'blocked' | 'zombie'
  parentPid: number | null
}

let nextPid = 1
const processes: Process[] = []

function fork(parentPid: number, childName: string): number {
  const childPid = nextPid++
  processes.push({
    pid: childPid,
    name: childName,
    state: 'ready',
    parentPid,
  })
  return childPid
}

function exec(pid: number, newName: string): void {
  const proc = processes.find(p => p.pid === pid)
  if (proc) {
    proc.name = newName
    proc.state = 'running'
  }
}

function exit(pid: number): void {
  const proc = processes.find(p => p.pid === pid)
  if (proc) {
    proc.state = 'zombie'
  }
}

function wait(parentPid: number): number | null {
  const childIdx = processes.findIndex(p => p.parentPid === parentPid && p.state === 'zombie')
  if (childIdx !== -1) {
    const child = processes[childIdx]
    processes.splice(childIdx, 1)
    return child.pid
  }
  return null
}

export function runDemo() {
  console.log('进程创建与生命周期演示')
  console.log('---')

  // init 进程
  const initPid = nextPid++
  processes.push({ pid: initPid, name: 'init', state: 'running', parentPid: null })
  console.log(`创建 init 进程 (PID=${initPid})`)

  // fork shell
  const shellPid = fork(initPid, 'shell')
  exec(shellPid, 'shell')
  console.log(`fork + exec: 创建 shell 进程 (PID=${shellPid})`)

  // shell fork ls
  const lsPid = fork(shellPid, 'ls')
  exec(lsPid, 'ls')
  console.log(`fork + exec: 创建 ls 进程 (PID=${lsPid})`)

  // ls 执行完毕
  exit(lsPid)
  console.log(`ls 进程退出，成为僵尸进程`)

  // shell wait
  const recovered = wait(shellPid)
  console.log(`shell 调用 wait()，回收子进程 PID=${recovered}`)

  console.log()
  console.log('当前进程列表:')
  for (const p of processes) {
    console.log(`  PID=${p.pid} name=${p.name} state=${p.state}`)
  }
}

