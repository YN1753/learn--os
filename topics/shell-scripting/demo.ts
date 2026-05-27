export function runDemo() {
  console.log('=== Shell脚本编程演示 ===\n')

  console.log('1. Shell脚本基础:')
  const basics = [
    { syntax: '#!/bin/bash', desc: 'shebang，指定解释器' },
    { syntax: '变量名=值', desc: '定义变量（等号两边无空格）' },
    { syntax: '$变量名', desc: '引用变量' },
    { syntax: 'echo "文本"', desc: '输出文本' },
    { syntax: 'read var', desc: '读取用户输入' },
  ]
  basics.forEach(b => {
    console.log(`   ${b.syntax.padEnd(20)} # ${b.desc}`)
  })

  console.log('\n2. 条件判断:')
  console.log('   if [ $a -gt $b ]; then')
  console.log('       echo "a大于b"')
  console.log('   elif [ $a -eq $b ]; then')
  console.log('       echo "a等于b"')
  console.log('   else')
  console.log('       echo "a小于b"')
  console.log('   fi')

  console.log('\n3. 循环:')
  console.log('   # for循环')
  console.log('   for i in 1 2 3; do echo $i; done')
  console.log('   ')
  console.log('   # while循环')
  console.log('   while [ $i -lt 10 ]; do ((i++)); done')

  console.log('\n4. 管道组合示例:')
  const pipes = [
    'cat file.txt | grep "error" | wc -l  # 统计错误行数',
    'ps aux | sort -k3 -rn | head -5       # CPU占用前5进程',
    'df -h | awk \'$5>80{print}\'            # 磁盘使用>80%的分区',
  ]
  pipes.forEach(p => console.log(`   $ ${p}`))

  console.log('\n5. 实用脚本示例:')
  console.log('   #!/bin/bash')
  console.log('   # 备份脚本')
  console.log('   DATE=$(date +%Y%m%d)')
  console.log('   tar -czf backup_$DATE.tar.gz /data/')
  console.log('   echo "备份完成: backup_$DATE.tar.gz"')

  console.log('\n6. 常用内置变量:')
  const vars = [
    { var: '$0', desc: '脚本名称' },
    { var: '$1-$9', desc: '位置参数' },
    { var: '$#', desc: '参数个数' },
    { var: '$?', desc: '上条命令返回值' },
    { var: '$$', desc: '当前进程PID' },
  ]
  vars.forEach(v => {
    console.log(`   ${v.var.padEnd(10)} # ${v.desc}`)
  })
}
