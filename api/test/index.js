const { Router } = require('express')
const controller = require('./testController')

const router = new Router()

// All Verbs
router.get('/', controller.index)

/**
 * If we had other verbs HTTP
router.delete('/:id', controller.destroy)
router.put('/:id/', controller.update)
router.get('/:id', controller.show)
router.post('/', controller.create)
*/

module.exports = router