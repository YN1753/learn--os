export function runDemo() {
  console.log('=== TCP/IP协议栈演示 ===\n')

  const layers = [
    { name: '应用层', protocols: ['HTTP', 'FTP', 'SMTP', 'DNS'], desc: '用户应用程序直接使用的协议' },
    { name: '传输层', protocols: ['TCP', 'UDP'], desc: '提供端到端通信，TCP可靠，UDP快速' },
    { name: '网络层', protocols: ['IP', 'ICMP', 'ARP'], desc: '负责数据包的路由和转发' },
    { name: '链路层', protocols: ['以太网', 'WiFi'], desc: '物理网络传输' },
  ]

  console.log('1. TCP/IP四层模型:')
  layers.forEach((l, i) => {
    console.log(`   ${i + 1}. ${l.name}: ${l.protocols.join(', ')}`)
    console.log(`      ${l.desc}`)
  })

  console.log('\n2. 数据封装过程:')
  const encapsulation = [
    { step: '应用数据', header: '无', size: '可变' },
    { step: 'TCP段', header: 'TCP头(20字节)', size: '最大65535字节' },
    { step: 'IP包', header: 'IP头(20字节)', size: '最大65535字节' },
    { step: '以太网帧', header: '帧头(14字节)+帧尾(4字节)', size: '最大1518字节' },
  ]
  encapsulation.forEach((e, i) => {
    console.log(`   ${i + 1}. ${e.step}: ${e.header}, ${e.size}`)
  })

  console.log('\n3. 常见端口号:')
  const ports = [
    { port: 20/21, name: 'FTP', desc: '文件传输' },
    { port: 22, name: 'SSH', desc: '安全登录' },
    { port: 25, name: 'SMTP', desc: '邮件发送' },
    { port: 53, name: 'DNS', desc: '域名解析' },
    { port: 80, name: 'HTTP', desc: '网页浏览' },
    { port: 443, name: 'HTTPS', desc: '加密网页' },
  ]
  ports.forEach(p => {
    console.log(`   ${p.port}: ${p.name} - ${p.desc}`)
  })

  console.log('\n4. TCP三次握手:')
  const handshake = [
    '客户端 → SYN → 服务器',
    '服务器 → SYN+ACK → 客户端',
    '客户端 → ACK → 服务器',
  ]
  handshake.forEach((h, i) => {
    console.log(`   ${i + 1}. ${h}`)
  })
}
