export function runDemo() {
  console.log('=== 编译器基础演示 ===\n')

  console.log('1. 编译过程:')
  const stages = [
    { stage: '词法分析', desc: '字符流 → Token序列' },
    { stage: '语法分析', desc: 'Token序列 → AST' },
    { stage: '语义分析', desc: '类型检查、作用域分析' },
    { stage: '中间代码', desc: 'AST → 中间表示(IR)' },
    { stage: '优化', desc: 'IR优化' },
    { stage: '代码生成', desc: 'IR → 目标代码' },
  ]
  stages.forEach(s => {
    console.log(`   ${s.stage.padEnd(10)} # ${s.desc}`)
  })

  console.log('\n2. 词法分析示例:')
  console.log('   输入: int x = 42;')
  console.log('   输出: [INT] [ID:x] [ASSIGN] [NUM:42] [SEMI]')

  console.log('\n3. 语法分析示例:')
  console.log('   输入: x + y * z')
  console.log('   AST:')
  console.log('       +')
  console.log('      / \\')
  console.log('     x   *')
  console.log('        / \\')
  console.log('       y   z')

  console.log('\n4. 常见编译器:')
  const compilers = [
    { name: 'GCC', lang: 'C/C++/Fortran', desc: 'GNU编译器集合' },
    { name: 'Clang', lang: 'C/C++/ObjC', desc: 'LLVM编译器' },
    { name: 'javac', lang: 'Java', desc: 'Java编译器' },
    { name: 'V8', lang: 'JavaScript', desc: 'JS引擎（JIT编译）' },
  ]
  compilers.forEach(c => {
    console.log(`   ${c.name.padEnd(10)} ${c.lang.padEnd(15)} ${c.desc}`)
  })

  console.log('\n5. 编译优化示例:')
  console.log('   优化前:')
  console.log('     t1 = 42')
  console.log('     x = t1')
  console.log('   优化后:')
  console.log('     x = 42')
}
