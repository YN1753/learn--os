export function runDemo() {
  console.log('=== 性能调优演示 ===\n')

  console.log('1. 性能分析工具:')
  const tools = [
    { tool: 'top/htop', desc: '实时CPU和进程监控' },
    { tool: 'vmstat', desc: '虚拟内存统计' },
    { tool: 'iostat', desc: '磁盘I/O统计' },
    { tool: 'sar', desc: '系统活动报告' },
    { tool: 'perf', desc: '性能分析器' },
    { tool: 'strace', desc: '系统调用追踪' },
  ]
  tools.forEach(t => {
    console.log(`   ${t.tool.padEnd(12)} # ${t.desc}`)
  })

  console.log('\n2. 常见性能瓶颈:')
  const bottlenecks = [
    { type: 'CPU', symptom: 'CPU使用率>80%', solution: '优化算法、多线程' },
    { type: '内存', symptom: '频繁换页', solution: '减少内存使用、修复泄漏' },
    { type: '磁盘I/O', symptom: 'iowait高', solution: '使用SSD、优化查询' },
    { type: '网络', symptom: '延迟高', solution: '压缩数据、使用CDN' },
  ]
  bottlenecks.forEach(b => {
    console.log(`   ${b.type.padEnd(8)} 症状: ${b.symptom.padEnd(20)} 解决: ${b.solution}`)
  })

  console.log('\n3. Linux性能调优命令:')
  const commands = [
    { cmd: 'sysctl -a', desc: '查看所有内核参数' },
    { cmd: 'ulimit -a', desc: '查看资源限制' },
    { cmd: 'echo 65535 > /proc/sys/fs/file-max', desc: '增加文件描述符限制' },
    { cmd: 'echo deadline > /sys/block/sda/queue/scheduler', desc: '设置I/O调度器' },
  ]
  commands.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(45)} # ${c.desc}`)
  })

  console.log('\n4. 性能优化层次:')
  console.log('   应用层: 算法优化、缓存策略')
  console.log('   系统层: 内核参数、I/O调度')
  console.log('   硬件层: 升级CPU、增加内存、使用SSD')

  console.log('\n5. 基准测试工具:')
  const benchmarks = [
    { tool: 'ab (Apache Bench)', desc: 'Web服务器压力测试' },
    { tool: 'sysbench', desc: '系统综合性能测试' },
    { tool: 'fio', desc: '磁盘I/O性能测试' },
    { tool: 'iperf', desc: '网络带宽测试' },
  ]
  benchmarks.forEach(b => {
    console.log(`   ${b.tool.padEnd(22)} # ${b.desc}`)
  })
}
