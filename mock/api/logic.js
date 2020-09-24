// 支持写js逻辑
let allStatus = ['100', '200', '300', '400', '500', '600']
let random = Math.floor(Math.random() * (allStatus.length + 1))

let data = {
  list: [{
    'status': allStatus[random],
    'type': random
  }]
}

module.exports = {
  'code': 2000,
  'message': 'js逻辑',
  'data': data
}
