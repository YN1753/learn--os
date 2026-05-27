export function runDemo() {
  console.log('=== 微服务架构演示 ===\n')

  console.log('1. 微服务特点:')
  const features = [
    { feature: '单一职责', desc: '每个服务只负责一个功能' },
    { feature: '独立部署', desc: '可以独立发布' },
    { feature: '轻量通信', desc: 'REST API或消息队列' },
    { feature: '数据独立', desc: '每个服务独立数据库' },
  ]
  features.forEach(f => {
    console.log(`   ${f.feature.padEnd(10)} # ${f.desc}`)
  })

  console.log('\n2. 核心组件:')
  const components = [
    { name: 'API网关', desc: '统一入口，路由请求' },
    { name: '服务注册', desc: '服务发现和注册' },
    { name: '配置中心', desc: '统一配置管理' },
    { name: '负载均衡', desc: '请求分发' },
    { name: '熔断器', desc: '防止级联故障' },
  ]
  components.forEach(c => {
    console.log(`   ${c.name.padEnd(10)} # ${c.desc}`)
  })

  console.log('\n3. 服务通信方式:')
  console.log('   同步: REST API, gRPC')
  console.log('   异步: 消息队列, 事件驱动')

  console.log('\n4. 微服务示例（电商系统）:')
  const services = [
    { service: '用户服务', responsibility: '注册、登录、用户信息' },
    { service: '订单服务', responsibility: '订单创建、查询、状态管理' },
    { service: '支付服务', responsibility: '支付处理、退款' },
    { service: '库存服务', responsibility: '库存查询、扣减' },
  ]
  services.forEach(s => {
    console.log(`   ${s.service.padEnd(10)} # ${s.responsibility}`)
  })

  console.log('\n5. 常见挑战:')
  console.log('   - 分布式事务处理')
  console.log('   - 服务间依赖管理')
  console.log('   - 链路追踪和监控')
  console.log('   - 配置管理复杂性')
}
