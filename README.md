# mocker

一个简单的mockServer

## 安装

依赖 [Node.js](https://nodejs.org/en/) (>=6.x)：
```
$ sudo npm install @qianxuemin/mocker -g

```

## 用法

1. 在项目根目录下执行`mocker`,会读取项目中`mock文件夹`作为响应，支持`js`、`json`、`json5`格式，支持直接书写mockJs规则
2. 支持自定义参数
    - 自定义mocker端口 例如：`mocker --port 8888` 或 `mocker -p 8888`
    - 自定义mocker响应时延 例如：`mocker --delay 1000` 或 `mocker -d 1000`

## 一些示例

#### 你的项目目录示例：
```text
.
├── README.md
├── mock
│   └── api
│       ├── fn.js
│       ├── json.js
│       ├── data.json
│       ├── logic.js
│       ├── json5.json5
│       └── mock.js
├── node_modules
├── package.json
└── src
```

使用：项目根目录下执行`mocker -p 8888 -d 100`

接口调用小栗子🌰 ：http://127.0.0.1:8888/api/fn/

#### 你的mock文件示例：

- 支持导出函数 函数为接收的请求参数

```
// fn.js

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
```

- 支持json文件

```
// data.json

{
  "message": "直接返回json",
  "code": 2000
}

```

- 支持json5文件

```
// json5.json5

{
  message: "直接返回json", // 支持写注释
  'code': 2000,
  'users|5':['@cname()'], // 支持mockjs规则
  'images|1-3':['@image()']
}


```

- 支持导出对象

```
// logic.js

module.exports = {
  'code': 2000,
  'message': '直接导出对象',
  'data': {
    'name': '贝小壳'
  }
}
```

- 支持 mockjs，规则详见[http://mockjs.com](http://mockjs.com)，项目中不需要再次引入mockjs


```
// mock.js

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
```

