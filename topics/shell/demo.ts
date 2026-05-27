/**
 * Shell与命令行演示
 */

export function runAllDemos() {
  console.log('=== 常用Shell命令 ===\n')

  const commands = [
    { category: '文件操作', cmds: [
      { cmd: 'ls -la', desc: '列出文件（详细信息，包含隐藏文件）' },
      { cmd: 'cd /path', desc: '切换目录' },
      { cmd: 'mkdir dir', desc: '创建目录' },
      { cmd: 'touch file', desc: '创建文件' },
      { cmd: 'cp src dst', desc: '复制文件' },
      { cmd: 'mv src dst', desc: '移动/重命名' },
      { cmd: 'rm file', desc: '删除文件' },
      { cmd: 'cat file', desc: '查看文件内容' },
    ]},
    { category: '文本处理', cmds: [
      { cmd: 'grep "pattern" file', desc: '搜索文本' },
      { cmd: 'sort file', desc: '排序' },
      { cmd: 'uniq file', desc: '去重' },
      { cmd: 'wc -l file', desc: '统计行数' },
      { cmd: 'cut -d: -f1 file', desc: '截取列' },
    ]},
    { category: '权限管理', cmds: [
      { cmd: 'chmod 755 file', desc: '修改权限' },
      { cmd: 'chown user file', desc: '修改所有者' },
    ]},
    { category: '进程管理', cmds: [
      { cmd: 'ps aux', desc: '查看进程' },
      { cmd: 'top', desc: '实时监控' },
      { cmd: 'kill PID', desc: '终止进程' },
      { cmd: 'command &', desc: '后台运行' },
    ]},
  ]

  for (const cat of commands) {
    console.log(`【${cat.category}】`)
    for (const c of cat.cmds) {
      console.log(`  ${c.cmd.padEnd(30)} # ${c.desc}`)
    }
    console.log()
  }

  console.log('=== 管道和重定向 ===\n')
  console.log('管道: ls | grep ".txt"')
  console.log('输出重定向: echo "hello" > file.txt')
  console.log('追加重定向: echo "world" >> file.txt')
  console.log('错误重定向: command 2> error.log')
  console.log('合并重定向: command > output.log 2>&1')

  console.log('\n=== 权限表示 ===\n')
  console.log('r = 4 (读)')
  console.log('w = 2 (写)')
  console.log('x = 1 (执行)')
  console.log()
  console.log('755 = rwxr-xr-x')
  console.log('644 = rw-r--r--')
  console.log('600 = rw-------')

  console.log('\n=== Shell脚本示例 ===\n')
  console.log('#!/bin/bash')
  console.log('name="World"')
  console.log('echo "Hello, $name"')
  console.log()
  console.log('if [ $age -gt 18 ]; then')
  console.log('    echo "成年"')
  console.log('else')
  console.log('    echo "未成年"')
  console.log('fi')
  console.log()
  console.log('for i in 1 2 3 4 5; do')
  console.log('    echo $i')
  console.log('done')
}
