const express = require('express')
const http = require('http')

const expressConfig = require('./config/express')
// New line
const routeConfig = require('./routes')

const envVariables = require('./config/env.config.js')

const app = express()
const server = http.createServer(app)

expressConfig(app)
// New lineº
routeConfig(app)

const config = {
  port: 5000,
  ip: '127.0.0.1'
}

// Start server
function startServer () {
  app.trackUser = server.listen(config.port, config.ip, () => {
    console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`)
    console.log(envVariables.bdTest)
  })
}

setImmediate(startServer)

// Expose app
module.exports = app
