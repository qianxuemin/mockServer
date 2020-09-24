#!/usr/bin/env node

const program = require('commander')
const pkg = require('./package.json')
const checkVersion = require('./check-version')

checkVersion(() => {
  const mockServer = require('./mock-server')
  program
    .version(pkg.version)
    .usage('[options]')
    .option('-p, --port [port]', '指定mock服务端口')
    .option('-d, --delay [delay]', '指定mock服务端时延，number or random')
    .parse(process.argv)

  mockServer(program.port || 8080, program.delay || 0)
})
