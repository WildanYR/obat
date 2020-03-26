const router = require('express').Router()
const periksaController = require('../controllers/periksa.controller')

router.post('/', periksaController.get)
router.post('/a', periksaController.add)
router.post('/u', periksaController.update)
router.post('/d', periksaController.destroy)

module.exports = router