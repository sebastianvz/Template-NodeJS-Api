const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  bdName: process.env.DBNAME,
  bdUser: process.env.DBUSER,
  bdHost: process.env.DBHOST,
  bdPass: process.env.DBPASS,
  bdTest: process.env.TEST
}
