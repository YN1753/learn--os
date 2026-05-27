export function runDemo() {
  console.log('=== 文本处理演示 ===\n')

  console.log('1. grep - 文本搜索:')
  const grepExamples = [
    { cmd: 'grep "ERROR" log.txt', desc: '搜索包含ERROR的行' },
    { cmd: 'grep -r "TODO" src/', desc: '递归搜索目录' },
    { cmd: 'grep -i "error" log.txt', desc: '忽略大小写' },
    { cmd: 'grep -v "INFO" log.txt', desc: '反向匹配' },
    { cmd: 'grep -c "ERROR" log.txt', desc: '统计匹配行数' },
    { cmd: 'grep -n "ERROR" log.txt', desc: '显示行号' },
  ]
  grepExamples.forEach(e => {
    console.log(`   $ ${e.cmd.padEnd(35)} # ${e.desc}`)
  })

  console.log('\n2. sed - 流编辑器:')
  const sedExamples = [
    { cmd: 'sed \'s/old/new/\' file', desc: '替换第一个匹配' },
    { cmd: 'sed \'s/old/new/g\' file', desc: '替换所有匹配' },
    { cmd: 'sed -i \'s/old/new/g\' file', desc: '直接修改文件' },
    { cmd: 'sed \'3d\' file', desc: '删除第3行' },
    { cmd: 'sed -n \'10,20p\' file', desc: '打印10-20行' },
  ]
  sedExamples.forEach(e => {
    console.log(`   $ ${e.cmd.padEnd(35)} # ${e.desc}`)
  })

  console.log('\n3. awk - 文本分析:')
  const awkExamples = [
    { cmd: 'awk \'{print $1}\' file', desc: '打印第一列' },
    { cmd: 'awk -F: \'{print $1}\' file', desc: '指定分隔符' },
    { cmd: 'awk \'$3 > 100\' file', desc: '条件过滤' },
    { cmd: 'awk \'{sum+=$1} END{print sum}\' file', desc: '求和' },
    { cmd: 'awk \'NR==5\' file', desc: '第5行' },
  ]
  awkExamples.forEach(e => {
    console.log(`   $ ${e.cmd.padEnd(45)} # ${e.desc}`)
  })

  console.log('\n4. 组合使用:')
  console.log('   $ cat log.txt | grep "ERROR" | awk \'{print $3}\' | sort | uniq -c')
  console.log('   # 统计各种ERROR的数量')

  console.log('\n5. 实用场景:')
  console.log('   - 日志分析: 提取错误信息、统计访问量')
  console.log('   - 配置修改: 批量修改配置文件')
  console.log('   - 数据清洗: 处理CSV、JSON等文本')
}
