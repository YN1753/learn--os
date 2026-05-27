// 目录结构演示

interface FileNode {
  name: string
  type: 'file' | 'dir'
  children?: FileNode[]
}

export function runDemo() {
  console.log('目录结构演示')
  console.log('---')

  const fileSystem: FileNode = {
    name: '/',
    type: 'dir',
    children: [
      {
        name: 'bin',
        type: 'dir',
        children: [
          { name: 'ls', type: 'file' },
          { name: 'cp', type: 'file' },
          { name: 'mv', type: 'file' },
        ],
      },
      {
        name: 'etc',
        type: 'dir',
        children: [
          { name: 'hosts', type: 'file' },
          { name: 'passwd', type: 'file' },
        ],
      },
      {
        name: 'home',
        type: 'dir',
        children: [
          {
            name: 'user',
            type: 'dir',
            children: [
              { name: 'documents', type: 'dir' },
              { name: '.bashrc', type: 'file' },
            ],
          },
        ],
      },
    ],
  }

  const printTree = (node: FileNode, prefix: string = ''): void => {
    console.log(`${prefix}${node.type === 'dir' ? '📁' : '📄'} ${node.name}`)
    if (node.children) {
      for (const child of node.children) {
        printTree(child, prefix + '  ')
      }
    }
  }

  console.log('Unix/Linux 目录层次:')
  printTree(fileSystem)

  console.log()
  console.log('常用目录:')
  console.log('  /bin: 基本命令')
  console.log('  /etc: 配置文件')
  console.log('  /home: 用户目录')
  console.log('  /var: 可变数据')
  console.log('  /tmp: 临时文件')
  console.log('  /proc: 进程信息')

  console.log()
  console.log('路径类型:')
  console.log('  绝对路径: /home/user/file.txt (从根目录开始)')
  console.log('  相对路径: ./documents/file.txt (从当前目录开始)')
}
