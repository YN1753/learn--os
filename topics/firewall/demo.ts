export function runDemo() {
  console.log('=== 防火墙演示 ===\n')

  interface Rule {
    action: 'ACCEPT' | 'DROP'
    protocol: string
    port: string
    source: string
  }

  const rules: Rule[] = [
    { action: 'ACCEPT', protocol: 'tcp', port: '22', source: '0.0.0.0/0' },
    { action: 'ACCEPT', protocol: 'tcp', port: '80', source: '0.0.0.0/0' },
    { action: 'ACCEPT', protocol: 'tcp', port: '443', source: '0.0.0.0/0' },
    { action: 'DROP', protocol: 'all', port: 'all', source: '0.0.0.0/0' },
  ]

  console.log('1. 防火墙规则表:')
  rules.forEach((r, i) => {
    console.log(`   ${i + 1}. ${r.action} ${r.protocol} ${r.port} from ${r.source}`)
  })

  console.log('\n2. 测试数据包:')
  const testPackets = [
    { protocol: 'tcp', port: '22', source: '192.168.1.1', desc: 'SSH连接' },
    { protocol: 'tcp', port: '80', source: '10.0.0.1', desc: 'HTTP请求' },
    { protocol: 'udp', port: '53', source: '192.168.1.100', desc: 'DNS查询' },
    { protocol: 'tcp', port: '3306', source: '192.168.1.50', desc: 'MySQL连接' },
  ]

  testPackets.forEach(packet => {
    let result = '无匹配规则，默认拒绝'
    for (const rule of rules) {
      const protocolMatch = rule.protocol === 'all' || rule.protocol === packet.protocol
      const portMatch = rule.port === 'all' || rule.port === packet.port
      if (protocolMatch && portMatch) {
        result = rule.action === 'ACCEPT' ? '允许通过' : '拒绝'
        break
      }
    }
    console.log(`   ${packet.desc}: ${packet.protocol}:${packet.port} → ${result}`)
  })

  console.log('\n3. iptables基本命令:')
  const commands = [
    'iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # 允许SSH',
    'iptables -A INPUT -p tcp --dport 80 -j ACCEPT  # 允许HTTP',
    'iptables -A INPUT -j DROP                      # 拒绝其他',
    'iptables -L -n                                 # 查看规则',
  ]
  commands.forEach(c => console.log(`   $ ${c}`))
}
