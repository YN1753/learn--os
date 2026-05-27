export function runDemo() {
  console.log('=== 版本控制(Git)演示 ===\n')

  console.log('1. Git基本操作:')
  const basicOps = [
    { cmd: 'git init', desc: '初始化仓库' },
    { cmd: 'git clone url', desc: '克隆远程仓库' },
    { cmd: 'git add .', desc: '添加所有文件到暂存区' },
    { cmd: 'git commit -m "message"', desc: '提交到本地仓库' },
    { cmd: 'git push', desc: '推送到远程仓库' },
    { cmd: 'git pull', desc: '拉取远程更新' },
  ]
  basicOps.forEach(o => {
    console.log(`   $ ${o.cmd.padEnd(30)} # ${o.desc}`)
  })

  console.log('\n2. 分支操作:')
  const branchOps = [
    { cmd: 'git branch feature', desc: '创建分支' },
    { cmd: 'git checkout feature', desc: '切换分支' },
    { cmd: 'git checkout -b feature', desc: '创建并切换分支' },
    { cmd: 'git merge feature', desc: '合并分支' },
    { cmd: 'git branch -d feature', desc: '删除分支' },
  ]
  branchOps.forEach(o => {
    console.log(`   $ ${o.cmd.padEnd(30)} # ${o.desc}`)
  })

  console.log('\n3. 查看状态:')
  const statusOps = [
    { cmd: 'git status', desc: '查看工作区状态' },
    { cmd: 'git log --oneline', desc: '查看提交历史' },
    { cmd: 'git diff', desc: '查看未暂存的修改' },
    { cmd: 'git diff --cached', desc: '查看已暂存的修改' },
  ]
  statusOps.forEach(o => {
    console.log(`   $ ${o.cmd.padEnd(30)} # ${o.desc}`)
  })

  console.log('\n4. Git工作流:')
  console.log('   1. 修改代码')
  console.log('   2. git add 添加到暂存区')
  console.log('   3. git commit 提交')
  console.log('   4. git push 推送')
  console.log('   5. 创建Pull Request')
  console.log('   6. 代码审查后合并')

  console.log('\n5. Commit Message规范:')
  console.log('   feat: 新功能')
  console.log('   fix: 修复bug')
  console.log('   docs: 文档更新')
  console.log('   style: 代码格式')
  console.log('   refactor: 重构')
}
