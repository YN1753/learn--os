export function runDemo() {
  console.log('=== 嵌入式系统演示 ===\n')

  console.log('1. 嵌入式系统特点:')
  const features = [
    { feature: '资源受限', desc: '内存KB级，CPU频率低' },
    { feature: '实时性', desc: '必须在截止时间内响应' },
    { feature: '专用性', desc: '为特定任务设计' },
    { feature: '高可靠', desc: '长时间稳定运行' },
    { feature: '低功耗', desc: '电池供电或散热受限' },
  ]
  features.forEach(f => {
    console.log(`   ${f.feature}: ${f.desc}`)
  })

  console.log('\n2. 常见嵌入式RTOS:')
  const rtos = [
    { name: 'FreeRTOS', license: 'MIT', arch: 'ARM, Xtensa, RISC-V' },
    { name: 'RT-Thread', license: 'Apache 2.0', arch: 'ARM, MIPS, RISC-V' },
    { name: 'Zephyr', license: 'Apache 2.0', arch: 'ARM, x86, RISC-V' },
    { name: 'µC/OS', license: '商业', arch: 'ARM, PIC, AVR' },
  ]
  rtos.forEach(r => {
    console.log(`   ${r.name} (${r.license}): ${r.arch}`)
  })

  console.log('\n3. 实时任务调度:')
  console.log('   任务1: 传感器采集 - 周期100ms, 优先级最高')
  console.log('   任务2: 数据处理 - 周期200ms, 优先级中')
  console.log('   任务3: 通信发送 - 周期500ms, 优先级低')
  console.log('   调度策略: 速率单调(RMS) - 周期越短优先级越高')

  console.log('\n4. 开发流程:')
  const steps = [
    '选择目标硬件(MCU)',
    '搭建交叉开发环境',
    '编写BSP(板级支持包)',
    '实现驱动程序',
    '开发应用逻辑',
    '烧录调试测试',
  ]
  steps.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s}`)
  })

  console.log('\n5. 典型资源使用:')
  console.log('   FreeRTOS最小配置: ~6KB ROM, ~1KB RAM')
  console.log('   RT-Thread最小配置: ~3KB ROM, ~1KB RAM')
  console.log('   STM32F103: 72MHz, 20KB RAM, 64KB Flash')
}
