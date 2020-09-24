const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const Koa = require('koa')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const Mock = require('mockjs')
const jsonfile = require('jsonfile')
const JSON5 = require('json5')

const app = new Koa()

const log = function (txt) {
  console.log(chalk.blue.bold(txt))
}

/**
 * @method delay
 * @param {number} time 毫秒
 * @desc 延时任意毫秒
 * @example：delay(500).then(() => console.log('after 500ms'))
 */
const delay = (time = 3000) => {
  return new Promise(resolve => { setTimeout(_ => resolve(), time) })
}

const createMockData = (reqPath, ctx) => {
  const json5Path = `${reqPath}.json5`
  const jsonPath = `${reqPath}.json`
  const filePath = `${reqPath}.js`
  let status = 404
  let body = {
    'data': 'NOT FOUND'
  }

  if (fs.existsSync(json5Path)) {
    status = 200
    body = JSON5.parse(fs.readFileSync(json5Path, 'utf-8'))
  }

  if (fs.existsSync(jsonPath)) {
    status = 200
    body = jsonfile.readFileSync(jsonPath)
  }

  if (fs.existsSync(filePath)) {
    // require 去缓存
    delete require.cache[require.resolve(filePath)]
    status = 200
    body = require(filePath)

    if (typeof body === 'function') {
      body = body(ctx.request)
    }
  }

  body = Mock.mock(body)

  return {
    status,
    body
  }
}

module.exports = (port, delayTime) => {
  app.use(koaBody({ multipart: true }))
  app.use(cors())
  app.use(async (ctx, next) => {
    const mockDir = path.join(process.cwd(), `mock`)
    const reqPath = `${mockDir}${ctx.request.path}`
    let { status, body } = createMockData(reqPath, ctx)

    if (delayTime) {
      delayTime = delayTime === 'random' ? Math.random() * 100 : delayTime
      await delay(delayTime).then(() => {
        ctx.status = status
        ctx.body = body
      })
    } else {
      ctx.status = status
      ctx.body = body
    }
  })

  let server = app.listen(port, '0.0.0.0')
  server.on('listening', function () {
    const delayText = delayTime ? `服务器时延${delayTime}毫秒,` : '服务器无时延,'
    log(`mockServer is working ,${delayText}请访问 http://127.0.0.1:${port}`)
  })

  server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {

    }
  })
}
