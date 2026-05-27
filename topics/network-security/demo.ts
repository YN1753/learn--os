export function runDemo() {
  console.log('=== 网络安全演示 ===\n')

  console.log('1. 常见网络攻击:')
  const attacks = [
    { type: 'DDoS', desc: '分布式拒绝服务，大量请求淹没服务器' },
    { type: '中间人攻击', desc: '窃听和篡改通信数据' },
    { type: 'SQL注入', desc: '通过输入恶意SQL语句攻击数据库' },
    { type: 'XSS', desc: '注入恶意脚本到网页中' },
    { type: '暴力破解', desc: '穷举密码猜测' },
  ]
  attacks.forEach(a => {
    console.log(`   ${a.type.padEnd(12)} # ${a.desc}`)
  })

  console.log('\n2. 安全协议:')
  const protocols = [
    { name: 'SSL/TLS', desc: '加密HTTP通信(HTTPS)', port: 443 },
    { name: 'SSH', desc: '安全远程登录', port: 22 },
    { name: 'IPSec', desc: '网络层加密(VPN)', port: 500 },
    { name: 'SFTP', desc: '安全文件传输', port: 22 },
  ]
  protocols.forEach(p => {
    console.log(`   ${p.name.padEnd(10)} ${p.desc.padEnd(20)} 端口: ${p.port}`)
  })

  console.log('\n3. 防御措施:')
  const defenses = [
    '使用HTTPS加密Web通信',
    '配置防火墙限制访问',
    '定期更新系统和应用补丁',
    '使用强密码和双因素认证',
    '输入验证防止注入攻击',
    '配置CSP防止XSS攻击',
  ]
  defenses.forEach((d, i) => {
    console.log(`   ${i + 1}. ${d}`)
  })

  console.log('\n4. VPN技术:')
  console.log('   - 远程访问VPN: 员工远程访问公司网络')
  console.log('   - 站点间VPN: 连接多个办公地点')
  console.log('   - 协议: OpenVPN, IPSec, WireGuard')

  console.log('\n5. 安全检查命令:')
  const cmds = [
    { cmd: 'nmap -sV target', desc: '端口扫描' },
    { cmd: 'netstat -tuln', desc: '查看监听端口' },
    { cmd: 'tcpdump -i eth0', desc: '抓包分析' },
    { cmd: 'openssl s_client -connect host:443', desc: '测试SSL连接' },
  ]
  cmds.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(35)} # ${c.desc}`)
  })
}
