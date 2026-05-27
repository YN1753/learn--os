/**
 * 网络基础演示
 */

export function runAllDemos() {
  console.log('=== TCP/IP四层模型 ===\n')

  const layers = [
    { name: '应用层', protocols: ['HTTP', 'FTP', 'SMTP', 'DNS'], desc: '用户接口' },
    { name: '传输层', protocols: ['TCP', 'UDP'], desc: '端到端通信' },
    { name: '网络层', protocols: ['IP', 'ICMP', 'ARP'], desc: '路由寻址' },
    { name: '网络接口层', protocols: ['Ethernet', 'WiFi'], desc: '帧传输' },
  ]

  for (const l of layers) {
    console.log(`【${l.name}】${l.desc}`)
    console.log(`  协议: ${l.protocols.join(', ')}`)
  }

  console.log('\n=== TCP vs UDP ===\n')
  console.log('特性'.padEnd(12) + 'TCP'.padEnd(16) + 'UDP')
  console.log('-'.repeat(40))
  console.log('连接'.padEnd(12) + '面向连接'.padEnd(16) + '无连接')
  console.log('可靠性'.padEnd(12) + '可靠'.padEnd(16) + '不可靠')
  console.log('速度'.padEnd(12) + '较慢'.padEnd(16) + '较快')
  console.log('流量控制'.padEnd(10) + '有'.padEnd(16) + '无')
  console.log('应用场景'.padEnd(10) + '网页、文件'.padEnd(16) + '视频、游戏')

  console.log('\n=== TCP三次握手 ===\n')
  console.log('1. 客户端 → SYN → 服务器')
  console.log('2. 客户端 ← SYN+ACK ← 服务器')
  console.log('3. 客户端 → ACK → 服务器')

  console.log('\n=== TCP四次挥手 ===\n')
  console.log('1. 客户端 → FIN → 服务器')
  console.log('2. 客户端 ← ACK ← 服务器')
  console.log('3. 客户端 ← FIN ← 服务器')
  console.log('4. 客户端 → ACK → 服务器')

  console.log('\n=== HTTP状态码 ===\n')
  const codes = [
    { code: '200', desc: '成功' },
    { code: '301', desc: '永久重定向' },
    { code: '404', desc: '未找到资源' },
    { code: '500', desc: '服务器内部错误' },
  ]
  for (const c of codes) {
    console.log(`  ${c.code.padEnd(8)} ${c.desc}`)
  }

  console.log('\n=== IP地址 ===\n')
  console.log('IPv4: 192.168.1.1 (32位)')
  console.log('IPv6: 2001:db8::1 (128位)')
  console.log('特殊地址:')
  console.log('  127.0.0.1: 本机 (localhost)')
  console.log('  192.168.x.x: 私有地址')
  console.log('  10.x.x.x: 私有地址')

  console.log('\n=== DNS查询过程 ===\n')
  console.log('1. 浏览器输入 www.example.com')
  console.log('2. 查询本地DNS缓存')
  console.log('3. 查询DNS服务器')
  console.log('4. 返回IP地址')
  console.log('5. 建立连接')
}
