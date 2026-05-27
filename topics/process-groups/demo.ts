// 进程组与会话演示

export function runDemo() {
  console.log('进程组与会话演示')
  console.log('---')

  console.log('概念层次:')
  console.log('  会话 (Session)')
  console.log('    └── 进程组 (Process Group)')
  console.log('        └── 进程 (Process)')
  console.log()

  console.log('示例:')
  console.log('  bash (PID=100, PGID=100, SID=100)')
  console.log('    ├── sleep 100 (PID=101, PGID=101)  # 后台进程组')
  console.log('    └── sleep 200 (PID=102, PGID=101)')
  console.log()

  console.log('作业控制:')
  console.log('  command &     # 后台运行')
  console.log('  fg %1         # 切换到前台')
  console.log('  bg %1         # 切换到后台')
  console.log('  jobs          # 列出作业')
  console.log()

  console.log('信号:')
  console.log('  Ctrl+C        # 发送SIGINT给前台进程组')
  console.log('  Ctrl+Z        # 发送SIGTSTP给前台进程组')
  console.log()

  console.log('系统调用:')
  console.log('  setpgid()     # 设置进程组')
  console.log('  setsid()      # 创建新会话')
  console.log('  tcsetpgrp()   # 设置前台进程组')
}
