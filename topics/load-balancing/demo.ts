export function runDemo() {
  console.log('=== 负载均衡演示 ===\n')

  console.log('1. 负载均衡算法:')
  const algorithms = [
    { name: '轮询', desc: '依次分配请求' },
    { name: '加权轮询', desc: '按权重分配' },
    { name: '最少连接', desc: '选择连接数最少的服务器' },
    { name: 'IP哈希', desc: '同一IP分配到同一服务器' },
    { name: '随机', desc: '随机选择服务器' },
  ]
  algorithms.forEach(a => {
    console.log(`   ${a.name.padEnd(10)} # ${a.desc}`)
  })

  console.log('\n2. 负载均衡层次:')
  console.log('   L4(传输层): LVS, HAProxy TCP模式')
  console.log('   L7(应用层): Nginx, HAProxy HTTP模式')

  console.log('\n3. Nginx负载均衡配置:')
  console.log('   upstream backend {')
  console.log('       server 192.168.1.1 weight=1;')
  console.log('       server 192.168.1.2 weight=2;')
  console.log('       server 192.168.1.3 backup;')
  console.log('   }')

  console.log('\n4. 健康检查:')
  const healthChecks = [
    '主动检查: 定期发送探测请求',
    '被动检查: 根据响应判断健康状态',
    '自动剔除: 故障服务器自动移除',
    '自动恢复: 恢复后自动加入',
  ]
  healthChecks.forEach((h, i) => {
    console.log(`   ${i + 1}. ${h}`)
  })

  console.log('\n5. 实际应用:')
  const applications = [
    { app: 'Web应用', desc: 'Nginx反向代理' },
    { app: '数据库', desc: '读写分离' },
    { app: '微服务', desc: '服务间负载均衡' },
    { app: 'CDN', desc: '内容分发' },
  ]
  applications.forEach(a => {
    console.log(`   ${a.app.padEnd(10)} # ${a.desc}`)
  })
}
