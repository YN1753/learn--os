/**
 * 中断与异常演示
 */

export function runAllDemos() {
  console.log('=== 中断分类 ===\n')

  console.log('硬件中断（外部）:')
  console.log('  可屏蔽中断: 键盘、鼠标、网卡')
  console.log('  不可屏蔽中断: 电源故障、内存错误\n')

  console.log('软件中断（内部/异常）:')
  console.log('  故障(Fault): 缺页异常（可修复）')
  console.log('  陷阱(Trap): 系统调用、断点')
  console.log('  终止(Abort): 除零、非法指令\n')

  console.log('=== 中断处理流程 ===\n')
  const steps = [
    '关中断',
    '保存断点(PC, PSW)',
    '识别中断源',
    '保存现场(寄存器)',
    '执行中断服务程序',
    '恢复现场',
    '开中断',
    '返回断点',
  ]
  steps.forEach((s, i) => console.log(`  ${i + 1}. ${s}`))

  console.log('\n=== 中断优先级 ===\n')
  const priorities = [
    '硬件故障（最高）',
    '程序错误',
    '时钟中断',
    '外部设备中断',
    '系统调用（最低）',
  ]
  priorities.forEach((p, i) => console.log(`  ${i + 1}. ${p}`))

  console.log('\n=== 异常类型对比 ===\n')
  console.log('类型    | 原因          | 处理方式        | 示例')
  console.log('-'.repeat(60))
  console.log('故障    | 可修复错误    | 重新执行指令    | 缺页异常')
  console.log('陷阱    | 预期事件      | 执行下一条指令  | 系统调用')
  console.log('终止    | 不可恢复错误  | 终止程序        | 除零错误')
}
