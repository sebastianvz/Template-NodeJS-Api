const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
} else {
  dotenv.config({ path: './.env.production' })
}

module.exports = {
  bdName: process.env.DBNAME,
  bdUser: process.env.DBUSER,
  bdHost: process.env.DBHOST,
  bdPass: process.env.DBPASS,
  bdTest: process.env.TEST,
  secretKey: process.env.JWT_KEY
}
