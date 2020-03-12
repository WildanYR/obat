const router = require('express').Router()
const terapisController = require('../controllers/terapis.controller')

router.get('/', terapisController.get)
router.post('/', terapisController.create)
router.post('/u', terapisController.update)
router.post('/d', terapisController.destroy)

module.exports = router