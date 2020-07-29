
const User = require('./user.model')

async function findAll (req, res) {
  await User.getAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving customers.'
      })
    } else {
      return res.send(data)
    }
  })
}

async function findByKey (req, res) {
  try {
    const { email } = req.body
    await User.findByCredentials(email, (err, data) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving customers.'
        })
      } else {
        return res.send(data)
      }
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

function create (req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
  }

  // Create a Customer
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    active: req.body.active,
    pass: req.body.pass,
    token: req.body.token
  })

  // Save Customer in the database
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the User.'
      })
    } else res.send(data)
  })
}

async function login (req, res) {
  try {
    const credential = {
      email: req.body.email,
      pass: req.body.pass
    }
    await User.findByCredentials(credential, (err, data) => {
      if (!data) {
        return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
      }
      if (err) {
        return res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving customers.'
        })
      }
      const token = data.token
      res.send({ token })
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

module.exports = { findAll, create, login, findByKey }
