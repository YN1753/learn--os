// 上下文切换演示

interface PCB {
  pid: number
  name: string
  state: 'running' | 'ready' | 'blocked'
  pc: number
  sp: number
  registers: { ax: number; bx: number; cx: number; dx: number }
}

function createContext(): PCB {
  return {
    pid: 0,
    name: '',
    state: 'ready',
    pc: 0,
    sp: 0,
    registers: { ax: 0, bx: 0, cx: 0, dx: 0 },
  }
}

function contextSwitch(from: PCB, to: PCB): { saved: PCB; restored: PCB } {
  const saved = { ...from }
  const restored = { ...to }

  from.state = 'ready'
  to.state = 'running'

  return { saved, restored }
}

export function runDemo() {
  console.log('上下文切换演示')
  console.log('---')

  const p1: PCB = { pid: 1, name: 'P1', state: 'running', pc: 100, sp: 1000, registers: { ax: 1, bx: 2, cx: 3, dx: 4 } }
  const p2: PCB = { pid: 2, name: 'P2', state: 'ready', pc: 200, sp: 2000, registers: { ax: 10, bx: 20, cx: 30, dx: 40 } }

  console.log('切换前:')
  console.log(`  P1: 状态=${p1.state}, PC=${p1.pc}, SP=${p1.sp}`)
  console.log(`  P2: 状态=${p2.state}, PC=${p2.pc}, SP=${p2.sp}`)
  console.log()

  console.log('执行上下文切换 P1 → P2...')
  const { saved, restored } = contextSwitch(p1, p2)
  console.log()

  console.log('保存的 P1 上下文:')
  console.log(`  PC=${saved.pc}, SP=${saved.sp}`)
  console.log(`  寄存器: AX=${saved.registers.ax}, BX=${saved.registers.bx}`)
  console.log()

  console.log('恢复的 P2 上下文:')
  console.log(`  PC=${restored.pc}, SP=${restored.sp}`)
  console.log(`  寄存器: AX=${restored.registers.ax}, BX=${restored.registers.bx}`)
  console.log()

  console.log('切换后:')
  console.log(`  P1: 状态=${p1.state}`)
  console.log(`  P2: 状态=${p2.state}`)
}
