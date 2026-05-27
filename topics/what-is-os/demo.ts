/**
 * 操作系统层次结构演示
 *
 * 这个演示展示了操作系统的分层架构，
 * 以及当用户执行操作时，请求是如何在各层之间传递的。
 */

interface Layer {
  name: string
  description: string
  responsibilities: string[]
}

const osLayers: Layer[] = [
  {
    name: '硬件层',
    description: '物理设备',
    responsibilities: ['CPU 执行指令', '内存存储数据', '磁盘持久化存储', 'I/O 设备输入输出'],
  },
  {
    name: '操作系统内核',
    description: '直接管理硬件的核心程序',
    responsibilities: ['进程调度', '内存分配', '设备驱动', '中断处理'],
  },
  {
    name: '系统调用接口',
    description: '程序使用 OS 功能的桥梁',
    responsibilities: ['文件操作 (open, read, write)', '进程控制 (fork, exec)', '内存管理 (mmap)', '网络通信 (socket)'],
  },
  {
    name: '应用程序',
    description: '用户使用的软件',
    responsibilities: ['浏览器', '文本编辑器', '游戏', '音乐播放器'],
  },
]

export function demonstrateLayers() {
  console.log('=== 操作系统层次结构 ===\n')

  for (const layer of osLayers) {
    console.log(`【${layer.name}】${layer.description}`)
    console.log('  职责:')
    for (const r of layer.responsibilities) {
      console.log(`    - ${r}`)
    }
    console.log()
  }
}

export function simulateOpenFile() {
  console.log('=== 模拟：用户打开一个文件 ===\n')

  const steps = [
    { layer: '应用程序', action: '用户双击文件' },
    { layer: '系统调用', action: '调用 open("report.txt", O_RDONLY)' },
    { layer: '内核', action: '查找文件在磁盘上的位置' },
    { layer: '内核', action: '将文件内容从磁盘读入内存' },
    { layer: '内核', action: '返回文件描述符给应用程序' },
    { layer: '应用程序', action: '显示文件内容给用户' },
  ]

  for (let i = 0; i < steps.length; i++) {
    console.log(`步骤 ${i + 1} [${steps[i].layer}]: ${steps[i].layer} -> ${steps[i].action}`)
  }
}

export function runAllDemos() {
  demonstrateLayers()
  console.log('\n' + '='.repeat(50) + '\n')
  simulateOpenFile()
}
