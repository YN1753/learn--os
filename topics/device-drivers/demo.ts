// 设备驱动演示

interface Device {
  name: string
  type: 'char' | 'block' | 'network'
  driver: string
  status: 'connected' | 'disconnected'
}

export function runDemo() {
  console.log('设备驱动演示')
  console.log('---')

  const devices: Device[] = [
    { name: '键盘', type: 'char', driver: 'usbhid', status: 'connected' },
    { name: '鼠标', type: 'char', driver: 'usbhid', status: 'connected' },
    { name: '硬盘', type: 'block', driver: 'ahci', status: 'connected' },
    { name: 'U盘', type: 'block', driver: 'usb_storage', status: 'disconnected' },
    { name: '网卡', type: 'network', driver: 'e1000e', status: 'connected' },
  ]

  console.log('设备列表:')
  for (const dev of devices) {
    console.log(`  ${dev.name}: 类型=${dev.type}, 驱动=${dev.driver}, 状态=${dev.status}`)
  }

  console.log()
  console.log('设备类型:')
  console.log('  字符设备: 以字节流方式访问 (键盘、鼠标、串口)')
  console.log('  块设备: 以块为单位访问 (硬盘、U盘)')
  console.log('  网络设备: 处理网络数据包 (网卡)')

  console.log()
  console.log('数据传输方式:')
  console.log('  轮询: CPU不断检查设备状态')
  console.log('  中断: 设备准备好时通知CPU')
  console.log('  DMA: 设备直接访问内存')
}
