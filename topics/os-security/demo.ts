/**
 * 操作系统安全演示
 *
 * 演示权限模型和安全机制
 */

export function runAllDemos() {
  console.log('=== Linux权限模型演示 ===\n')

  const files = [
    { name: 'script.sh', perm: 'rwxr-xr-x', owner: 'user', group: 'dev' },
    { name: 'data.txt', perm: 'rw-r--r--', owner: 'user', group: 'dev' },
    { name: 'secret.key', perm: 'rw-------', owner: 'root', group: 'root' },
  ]

  for (const f of files) {
    console.log(`${f.perm} ${f.owner}:${f.group} ${f.name}`)

    const ownerPerm = f.perm.slice(1, 4)
    const groupPerm = f.perm.slice(4, 7)
    const otherPerm = f.perm.slice(7, 10)

    const parse = (p: string) => {
      const perms = []
      if (p[0] === 'r') perms.push('读')
      if (p[1] === 'w') perms.push('写')
      if (p[2] === 'x') perms.push('执行')
      return perms.join(', ') || '无'
    }

    console.log(`  所有者: ${parse(ownerPerm)}`)
    console.log(`  组: ${parse(groupPerm)}`)
    console.log(`  其他: ${parse(otherPerm)}`)
    console.log()
  }

  console.log('=== 权限计算 ===\n')
  console.log('r = 4, w = 2, x = 1')
  console.log('rwx = 4+2+1 = 7')
  console.log('rw- = 4+2+0 = 6')
  console.log('r-x = 4+0+1 = 5')
  console.log('r-- = 4+0+0 = 4')
  console.log()
  console.log('chmod 755 file  → rwxr-xr-x')
  console.log('chmod 644 file  → rw-r--r--')
  console.log('chmod 600 file  → rw-------')

  console.log('\n=== 认证因素 ===\n')
  const factors = [
    { type: '你知道的', examples: ['密码', 'PIN码', '安全问题'] },
    { type: '你拥有的', examples: ['手机', '智能卡', 'U盾'] },
    { type: '你本身的', examples: ['指纹', '人脸', '虹膜'] },
  ]
  for (const f of factors) {
    console.log(`${f.type}: ${f.examples.join(', ')}`)
  }

  console.log('\n=== 访问控制模型 ===\n')
  const models = [
    { name: 'DAC', desc: '资源所有者决定谁能访问', example: 'Linux文件权限' },
    { name: 'MAC', desc: '系统统一管理访问权限', example: '军事安全级别' },
    { name: 'RBAC', desc: '按角色分配权限', example: '管理员/普通用户' },
    { name: 'ABAC', desc: '根据属性决定访问权限', example: '时间/地点/设备' },
  ]
  for (const m of models) {
    console.log(`${m.name}: ${m.desc}`)
    console.log(`  示例: ${m.example}`)
  }

  console.log('\n=== 安全最佳实践 ===\n')
  const practices = [
    '及时安装安全补丁',
    '使用强密码策略',
    '启用多因素认证',
    '遵循最小权限原则',
    '定期审计日志',
    '配置防火墙',
    '加密敏感数据',
    '隔离不同环境',
  ]
  practices.forEach((p, i) => console.log(`  ${i + 1}. ${p}`))
}
