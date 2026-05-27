/**
 * I/O控制方式演示
 *
 * 对比不同I/O控制方式的CPU利用率
 */

interface IOMethod {
  name: string
  cpuBusyTime: number
  totalTime: number
  description: string
}

export function runAllDemos() {
  console.log('=== I/O控制方式对比 ===\n')

  const methods: IOMethod[] = [
    {
      name: '程序直接控制',
      cpuBusyTime: 10,
      totalTime: 100,
      description: 'CPU全程等待设备完成',
    },
    {
      name: '中断驱动',
      cpuBusyTime: 15,
      totalTime: 100,
      description: 'CPU在设备工作时可以做其他事',
    },
    {
      name: 'DMA',
      cpuBusyTime: 5,
      totalTime: 100,
      description: 'CPU只在开始和结束时参与',
    },
  ]

  for (const m of methods) {
    const cpuUtil = ((m.cpuBusyTime / m.totalTime) * 100).toFixed(0)
    console.log(`【${m.name}】`)
    console.log(`  ${m.description}`)
    console.log(`  CPU忙碌: ${m.cpuBusyTime}/${m.totalTime} = ${cpuUtil}%`)
    console.log(`  CPU空闲: ${100 - Number(cpuUtil)}%`)
    console.log()
  }

  console.log('=== 中断处理流程 ===\n')
  const steps = [
    '关中断',
    '保存断点',
    '识别中断源',
    '保存现场',
    '执行中断服务程序',
    '恢复现场',
    '开中断',
    '返回断点',
  ]
  steps.forEach((s, i) => console.log(`  ${i + 1}. ${s}`))

  console.log('\n=== 缓冲技术对比 ===\n')
  const buffers = [
    { name: '单缓冲', parallel: false, desc: 'CPU和设备交替使用' },
    { name: '双缓冲', parallel: true, desc: 'CPU和设备可以并行' },
    { name: '循环缓冲', parallel: true, desc: '适合高速传输' },
    { name: '缓冲池', parallel: true, desc: '灵活分配，利用率高' },
  ]
  for (const b of buffers) {
    console.log(`  ${b.name}: ${b.desc} ${b.parallel ? '(可并行)' : '(串行)'}`)
  }
}
