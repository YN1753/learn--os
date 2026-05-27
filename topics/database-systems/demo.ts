export function runDemo() {
  console.log('=== 数据库系统演示 ===\n')

  console.log('1. SQL基本操作:')
  const sqlOps = [
    { op: 'SELECT', desc: '查询数据', example: 'SELECT * FROM users;' },
    { op: 'INSERT', desc: '插入数据', example: 'INSERT INTO users (name) VALUES (\"Alice\");' },
    { op: 'UPDATE', desc: '更新数据', example: 'UPDATE users SET age=26 WHERE name=\"Alice\";' },
    { op: 'DELETE', desc: '删除数据', example: 'DELETE FROM users WHERE id=1;' },
  ]
  sqlOps.forEach(o => {
    console.log(`   ${o.op.padEnd(8)} # ${o.desc}`)
    console.log(`   示例: ${o.example}`)
  })

  console.log('\n2. 事务ACID特性:')
  const acid = [
    { prop: '原子性', desc: '事务要么全部成功，要么全部失败' },
    { prop: '一致性', desc: '事务前后数据保持一致' },
    { prop: '隔离性', desc: '并发事务互不影响' },
    { prop: '持久性', desc: '事务提交后永久保存' },
  ]
  acid.forEach(a => {
    console.log(`   ${a.prop.padEnd(8)} # ${a.desc}`)
  })

  console.log('\n3. 索引类型:')
  const indexes = [
    { type: 'B+树索引', desc: '最常用，支持范围查询' },
    { type: '哈希索引', desc: '等值查询优化' },
    { type: '全文索引', desc: '文本搜索优化' },
    { type: '复合索引', desc: '多列组合索引' },
  ]
  indexes.forEach(i => {
    console.log(`   ${i.type.padEnd(12)} # ${i.desc}`)
  })

  console.log('\n4. 常见数据库:')
  const databases = [
    { name: 'MySQL', type: '关系型', use: 'Web应用' },
    { name: 'PostgreSQL', type: '关系型', use: '企业应用' },
    { name: 'MongoDB', type: '文档型', use: 'JSON数据' },
    { name: 'Redis', type: '键值型', use: '缓存' },
  ]
  databases.forEach(d => {
    console.log(`   ${d.name.padEnd(12)} ${d.type.padEnd(8)} ${d.use}`)
  })

  console.log('\n5. 查询优化技巧:')
  console.log('   - 为常用查询字段创建索引')
  console.log('   - 避免SELECT *，只查需要的列')
  console.log('   - 使用EXPLAIN分析查询计划')
  console.log('   - 避免在WHERE中使用函数')
}
