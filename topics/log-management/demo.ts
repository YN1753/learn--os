// 日志管理演示

interface LogEntry {
  timestamp: string
  level: string
  source: string
  message: string
}

export function runDemo() {
  console.log('日志管理演示')
  console.log('---')

  const logs: LogEntry[] = [
    { timestamp: '2024-01-15 10:00:01', level: 'INFO', source: 'nginx', message: 'GET /api/users 200' },
    { timestamp: '2024-01-15 10:00:02', level: 'WARN', source: 'mysql', message: 'Slow query: 2.5s' },
    { timestamp: '2024-01-15 10:00:03', level: 'ERR', source: 'app', message: 'Connection timeout' },
    { timestamp: '2024-01-15 10:00:04', level: 'CRIT', source: 'kernel', message: 'Out of memory' },
  ]

  console.log('日志级别 (从严重到轻微):')
  console.log('  EMERG → ALERT → CRIT → ERR → WARN → NOTICE → INFO → DEBUG')
  console.log()

  console.log('示例日志:')
  for (const log of logs) {
    console.log(`  [${log.timestamp}] ${log.level}: ${log.message} (${log.source})`)
  }

  console.log()
  console.log('常用命令:')
  console.log('  journalctl: 查看系统日志')
  console.log('  journalctl -u nginx: 查看服务日志')
  console.log('  journalctl -f: 实时跟踪')
  console.log('  journalctl --since "1 hour ago": 最近1小时')
  console.log()

  console.log('日志轮转配置 (/etc/logrotate.conf):')
  console.log('  /var/log/nginx/*.log {')
  console.log('    daily')
  console.log('    rotate 14')
  console.log('    compress')
  console.log('  }')
}
