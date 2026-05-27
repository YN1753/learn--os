// 安全模型演示

export function runDemo() {
  console.log('安全模型演示')
  console.log('---')

  console.log('访问控制模型:')
  console.log()
  console.log('1. DAC (自主访问控制):')
  console.log('   - 资源所有者决定谁能访问')
  console.log('   - 示例: Unix文件权限 (chmod)')
  console.log('   - 优点: 灵活')
  console.log('   - 缺点: 安全性依赖用户')
  console.log()
  console.log('2. MAC (强制访问控制):')
  console.log('   - 系统强制执行安全策略')
  console.log('   - 示例: SELinux')
  console.log('   - 优点: 更安全')
  console.log('   - 缺点: 配置复杂')
  console.log()
  console.log('3. RBAC (基于角色的访问控制):')
  console.log('   - 根据角色分配权限')
  console.log('   - 示例: 管理员、普通用户、访客')
  console.log('   - 优点: 易于管理')
  console.log('   - 缺点: 角色设计复杂')
  console.log()

  console.log('安全机制:')
  console.log('  SELinux: 强制访问控制')
  console.log('  AppArmor: 应用程序安全')
  console.log('  沙箱: 隔离执行环境')
  console.log('  Capabilities: 细粒度权限')
}
