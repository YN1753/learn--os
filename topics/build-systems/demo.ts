export function runDemo() {
  console.log('=== 构建系统演示 ===\n')

  console.log('1. Makefile基本语法:')
  console.log('   # 变量定义')
  console.log('   CC = gcc')
  console.log('   CFLAGS = -Wall -g')
  console.log('   ')
  console.log('   # 目标规则')
  console.log('   myapp: main.o utils.o')
  console.log('   	$(CC) main.o utils.o -o myapp')
  console.log('   ')
  console.log('   # 模式规则')
  console.log('   %.o: %.c')
  console.log('   	$(CC) $(CFLAGS) -c $< -o $@')

  console.log('\n2. Make常用命令:')
  const makeCmds = [
    { cmd: 'make', desc: '执行默认目标' },
    { cmd: 'make clean', desc: '清理构建文件' },
    { cmd: 'make -j4', desc: '4个并行编译' },
    { cmd: 'make -n', desc: '只显示命令不执行' },
  ]
  makeCmds.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(20)} # ${c.desc}`)
  })

  console.log('\n3. CMake基本用法:')
  const cmakeCmds = [
    { cmd: 'mkdir build && cd build', desc: '创建构建目录' },
    { cmd: 'cmake ..', desc: '生成构建文件' },
    { cmd: 'make', desc: '编译项目' },
    { cmd: 'cmake -DCMAKE_BUILD_TYPE=Release ..', desc: 'Release模式' },
  ]
  cmakeCmds.forEach(c => {
    console.log(`   $ ${c.cmd.padEnd(40)} # ${c.desc}`)
  })

  console.log('\n4. 构建流程:')
  console.log('   源代码(.c/.cpp) → 编译 → 目标文件(.o) → 链接 → 可执行文件')

  console.log('\n5. Makefile自动变量:')
  const vars = [
    { var: '$@', desc: '目标文件名' },
    { var: '$<', desc: '第一个依赖文件名' },
    { var: '$^', desc: '所有依赖文件名' },
    { var: '$?', desc: '比目标新的依赖文件' },
  ]
  vars.forEach(v => {
    console.log(`   ${v.var.padEnd(6)} # ${v.desc}`)
  })
}
