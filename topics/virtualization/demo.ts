/**
 * 虚拟化技术演示
 *
 * 演示虚拟机和容器的区别
 */

export function runAllDemos() {
  console.log('=== 虚拟机 vs 容器 ===\n')

  console.log('虚拟机架构:')
  console.log('┌─────────────────────────────────────┐')
  console.log('│  VM 1        │  VM 2        │  VM 3  │')
  console.log('│  ┌────────┐  │  ┌────────┐  │  ...   │')
  console.log('│  │ GuestOS│  │  │ GuestOS│  │        │')
  console.log('│  │ App    │  │  │ App    │  │        │')
  console.log('│  └────────┘  │  └────────┘  │        │')
  console.log('├─────────────────────────────────────┤')
  console.log('│         Hypervisor                  │')
  console.log('├─────────────────────────────────────┤')
  console.log('│         硬件                        │')
  console.log('└─────────────────────────────────────┘')

  console.log('\n容器架构:')
  console.log('┌─────────────────────────────────────┐')
  console.log('│ 容器1 │ 容器2 │ 容器3 │ 容器4       │')
  console.log('│ App   │ App   │ App   │ App         │')
  console.log('├─────────────────────────────────────┤')
  console.log('│     宿主机OS + 容器运行时           │')
  console.log('├─────────────────────────────────────┤')
  console.log('│         硬件                        │')
  console.log('└─────────────────────────────────────┘')

  console.log('\n=== 性能对比 ===\n')

  const comparison = [
    { metric: '启动时间', vm: '分钟级', container: '秒级' },
    { metric: '内存占用', vm: 'GB级', container: 'MB级' },
    { metric: '磁盘占用', vm: 'GB级', container: 'MB级' },
    { metric: '隔离性', vm: '强', container: '较弱' },
    { metric: '性能损耗', vm: '5-15%', container: '<5%' },
  ]

  console.log('指标'.padEnd(12) + '虚拟机'.padEnd(12) + '容器')
  console.log('-'.repeat(36))
  for (const c of comparison) {
    console.log(c.metric.padEnd(12) + c.vm.padEnd(12) + c.container)
  }

  console.log('\n=== Docker核心概念 ===\n')
  console.log('镜像(Image): 应用的只读模板，分层存储')
  console.log('容器(Container): 镜像的运行实例')
  console.log('仓库(Registry): 存储和分发镜像')

  console.log('\n=== 容器三大技术 ===\n')
  console.log('1. Namespace: 隔离进程、网络、文件系统')
  console.log('2. Cgroups: 限制CPU、内存等资源使用')
  console.log('3. UnionFS: 分层文件系统，共享基础层')

  console.log('\n=== 常用Docker命令 ===\n')
  const commands = [
    { cmd: 'docker pull nginx', desc: '拉取镜像' },
    { cmd: 'docker run -d -p 80:80 nginx', desc: '运行容器' },
    { cmd: 'docker ps', desc: '查看运行的容器' },
    { cmd: 'docker stop <id>', desc: '停止容器' },
    { cmd: 'docker rm <id>', desc: '删除容器' },
    { cmd: 'docker images', desc: '查看镜像' },
  ]
  for (const c of commands) {
    console.log(`  ${c.cmd.padEnd(35)} # ${c.desc}`)
  }
}
