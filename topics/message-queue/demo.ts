export function runDemo() {
  console.log('=== 消息队列演示 ===\n')

  console.log('1. 消息队列模型:')
  const models = [
    { model: '点对点', desc: '一条消息只被一个消费者处理' },
    { model: '发布/订阅', desc: '一条消息可被多个消费者处理' },
  ]
  models.forEach(m => {
    console.log(`   ${m.model.padEnd(10)} # ${m.desc}`)
  })

  console.log('\n2. 常见消息队列:')
  const mqs = [
    { name: 'RabbitMQ', feature: '功能丰富，支持多种协议', use: '企业应用' },
    { name: 'Kafka', feature: '高吞吐，分布式日志', use: '大数据、日志收集' },
    { name: 'RocketMQ', feature: '事务消息', use: '电商、金融' },
    { name: 'Redis', feature: '轻量级，基于内存', use: '简单队列' },
  ]
  mqs.forEach(m => {
    console.log(`   ${m.name.padEnd(12)} ${m.feature.padEnd(20)} ${m.use}`)
  })

  console.log('\n3. 消息队列概念:')
  const concepts = [
    { concept: 'Producer', desc: '消息生产者' },
    { concept: 'Consumer', desc: '消息消费者' },
    { concept: 'Queue/Topic', desc: '消息存储' },
    { concept: 'Broker', desc: '消息服务器' },
  ]
  concepts.forEach(c => {
    console.log(`   ${c.concept.padEnd(12)} # ${c.desc}`)
  })

  console.log('\n4. 应用场景:')
  const scenarios = [
    '异步处理: 订单处理、邮件发送',
    '系统解耦: 微服务间通信',
    '日志收集: ELK日志系统',
    '流量削峰: 应对突发流量',
  ]
  scenarios.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s}`)
  })

  console.log('\n5. 常见问题:')
  console.log('   - 消息丢失: 持久化、确认机制')
  console.log('   - 重复消费: 幂等处理')
  console.log('   - 消息积压: 增加消费者')
}
