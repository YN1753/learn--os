export function runDemo() {
  console.log('=== 系统调试演示 ===\n')

  console.log('1. GDB常用命令:')
  const gdbCommands = [
    { cmd: 'gdb ./program', desc: '启动GDB调试' },
    { cmd: 'break main', desc: '在main函数设置断点' },
    { cmd: 'run [args]', desc: '运行程序' },
    { cmd: 'next (n)', desc: '单步执行（不进入函数）' },
    { cmd: 'step (s)', desc: '单步执行（进入函数）' },
    { cmd: 'print var', desc: '打印变量值' },
    { cmd: 'backtrace (bt)', desc: '查看调用栈' },
    { cmd: 'continue (c)', desc: '继续执行' },
    { cmd: 'quit', desc: '退出GDB' },
  ]
  gdbCommands.forEach(c => {
    console.log(`   ${c.cmd.padEnd(20)} # ${c.desc}`)
  })

  console.log('\n2. strace示例:')
  console.log('   $ strace -p PID          # 追踪运行中的进程')
  console.log('   $ strace -e open,read    # 只追踪特定系统调用')
  console.log('   $ strace -c ./program    # 统计系统调用')

  console.log('\n3. Core Dump分析:')
  const coreSteps = [
    '启用: ulimit -c unlimited',
    '运行程序直到崩溃',
    '生成core文件',
    '分析: gdb ./program core',
    '使用bt查看崩溃点',
  ]
  coreSteps.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s}`)
  })

  console.log('\n4. 内核调试工具:')
  const kernelTools = [
    { tool: 'dmesg', desc: '查看内核日志' },
    { tool: 'printk', desc: '内核打印调试信息' },
    { tool: 'ftrace', desc: '内核函数追踪' },
    { tool: 'perf', desc: '性能分析' },
    { tool: 'KGDB', desc: '内核GDB调试' },
  ]
  kernelTools.forEach(t => {
    console.log(`   ${t.tool.padEnd(12)} # ${t.desc}`)
  })

  console.log('\n5. 调试技巧:')
  console.log('   - 编译时加-g选项生成调试信息')
  console.log('   - 使用-Wall启用所有警告')
  console.log('   - 使用Valgrind检测内存问题')
  console.log('   - 查看系统日志: /var/log/syslog')
}
