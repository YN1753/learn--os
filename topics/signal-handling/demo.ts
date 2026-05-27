// 信号处理演示

interface SignalInfo {
  name: string
  number: number
  defaultAction: string
  canCatch: boolean
}

const signals: SignalInfo[] = [
  { name: 'SIGHUP', number: 1, defaultAction: '终止', canCatch: true },
  { name: 'SIGINT', number: 2, defaultAction: '终止', canCatch: true },
  { name: 'SIGQUIT', number: 3, defaultAction: '终止+core', canCatch: true },
  { name: 'SIGKILL', number: 9, defaultAction: '终止', canCatch: false },
  { name: 'SIGSEGV', number: 11, defaultAction: '终止+core', canCatch: true },
  { name: 'SIGTERM', number: 15, defaultAction: '终止', canCatch: true },
  { name: 'SIGCHLD', number: 17, defaultAction: '忽略', canCatch: true },
  { name: 'SIGSTOP', number: 19, defaultAction: '暂停', canCatch: false },
  { name: 'SIGCONT', number: 18, defaultAction: '继续', canCatch: true },
]

export function runDemo() {
  console.log('信号处理演示')
  console.log('---')

  console.log('常见信号列表:')
  console.log()

  for (const sig of signals) {
    console.log(`${sig.name} (信号 ${sig.number}):`)
    console.log(`  默认行为: ${sig.defaultAction}`)
    console.log(`  可捕获: ${sig.canCatch ? '是' : '否'}`)
    console.log()
  }

  console.log('信号处理方式:')
  console.log('  1. 默认行为 - 执行信号的默认动作')
  console.log('  2. 捕获信号 - 执行自定义处理函数')
  console.log('  3. 忽略信号 - 丢弃信号')
  console.log('  4. 阻塞信号 - 暂时阻止信号传递')
  console.log()

  console.log('信号发送方式:')
  console.log('  1. kill() 系统调用 - 向指定进程发送信号')
  console.log('  2. 键盘 - Ctrl+C (SIGINT), Ctrl+\\ (SIGQUIT), Ctrl+Z (SIGTSTP)')
  console.log('  3. 内核 - 除零 (SIGFPE), 段错误 (SIGSEGV)')
  console.log('  4. 其他进程 - kill 命令或 kill() 函数')
}
