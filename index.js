#!/usr/bin/env node

const program = require('commander')
const portfinder = require('portfinder')
const pkg = require('./package.json')
const checkVersion = require('./check-version')

checkVersion(async () => {
  const mockServer = require('./mock-server')
  let defaultPort 

  try {
    defaultPort = await portfinder.getPortPromise()
  } catch (error) {
    defaultPort = 8080
  }
  
  program
    .version(pkg.version)
    .usage('[options]')
    .option('-p, --port [port]', '指定mock服务端口')
    .option('-d, --delay [delay]', '指定mock服务端时延，number or random')
    .parse(process.argv)
  
  mockServer(program.port || defaultPort, program.delay || 0)
})
