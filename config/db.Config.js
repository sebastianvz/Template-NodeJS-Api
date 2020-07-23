const { bdName, bdUser, bdHost, bdPass } = require('./config')

module.exports = {
  HOST: bdHost,
  USER: bdUser,
  PASSWORD: bdPass,
  DB: bdName
}
