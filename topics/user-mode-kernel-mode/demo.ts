// 用户态与内核态切换演示

interface SystemCall {
  name: string
  description: string
  steps: string[]
}

const systemCalls: SystemCall[] = [
  {
    name: 'read',
    description: '从文件读取数据',
    steps: [
      '用户程序调用 read(fd, buf, count)',
      '执行 syscall 指令',
      'CPU 切换到内核态 (Ring 0)',
      '保存用户态寄存器到内核栈',
      '查找系统调用表，找到 sys_read',
      '验证用户缓冲区地址',
      '从设备读取数据到内核缓冲区',
      '将数据复制到用户空间缓冲区',
      '恢复用户态寄存器',
      'CPU 切换回用户态 (Ring 3)',
    ],
  },
  {
    name: 'write',
    description: '向文件写入数据',
    steps: [
      '用户程序调用 write(fd, buf, count)',
      '执行 syscall 指令',
      'CPU 切换到内核态 (Ring 0)',
      '保存用户态寄存器到内核栈',
      '查找系统调用表，找到 sys_write',
      '验证用户缓冲区地址',
      '将数据从用户空间复制到内核缓冲区',
      '发起设备写入操作',
      '恢复用户态寄存器',
      'CPU 切换回用户态 (Ring 3)',
    ],
  },
  {
    name: 'fork',
    description: '创建子进程',
    steps: [
      '用户程序调用 fork()',
      '执行 syscall 指令',
      'CPU 切换到内核态 (Ring 0)',
      '保存用户态寄存器到内核栈',
      '为子进程分配新的 PID',
      '复制父进程的 PCB',
      '复制父进程的地址空间（写时复制）',
      '设置子进程的返回值为 0',
      '将子进程加入就绪队列',
      '恢复用户态寄存器，返回父进程 PID',
    ],
  },
]

export function runDemo() {
  console.log('用户态与内核态切换演示')
  console.log('---')

  for (const syscall of systemCalls) {
    console.log(`系统调用: ${syscall.name} - ${syscall.description}`)
    console.log('执行步骤:')
    syscall.steps.forEach((step, idx) => {
      const mode = idx >= 2 && idx < 8 ? '[内核态]' : '[用户态]'
      console.log(`  ${idx + 1}. ${mode} ${step}`)
    })
    console.log()
  }
}
