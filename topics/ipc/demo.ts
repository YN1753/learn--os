/**
 * 进程间通信演示
 */

export function runAllDemos() {
  console.log('=== 进程间通信方式对比 ===\n')

  const methods = [
    { name: '管道 (Pipe)', direction: '单向', relation: '亲缘关系', speed: '中', complexity: '简单' },
    { name: '命名管道 (FIFO)', direction: '单向', relation: '任意', speed: '中', complexity: '简单' },
    { name: '消息队列', direction: '双向', relation: '任意', speed: '中', complexity: '中等' },
    { name: '共享内存', direction: '双向', relation: '任意', speed: '快', complexity: '复杂' },
    { name: '信号', direction: '单向', relation: '任意', speed: '快', complexity: '简单' },
    { name: 'Socket', direction: '双向', relation: '任意', speed: '中', complexity: '中等' },
  ]

  console.log('方式'.padEnd(16) + '方向'.padEnd(8) + '关系'.padEnd(12) + '速度'.padEnd(8) + '复杂度')
  console.log('-'.repeat(55))
  for (const m of methods) {
    console.log(m.name.padEnd(16) + m.direction.padEnd(8) + m.relation.padEnd(12) + m.speed.padEnd(8) + m.complexity)
  }

  console.log('\n=== 管道示例 ===\n')
  console.log('匿名管道:')
  console.log('  int pipefd[2];')
  console.log('  pipe(pipefd);')
  console.log('  // pipefd[0] 读端')
  console.log('  // pipefd[1] 写端')
  console.log()
  console.log('命名管道:')
  console.log('  mkfifo mypipe')
  console.log('  echo "hello" > mypipe')
  console.log('  cat mypipe')

  console.log('\n=== 共享内存示例 ===\n')
  console.log('int shmid = shmget(IPC_PRIVATE, 1024, 0666);')
  console.log('char *ptr = (char*)shmat(shmid, NULL, 0);')
  console.log('strcpy(ptr, "hello");  // 写入')
  console.log('printf("%s", ptr);  // 读取')
  console.log('shmdt(ptr);  // 分离')

  console.log('\n=== 信号类型 ===\n')
  const signals = [
    { name: 'SIGINT', desc: '中断 (Ctrl+C)' },
    { name: 'SIGKILL', desc: '强制终止' },
    { name: 'SIGSEGV', desc: '段错误' },
    { name: 'SIGCHLD', desc: '子进程状态改变' },
    { name: 'SIGALRM', desc: '定时器到期' },
  ]
  for (const s of signals) {
    console.log(`  ${s.name.padEnd(12)} ${s.desc}`)
  }

  console.log('\n=== 使用场景 ===\n')
  console.log('Shell管道: ls | grep txt')
  console.log('数据库: 客户端和服务器通过Socket通信')
  console.log('多进程程序: 使用共享内存交换大量数据')
  console.log('守护进程: 使用信号处理配置重载等事件')
}
