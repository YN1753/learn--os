export function runDemo() {
  console.log('=== 网络协议演示 ===\n')

  console.log('1. TCP三次握手:')
  const tcpHandshake = [
    { step: 1, from: '客户端', to: '服务器', msg: 'SYN seq=x' },
    { step: 2, from: '服务器', to: '客户端', msg: 'SYN+ACK seq=y ack=x+1' },
    { step: 3, from: '客户端', to: '服务器', msg: 'ACK ack=y+1' },
  ]
  tcpHandshake.forEach(s => {
    console.log(`   ${s.step}. ${s.from} → ${s.to}: ${s.msg}`)
  })

  console.log('\n2. TCP四次挥手:')
  const tcpTeardown = [
    { step: 1, from: '客户端', to: '服务器', msg: 'FIN' },
    { step: 2, from: '服务器', to: '客户端', msg: 'ACK' },
    { step: 3, from: '服务器', to: '客户端', msg: 'FIN' },
    { step: 4, from: '客户端', to: '服务器', msg: 'ACK' },
  ]
  tcpTeardown.forEach(s => {
    console.log(`   ${s.step}. ${s.from} → ${s.to}: ${s.msg}`)
  })

  console.log('\n3. TCP vs UDP对比:')
  const comparison = [
    { feature: '连接', tcp: '面向连接', udp: '无连接' },
    { feature: '可靠性', tcp: '可靠', udp: '不可靠' },
    { feature: '顺序', tcp: '有序', udp: '无序' },
    { feature: '速度', tcp: '较慢', udp: '较快' },
    { feature: '头部', tcp: '20字节', udp: '8字节' },
  ]
  comparison.forEach(c => {
    console.log(`   ${c.feature.padEnd(8)} TCP: ${c.tcp.padEnd(10)} UDP: ${c.udp}`)
  })

  console.log('\n4. 应用层协议与传输层:')
  const apps = [
    { app: 'HTTP/HTTPS', transport: 'TCP', port: '80/443' },
    { app: 'FTP', transport: 'TCP', port: '20/21' },
    { app: 'SSH', transport: 'TCP', port: '22' },
    { app: 'DNS', transport: 'UDP/TCP', port: '53' },
    { app: 'DHCP', transport: 'UDP', port: '67/68' },
    { app: 'SNMP', transport: 'UDP', port: '161' },
  ]
  apps.forEach(a => {
    console.log(`   ${a.app.padEnd(12)} ${a.transport.padEnd(10)} 端口: ${a.port}`)
  })

  console.log('\n5. TCP拥塞控制:')
  console.log('   慢启动 → 拥塞避免 → 快重传 → 快恢复')
}
