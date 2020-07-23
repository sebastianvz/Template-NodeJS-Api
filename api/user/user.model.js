const sql = require('../../config/db.js')

// constructor
const User = function (user) {
  this.id = user.id
  this.username = user.username
  this.mail = user.mail
  this.pass = user.pass
}

User.getAll = result => {
  sql.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }
    console.log('users: ', res)
    result(null, res)
  })
}

module.exports = User
