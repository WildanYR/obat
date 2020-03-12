const router = require('express').Router()
const periksaController = require('../controllers/periksa.controller')

router.post('/', periksaController.periksa)
router.post('/riwayat', periksaController.riwayat)

module.exports = router