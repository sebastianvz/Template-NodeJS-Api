const sql = require('../../config/db.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const envVariables = require('../../config/env.config')

// constructor
const User = function (user) {
  this.id = user.id
  this.username = user.username
  this.email = user.email
  this.pass = user.pass
  this.token = user.token
  this.active = user.active
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

User.create = async (newUser, result) => {
  newUser.pass = await bcrypt.hash(newUser.pass, 8)
  console.log(newUser.pass)
  newUser.token = await User.generateAuthToken(newUser)
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    console.log('created user: ', { id: res.insertId, ...newUser })
    result(null, { id: res.insertId, ...newUser })
  })
}

User.generateAuthToken = async function (newUser) {
  // Generate an auth token for the user
  const token = jwt.sign({ username: newUser.username }, envVariables.secretKey)
  return token
}

User.findByCredentials = async (credentials, result) => {
  await User.findByEmail(credentials.email, (err, data) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (!data) {
      throw new Error({ error: 'Invalid login credentials' })
    }
    console.log('found customer: ', data)
    const isPasswordMatch = bcrypt.compare(credentials.pass, data.pass)
      .then(function (isPasswordMatch) {
        if (!isPasswordMatch) {
          throw new Error({ error: 'Invalid login credentials' })
        }
        result(null, data)
      })
  })
}

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email ="${email}"`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log('found customer: ', res[0])
      result(null, res[0])
      return
    }
    // not found Customer with the id
    result({ kind: 'not_found' }, null)
  })
}

User.findByKey = (data, result) => {
  const table = 'users'
  const key = data.key
  const value = data.value
  sql.query(`SELECT * FROM ${table} WHERE ${key} ="${value}"`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      console.log('found customer: ', res[0])
      result(null, res[0])
      return
    }
    // not found Customer with the id
    result({ kind: 'not_found' }, null)
  })
}

module.exports = User
