/**
 * 死锁演示
 *
 * 演示死锁的产生和预防：
 * 1. 死锁的四个条件
 * 2. 死锁场景模拟
 * 3. 死锁预防策略
 */

function demonstrateConditions() {
  console.log('=== 死锁的四个必要条件 ===\n')

  const conditions = [
    {
      name: '互斥条件',
      desc: '资源一次只能被一个进程使用',
      example: '打印机一次只能打印一个文档',
      prevent: '使用可共享资源（如只读文件）',
    },
    {
      name: '请求和保持条件',
      desc: '进程持有资源的同时请求新资源',
      example: '拿着筷子等碗',
      prevent: '一次性申请所有资源',
    },
    {
      name: '不可抢占条件',
      desc: '资源只能由持有者主动释放',
      example: '不能从别人手里硬抢东西',
      prevent: '允许系统强制回收资源',
    },
    {
      name: '循环等待条件',
      desc: '存在进程的循环等待链',
      example: 'A等B, B等C, C等A',
      prevent: '给资源编号，按编号顺序申请',
    },
  ]

  for (const c of conditions) {
    console.log(`【${c.name}】`)
    console.log(`  含义: ${c.desc}`)
    console.log(`  例子: ${c.example}`)
    console.log(`  预防: ${c.prevent}`)
    console.log()
  }
}

function simulateDeadlock() {
  console.log('=== 死锁场景模拟 ===\n')

  const resources = { R1: '空闲', R2: '空闲' }
  const processes = {
    P1: { holds: [] as string[], waiting: '' },
    P2: { holds: [] as string[], waiting: '' },
  }

  console.log('初始状态: R1=空闲, R2=空闲\n')

  // P1 获取 R1
  processes.P1.holds.push('R1')
  resources.R1 = 'P1持有'
  console.log('步骤1: P1 获取 R1')
  console.log(`  P1: 持有[${processes.P1.holds.join(',')}], 等待=${processes.P1.waiting || '无'}`)
  console.log(`  P2: 持有[${processes.P2.holds.join(',')}], 等待=${processes.P2.waiting || '无'}`)

  // P2 获取 R2
  processes.P2.holds.push('R2')
  resources.R2 = 'P2持有'
  console.log('\n步骤2: P2 获取 R2')
  console.log(`  P1: 持有[${processes.P1.holds.join(',')}], 等待=${processes.P1.waiting || '无'}`)
  console.log(`  P2: 持有[${processes.P2.holds.join(',')}], 等待=${processes.P2.waiting || '无'}`)

  // P1 请求 R2 (被 P2 持有)
  processes.P1.waiting = 'R2'
  console.log('\n步骤3: P1 请求 R2 (被P2持有)')
  console.log(`  P1: 持有[${processes.P1.holds.join(',')}], 等待=${processes.P1.waiting}`)
  console.log(`  P2: 持有[${processes.P2.holds.join(',')}], 等待=${processes.P2.waiting || '无'}`)

  // P2 请求 R1 (被 P1 持有) -> 死锁!
  processes.P2.waiting = 'R1'
  console.log('\n步骤4: P2 请求 R1 (被P1持有)')
  console.log(`  P1: 持有[${processes.P1.holds.join(',')}], 等待=${processes.P1.waiting}`)
  console.log(`  P2: 持有[${processes.P2.holds.join(',')}], 等待=${processes.P2.waiting}`)
  console.log('\n*** 死锁发生！P1 等待 P2 释放 R2，P2 等待 P1 释放 R1 ***')
}

function demonstratePrevention() {
  console.log('\n=== 死锁预防策略演示 ===\n')

  console.log('--- 策略1: 按编号顺序获取锁 ---\n')
  console.log('给资源编号: R1=1, R2=2')
  console.log('规则: 只能按从小到大的顺序获取锁')
  console.log('P1: 获取R1 -> 获取R2 ✓')
  console.log('P2: 获取R1 -> 获取R2 ✓')
  console.log('不会出现循环等待！\n')

  console.log('--- 策略2: 一次性申请所有资源 ---\n')
  console.log('P1: 同时申请R1和R2')
  console.log('如果不能同时获得，就一个都不拿')
  console.log('不会出现"持有并等待"！\n')

  console.log('--- 策略3: 设置超时 ---\n')
  console.log('P1: 尝试获取R2，超时5秒')
  console.log('如果超时，释放已持有的R1，重试')
  console.log('不会无限等待！')
}

function demonstrateBanker() {
  console.log('\n=== 银行家算法演示 ===\n')

  const available = [3, 3, 2]
  const max = [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3],
  ]
  const allocation = [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2],
  ]
  const need = max.map((row, i) => row.map((val, j) => val - allocation[i][j]))

  console.log('可用资源:', available)
  console.log('\n进程 | 已分配 | 最大需求 | 还需要')
  console.log('-'.repeat(40))
  for (let i = 0; i < 5; i++) {
    console.log(`P${i}   | [${allocation[i].join(',')}]  | [${max[i].join(',')}]   | [${need[i].join(',')}]`)
  }

  // 尝试找到安全序列
  const work = [...available]
  const finish = [false, false, false, false, false]
  const safeSequence: number[] = []

  console.log('\n寻找安全序列:')

  let found = true
  while (found) {
    found = false
    for (let i = 0; i < 5; i++) {
      if (!finish[i] && need[i].every((val, j) => val <= work[j])) {
        console.log(`  P${i} 可以执行 (需要 [${need[i].join(',')}]，可用 [${work.join(',')}])`)
        for (let j = 0; j < 3; j++) work[j] += allocation[i][j]
        finish[i] = true
        safeSequence.push(i)
        found = true
      }
    }
  }

  if (finish.every(f => f)) {
    console.log(`\n安全序列: ${safeSequence.map(i => `P${i}`).join(' -> ')}`)
    console.log('系统处于安全状态，不会发生死锁！')
  } else {
    console.log('\n找不到安全序列，系统处于不安全状态！')
  }
}

export function runAllDemos() {
  demonstrateConditions()
  console.log('\n' + '='.repeat(50) + '\n')
  simulateDeadlock()
  console.log('\n' + '='.repeat(50) + '\n')
  demonstratePrevention()
  console.log('\n' + '='.repeat(50) + '\n')
  demonstrateBanker()
}
