const { Router } = require('express')
const controller = require('./user.controller')
const auth = require('../../Middleware/auth')

const router = new Router()

// All Verbs
router.get('/', auth, controller.findAll)
router.post('/login', controller.login)
router.post('/create', controller.create)

/**
 * If we had other verbs HTTP
router.delete('/:id', controller.destroy)
router.put('/:id/', controller.update)
router.get('/:id', controller.show)
router.post('/', controller.create)
*/

module.exports = router
