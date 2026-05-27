export function runDemo() {
  console.log('=== 系统安全加固演示 ===\n')

  console.log('1. 账户安全:')
  const accountSecurity = [
    '禁用root远程登录: PermitRootLogin no',
    '设置密码复杂度: pam_pwquality',
    '密码过期策略: PASS_MAX_DAYS 90',
    '账户锁定: 失败5次锁定30分钟',
  ]
  accountSecurity.forEach((s, i) => console.log(`   ${i + 1}. ${s}`))

  console.log('\n2. 文件权限:')
  const filePerms = [
    { file: '/etc/passwd', perm: '644', desc: '所有者可写，其他只读' },
    { file: '/etc/shadow', perm: '640', desc: '仅root可读' },
    { file: '/etc/ssh/sshd_config', perm: '600', desc: '仅root可读写' },
  ]
  filePerms.forEach(f => {
    console.log(`   ${f.file.padEnd(25)} ${f.perm} # ${f.desc}`)
  })

  console.log('\n3. 防火墙配置:')
  console.log('   $ iptables -A INPUT -p tcp --dport 22 -j ACCEPT')
  console.log('   $ iptables -A INPUT -p tcp --dport 80 -j ACCEPT')
  console.log('   $ iptables -A INPUT -j DROP')

  console.log('\n4. 安全检查命令:')
  const checkCmds = [
    { cmd: 'lastlog', desc: '查看登录记录' },
    { cmd: 'who', desc: '查看当前登录用户' },
    { cmd: 'netstat -tuln', desc: '查看监听端口' },
    { cmd: 'find / -perm -4000', desc: '查找SUID文件' },
    { cmd: 'ausearch -m LOGIN', desc: '查看审计日志' },
  ]
  checkCmds.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(25)} # ${c.desc}`)
  })

  console.log('\n5. 安全基线标准:')
  console.log('   - CIS基准: 国际安全配置标准')
  console.log('   - 等保标准: 中国信息安全等级保护')
  console.log('   - NIST框架: 美国网络安全框架')
}
