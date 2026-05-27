/**
 * 文件系统演示
 *
 * 演示文件系统的核心概念：
 * 1. 目录树结构
 * 2. 文件分配方式
 * 3. 磁盘调度算法
 */

interface FileEntry {
  name: string
  type: 'file' | 'dir'
  size?: number
  children?: FileEntry[]
}

function demonstrateDirectoryTree() {
  console.log('=== 文件系统目录树 ===\n')

  const root: FileEntry = {
    name: '/',
    type: 'dir',
    children: [
      {
        name: 'home',
        type: 'dir',
        children: [
          {
            name: 'user',
            type: 'dir',
            children: [
              { name: 'documents', type: 'dir', children: [
                { name: 'report.txt', type: 'file', size: 2500 },
                { name: 'notes.md', type: 'file', size: 1200 },
              ]},
              { name: 'photos', type: 'dir', children: [
                { name: 'vacation.jpg', type: 'file', size: 3200000 },
              ]},
            ],
          },
        ],
      },
      {
        name: 'etc',
        type: 'dir',
        children: [
          { name: 'hosts', type: 'file', size: 200 },
          { name: 'passwd', type: 'file', size: 1100 },
        ],
      },
    ],
  }

  function printTree(node: FileEntry, prefix: string = '', isLast: boolean = true) {
    const connector = isLast ? '└── ' : '├── '
    const sizeStr = node.type === 'file' ? ` (${formatSize(node.size!)})` : '/'
    console.log(`${prefix}${connector}${node.name}${sizeStr}`)

    if (node.children) {
      const sorted = [...node.children].sort((a, b) => {
        if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
        return a.name.localeCompare(b.name)
      })

      for (let i = 0; i < sorted.length; i++) {
        printTree(sorted[i], prefix + (isLast ? '    ' : '│   '), i === sorted.length - 1)
      }
    }
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
  }

  printTree(root)
}

function demonstrateDiskScheduling() {
  console.log('\n=== 磁盘调度算法演示 ===\n')

  const requests = [98, 183, 37, 122, 14, 124, 65, 67]
  const head = 53
  const diskSize = 200

  console.log(`当前磁头位置: ${head}`)
  console.log(`请求队列: [${requests.join(', ')}]\n`)

  // FCFS
  console.log('--- 先来先服务 (FCFS) ---')
  let totalMovement = 0
  let currentPos = head
  for (const req of requests) {
    totalMovement += Math.abs(req - currentPos)
    currentPos = req
  }
  console.log(`总移动距离: ${totalMovement}`)

  // SSTF
  console.log('\n--- 最短寻道时间优先 (SSTF) ---')
  const sstfRequests = [...requests]
  currentPos = head
  totalMovement = 0
  const sstfOrder: number[] = []

  while (sstfRequests.length > 0) {
    let minDist = Infinity
    let minIdx = 0
    for (let i = 0; i < sstfRequests.length; i++) {
      const dist = Math.abs(sstfRequests[i] - currentPos)
      if (dist < minDist) {
        minDist = dist
        minIdx = i
      }
    }
    totalMovement += minDist
    currentPos = sstfRequests[minIdx]
    sstfOrder.push(currentPos)
    sstfRequests.splice(minIdx, 1)
  }
  console.log(`访问顺序: [${sstfOrder.join(', ')}]`)
  console.log(`总移动距离: ${totalMovement}`)

  // SCAN (电梯算法)
  console.log('\n--- 电梯算法 (SCAN) ---')
  const scanRequests = [...requests].sort((a, b) => a - b)
  currentPos = head
  totalMovement = 0
  const scanOrder: number[] = []

  const left = scanRequests.filter(r => r < currentPos).sort((a, b) => b - a)
  const right = scanRequests.filter(r => r >= currentPos).sort((a, b) => a - b)

  // 先向右
  for (const req of right) {
    totalMovement += Math.abs(req - currentPos)
    currentPos = req
    scanOrder.push(currentPos)
  }
  // 再向左
  for (const req of left) {
    totalMovement += Math.abs(req - currentPos)
    currentPos = req
    scanOrder.push(currentPos)
  }

  console.log(`访问顺序: [${scanOrder.join(', ')}]`)
  console.log(`总移动距离: ${totalMovement}`)
}

function demonstrateFileAllocation() {
  console.log('\n=== 文件分配方式演示 ===\n')

  console.log('--- 连续分配 ---')
  console.log('文件 A: 起始块=0, 长度=5')
  console.log('优点: 顺序读取快')
  console.log('缺点: 外部碎片, 文件大小难以扩展\n')

  console.log('--- 链接分配 ---')
  console.log('文件 B: 块2 -> 块5 -> 块1 -> 块8')
  console.log('优点: 无外部碎片, 可动态增长')
  console.log('缺点: 随机访问慢, 指针占用空间\n')

  console.log('--- 索引分配 ---')
  console.log('文件 C: 索引块[0]=3, [1]=7, [2]=2, [3]=9')
  console.log('优点: 支持随机访问, 无外部碎片')
  console.log('缺点: 索引块占用空间')
}

export function runAllDemos() {
  demonstrateDirectoryTree()
  console.log('\n' + '='.repeat(50) + '\n')
  demonstrateDiskScheduling()
  console.log('\n' + '='.repeat(50) + '\n')
  demonstrateFileAllocation()
}
