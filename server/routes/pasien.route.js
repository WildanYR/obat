const router = require('express').Router()
const pasienController = require('../controllers/pasien.controller')

router.get('/', pasienController.get)
router.post('/', pasienController.create)
router.post('/u', pasienController.update)
router.post('/d', pasienController.destroy)

module.exports = router