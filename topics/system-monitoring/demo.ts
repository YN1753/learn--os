export function runDemo() {
  console.log('=== 系统监控演示 ===\n')

  console.log('1. 常用监控命令:')
  const commands = [
    { cmd: 'top', desc: '实时进程监控' },
    { cmd: 'htop', desc: '增强版进程监控（需安装）' },
    { cmd: 'vmstat 1 5', desc: '每秒输出一次虚拟内存统计，共5次' },
    { cmd: 'iostat -x 1', desc: '扩展磁盘I/O统计' },
    { cmd: 'free -h', desc: '查看内存使用情况' },
    { cmd: 'df -h', desc: '查看磁盘空间' },
    { cmd: 'netstat -tuln', desc: '查看监听端口' },
    { cmd: 'ss -s', desc: '查看连接统计' },
  ]
  commands.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(25)} # ${c.desc}`)
  })

  console.log('\n2. 监控指标示例:')
  const metrics = [
    { name: 'CPU使用率', value: '45%', status: '正常' },
    { name: '内存使用率', value: '62%', status: '正常' },
    { name: '负载均值', value: '1.25', status: '正常（2核CPU）' },
    { name: '磁盘使用率', value: '78%', status: '需关注' },
  ]
  metrics.forEach(m => {
    console.log(`   ${m.name}: ${m.value} (${m.status})`)
  })

  console.log('\n3. top命令输出解读:')
  console.log('   %Cpu(s):  45.3 us,  12.1 sy,  0.0 ni, 42.0 id,  0.5 wa')
  console.log('   us: 用户空间  sy: 内核空间  ni: 优先级  id: 空闲  wa: 等待I/O')

  console.log('\n4. 告警阈值建议:')
  const thresholds = [
    { metric: 'CPU使用率', warn: '> 80%', critical: '> 95%' },
    { metric: '内存使用率', warn: '> 85%', critical: '> 95%' },
    { metric: '磁盘使用率', warn: '> 80%', critical: '> 90%' },
    { metric: '负载均值', warn: '> CPU核心数', critical: '> 2倍核心数' },
  ]
  thresholds.forEach(t => {
    console.log(`   ${t.metric}: 告警${t.warn}, 严重${t.critical}`)
  })
}
