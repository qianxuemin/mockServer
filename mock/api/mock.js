// 支持 mockjs 详见www.mockjs.com 项目中不需要再次引入mockjs
module.exports = {
  'code': 2000,
  'message': '使用mockjs',
  'data|1-3': [{
    'guid': '@guid()',
    'phone': /1[3-9]\d{10}/,
    'name': '@cname()',
    'agentCode': /\d{6}/,
    'avatar': '@image("400x300", "#50B347", "#FFF", "mocker")',
    'city': '@city(true)',
    'ip': '@ip()'
  }]
}
