export function runDemo() {
  console.log('=== 电源管理演示 ===\n')

  console.log('1. ACPI电源状态:')
  const states = [
    { state: 'S0', name: '工作状态', desc: '系统正常运行' },
    { state: 'S1', name: 'CPU停止', desc: 'CPU停止，内存保持' },
    { state: 'S3', name: '睡眠', desc: '挂起到内存，低功耗' },
    { state: 'S4', name: '休眠', desc: '挂起到磁盘，接近零功耗' },
    { state: 'S5', name: '软关机', desc: '关机，仍有供电' },
  ]
  states.forEach(s => {
    console.log(`   ${s.state} (${s.name}): ${s.desc}`)
  })

  console.log('\n2. CPU频率调节策略:')
  const policies = [
    { name: 'performance', desc: '始终最高频率' },
    { name: 'powersave', desc: '始终最低频率' },
    { name: 'ondemand', desc: '根据负载动态调整' },
    { name: 'conservative', desc: '保守调整，渐进式变化' },
  ]
  policies.forEach(p => {
    console.log(`   ${p.name}: ${p.desc}`)
  })

  console.log('\n3. 电源管理命令:')
  const commands = [
    { cmd: 'cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor', desc: '查看当前策略' },
    { cmd: 'cpupower frequency-set -g performance', desc: '设置为性能模式' },
    { cmd: 'systemctl suspend', desc: '系统睡眠' },
    { cmd: 'systemctl hibernate', desc: '系统休眠' },
  ]
  commands.forEach(c => {
    console.log(`   $ ${c.cmd}  # ${c.desc}`)
  })

  console.log('\n4. 节能效果示例:')
  const examples = [
    { scenario: 'CPU降频50%', saving: '功耗降低约60%' },
    { scenario: '关闭未使用设备', saving: '功耗降低10-30%' },
    { scenario: '进入S3睡眠', saving: '功耗降低95%以上' },
  ]
  examples.forEach(e => {
    console.log(`   ${e.scenario}: ${e.saving}`)
  })
}
