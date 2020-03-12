const router = require('express').Router()
const penyakitController = require('../controllers/penyakit.controller')

router.get('/', penyakitController.get)
router.post('/', penyakitController.create)
router.post('/u', penyakitController.update)
router.post('/d', penyakitController.destroy)

module.exports = router