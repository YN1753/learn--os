export function runDemo() {
  console.log('=== DNS域名解析演示 ===\n')

  console.log('1. DNS解析过程 (www.example.com):')
  const steps = [
    { from: '浏览器', to: '浏览器缓存', desc: '检查本地缓存' },
    { from: '浏览器', to: 'OS缓存', desc: '检查操作系统缓存' },
    { from: 'OS', to: '本地DNS', desc: '查询本地DNS服务器' },
    { from: '本地DNS', to: '根DNS', desc: '查询根服务器(.根)' },
    { from: '根DNS', to: '顶级域名DNS', desc: '查询.com服务器' },
    { from: '顶级域名DNS', to: '权威DNS', desc: '查询example.com服务器' },
    { from: '权威DNS', to: '本地DNS', desc: '返回IP: 93.184.216.34' },
    { from: '本地DNS', to: '浏览器', desc: '返回IP地址' },
  ]
  steps.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s.from} → ${s.to}: ${s.desc}`)
  })

  console.log('\n2. DNS记录类型:')
  const records = [
    { type: 'A', desc: '域名 → IPv4地址' },
    { type: 'AAAA', desc: '域名 → IPv6地址' },
    { type: 'CNAME', desc: '域名 → 另一个域名(别名)' },
    { type: 'MX', desc: '域名 → 邮件服务器' },
    { type: 'NS', desc: '域名 → DNS服务器' },
    { type: 'PTR', desc: 'IP地址 → 域名(反向解析)' },
  ]
  records.forEach(r => {
    console.log(`   ${r.type}: ${r.desc}`)
  })

  console.log('\n3. 常见DNS服务器:')
  const servers = [
    { name: 'Google DNS', ip: '8.8.8.8 / 8.8.4.4' },
    { name: 'Cloudflare', ip: '1.1.1.1 / 1.0.0.1' },
    { name: '阿里DNS', ip: '223.5.5.5 / 223.6.6.6' },
  ]
  servers.forEach(s => {
    console.log(`   ${s.name}: ${s.ip}`)
  })

  console.log('\n4. DNS缓存:')
  console.log('   浏览器缓存 → OS缓存 → 本地DNS缓存 → 递归查询')
}
