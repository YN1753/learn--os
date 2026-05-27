export function runDemo() {
  console.log('=== 自动化工具演示 ===\n')

  console.log('1. Ansible基本概念:')
  const concepts = [
    { concept: 'Inventory', desc: '主机清单，定义要管理的服务器' },
    { concept: 'Playbook', desc: '任务剧本，定义自动化任务' },
    { concept: 'Module', desc: '功能模块，如apt、service等' },
    { concept: 'Role', desc: '可复用的角色，组织Playbook' },
  ]
  concepts.forEach(c => {
    console.log(`   ${c.concept.padEnd(12)} # ${c.desc}`)
  })

  console.log('\n2. Ansible常用命令:')
  const commands = [
    { cmd: 'ansible all -m ping', desc: '测试所有主机连通性' },
    { cmd: 'ansible-playbook site.yml', desc: '执行Playbook' },
    { cmd: 'ansible-inventory --list', desc: '列出主机清单' },
    { cmd: 'ansible-playbook site.yml --check', desc: '模拟执行（不实际执行）' },
  ]
  commands.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(40)} # ${c.desc}`)
  })

  console.log('\n3. Playbook示例:')
  console.log('   ---')
  console.log('   - hosts: webservers')
  console.log('     become: yes')
  console.log('     tasks:')
  console.log('       - name: Install nginx')
  console.log('         apt:')
  console.log('           name: nginx')
  console.log('           state: present')

  console.log('\n4. 自动化工具对比:')
  const tools = [
    { name: 'Ansible', arch: '无代理', lang: 'YAML', use: '配置管理、部署' },
    { name: 'Puppet', arch: 'C/S', lang: 'DSL', use: '大规模配置' },
    { name: 'Chef', arch: 'C/S', lang: 'Ruby', use: '复杂配置' },
    { name: 'Terraform', arch: '无代理', lang: 'HCL', use: '基础设施编排' },
  ]
  tools.forEach(t => {
    console.log(`   ${t.name.padEnd(12)} ${t.arch.padEnd(8)} ${t.lang.padEnd(8)} ${t.use}`)
  })

  console.log('\n5. 最佳实践:')
  console.log('   - Playbook要幂等')
  console.log('   - 使用Role组织代码')
  console.log('   - 版本控制Ansible代码')
  console.log('   - 使用Vault管理敏感数据')
}
