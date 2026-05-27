export function runDemo() {
  console.log('=== DHCP演示 ===\n')

  console.log('1. DHCP四步过程 (DORA):')
  const steps = [
    { step: 'Discover', from: '客户端', to: '广播', desc: '客户端广播: "我需要IP地址"' },
    { step: 'Offer', from: '服务器', to: '客户端', desc: '服务器响应: "我提供192.168.1.100"' },
    { step: 'Request', from: '客户端', to: '服务器', desc: '客户端请求: "我要用192.168.1.100"' },
    { step: 'ACK', from: '服务器', to: '客户端', desc: '服务器确认: "IP是你的了"' },
  ]
  steps.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s.step}: ${s.from} → ${s.to}`)
    console.log(`      ${s.desc}`)
  })

  console.log('\n2. DHCP分配的网络参数:')
  const params = [
    { name: 'IP地址', example: '192.168.1.100' },
    { name: '子网掩码', example: '255.255.255.0' },
    { name: '默认网关', example: '192.168.1.1' },
    { name: 'DNS服务器', example: '8.8.8.8' },
    { name: '租约时间', example: '24小时' },
  ]
  params.forEach(p => {
    console.log(`   ${p.name}: ${p.example}`)
  })

  console.log('\n3. DHCP租约周期:')
  console.log('   T1 (50%): 客户端尝试续约原服务器')
  console.log('   T2 (87.5%): 客户端尝试任何服务器续约')
  console.log('   租约到期: 必须重新获取IP')

  console.log('\n4. dhclient命令:')
  const commands = [
    'sudo dhclient eth0        # 获取IP',
    'sudo dhclient -r eth0     # 释放IP',
    'cat /var/lib/dhcp/dhclient.leases  # 查看租约',
  ]
  commands.forEach(c => console.log(`   $ ${c}`))
}
