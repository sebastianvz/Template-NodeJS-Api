const { Router } = require('express')
const controller = require('./user.controller')

const router = new Router()

// All Verbs
router.get('/', controller.findAll)

/**
 * If we had other verbs HTTP
router.delete('/:id', controller.destroy)
router.put('/:id/', controller.update)
router.get('/:id', controller.show)
router.post('/', controller.create)
*/

module.exports = router
