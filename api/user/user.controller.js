
const User = require('./user.model')

function findAll (req, res) {
  User.getAll((err, data) => {
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

module.exports = { findAll }
