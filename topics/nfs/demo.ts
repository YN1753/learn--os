export function runDemo() {
  console.log('=== NFS网络文件系统演示 ===\n')

  console.log('1. NFS基本架构:')
  console.log('   服务器: 提供文件系统共享')
  console.log('   客户端: 挂载远程目录到本地')
  console.log('   协议: 基于RPC，通常使用TCP/UDP 2049端口')

  console.log('\n2. 服务器配置 (/etc/exports):')
  const exports = [
    { path: '/shared', client: '192.168.1.0/24', options: 'rw,sync,no_root_squash' },
    { path: '/data', client: '*.example.com', options: 'ro,sync' },
  ]
  exports.forEach(e => {
    console.log(`   ${e.path} ${e.client}(${e.options})`)
  })

  console.log('\n   常用选项:')
  const options = [
    { opt: 'rw', desc: '读写权限' },
    { opt: 'ro', desc: '只读权限' },
    { opt: 'sync', desc: '同步写入磁盘' },
    { opt: 'no_root_squash', desc: '允许root访问' },
  ]
  options.forEach(o => {
    console.log(`   ${o.opt}: ${o.desc}`)
  })

  console.log('\n3. 客户端操作:')
  const commands = [
    { cmd: 'showmount -e server_ip', desc: '查看服务器共享' },
    { cmd: 'mount -t nfs server:/shared /mnt/nfs', desc: '挂载NFS' },
    { cmd: 'umount /mnt/nfs', desc: '卸载NFS' },
    { cmd: 'df -h', desc: '查看挂载状态' },
  ]
  commands.forEach(c => {
    console.log(`   $ ${c.cmd}  # ${c.desc}`)
  })

  console.log('\n4. 自动挂载 (/etc/fstab):')
  console.log('   server:/shared /mnt/nfs nfs defaults 0 0')

  console.log('\n5. NFS版本:')
  const versions = [
    { ver: 'NFSv3', desc: '无状态，性能好，安全性较弱' },
    { ver: 'NFSv4', desc: '有状态，支持ACL，安全性强' },
  ]
  versions.forEach(v => {
    console.log(`   ${v.ver}: ${v.desc}`)
  })
}
