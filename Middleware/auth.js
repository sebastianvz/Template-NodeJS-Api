const jwt = require('jsonwebtoken')
const User = require('../api/user/user.model.js')
const ennVariables = require('../config/env.config')

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  try {
    const data = jwt.verify(token, ennVariables.secretKey)
    const dataToSend = {
      key: 'username',
      value: data.username
    }
    await User.findByKey(dataToSend, (erro, data) => {
      if (!data) {
        throw new Error()
      }
      req.user = data
      req.token = data.token
      next()
    })
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}
module.exports = auth
