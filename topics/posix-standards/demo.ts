export function runDemo() {
  console.log('=== POSIX标准演示 ===\n')

  console.log('1. POSIX标准组成:')
  const standards = [
    { name: 'POSIX.1', desc: '系统调用接口' },
    { name: 'POSIX.2', desc: 'Shell和工具' },
    { name: 'POSIX.1b', desc: '实时扩展' },
    { name: 'POSIX.1c', desc: '线程接口' },
  ]
  standards.forEach(s => {
    console.log(`   ${s.name.padEnd(12)} # ${s.desc}`)
  })

  console.log('\n2. 进程管理API:')
  const processApis = [
    { api: 'fork()', desc: '创建子进程，返回子进程PID' },
    { api: 'execvp()', desc: '执行新程序，替换当前进程' },
    { api: 'wait()', desc: '等待子进程结束' },
    { api: 'exit()', desc: '终止进程' },
  ]
  processApis.forEach(a => {
    console.log(`   ${a.api.padEnd(12)} # ${a.desc}`)
  })

  console.log('\n3. 文件操作API:')
  const fileApis = [
    { api: 'open()', desc: '打开文件，返回文件描述符' },
    { api: 'read()', desc: '从文件描述符读取数据' },
    { api: 'write()', desc: '向文件描述符写入数据' },
    { api: 'close()', desc: '关闭文件描述符' },
  ]
  fileApis.forEach(a => {
    console.log(`   ${a.api.padEnd(12)} # ${a.desc}`)
  })

  console.log('\n4. POSIX代码示例:')
  console.log('   // 创建子进程并执行命令')
  console.log('   pid_t pid = fork();')
  console.log('   if (pid == 0) {')
  console.log('       // 子进程')
  console.log('       execlp("ls", "ls", "-l", NULL);')
  console.log('   } else {')
  console.log('       // 父进程')
  console.log('       wait(NULL);')
  console.log('   }')

  console.log('\n5. POSIX兼容系统:')
  const systems = [
    { os: 'Linux', compat: '高度兼容' },
    { os: 'macOS', compat: 'POSIX认证' },
    { os: 'FreeBSD', compat: '高度兼容' },
    { os: 'Solaris', compat: 'POSIX认证' },
    { os: 'Windows', compat: '有限支持' },
  ]
  systems.forEach(s => {
    console.log(`   ${s.os.padEnd(12)} ${s.compat}`)
  })
}
