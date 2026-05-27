export function runDemo() {
  console.log('=== 分布式算法演示 ===\n')

  console.log('1. Raft算法角色:')
  const roles = [
    { role: 'Leader', desc: '处理写请求，复制日志' },
    { role: 'Follower', desc: '响应Leader请求' },
    { role: 'Candidate', desc: '发起选举' },
  ]
  roles.forEach(r => {
    console.log(`   ${r.role.padEnd(12)} # ${r.desc}`)
  })

  console.log('\n2. Raft选举过程:')
  const electionSteps = [
    'Follower超时未收到心跳',
    '转为Candidate，发起投票',
    '获得多数票成为Leader',
    '定期发送心跳维持领导',
  ]
  electionSteps.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s}`)
  })

  console.log('\n3. 日志复制:')
  console.log('   Client → Leader → 写入日志 → 复制到Follower → 多数确认 → 提交')

  console.log('\n4. CAP定理:')
  const cap = [
    { prop: '一致性(C)', desc: '所有节点看到相同数据' },
    { prop: '可用性(A)', desc: '每个请求都能得到响应' },
    { prop: '分区容忍(P)', desc: '网络分区时系统仍能运行' },
  ]
  cap.forEach(c => {
    console.log(`   ${c.prop.padEnd(14)} # ${c.desc}`)
  })
  console.log('   最多同时满足两个属性')

  console.log('\n5. 常见共识算法应用:')
  const apps = [
    { name: 'etcd', use: 'Kubernetes配置存储' },
    { name: 'ZooKeeper', use: '分布式协调' },
    { name: 'Consul', use: '服务发现' },
  ]
  apps.forEach(a => {
    console.log(`   ${a.name.padEnd(12)} # ${a.use}`)
  })
}
