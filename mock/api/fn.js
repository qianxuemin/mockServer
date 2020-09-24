// 接收请求参数
module.exports = (request) => {
  let { method, query, querystring, body } = request

  return {
    'code': 2000,
    'message': '接收请求参数',
    'data': {
      'method': method,
      'query': query,
      'querystring': querystring,
      'body': body
    }
  }
}
