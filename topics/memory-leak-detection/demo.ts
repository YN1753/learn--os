export function runDemo() {
  console.log('=== 内存泄漏检测演示 ===\n')

  console.log('1. 内存泄漏原因:')
  const causes = [
    { cause: '未释放malloc', desc: '分配后忘记free' },
    { cause: '指针覆盖', desc: '原指针丢失，无法释放' },
    { cause: '循环引用', desc: '引用计数无法归零' },
    { cause: '异常路径', desc: '异常时跳过释放代码' },
  ]
  causes.forEach(c => {
    console.log(`   ${c.cause.padEnd(12)} # ${c.desc}`)
  })

  console.log('\n2. Valgrind使用:')
  const valgrindCmds = [
    { cmd: 'valgrind --leak-check=full ./program', desc: '检测内存泄漏' },
    { cmd: 'valgrind --tool=memcheck ./program', desc: '内存错误检查' },
    { cmd: 'valgrind --track-origins=yes ./program', desc: '追踪未初始化值来源' },
  ]
  valgrindCmds.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(45)} # ${c.desc}`)
  })

  console.log('\n3. Valgrind输出解读:')
  console.log('   ==12345== 40 bytes in 1 blocks are definitely lost')
  console.log('   ==12345==    at 0x4C2AB80: malloc')
  console.log('   ==12345==    by 0x400537: main (test.c:10)')
  console.log('   说明: 第10行分配的40字节内存未释放')

  console.log('\n4. 预防方法:')
  const prevention = [
    'malloc/free配对使用',
    '使用智能指针(unique_ptr/shared_ptr)',
    'RAII模式管理资源',
    '定期使用Valgrind检查',
    '代码审查关注内存管理',
  ]
  prevention.forEach((p, i) => {
    console.log(`   ${i + 1}. ${p}`)
  })

  console.log('\n5. 其他检测工具:')
  const tools = [
    { tool: 'AddressSanitizer', desc: '编译时启用，运行时检测' },
    { tool: 'LeakSanitizer', desc: '专门检测泄漏' },
    { tool: 'mtrace', desc: 'GNU内存追踪' },
  ]
  tools.forEach(t => {
    console.log(`   ${t.tool.padEnd(20)} # ${t.desc}`)
  })
}
