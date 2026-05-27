// 文件权限管理演示

interface Permission {
  read: boolean
  write: boolean
  execute: boolean
}

interface FilePermission {
  name: string
  owner: Permission
  group: Permission
  others: Permission
}

function permToString(perm: Permission): string {
  return `${perm.read ? 'r' : '-'}${perm.write ? 'w' : '-'}${perm.execute ? 'x' : '-'}`
}

function permToOctal(perm: Permission): number {
  return (perm.read ? 4 : 0) + (perm.write ? 2 : 0) + (perm.execute ? 1 : 0)
}

export function runDemo() {
  console.log('文件权限管理演示')
  console.log('---')

  const files: FilePermission[] = [
    {
      name: 'script.sh',
      owner: { read: true, write: true, execute: true },
      group: { read: true, write: false, execute: true },
      others: { read: true, write: false, execute: false },
    },
    {
      name: 'data.txt',
      owner: { read: true, write: true, execute: false },
      group: { read: true, write: false, execute: false },
      others: { read: true, write: false, execute: false },
    },
    {
      name: '/tmp',
      owner: { read: true, write: true, execute: true },
      group: { read: true, write: true, execute: true },
      others: { read: true, write: true, execute: true },
    },
  ]

  for (const file of files) {
    const ownerStr = permToString(file.owner)
    const groupStr = permToString(file.group)
    const othersStr = permToString(file.others)
    const octal = `${permToOctal(file.owner)}${permToOctal(file.group)}${permToOctal(file.others)}`

    console.log(`${file.name}:`)
    console.log(`  权限: ${ownerStr}${groupStr}${othersStr} (${octal})`)
    console.log(`  所有者: ${ownerStr}, 组: ${groupStr}, 其他: ${othersStr}`)
    console.log()
  }

  console.log('权限管理命令:')
  console.log('  chmod 755 file    # 设置权限')
  console.log('  chmod u+x file    # 给所有者添加执行权限')
  console.log('  chown user file   # 修改所有者')
  console.log('  chgrp group file  # 修改组')
}
