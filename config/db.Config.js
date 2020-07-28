const { bdName, bdUser, bdHost, bdPass } = require('./env.config')

module.exports = {
  HOST: bdHost,
  USER: bdUser,
  PASSWORD: bdPass,
  DB: bdName
}
