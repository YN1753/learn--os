export function runDemo() {
  console.log('=== 缓存策略演示 ===\n')

  console.log('1. 缓存层次:')
  const layers = [
    { level: 'CPU缓存', speed: '最快', size: 'KB级' },
    { level: '应用缓存', speed: '快', size: 'MB级' },
    { level: '分布式缓存', speed: '较快', size: 'GB级' },
    { level: 'CDN缓存', speed: '中', size: 'TB级' },
  ]
  layers.forEach(l => {
    console.log(`   ${l.level.padEnd(12)} 速度: ${l.speed.padEnd(6)} 容量: ${l.size}`)
  })

  console.log('\n2. 缓存淘汰策略:')
  const strategies = [
    { name: 'LRU', desc: '淘汰最近最少使用的数据' },
    { name: 'LFU', desc: '淘汰最不经常使用的数据' },
    { name: 'FIFO', desc: '先进先出' },
    { name: 'TTL', desc: '基于过期时间' },
  ]
  strategies.forEach(s => {
    console.log(`   ${s.name.padEnd(6)} # ${s.desc}`)
  })

  console.log('\n3. 缓存问题:')
  const problems = [
    { problem: '缓存穿透', desc: '查询不存在的数据', solution: '布隆过滤器' },
    { problem: '缓存击穿', desc: '热点key过期', solution: '互斥锁' },
    { problem: '缓存雪崩', desc: '大量key同时过期', solution: '随机过期时间' },
  ]
  problems.forEach(p => {
    console.log(`   ${p.problem.padEnd(10)} ${p.desc.padEnd(16)} 解决: ${p.solution}`)
  })

  console.log('\n4. 常见缓存系统:')
  const systems = [
    { name: 'Redis', desc: '内存键值存储，支持多种数据结构' },
    { name: 'Memcached', desc: '高性能分布式内存缓存' },
    { name: 'Varnish', desc: 'HTTP加速器' },
  ]
  systems.forEach(s => {
    console.log(`   ${s.name.padEnd(12)} # ${s.desc}`)
  })

  console.log('\n5. 缓存最佳实践:')
  console.log('   - 合理设置过期时间')
  console.log('   - 使用缓存预热')
  console.log('   - 处理缓存一致性')
  console.log('   - 监控缓存命中率')
}
