const router = require('express').Router()
const keluhanController = require('../controllers/keluhan.controller')

router.get('/', keluhanController.get)
router.post('/', keluhanController.create)
router.post('/u', keluhanController.update)
router.post('/d', keluhanController.destroy)

module.exports = router