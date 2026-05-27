export function runDemo() {
  console.log('=== HTTP协议演示 ===\n')

  console.log('1. HTTP请求方法:')
  const methods = [
    { method: 'GET', desc: '获取资源', idempotent: '是' },
    { method: 'POST', desc: '提交数据', idempotent: '否' },
    { method: 'PUT', desc: '更新资源', idempotent: '是' },
    { method: 'DELETE', desc: '删除资源', idempotent: '是' },
    { method: 'PATCH', desc: '部分更新', idempotent: '否' },
  ]
  methods.forEach(m => {
    console.log(`   ${m.method.padEnd(8)} ${m.desc.padEnd(10)} 幂等: ${m.idempotent}`)
  })

  console.log('\n2. HTTP状态码分类:')
  const statusCodes = [
    { range: '1xx', desc: '信息性', example: '100 Continue' },
    { range: '2xx', desc: '成功', example: '200 OK, 201 Created' },
    { range: '3xx', desc: '重定向', example: '301, 302, 304' },
    { range: '4xx', desc: '客户端错误', example: '400, 401, 403, 404' },
    { range: '5xx', desc: '服务器错误', example: '500, 502, 503' },
  ]
  statusCodes.forEach(s => {
    console.log(`   ${s.range}: ${s.desc} - ${s.example}`)
  })

  console.log('\n3. HTTP请求示例:')
  console.log('   GET /api/users HTTP/1.1')
  console.log('   Host: example.com')
  console.log('   Accept: application/json')
  console.log('   Authorization: Bearer token123')

  console.log('\n4. HTTP响应示例:')
  console.log('   HTTP/1.1 200 OK')
  console.log('   Content-Type: application/json')
  console.log('   Content-Length: 42')
  console.log('   ')
  console.log('   {"users": [{"id": 1, "name": "Alice"}]}')

  console.log('\n5. HTTPS工作原理:')
  const httpsSteps = [
    '客户端发起HTTPS请求',
    '服务器返回SSL证书',
    '客户端验证证书',
    '协商加密算法',
    '生成会话密钥',
    '使用密钥加密通信',
  ]
  httpsSteps.forEach((s, i) => {
    console.log(`   ${i + 1}. ${s}`)
  })
}
