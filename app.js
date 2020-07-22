const express = require('express')
const http = require('http')

const expressConfig = require('./config/express')
// New line
const routeConfig = require('./routes')

const app = express()
const server = http.createServer(app)

expressConfig(app)
// New line
routeConfig(app)

const config = {
  port: 8080,
  ip: '127.0.0.1'
}

// Start server
function startServer () {
  app.trackUser = server.listen(config.port, config.ip, () => {
    console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`)
  })
}

setImmediate(startServer)

// Expose app
module.exports = app
