const router = require('express').Router()
const herbalController = require('../controllers/herbal.controller')

router.get('/', herbalController.get)
router.post('/', herbalController.create)
router.post('/u', herbalController.update)
router.post('/d', herbalController.destroy)

module.exports = router